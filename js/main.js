window.addEventListener('DOMContentLoaded', function (e) {
  document.querySelector('hp-presentation').onclick = handlePresentationClick;
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
  while(next && next.tagName != 'HP-SLIDE') {
    next = next.nextElementSibling;
  }

  if(next) {
    current.classList.remove('active');
    next.classList.add('active');
  }
}
