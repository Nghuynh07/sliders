"use-strict";

const slides = document.querySelectorAll(".slide");
const leftBtn = document.querySelector(".arrow-left");
const rightBtn = document.querySelector(".arrow-right");
const dotContainer = document.querySelector(".dots");
let currentSlide = 0;
const maxSlide = slides.length - 1;

const sliders = () => {
  const activeDot = (slide) => {
    const dots = document.querySelectorAll(".dots_btn");
    dots.forEach((dot) => dot.classList.remove("opacity"));
    document
      .querySelector(`.dots_btn[data-slide="${slide}"]`)
      .classList.add("opacity");
  };

  slides.forEach(
    (slide, index) => (slide.style.transform = `translateX(${100 * index}%)`)
  );

  const goToSlide = (current) => {
    slides.forEach(
      (slide, index) =>
        (slide.style.transform = `translateX(${100 * (index - current)}%)`)
    );
  };

  const nextSlide = () => {
    if (currentSlide === maxSlide) currentSlide = 0;
    else currentSlide++;
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const prevSlide = () => {
    if (currentSlide === 0) currentSlide = maxSlide;
    else currentSlide--;
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const createDots = () => {
    slides.forEach((_, index) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots_btn" data-slide="${index}"></button>`
      );
    });
  };

  const init = () => {
    createDots();
    activeDot(0);
    goToSlide(0);
  };

  init();
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") nextSlide();
    e.key === "ArrowLeft" && prevSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots_btn")) {
      const { slide } = e.target.dataset;
      activeDot(slide);
      goToSlide(slide);
    }
  });

  rightBtn.addEventListener("click", nextSlide);
  leftBtn.addEventListener("click", prevSlide);
};
sliders();
