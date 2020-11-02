window.addEventListener('DOMContentLoaded', function (e) {
  var presentation = document.querySelector('hp-presentation')
  
  presentation.onclick = handlePresentationClick;
  presentation.addEventListener('animationend', handleAnimationEnd, false);
});


/* The nextElementSibling property returns the element
 * immediately following the specified element, in the same tree level. */

function handlePresentationClick(e) {
  var current = document.querySelector('hp-slide.active');
  var next = current.nextElementSibling;

function handleAnimationEnd(e) {
  console.log(e);
}

  /* Manipulating the DOM directly is quite brave.
   * It doesn't hurt to assure that you switch to
   * the righ element :)
   * (According to W. Scott Means, especially larger companies are pecky about this.)
   */
  while(next && next.tagName != 'HP-SLIDE') {
    next = next.nextElementSibling;
  }

  if(next) {
    current.classList.remove('active');
    next.classList.add('active');
  }

  var autoAdvance = parseInt(next.getAttribute('data-autoadvance'));

  if(!isNaN(autoAdvance)) {
    setTimeout(function (e) {
      handlePresentationClick(e);
    }, autoAdvance);
  }
}