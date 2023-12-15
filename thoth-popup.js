function showThothPopup(event, thothSpan, originalString, className, valueInBaseUnits) {
  event.stopPropagation(); // don't let the body handler hide it again immediately
  const thothPopupElement = document.getElementById('thoth-popup');
  const thothSpanClientRect = thothSpan.getBoundingClientRect();
  const originalElement = document.getElementById('thoth-original');
  originalElement.innerHTML = '"' + originalString + '"';
  const thothList = document.getElementById('thoth-all-units');
  thothList.innerHTML = '<ul>test</ul>';

  // Cutoff -- no modification to the popup should happen after this

  thothPopupElement.style.top = (thothSpanClientRect.bottom + window.scrollY) + 'px';
  thothPopupElement.style.left = thothSpanClientRect.left + 'px';
  thothPopupElement.style.display = 'block';

//  var targetUnit = to
//  window.alert(thothList.outerHTMLS);
}

function hideThothPopup() {
  const thothPopupElement = document.getElementById('thoth-popup');
  thothPopupElement.style.display = 'none';
}
