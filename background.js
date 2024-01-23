var _items = null;

chrome.runtime.onInstalled.addListener(
  // eslint-disable-next-line no-unused-vars
  function (details) {
    // TODO: when set is complete, consider checking details.reason === "update"
    chrome.storage.local.set(
      {
        assumeImperial: true,
        toImperial: true,
        addOtherSystem: true,
        highlight: true,
        showPopup: true,
        // NOTE: order is important!
        units: {
          // text match, class, name, pref suffix, convert to baseline add before, conv to baseline factor, convert to baseline add after, pref imp high, cutoff imp, pref imp low,
          // pref metric high, cutoff metric, pref metric low, high dec, cutoff dec, low dec, number format culture
          'g': { c: 'Mass', n: 'Gram', ps: 'g', ctbb: 0, ctb: 1.0, ctba: 0, pih: 'oz', coi: 0, pil: 'oz', pmh: 'g', com: 0, pml: 'g', hd: 0, cod: 10, ld: 1, nf: 'nl-NL' },
          'oz': { c: 'Mass', n: 'Ounce', ps: 'oz', ctbb: 0, ctb: 1.0 / 28.3495, ctba: 0, pih: 'oz', coi: 0, pil: 'oz', pmh: 'g', com: 0, pml: 'g', hd: 0, cod: 10, ld: 1, nf: 'en-US' },
          'kg': { c: 'Mass', n: 'Kilogram', ps: 'kg', ctbb: 0, ctb: 0.001, ctba: 0, pih: 'lb', coi: 0, pil: 'lb', pmh: 'kg', com: 0, pml: 'kg', hd: 0, cod: 10, ld: 1, nf: 'nl-NL' },
          'lb': { c: 'Mass', n: 'Pound', ps: 'lb', ctbb: 0, ctb: 1.0 / 453.592, ctba: 0, pih: 'lb', coi: 0, pil: 'lb', pmh: 'kg', com: 0, pml: 'lb', hd: 0, cod: 10, ld: 1, nf: 'en-US' },
          'metric ton': { c: 'Mass', n: 'Metric ton', ps: ' tons', ctbb: 0, ctb: 0.000001, ctba: 0, pih: 'ton', coi: 0, pil: 'ton', pmh: 'metric ton', com: 0, pml: 'metric ton', hd: 0, cod: 10, ld: 1, nf: 'nl-NL' },
          'ton': { c: 'Mass', n: 'Short ton', ps: ' tons', ctbb: 0, ctb: 1.0 / 907185, ctba: 0, pih: 'ton', coi: 0, pil: 'ton', pmh: 'metric ton', com: 0, pml: 'metric ton', hd: 0, cod: 10, ld: 1, nf: 'en-US' },
          'long ton': { c: 'Mass', n: 'Long ton', ps: ' long tons', ctbb: 0, ctb: 1.0 / 1016046.9, ctba: 0, pih: 'ton', coi: 0, pil: 'ton', pmh: 'metric ton', com: 0, pml: 'metric ton', hd: 0, cod: 10, ld: 1, nf: 'en-US' },

          'C': { c: 'Temperature', n: 'Celsius', ps: '\u00b0C', ctbb: 0, ctb: 1.0, ctba: 0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'nl-NL' },
          'K': { c: 'Temperature', n: 'Kelvin', ps: '\u00b0K', ctbb: 273.15, ctb: 1.0, ctba: 0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'nl-NL' },
          'F': { c: 'Temperature', n: 'Fahrenheit', ps: '\u00b0F', ctbb: 0, ctb: 9.0 / 5.0, ctba: 32.0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'en-US' },
          'R': { c: 'Temperature', n: 'Rankine', ps: '\u00b0R', ctbb: 0, ctb: 9.0 / 5.0, ctba: 491.67, pih: 'R', coi: 0, pil: 'R', pmh: 'C', com: 0, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'en-US' }
        },
        aliases: {
          'g': { a: 'g' },
          'gram': { a: 'g' },
          'grams': { a: 'g' },
          'oz': { a: 'oz' },
          'ounce': { a: 'oz' },
          'ounces': { a: 'oz' },
          'kg': { a: 'kg' },
          'kilogram': { a: 'kg' },
          'kilograms': { a: 'kg' },
          'kilo': { a: 'kg' },
          'kilos': { a: 'kg' },
          'lb': { a: 'lb' },
          'pound': { a: 'lb' },
          'pounds': { a: 'lb' },
          'metric tons': { a: 'metric ton' },
          'tonne': { a: 'metric ton' },
          'ton': { a: 'ton' },
          'long tons': { a: 'long ton' },

          'C': { a: 'C' },
          '\u00B0C': { a: 'C' },
          '\u00B0 C': { a: 'C' },
          '&#176;C': { a: 'C' },
          '&#176; C': { a: 'C' },
          '&#xb0;C': { a: 'C' },
          '&#xb0; C': { a: 'C' },
          'Celsius': { a: 'C' },
          '\u00B0Celsius': { a: 'C' },
          '\u00B0 Celsius': { a: 'C' },
          '&#176;Celsius': { a: 'C' },
          '&#176; Celsius': { a: 'C' },
          '&#xb0;Celsius': { a: 'C' },
          '&#xb0; Celsius': { a: 'C' },
          'degrees Celsius': { a: 'C' },

          'F': { a: 'F' },
          '\u00B0F': { a: 'F' },
          '\u00B0 F': { a: 'F' },
          '&#176;F': { a: 'F' },
          '&#176; F': { a: 'F' },
          '&#xb0;F': { a: 'F' },
          '&#xb0; F': { a: 'F' },
          'Fahrenheit': { a: 'F' },
          '\u00B0Fahrenheit': { a: 'F' },
          '\u00B0 Fahrenheit': { a: 'F' },
          '&#176;Fahrenheit': { a: 'F' },
          '&#176; Fahrenheit': { a: 'F' },
          '&#xb0;Fahrenheit': { a: 'F' },
          '&#xb0; Fahrenheit': { a: 'F' },
          'degrees Fahrenheit': { a: 'F' },

          'K': { a: 'K' },
          '\u00B0K': { a: 'K' },
          '\u00B0 K': { a: 'K' },
          '&#176;K': { a: 'K' },
          '&#176; K': { a: 'K' },
          '&#xb0;K': { a: 'K' },
          '&#xb0; K': { a: 'K' },
          'Kelvin': { a: 'K' },
          '\u00B0Kelvin': { a: 'K' },
          '\u00B0 Kelvin': { a: 'K' },
          '&#176;Kelvin': { a: 'K' },
          '&#176; Kelvin': { a: 'K' },
          '&#xb0;Kelvin': { a: 'K' },
          '&#xb0; Kelvin': { a: 'K' },
          'degrees Kelvin': { a: 'K' },

          'R': { a: 'R' },
          '\u00B0R': { a: 'R' },
          '\u00B0 R': { a: 'R' },
          '&#176;R': { a: 'R' },
          '&#176; R': { a: 'R' },
          '&#xb0;R': { a: 'R' },
          '&#xb0; R': { a: 'R' },
          'Rankine': { a: 'R' },
          '\u00B0Rankine': { a: 'R' },
          '\u00B0 Rankine': { a: 'R' },
          '&#176;Rankine': { a: 'R' },
          '&#176; Rankine': { a: 'R' },
          '&#xb0;Rankine': { a: 'R' },
          '&#xb0; Rankine': { a: 'R' },
          'degrees Rankine': { a: 'R' }

          // TODO: distance
          // TODO: work
          // TODO: volume
        }
      }
    );
    loadSettings();
  }
);

chrome.runtime.onStartup.addListener(
  function() { loadSettings(); }
);

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (!_items) { loadSettings(); }
    if (request.thoth === 'getUnits')
      sendResponse(_items);
  }
);


function loadSettings() {
  chrome.storage.local.get(
    function (items) {
      _items = items;
    }
  );
}