var element = null;
function getOffsetTop(nodeElement) {
  if (!nodeElement) return null;

  let parent = nodeElement;
  let parentNodeName = parent.nodeName ? parent.nodeName.toUpperCase() : null;
  let offsetTop = 0;

  if (!parentNodeName || offsetTop === undefined) return null;

  while (parentNodeName !== null && parentNodeName !== "BODY") {
    parent = parent.parentElement;
    parentNodeName = parent.nodeName ? parent.nodeName.toUpperCase() : null;
    offsetTop += parent.offsetTop;
  }
  return offsetTop;
}
function getComputedHeight(nodeElement) {
  if (!nodeElement) return null;
  element = nodeElement;
  let computedStyle = window.getComputedStyle(nodeElement);
  return parseInt(computedStyle.height);
}

function ScrollProgress({
  scrollProgressEl,
  scrollProgressRangeEl,
  scrollProgressItem,
  screenOffset = 270,
  refreshOffset = 100,
}) {
  var isRunning = false;
  const wrapper =
    typeof scrollProgressEl === "string"
      ? document.querySelector(scrollProgressEl)
      : scrollProgressEl;
  const items = wrapper.querySelectorAll(scrollProgressItem);
  const scaleProgressRange = wrapper.querySelector(scrollProgressRangeEl);

  if (!wrapper || !items) return;

  // funtcions
  const init = () => {
    if (isRunning) return;
    isRunning = true;

    resetState();
    window.addEventListener("scroll", () => {
      let windowOffset = window.pageYOffset;
      let wrapperOffset = getOffsetTop(wrapper);
      let wrapperHeight = getComputedHeight(wrapper);

      if (
        windowOffset >= wrapperOffset - refreshOffset &&
        windowOffset < wrapperOffset + wrapperHeight + refreshOffset
      )
        resetState(wrapperOffset);
    });
  };
  const setProgress = (scrollProgressItem, state) => {
    if (!scrollProgressItem) return;
    scrollProgressItem.classList.remove("done");
    scrollProgressItem.classList.remove("active");
    scrollProgressItem.classList.remove("_");
    scrollProgressItem.classList.add(state);
  };
  const resetState = (wrapperOffset) => {
    let topOffset = window.pageYOffset + screenOffset;
    console.log("refresh");
    if (scaleProgressRange) {
      let wrapperHeight = getComputedHeight(wrapper);
      let currentScrolledDistance = topOffset - wrapperOffset;
      let percent = (100 / wrapperHeight) * currentScrolledDistance;
      percent = 100 - percent > 100 ? 100 : 100 - percent;
      scaleProgressRange.style.height = percent ? `${percent}%` : "";
    }

    items.forEach((element) => {
      let elementOffset = wrapperOffset + element.offsetTop;
      let elementHeight = getComputedHeight(element);

      if (elementOffset + elementHeight <= topOffset) {
        setProgress(element, "done");
      } else if (elementOffset <= topOffset) {
        setProgress(element, "active");
      } else setProgress(element, "_");
    });
  };

  let options = {
    root: document.querySelector(".main"),
    rootMargin: "300px",
    threshold: 0,
  };

  let observer = new IntersectionObserver(() => {
    let computedStyle = window.getComputedStyle(wrapper);
    if (!parseInt(computedStyle.height)) return;

    init();
  }, options);
  observer.observe(wrapper);
}
