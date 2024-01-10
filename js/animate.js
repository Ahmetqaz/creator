const initItem = (item) => {
  item.classList.add("animated");
  item.style.animationDuration = item.dataset["animate-duration"];
};
const resetItem = (item) => {
  item.classList.remove("animated");
  item.style = "";
};

const animate = ({
  observedElementsSelector = "footer, section",
  animationElementsSelector = ".animate",
  options = {
    rootMargin: "100px",
    threshold: 0.1,
  },
} = {}) => {
  const animateObservers = document.querySelectorAll(observedElementsSelector);

  const removeAnimations = (targetSection) => {
    const animateElements = targetSection.querySelectorAll(
      animationElementsSelector
    );
    animateElements.forEach((element) => {
      resetItem(element);
    });
  };
  const addAnimations = (targetSection) => {
    const animateElements = targetSection.querySelectorAll(
      animationElementsSelector
    );
    animateElements.forEach((element) => {
      initItem(element);
    });
  };

  const callback = function (entries, observer) {
    entries.forEach((entry) => {
      const targetSection = entry.target;

      if (
        !entry.isIntersecting &&
        !entry.isVisible &&
        targetSection.classList.contains("js-animate-observer")
      ) {
        targetSection.classList.remove("js-animate-observer");
        removeAnimations(targetSection);
      } else if (entry.isIntersecting) {
        targetSection.classList.add("js-animate-observer");
        addAnimations(targetSection);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  animateObservers.forEach((target) => {
    observer.observe(target);
  });
};

animate();
