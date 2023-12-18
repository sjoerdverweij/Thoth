// text match, class, name, pref suffix, convert to baseline add before, conv to baseline factor, convert to baseline add after, pref imp high, cutoff imp, pref imp low,
// pref metric high, cutoff metric, pref metric low, high dec, cutoff dec, low dec, number format culture
chrome.runtime.onInstalled.addListener(function () {
  // TODO: add category so all can be shown in popups.
  chrome.storage.local.set(
    {
      assumeImperial: true,
      toImperial: true,
      addOtherSystem: true,
      highlight: true,
      showPopup: true,
      // NOTE: keep units with the same name together
      units: {
        'g': { c: 'Weight', n: 'Gram', ps: 'g', ctbb: 0, ctb: 1.0, ctba: 0, pih: 'oz', coi: 0, pil: 'oz', pmh: 'g', com: 0, pml: 'g', hd: 0, cod: 10, ld: 1, nf: 'nl-NL' },
        'gram': { c: 'Weight', n: 'Gram', ps: 'g', ctbb: 0, ctb: 1.0, ctba: 0, pih: 'oz', coi: 0, pil: 'oz', pmh: 'g', com: 0, pml: 'g', hd: 0, cod: 10, ld: 1, nf: 'nl-NL' },
        'grams': { c: 'Weight', n: 'Gram', ps: 'g', ctbb: 0, ctb: 1.0, ctba: 0, pih: 'oz', coi: 0, pil: 'oz', pmh: 'g', com: 0, pml: 'g', hd: 0, cod: 10, ld: 1, nf: 'nl-NL' },
        'oz': { c: 'Weight', n: 'Ounce', ps: 'oz', ctbb: 0, ctb: 1.0 / 28.3495, ctba: 0, pih: 'oz', coi: 0, pil: 'oz', pmh: 'g', com: 0, pml: 'g', hd: 0, cod: 10, ld: 1, nf: 'en-US' },
        'ounce': { c: 'Weight', n: 'Ounce', ps: 'oz', ctbb: 0, ctb: 1.0 / 28.3495, ctba: 0, pih: 'oz', coi: 0, pil: 'oz', pmh: 'g', com: 0, pml: 'g', hd: 0, cod: 10, ld: 1, nf: 'en-US' },
        'ounces': { c: 'Weight', n: 'Ounce', ps: 'oz', ctbb: 0, ctb: 1.0 / 28.3495, ctba: 0, pih: 'oz', coi: 0, pil: 'oz', pmh: 'g', com: 0, pml: 'g', hd: 0, cod: 10, ld: 1, nf: 'en-US' },
        'kg': { c: 'Weight', n: 'Kilogram', ps: 'kg', ctbb: 0, ctb: 0.001, ctba: 0, pih: 'lb', coi: 0, pil: 'lb', pmh: 'kg', com: 0, pml: 'kg', hd: 0, cod: 10, ld: 1, nf: 'nl-NL' },
        'kilogram': { c: 'Weight', n: 'Kilogram', ps: 'kg', ctbb: 0, ctb: 0.001, ctba: 0, pih: 'lb', coi: 0, pil: 'lb', pmh: 'kg', com: 0, pml: 'kg', hd: 0, cod: 10, ld: 1, nf: 'nl-NL' },
        'kilograms': { c: 'Weight', n: 'Kilogram', ps: 'kg', ctbb: 0, ctb: 0.001, ctba: 0, pih: 'lb', coi: 0, pil: 'lb', pmh: 'kg', com: 0, pml: 'kg', hd: 0, cod: 10, ld: 1, nf: 'nl-NL' },
        'lb': { c: 'Weight', n: 'Pound', ps: 'lb', ctbb: 0, ctb: 1.0 / 453.592, ctba: 0, pih: 'lb', coi: 0, pil: 'lb', pmh: 'kg', com: 0, pml: 'lb', hd: 0, cod: 10, ld: 1, nf: 'en-US' },
        'metric tons': { c: 'Weight', n: 'Metric ton', ps: ' tons', ctbb: 0, ctb: 0.000001, ctba: 0, pih: 'ton', coi: 0, pil: 'ton', pmh: 'metric ton', com: 0, pml: 'metric ton', hd: 0, cod: 10, ld: 1, nf: 'nl-NL' },
        'tonne': { c: 'Weight', n: 'Short ton', ps: ' tons', ctbb: 0, ctb: 0.000001, ctba: 0, pih: 'ton', coi: 0, pil: 'ton', pmh: 'metric ton', com: 0, pml: 'metric ton', hd: 0, cod: 10, ld: 1, nf: 'nl-NL' },
        'ton': { c: 'Weight', n: 'Short ton', ps: ' tons', ctbb: 0, ctb: 1.0 / 907185, ctba: 0, pih: 'ton', coi: 0, pil: 'ton', pmh: 'metric ton', com: 0, pml: 'metric ton', hd: 0, cod: 10, ld: 1, nf: 'en-US' },
        'long tons': { c: 'Weight', n: 'Long ton', ps: ' long tons', ctbb: 0, ctb: 1.0 / 1016046.9, ctba: 0, pih: 'ton', coi: 0, pil: 'ton', pmh: 'metric ton', com: 0, pml: 'metric ton', hd: 0, cod: 10, ld: 1, nf: 'en-US' },
      }
    }
  );
});