// Introducing the fruits

gsap.from("h2", {
  duration: 1.5,
  opacity: 0,
  // y: () => -50,
  // ease: 'bounce.out',
  scaleY: 0.55,
  scaleX: 0.65,
})

gsap.from(".fruit", {
  duration: 2,
  delay: 0.75,
  opacity: 0,
  y: () => Math.random() * -300,
  stagger: 0.25,
  ease: 'bounce.out',

  scaleY: 0.75,
  scaleX: 0.85,
})
;

// constants
const defaultOpacity = 0.5;

const kiwi = document.getElementById("kiwi")
const starfruit = document.getElementById("starfruit")
const pitahaya = document.getElementById("pitahaya")
const orange = document.getElementById("orange")

// create a new timeline in a paused state
var tl = new TimelineMax({ paused: true });

kiwi.addEventListener("mouseover", () => squeeze('kiwi'));
starfruit.addEventListener("mouseover", () => squeeze('starfruit'));
pitahaya.addEventListener("mouseover", () => squeeze('pitahaya'));
orange.addEventListener("mouseover", () => squeeze('orange'));

kiwi.addEventListener("click", () => shake('kiwi'));
starfruit.addEventListener("click", () => shake('starfruit'));
pitahaya.addEventListener("click", () => shake('pitahaya'));
orange.addEventListener("click", () => shake('orange'));

const spin = () => {
  TweenMax.set("#starfruit", {
    transformOrigin: "50% 50%",        // make transform origin be center for x and y axis
    opacity: 1,
  });
  // scale element to 100%
  TweenMax.to("#starfruit", 2, {
    rotation: "+=360",
    ease: 'bounce',
    opacity: defaultOpacity,
  })
}

const bounce = (fruitName) => {
  // set the initial scale and rotation to 0
  // and the transform-origin 50% 50%
  TweenMax.set(`#${fruitName}`, {
    transformOrigin: "50% 50%",        // make transform origin be center for x and y axis
    opacity: 1,
  });

  TweenMax.from(`#${fruitName}`, 0.4, {
    scaleY: 0.75,
    scaleX: 0.85,
  })
  TweenMax.to(`#${fruitName}`, 1.5, {
    scaleY: 1,
    scaleX: 1,
    opacity: defaultOpacity,
  })

    .play();
}

const shake = (fruitName) => {
  TweenMax.set(`#${fruitName}`, {
    transformOrigin: "50% 50%",        // make transform origin be center for x and y axis
  });

  TweenMax.from(`#${fruitName}`, 0.1, {
    y: -30,
    yoyo: true,
    repeat: 6,
    scale: 1.15,
  })
}

const squeeze = (fruitName) => {
  TweenMax.set(`#${fruitName}`, {
    transformOrigin: "50% 50%",        // make transform origin be center for x and y axis
    opacity: 1,
  });

  TweenMax.from(`#${fruitName}`, 0.25, {
    scale: 1.1
  })
  TweenMax.to(`#${fruitName}`, 0.5, {
    rotation: "+=360",
    scale: 1
  })
}