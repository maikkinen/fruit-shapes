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

    next.querySelectorAll('.match').forEach(function (el) {
      setTimeout(function () { el.classList.remove('match'); }, 0);
    });

    var aa = parseInt(next.getAttribute('data-autoadvance'));

    if (!isNaN(aa)) {
      setTimeout(function (e) {
        handlePresentationClick(e);
      }, aa);
    }

    // getAttribute refers to DOM elements' attributes.
    // osa stands for on show animation
    var osa = next.getAttribute('data-onshow');
    if (osa) {
      window[osa]();
    }
  }
}

function handleAnimationEnd(e) {
  var slide = e.target.closest('hp-slide');
  /* 'closest' is a function that walks up the parent chain in the DOM 
   * and looks for the closest parent element that has the tag
   * that matches to the function's parameter.
   */
  var aa = slide.getAttribute('data-autoadvance');

  if (aa == 'animationend' && slide.classList.contains('active')) {
    handlePresentationClick(e);
  }
}

function setLearnImage(imageName) {
   //goes down the element tree and looks for the param
  var img = document.querySelector('hp-slide.active hp-learn img');

  if (img) { //changes the img element's src image :) 
    img.src = 'images/' + imageName + '.svg';
  }
}

var shapes = ['Starfruit', 'Kiwi', 'Pitahaya', 'Orange'];

function showLearning() {
  var ii = Math.floor(Math.random() * shapes.length);
  setLearnImage(shapes[ii]);

  var slide = document.querySelector('hp-slide.active');
  slide.classList.remove('learn-yes');
  slide.classList.remove('learn-no');
  slide.classList.add(ii ? 'learn-no' : 'learn-yes'); //zero is 'falsy'!
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
  startLearning(1500);
}

function animateSVGStep() {
  var slide = document.querySelector('hp-slide.active');

  var svgs = slide.querySelectorAll('svg');

  if (svgs[0].children.length > 0) {
    var el = svgs[0].children[0];

    if (el) {
      svgs[1].appendChild(el.parentNode.removeChild(el));
    }

    return true;
  }

  return false;
}

function animateSVG() {
  if (animateSVGStep()) {
    setTimeout(animateSVG, 600);
  }
}
