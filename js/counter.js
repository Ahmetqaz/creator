if (document.registerElement) document.registerElement("count-n");
const counters = document.querySelectorAll("count-n");

const initCounters = ({ duration = 3 } = {}) => {
  const getValue = (target) => {
    let innerText = target.innerText
      ? target.innerText.replaceAll(",", "")
      : "";
    let value = innerText && parseInt(innerText) ? parseInt(innerText) : null;

    value = !!value && value !== NaN ? value : null;
    return value;
  };

  const renderNumber = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const bindCountAnimation = ({ target, duration }) => {
    let currentValue = 0;
    let value = getValue(target);
    if (!value) return;

    target.innerText = 0;

    let start, previousTimeStamp;
    let xPerMS = value / (1000 * duration);

    const count = (timeStamp) => {
      if (target.dataset.done !== undefined) {
        console.log("return");
        return;
      }
      if (start === undefined) {
        start = timeStamp;
      }
      const elapsed = timeStamp - start;

      if (previousTimeStamp !== timeStamp) {
        currentValue = Math.floor(elapsed * xPerMS);
        currentValue = currentValue > value ? value : currentValue;
        target.innerText = renderNumber(currentValue);
      }

      if (currentValue === value) {
        target.dataset.done = true;
        if (target.dataset.plus !== undefined) {
          target.innerText = `${renderNumber(currentValue)}+`;
        }
        return;
      }
      if (elapsed <= duration * 1000) {
        previousTimeStamp = timeStamp;
        window.requestAnimationFrame(count);
      }
    };
    target.count = () => window.requestAnimationFrame(count);
  };

  counters.forEach((target) => {
    bindCountAnimation({
      target,
      duration,
    });
  });
};
initCounters();
