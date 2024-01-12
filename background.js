// text match, class, name, pref suffix, convert to baseline add before, conv to baseline factor, convert to baseline add after, pref imp high, cutoff imp, pref imp low,
// pref metric high, cutoff metric, pref metric low, high dec, cutoff dec, low dec, number format culture
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set(
    {
      assumeImperial: true,
      toImperial: true,
      addOtherSystem: true,
      highlight: true,
      showPopup: true,
      // NOTE: order is important!
      // 1. class
      // 2. name
      units: {
        'g': { c: 'Mass', n: 'Gram', ps: 'g', ctbb: 0, ctb: 1.0, ctba: 0, pih: 'oz', coi: 0, pil: 'oz', pmh: 'g', com: 0, pml: 'g', hd: 0, cod: 10, ld: 1, nf: 'nl-NL' },
        'gram': { c: 'Mass', n: 'Gram', ps: 'g', ctbb: 0, ctb: 1.0, ctba: 0, pih: 'oz', coi: 0, pil: 'oz', pmh: 'g', com: 0, pml: 'g', hd: 0, cod: 10, ld: 1, nf: 'nl-NL' },
        'grams': { c: 'Mass', n: 'Gram', ps: 'g', ctbb: 0, ctb: 1.0, ctba: 0, pih: 'oz', coi: 0, pil: 'oz', pmh: 'g', com: 0, pml: 'g', hd: 0, cod: 10, ld: 1, nf: 'nl-NL' },
        'oz': { c: 'Mass', n: 'Ounce', ps: 'oz', ctbb: 0, ctb: 1.0 / 28.3495, ctba: 0, pih: 'oz', coi: 0, pil: 'oz', pmh: 'g', com: 0, pml: 'g', hd: 0, cod: 10, ld: 1, nf: 'en-US' },
        'ounce': { c: 'Mass', n: 'Ounce', ps: 'oz', ctbb: 0, ctb: 1.0 / 28.3495, ctba: 0, pih: 'oz', coi: 0, pil: 'oz', pmh: 'g', com: 0, pml: 'g', hd: 0, cod: 10, ld: 1, nf: 'en-US' },
        'ounces': { c: 'Mass', n: 'Ounce', ps: 'oz', ctbb: 0, ctb: 1.0 / 28.3495, ctba: 0, pih: 'oz', coi: 0, pil: 'oz', pmh: 'g', com: 0, pml: 'g', hd: 0, cod: 10, ld: 1, nf: 'en-US' },
        'kg': { c: 'Mass', n: 'Kilogram', ps: 'kg', ctbb: 0, ctb: 0.001, ctba: 0, pih: 'lb', coi: 0, pil: 'lb', pmh: 'kg', com: 0, pml: 'kg', hd: 0, cod: 10, ld: 1, nf: 'nl-NL' },
        'kilogram': { c: 'Mass', n: 'Kilogram', ps: 'kg', ctbb: 0, ctb: 0.001, ctba: 0, pih: 'lb', coi: 0, pil: 'lb', pmh: 'kg', com: 0, pml: 'kg', hd: 0, cod: 10, ld: 1, nf: 'nl-NL' },
        'kilograms': { c: 'Mass', n: 'Kilogram', ps: 'kg', ctbb: 0, ctb: 0.001, ctba: 0, pih: 'lb', coi: 0, pil: 'lb', pmh: 'kg', com: 0, pml: 'kg', hd: 0, cod: 10, ld: 1, nf: 'nl-NL' },
        'kilo': { c: 'Mass', n: 'Kilogram', ps: 'kg', ctbb: 0, ctb: 0.001, ctba: 0, pih: 'lb', coi: 0, pil: 'lb', pmh: 'kg', com: 0, pml: 'kg', hd: 0, cod: 10, ld: 1, nf: 'nl-NL' },
        'kilos': { c: 'Mass', n: 'Kilogram', ps: 'kg', ctbb: 0, ctb: 0.001, ctba: 0, pih: 'lb', coi: 0, pil: 'lb', pmh: 'kg', com: 0, pml: 'kg', hd: 0, cod: 10, ld: 1, nf: 'nl-NL' },
        'lb': { c: 'Mass', n: 'Pound', ps: 'lb', ctbb: 0, ctb: 1.0 / 453.592, ctba: 0, pih: 'lb', coi: 0, pil: 'lb', pmh: 'kg', com: 0, pml: 'lb', hd: 0, cod: 10, ld: 1, nf: 'en-US' },
        'pound': { c: 'Mass', n: 'Pound', ps: 'lb', ctbb: 0, ctb: 1.0 / 453.592, ctba: 0, pih: 'lb', coi: 0, pil: 'lb', pmh: 'kg', com: 0, pml: 'lb', hd: 0, cod: 10, ld: 1, nf: 'en-US' },
        'pounds': { c: 'Mass', n: 'Pound', ps: 'lb', ctbb: 0, ctb: 1.0 / 453.592, ctba: 0, pih: 'lb', coi: 0, pil: 'lb', pmh: 'kg', com: 0, pml: 'lb', hd: 0, cod: 10, ld: 1, nf: 'en-US' },
        'metric tons': { c: 'Mass', n: 'Metric ton', ps: ' tons', ctbb: 0, ctb: 0.000001, ctba: 0, pih: 'ton', coi: 0, pil: 'ton', pmh: 'metric ton', com: 0, pml: 'metric ton', hd: 0, cod: 10, ld: 1, nf: 'nl-NL' },
        'tonne': { c: 'Mass', n: 'Short ton', ps: ' tons', ctbb: 0, ctb: 0.000001, ctba: 0, pih: 'ton', coi: 0, pil: 'ton', pmh: 'metric ton', com: 0, pml: 'metric ton', hd: 0, cod: 10, ld: 1, nf: 'nl-NL' },
        'ton': { c: 'Mass', n: 'Short ton', ps: ' tons', ctbb: 0, ctb: 1.0 / 907185, ctba: 0, pih: 'ton', coi: 0, pil: 'ton', pmh: 'metric ton', com: 0, pml: 'metric ton', hd: 0, cod: 10, ld: 1, nf: 'en-US' },
        'long tons': { c: 'Mass', n: 'Long ton', ps: ' long tons', ctbb: 0, ctb: 1.0 / 1016046.9, ctba: 0, pih: 'ton', coi: 0, pil: 'ton', pmh: 'metric ton', com: 0, pml: 'metric ton', hd: 0, cod: 10, ld: 1, nf: 'en-US' },

        'C': { c: 'Temperature', n: 'Celsius', ps: '\u00b0C', ctbb: 0, ctb: 1.0, ctba: 0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'nl-NL' },
        '\u00B0C': { c: 'Temperature', n: 'Celsius', ps: '\u00b0C', ctbb: 0, ctb: 1.0, ctba: 0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'nl-NL' },
        '\u00B0 C': { c: 'Temperature', n: 'Celsius', ps: '\u00b0C', ctbb: 0, ctb: 1.0, ctba: 0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'nl-NL' },
        '&#176;C': { c: 'Temperature', n: 'Celsius', ps: '\u00b0C', ctbb: 0, ctb: 1.0, ctba: 0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'nl-NL' },
        '&#176; C': { c: 'Temperature', n: 'Celsius', ps: '\u00b0C', ctbb: 0, ctb: 1.0, ctba: 0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'nl-NL' },
        '&#xb0;C': { c: 'Temperature', n: 'Celsius', ps: '\u00b0C', ctbb: 0, ctb: 1.0, ctba: 0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'nl-NL' },
        '&#xb0; C': { c: 'Temperature', n: 'Celsius', ps: '\u00b0C', ctbb: 0, ctb: 1.0, ctba: 0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'nl-NL' },
        'Celsius': { c: 'Temperature', n: 'Celsius', ps: '\u00b0C', ctbb: 0, ctb: 1.0, ctba: 0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'nl-NL' },
        'degrees Celsius': { c: 'Temperature', n: 'Celsius', ps: '\u00b0C', ctbb: 0, ctb: 1.0, ctba: 0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'nl-NL' },
        'K': { c: 'Temperature', n: 'Kelvin', ps: '\u00b0K', ctbb: 273.15, ctb: 1.0, ctba: 0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'nl-NL' },
        '\u00B0K': { c: 'Temperature', n: 'Kelvin', ps: '\u00b0K', ctbb: 273.15, ctb: 1.0, ctba: 0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'nl-NL' },
        '\u00B0 K': { c: 'Temperature', n: 'Kelvin', ps: '\u00b0K', ctbb: 273.15, ctb: 1.0, ctba: 0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'nl-NL' },
        '&#176;K': { c: 'Temperature', n: 'Kelvin', ps: '\u00b0K', ctbb: 273.15, ctb: 1.0, ctba: 0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'nl-NL' },
        '&#176; K': { c: 'Temperature', n: 'Kelvin', ps: '\u00b0K', ctbb: 273.15, ctb: 1.0, ctba: 0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'nl-NL' },
        '&#xb0;K': { c: 'Temperature', n: 'Kelvin', ps: '\u00b0K', ctbb: 273.15, ctb: 1.0, ctba: 0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'nl-NL' },
        '&#xb0; K': { c: 'Temperature', n: 'Kelvin', ps: '\u00b0K', ctbb: 273.15, ctb: 1.0, ctba: 0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'nl-NL' },
        'Kelvin': { c: 'Temperature', n: 'Kelvin', ps: '\u00b0K', ctbb: 273.15, ctb: 1.0, ctba: 0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'nl-NL' },
        'degrees Kelvin': { c: 'Temperature', n: 'Kelvin', ps: '\u00b0K', ctbb: 273.15, ctb: 1.0, ctba: 0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'nl-NL' },
        'F': { c: 'Temperature', n: 'Fahrenheit', ps: '\u00b0F', ctbb: 0, ctb: 9.0 / 5.0, ctba: 32.0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'en-US' },
        '\u00B0F': { c: 'Temperature', n: 'Fahrenheit', ps: '\u00b0F', ctbb: 0, ctb: 9.0 / 5.0, ctba: 32.0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'en-US' },
        '\u00B0 F': { c: 'Temperature', n: 'Fahrenheit', ps: '\u00b0F', ctbb: 0, ctb: 9.0 / 5.0, ctba: 32.0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'en-US' },
        '&#176;F': { c: 'Temperature', n: 'Fahrenheit', ps: '\u00b0F', ctbb: 0, ctb: 9.0 / 5.0, ctba: 32.0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'en-US' },
        '&#176; F': { c: 'Temperature', n: 'Fahrenheit', ps: '\u00b0F', ctbb: 0, ctb: 9.0 / 5.0, ctba: 32.0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'en-US' },
        '&#xb0;F': { c: 'Temperature', n: 'Fahrenheit', ps: '\u00b0F', ctbb: 0, ctb: 9.0 / 5.0, ctba: 32.0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'en-US' },
        '&#xb0; F': { c: 'Temperature', n: 'Fahrenheit', ps: '\u00b0F', ctbb: 0, ctb: 9.0 / 5.0, ctba: 32.0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'en-US' },
        'Fahrenheit': { c: 'Temperature', n: 'Fahrenheit', ps: '\u00b0F', ctbb: 0, ctb: 9.0 / 5.0, ctba: 32.0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'en-US' },
        'degrees Fahrenheit': { c: 'Temperature', n: 'Fahrenheit', ps: '\u00b0F', ctbb: 0, ctb: 9.0 / 5.0, ctba: 32.0, pih: 'F', coi: 0, pil: 'F', pmh: 'C', com: -100, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'en-US' },
        'R': { c: 'Temperature', n: 'Rankine', ps: '\u00b0R', ctbb: 0, ctb: 9.0 / 5.0, ctba: 491.67, pih: 'R', coi: 0, pil: 'R', pmh: 'C', com: 0, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'en-US' },
        '\u00B0R': { c: 'Temperature', n: 'Rankine', ps: '\u00b0R', ctbb: 0, ctb: 9.0 / 5.0, ctba: 491.67, pih: 'R', coi: 0, pil: 'R', pmh: 'C', com: 0, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'en-US' },
        '\u00B0 R': { c: 'Temperature', n: 'Rankine', ps: '\u00b0R', ctbb: 0, ctb: 9.0 / 5.0, ctba: 491.67, pih: 'R', coi: 0, pil: 'R', pmh: 'C', com: 0, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'en-US' },
        '&#176;R': { c: 'Temperature', n: 'Rankine', ps: '\u00b0R', ctbb: 0, ctb: 9.0 / 5.0, ctba: 491.67, pih: 'R', coi: 0, pil: 'R', pmh: 'C', com: 0, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'en-US' },
        '&#176; R': { c: 'Temperature', n: 'Rankine', ps: '\u00b0R', ctbb: 0, ctb: 9.0 / 5.0, ctba: 491.67, pih: 'R', coi: 0, pil: 'R', pmh: 'C', com: 0, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'en-US' },
        '&#xb0;R': { c: 'Temperature', n: 'Rankine', ps: '\u00b0R', ctbb: 0, ctb: 9.0 / 5.0, ctba: 491.67, pih: 'R', coi: 0, pil: 'R', pmh: 'C', com: 0, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'en-US' },
        '&#xb0; R': { c: 'Temperature', n: 'Rankine', ps: '\u00b0R', ctbb: 0, ctb: 9.0 / 5.0, ctba: 491.67, pih: 'R', coi: 0, pil: 'R', pmh: 'C', com: 0, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'en-US' },
        'Rankine': { c: 'Temperature', n: 'Rankine', ps: '\u00b0R', ctbb: 0, ctb: 9.0 / 5.0, ctba: 491.67, pih: 'R', coi: 0, pil: 'R', pmh: 'C', com: 0, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'en-US' },
        'degrees Rankine': { c: 'Temperature', n: 'Rankine', ps: '\u00b0R', ctbb: 0, ctb: 9.0 / 5.0, ctba: 491.67, pih: 'R', coi: 0, pil: 'R', pmh: 'C', com: 0, pml: 'K', hd: 0, cod: 100, ld: 1, nf: 'en-US' }

        // TODO: distance
        // TODO: work
        // TODO: volume
      }
    }
  );
});