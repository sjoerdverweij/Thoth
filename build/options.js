const saveOptions=()=>{var e="true"==document.getElementById("assumeImperial").value,t="true"==document.getElementById("toImperial").value,d=document.getElementById("addOtherSystem").checked,m=document.getElementById("highlight").checked,o=document.getElementById("showPopup").checked;chrome.storage.local.set({assumeImperial:e,toImperial:t,addOtherSystem:d,highlight:m,showPopup:o},()=>{const e=document.getElementById("status");e.innerHTML="Options saved.",setTimeout(()=>{e.innerHTML="&nbsp;"},3e3)})},restoreOptions=()=>{chrome.storage.local.get({assumeImperial:!0,toImperial:!1,addOtherSystem:!0,highlight:!0,showPopup:!0},e=>{document.getElementById("assumeImperial").value=e.assumeImperial,document.getElementById("toImperial").value=e.toImperial,document.getElementById("addOtherSystem").checked=e.addOtherSystem,document.getElementById("highlight").checked=e.highlight,document.getElementById("showPopup").checked=e.showPopup})};document.addEventListener("DOMContentLoaded",restoreOptions),document.getElementById("save").addEventListener("click",saveOptions);