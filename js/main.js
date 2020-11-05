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
  while (next && next.tagName != 'HP-SLIDE') { //yes, all-caps is the correct format for the DOM
    next = next.nextElementSibling;
  }

  if (next) {
    current.classList.remove('active');
    next.classList.add('active');
  }

  next.querySelectorAll('.match').forEach(function (el) {
    setTimeout(function () { el.classList.remove('match'); }, 0);
  })
  var autoAdvance = parseInt(next.getAttribute('data-autoadvance'));

  if (!isNaN(autoAdvance)) {
    setTimeout(function (e) {
      handlePresentationClick(e);
    }, autoAdvance);
  }

  // getAttribute refers to DOM elementsä attributes.
  var onShowAnimation = next.getAttribute('data-onshow')

  if (onShowAnimation) {
    window[onShowAnimation]();
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

function setLearnImage(imageName) {

  var img = document.querySelector('hp-slide.active hp-learn img ') //goes down the element tree and looks for the param

  img.src = 'images/' + imageName + '.svg' //changes the img element's src image :) 
}

var shapes = ['circle', 'diamond', 'triangle', 'square']

function showLearning() {
  var imageIndex = Math.floor(Math.random() * shapes.length);
  setLearnImage(shapes[imageIndex])


  // this syntax doesn't apply any new css styles to the
  // yes/no text - those stay hidden, what so ever.
  // Is the hp-slide the correct place to be? Should we remove
  // the names from the hp-learn level?
  var slide = document.querySelector('hp-slide.active');
  slide.classList.remove('learn-yes');
  slide.classList.remove('learn-no');
  slide.classList.add(imageIndex ? 'learn-no' : 'learn-yes'); //zero is 'falsy'!
  //By adding classNames to the classlist, we can dynamically change
  //what css rules apply to the element.
}

function startLearning(learningDelay) {
  showLearning();

  setTimeout(function () {
    if (learningDelay > 1.1) {
      showLearning();

      learningDelay = Math.pow(learningDelay, 1 / 1.05);
      startLearning(learningDelay);
    }
  }, learningDelay);
}

function runLearningSequence() {
  startLearning(1500) //milliseconds
  //showLearning();
}