// TODO: add target decimal locale
// TODO: minify

var units = null;
var assumeImperial = true; // might have to look at headers to make this saner
var toImperial = true; 
var addOtherSystem = true;
var highlight = true;
var showPopup = true;

// This is the only way I've figured out to synchronously load settings. It's clinically insane.
// I am very much open to better alternatives.
const readOptionsFromStorage = chrome.storage.local.get()
  .then((items) => {
    assumeImperial = items.assumeImperial;
    toImperial = items.toImperial;
    addOtherSystem = items.addOtherSystem;
    highlight = items.highlight;
    showPopup = items.showPopup;
    units = items.units;
    processPage();
  }
);

loadOptions();

async function loadOptions() {
  await readOptionsFromStorage;
  chrome.storage.local.onChanged.addListener(function (changes, area) {
    location.reload();
  });
}

function processPage() {
  const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span');

  for (var textElementIndex = 0; textElementIndex < textElements.length; textElementIndex++) {
    const textElement = textElements[textElementIndex];
    var html = textElement.innerHTML;
    var p = 0;
    var changedSomething = false;

    while (p < html.length) {
      // Skip HTML tags
      if (html[p] == '<') {
        while (p < html.length && html[p] != '>')
          p++;
      }

      while (p < html.length && (html[p] < '0' || html[p] > '9'))
        p++;

      if (p < html.length) {
        // We have a digit, make sure we're not in the middle of something
        if (p == 0 || !((html[p - 1] >= 'A' && html[p - 1] <= 'Z') || (html[p - 1] >= 'a' && html[p - 1] <= 'z'))) {
          const replaceStart = p;
          while (p < html.length && ((html[p] >= '0' && html[p] <= '9') || html[p] == '.' || html[p] == ',')) {
            p++;
          }
          if (p < html.length) {
            var valueString = html.substring(replaceStart, p);
            // Super-common special cases: "In 2012, blah blah" or "...until 2012."
            // "Numbers" ending in , or . are not numbers we care about.
            if (!valueString.endsWith('.') && !valueString.endsWith(',')) {
              // Ignore dates and times
              // Might want to consider / to handle fractions later.
              if (html[p] != '/' && html[p] != ':') {
                // Now find the actual unit suffix.
                var suffixStart = p;

                // Some do "1250kg"; some do "1250 kg"; some do "1250-kg" (for some reason)
                if (html[p] == " " || html[p] == "-") {
                  suffixStart++;
                  p++;
                }

                // Yes, I am totally ignoring 2"""" or 1''. I gotta stop somewhere, folks.
                while (p < html.length &&
                  (html[p] == '\'' ||
                    html[p] == '"' ||
                    (html[p] >= 'a' && html[p] <= 'z') ||
                    (html[p] >= 'A' && html[p] <= 'Z') ||
                    html[p] == '<' || // allow for things like mm2 with <sup>
                    html[p] == '>')) {
                  p++;
                }
                const suffixOne = html.substring(suffixStart, p);
                const suffixOneEnd = p;

                // We're past the first suffix/word, now append the second if it's there.
                // This is very specifically for things like "22 metric tons".
                if (p < html.length && html[p] == ' ') {
                  p++;
                  while (p < html.length &&
                    ((html[p] >= 'a' && html[p] <= 'z') ||
                      (html[p] >= 'A' && html[p] <= 'Z'))) {
                    p++;
                  }
                }
                const suffixTwo = html.substring(suffixStart, p);
                const suffixTwoEnd = p;

                if (suffixOne.length > 0) {
                  var sourceUnit = units[suffixTwo];
                  var replaceEnd = suffixTwoEnd;
                  if (!sourceUnit) {
                    sourceUnit = units[suffixOne];
                    replaceEnd = suffixOneEnd;
                  }

                  if (sourceUnit) {
                    // Because parseFloat sucks, we remove thousands separators and hard-wire to . 
                    if (!assumeImperial) {
                      valueString = valueString.replace('.', '').replace(',', '.');
                    } else {
                      valueString = valueString.replace(',', '');
                    }
                    const decimalPointPos = valueString.lastIndexOf('.');
                    const originalFractionDigits = decimalPointPos < 0 ? 0 : valueString.length - decimalPointPos - 1;
                    const valueInBaseUnits = (1.0 * parseFloat(valueString) - sourceUnit.ctba) / sourceUnit.ctb - sourceUnit.ctbb;
                    const imperialUnit = valueInBaseUnits >= sourceUnit.coi ? units[sourceUnit.pih] : units[sourceUnit.pil];
                    const metricUnit = valueInBaseUnits >= sourceUnit.com ? units[sourceUnit.pmh] : units[sourceUnit.pml];
                    const targetNf = toImperial ? imperialUnit.nf : metricUnit.nf;
                    const imperialResult = formatValue(valueInBaseUnits, imperialUnit, targetNf, sourceUnit, originalFractionDigits);
                    const metricResult = formatValue(valueInBaseUnits, metricUnit, targetNf, sourceUnit, originalFractionDigits);

                    var replacement = toImperial ? imperialResult : metricResult;
                    if (addOtherSystem)
                      replacement += ' (' + (toImperial ? metricResult : imperialResult) + ')';

                    var popupAttribute = '';
                    if (showPopup) {
                      popupAttribute = ' onclick="showThothPopup(event, this, ' +
                        '\'' + html.substring(replaceStart, replaceEnd) + '\', ' +
                        '\'' + sourceUnit.c + '\', ' +
                        valueInBaseUnits +
                        ');"';
                    }
                    replacement = '<span' + (highlight ? ' class="thoth"' : '') + popupAttribute + '>' + replacement + '</span>';
                    html = html.substring(0, replaceStart) + replacement + html.substring(replaceEnd);
                    p = replaceStart + replacement.length;
                    changedSomething = true;
                  }
                }
              }
            }
          }
        }
        else {
          // We're inside some wacky identifier, skip past the number
          while (p < html.length && (html[p] >= '0' && html[p] <= '9'))
            p++;
        }
      }
    }

    if (changedSomething)
      textElement.innerHTML = html;
  }

  var thothPopupScriptElement = document.createElement('script');
  thothPopupScriptElement.src = chrome.runtime.getURL('thoth-popup.js');
  thothPopupScriptElement.onload = function () { this.remove(); };
  (document.head || document.documentElement).appendChild(thothPopupScriptElement);

  var thothPopupElement = document.createElement('div');
  var popupHtml = '<span id="thoth-original">&nbsp;</span><br />' +
    '<nav class="thoth-all-units-list-nav">' +
    //'<ul id="thoth-all-units" class="thoth-all-units-nav-ul">' +
    '</ul>' + 
    '</nav>';
  thothPopupElement.innerHTML = popupHtml;
  thothPopupElement.id = 'thoth-popup';
  thothPopupElement.className = 'thoth-popup';
  document.documentElement.appendChild(thothPopupElement);

  document.documentElement.setAttribute('onclick', 'hideThothPopup();' + (document.documentElement.getAttribute('onclick') || ''));
}

function formatValue(valueInBaseUnits, targetUnit, targetNf, sourceUnit, originalFractionDigits) {
  const value = (1.0 * valueInBaseUnits + targetUnit.ctbb) * targetUnit.ctb + targetUnit.ctba;
  var fractionDigits = value >= targetUnit.cod ? targetUnit.hd : targetUnit.ld;
  // We still reformat if the target is the same as source, but we want to keep the original number of digits
  if (targetUnit.ps == sourceUnit.ps)
    fractionDigits = originalFractionDigits;
    
  const result = new Intl.NumberFormat(targetNf, { maximumFractionDigits: fractionDigits }).format(value) + targetUnit.ps;
  return result;
}


