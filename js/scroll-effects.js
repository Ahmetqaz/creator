document.addEventListener("DOMContentLoaded", () => {
  var controller = new ScrollMagic.Controller();

  /// toggle class on scroll
  const scrollTogglers = document.querySelectorAll(
    '[data-event="scroll-toggle"]'
  );
  new ScrollMagic.Scene({
    triggerElement: "#choose",
    duration: "180%",
    offset: 0,
    triggerHook: 0.1,
  })
    .setPin("#choose")
    .addTo(controller)
    // .addIndicators() // add indicators (requires plugin)
    .on("progress", function (e) {
      let length = scrollTogglers.length - 1; // -1 => remove placeholder
      let progress = e.progress;
      let progressPerItem = 1 / length;
      let activeItem =
        parseInt(progress / progressPerItem) === length
          ? length - 1
          : parseInt(progress / progressPerItem);
      activeItem += 1; // ignore placehlder
      scrollTogglers.forEach((item, index) => {
        item.classList.toggle("prev", index === activeItem - 1);
        item.classList.toggle("active", index === activeItem);
      });
    });

  document.querySelectorAll(".parallaxWrapper").forEach((parallaxWrapper) => {
    const layers = parallaxWrapper.querySelectorAll(".parallaxLayer");
    let tween = new TimelineMax().add(
      Array.from(layers).map((parallaxLayer) =>
        TweenMax.fromTo(
          parallaxLayer,
          2,
          {
            y: `${parallaxLayer.dataset.yoffset ?? 0}%`,
            x: `${parallaxLayer.dataset.xoffset ?? 0}%`,
          },
          {
            y: `-${parallaxLayer.dataset.yoffset ?? 0}%`,
            x: `-${parallaxLayer.dataset.xoffset ?? 0}%`,
          },
          "-=2"
        )
      )
    );
    new ScrollMagic.Scene({
      triggerElement: parallaxWrapper,
      duration: "170%",
      offset: 100,
      offsetHook: 0,
    })
      .setTween(tween)
      //   .addIndicators() // add indicators (requires plugin)
      .addTo(controller);
  });
});
