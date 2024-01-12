// TODO: add target decimal locale

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

// This is where the magic happens.
// NOTE: This is very, very intentionally written as a dopey one-way state loop, rather than using regular expressions.
//    1. I don't want to hit the input with a regex for every possible notation (it would be CPU murder);
//    2. I do not know how to write a regex that takes care of all the wacky special cases. If you do, congratulations.
//       Do not submit a PR for it, I will reject it. At some point, I might want to debug this. If you take
//       this as a challenge to write a regex for this, please, please, please don't, because the special-casing for all 
//       the weird outliers on how people use measurements in English will get much, much worse. Please don't stroke out.

function processPage() {
  const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span');

  for (var textElementIndex = 0; textElementIndex < textElements.length; textElementIndex++) {
    const textElement = textElements[textElementIndex];
    var html = textElement.innerHTML;
    var p = 0;
    var changedSomething = false;

    while (p < html.length) {
      // Find a digit or opening tag. We don't care about anything else.
      while (p < html.length && ((html[p] < '0' || html[p] > '9') && (html[p] != '<')))
        p++;

      // Either at a digit, tag, or past end.
      // Skip HTML tags
      if (p < html.length && html[p] == '<') {
        p = skipTag(html, p);

        // We may have walked right into the next tag, so check again
        continue;
      }

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
                    html[p] == '>' ||
                    html[p] == '\\')) {
                  p++;
                }
                const suffixOne = html.substring(suffixStart, p);
                const suffixOneEnd = p;

                // We're past the first suffix/word, now append the second if it's there.
                // This is very specifically for things like "22 metric tons".
                if (p < html.length && html[p] == ' ') {
                  p++;
                  p = skipLetters(html, p);
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

                  // Eat any conversions the source gives us "2lb (907g)"
                  // If we're on a space, followed by a paren, followed by a digit, skip all the way to the closing paren
                  if (p < html.length - 2 && html[p - 1] == ' ' && html[p] == '(' && (html[p + 1] >= '0' && html[p + 1] <= '9')) {
                    p += 2;
                    while (p < html.length && html[p] != ')')
                      p++;
                    p++;
                    replaceEnd = p;
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
    // TODO
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

// Note the recursion for nested tags
function skipTag(html, p) {
  // Arriving at the opening tag, should return after the closing tag
  p++;
  const openTagStart = p;
  if (html[p] == '!') {
    // Comment
    while (p < html.length && html[p] != '>')
      p++;
    p++;
    return p;
  }
  p = skipLetters(html, p);
  const tagName = html.substring(openTagStart, p);
  log('tagName: %s, p: %d, html: %s', tagName, p, html);
  // Find end of opening tag, ignoring strings
  while (p < html.length && html[p] != '>') {
    if (html[p] == '\'' || html[p] == '"') {
      const currentQuote = html[p];
      p++; // Skip past opening quote
      while (p < html.length && html[p] != currentQuote) {
        // Ignore things like \'
        if (html[p] == '\\' && html[p + 1] == currentQuote) {
          p++; // Skip past \, regular skip will do the quote
        }
        p++;
      }
    }
    p++;
  }
  p++;
  if (html[p - 2] == '/') {
    // Singlular, e.g. <br />; we're done
    return p;
  }
  // Skip past tag content
  while (p < html.length && (html[p] != '<' || html[p + 1] != '/')) {
    if (html[p] == '<' && html[p + 1] != '/') {
      // Oops, not a closing tag, it's a nested tag. So recurse to skip past that
      p = skipTag(html, p);
    }
    else
      p++;
  }
  // We should be pointing at the opening of the closing tag.
  // If we did everything right, the tags should match. Check anyway.
  p += 2;  // Skip </
  const closeTagStart = p;
  p = skipLetters(html, p);
  const closeTag = html.substring(closeTagStart, p);
  if (closeTag != tagName) {
    log('Tag mismatch, we\'ve got a bug! Open tag is ' + tagName + ', close tag is ' + closeTag + 
    ', content is ' + html.substring(openTagStart, p));
  }
  // Skip past closing >
  p++;
  return p;
}

function skipLetters(html, p) {
  while (p < html.length && ((html[p] >= 'a' && html[p] <= 'z') || (html[p] >= 'A' && html[p] <= 'Z'))) {
    p++;
  }
  return p;
}

function log(...args) {
  console.log(...args);
}