window.addEventListener('DOMContentLoaded', function (e) {
  var presentation = document.querySelector('hp-presentation');

  presentation.onclick = handlePresentationClick;
  presentation.addEventListener('animationend', handleAnimationEnd, false);
});


/* The nextElementSibling property returns the element
 * immediately following the specified element, in the same tree level. */

function handlePresentationClick(e) {
  var current = document.querySelector('hp-slide.active');
  var next = current.nextElementSibling;

  /* Manipulating the DOM directly is quite brave.
   * It doesn't hurt to assure that you switch to
   * the righ element :)
   * (According to W. Scott Means, especially larger companies are pecky about this.) 
   */
  while(next && next.tagName != 'HP-SLIDE') { //yes, all-caps is the correct format for the DOM
    next = next.nextElementSibling;
  }

  if (next) {
    current.classList.remove('active');
    next.classList.add('active');
  }

  next.querySelectorAll('.match').forEach(function(el) {
    setTimetout(function () { el.classList.remove('match');}, 0);
  })
  var autoAdvance = parseInt(next.getAttribute('data-autoadvance'));

  if (!isNaN(autoAdvance)) {
    setTimeout(function (e) {
      handlePresentationClick(e);
    }, autoAdvance);
  }
}

function handleAnimationEnd(e) {
  var slide = e.target.closest('hp-slide')
  /* 'closest' is a function that walks up the parent chain in the DOM 
   * and looks for the closest parent element that has the tag
   * that matches to the function's parameter.
   */
  var autoAdvance = slide.getAttribute('data-autoadvance');

  if (autoAdvance == 'animationend' && slide.classList.contains('active')) {
    handlePresentationClick(e);
  }
}