// TODO: just lift into options.html

const saveOptions = () => {
  const assumeImperial = document.getElementById('assumeImperial').value == 'true';
  const toImperial = document.getElementById('toImperial').value == 'true';
  const addOtherSystem = document.getElementById('addOtherSystem').checked;
  const highlight = document.getElementById('highlight').checked;
  const showPopup = document.getElementById('showPopup').checked;

  chrome.storage.local.set(
    {
      assumeImperial: assumeImperial,
      toImperial: toImperial,
      addOtherSystem: addOtherSystem,
      highlight: highlight,
      showPopup: showPopup
    },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status');
      status.innerHTML = 'Options saved.';
      setTimeout(() => {
        status.innerHTML = '&nbsp;';
      }, 3000);
    }
  );
};

const restoreOptions = () => {
  chrome.storage.local.get(
    {
      assumeImperial: true,
      toImperial: false,
      addOtherSystem: true,
      highlight: true,
      showPopup: true
    },
    (items) => {
      document.getElementById('assumeImperial').value = items.assumeImperial;
      document.getElementById('toImperial').value = items.toImperial;
      document.getElementById('addOtherSystem').checked = items.addOtherSystem;
      document.getElementById('highlight').checked = items.highlight;
      document.getElementById('showPopup').checked = items.showPopup;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);