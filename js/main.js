var menu = document.getElementById("menu");
var menuBtn = document.getElementById("menuBtn");
var body = document.body;

const closeMenu = () => {
  menu.classList.remove("active");
  menuBtn.classList.remove("active");
  body.classList.remove("active");
};

menuBtn.onclick = function () {
  menu.classList.toggle("active");
  menuBtn.classList.toggle("active");
  body.classList.toggle("active");
};
window.onclick = function (event) {
  if (event.target == menu) {
    closeMenu();
  }
};

const header = document.getElementById("header");
if (header)
  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 400) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });
  
// const links = document.querySelectorAll(".links");
// const sections = document.querySelectorAll(".anchor");
// function changeLinkState() {
//   let index = sections.length;
//   while (--index && window.scrollY + 100 < sections[index].offsetTop) {}
//   links.forEach((link) => link.classList.remove("active"));
//   links[index]?.classList.add("active");
// }
// links.forEach((e) => {
//   onLinkClick(e);
// });
// function onLinkClick(linkItem) {
//   linkItem.addEventListener("click", function () {
//     menu.classList.remove("active");
//     menuBtn.classList.remove("active");
//     body.classList.remove("active");
//   });
// }
// function onLinkClick(linkItem) {
//   linkItem.addEventListener("click", function () {
//     menu.classList.remove("active");
//     menuBtn.classList.remove("active");
//     body.classList.remove("active");
//   });
// }
// window.onscroll = function () {
//   changeLinkState();
// };

///
///
///
///WOW JS
// new WOW().init({
//   boxClass: "wow",
// });
const tabBtn = document.querySelectorAll(".tabBtn");
const tabEvent = document.querySelectorAll(".tabEvent");
tabBtn.forEach((e) => {
  onTabClick(tabBtn, tabEvent, e);
});
function onTabClick(tabBtns, tabItems, item) {
  item.addEventListener("click", function (e) {
    let currentBtn = item;
    let tabId = currentBtn.getAttribute("data-tab");
    let currentTab = document.querySelector(tabId);
    if (currentBtn.classList.contains("active")) {
      console.log("now active");
      const faq = currentBtn.parentElement.querySelector(".tabEvent");
      if (faq) {
        faq.classList.remove("active");
        currentBtn.classList.remove("active");
      }
    } else if (!currentBtn.classList.contains("active")) {
      tabBtns.forEach(function (item) {
        item.classList.remove("active");
      });

      tabItems.forEach(function (item) {
        item.classList.remove("active");
      });
      currentBtn.classList.add("active");
      currentTab.classList.add("active");
    }
  });
}


// video ----------------
// const video = document.querySelector("#video");
// if (video) {
//   const videoButton = document.getElementById("videoButton");
//   const videoBg = document.getElementById("videoBg");
//   const videoBody = document.querySelector(".video__content");
//   let videoCondition = false;

//   const playVideo = () => {
//     video.play();
//     video.setAttribute("controls", "");
//     videoBg.classList.add("active");
//     videoButton.classList.add("_stop");
//     video.addEventListener("mouseover", function () {
//       videoButton.classList.remove("_hide");
//     });
//     video.addEventListener("mouseout", function (e) {
//       videoButton.classList.add("_hide");
//     });
//     videoButton.addEventListener("mouseover", function () {
//       videoButton.classList.remove("_hide");
//     });
//   };

//   const pauseVideo = () => {
//     video.pause();
//     videoButton.classList.remove("_stop");
//     videoButton.classList.remove("_hide");
//     videoBg.classList.remove("active");
//     video.addEventListener("mouseout", function (e) {
//       videoButton.classList.remove("_hide");
//     });
//   };

//   const videoControl = () => {
//     videoButton.onclick = () => {
//       if (videoCondition) {
//         playVideo();
//       } else {
//         pauseVideo();
//       }
//     };
//     video.addEventListener("ended", function () {
//       pauseVideo();
//       videoCondition = !videoCondition;
//     });
//   };

//   const videoTouch = () => {
//     videoControl();
//     videoBody.addEventListener("click", () => {
//       videoCondition = !videoCondition;
//       if (videoCondition) {
//         playVideo();
//       } else {
//         pauseVideo();
//       }
//     });
//   };
//   videoTouch();
// }
// video ----------------

// const copyButton = document.getElementById("copyButton");
// if (copyButton) {
//   const tooltipText = document.getElementById("tooltipText");
//   copyButton.onclick = () => {
//     var copyText = document.getElementById("copyTextarea");
//     copyText.select();
//     copyText.setSelectionRange(0, 99999);
//     navigator.clipboard.writeText(copyText.value);
//     tooltipText.innerHTML = "Copied";
//   };
// }

// counter ------------
// const amounts = document.querySelector(".amounts");
// if (amounts) {
//   const animationDuration = 2000;
//   const frameDuration = 1000 / 60;
//   const totalFrames = Math.round(animationDuration / frameDuration);
//   const easeOutQuad = (t) => t * (2 - t);
//   let isCounting = true;
//   const animateCountUp = (el) => {
//     let frame = 0;
//     const countTo = parseInt(el.getAttribute("data-count"), 10);
//     const counter = setInterval(() => {
//       frame++;
//       const progress = easeOutQuad(frame / totalFrames);
//       const currentCount = Math.round(countTo * progress);
//       if (parseInt(20, 10) !== currentCount) {
//         el.innerHTML = currentCount;
//       }
//       if (frame === totalFrames) {
//         clearInterval(counter);
//       }
//     }, frameDuration);
//   };
//   const runAnimations = () => {
//     const countupEls = document.querySelectorAll(".counter");
//     countupEls.forEach(animateCountUp);
//   };
//   const isVisible = function (elem) {
//     var bounding = elem.getBoundingClientRect();
//     return (
//       bounding.top >= 0 &&
//       bounding.left >= 0 &&
//       bounding.bottom <=
//         (window.innerHeight || document.documentElement.clientHeight) &&
//       bounding.right <=
//         (window.innerWidth || document.documentElement.clientWidth)
//     );
//   };
//   document.addEventListener("scroll", () => {
//     const visible = isVisible(amounts);
//     if (visible && isCounting) {
//       runAnimations();
//       isCounting = false;
//     }
//   });
// }
// counter ------------

// let scrollTop = document.getElementById("scrollTop");
// if (scrollTop) {
//   scrollTop.onclick = () => {
//     document.body.scrollTop = 0;
//     document.documentElement.scrollTop = 0;
//   };
// }