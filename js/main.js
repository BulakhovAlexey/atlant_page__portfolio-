let volumeButtons = document.querySelectorAll(".volume_item_btn");
volumeButtons.forEach((btn, index) => {
  btn.onclick = function () {
    document.querySelector(".volume__inner .active").classList.remove("active");
    this.classList.add("active");
    document.querySelector(
      ".volume__image"
    ).style.background = `url(../img/${index}.png) no-repeat center`;
    document.querySelector(".volume__image").style.backgroundSize = "contain";
  };
});
// slider
const swiper = new Swiper(".swiper", {
  speed: 1000,
  initialSlide: 2,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  effect: "cards",
  cardsEffect: {
    perSlideOffset: 7,
    slideShadows: false,
    rotate: false,
    perSlideRotate: 0,
  },
});
let questionBtns = document.querySelectorAll(".questions_block__link");
questionBtns.forEach((btn, indexBtn) => {
  btn.onclick = function () {
    document
      .querySelector(".questions_block__link_active")
      .classList.remove("questions_block__link_active");
    this.classList.add("questions_block__link_active");
    document.querySelector(".answer_active").classList.remove("answer_active");
    document
      .getElementById(`answer_${indexBtn}`)
      .classList.add("answer_active");
  };
});

// валидация номера телефона
function validateUserPhone(phone) {
  let reg = /^[a-z0-9_-]{3,16}$/;
  return reg.test(String(phone));
}
let inputs = document.querySelectorAll(".js-input");
let form = document.querySelector(".form_input");
let userName = document.getElementById("userName");
let userPhone = document.getElementById("userPhone");

// обработка сабмита
form.onsubmit = function () {
  let userNameVal = document.getElementById("userName").value;
  let userPhoneVal = document.getElementById("userPhone").value;
  let emptyInputs = Array.from(inputs).filter((input) => input.value === "");
  inputs.forEach((input) => {
    if (input.value == "") {
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  });
  if (emptyInputs.length !== 0) {
    return false;
  }
  if (!validateUserName(userNameVal)) {
    userName.classList.add("error");
    return false;
  } else {
    userName.classList.remove("error");
  }
  if (!validateUserPhone(userPhoneVal)) {
    userPhone.classList.add("error");
    return false;
  } else {
    userPhone.classList.remove("error");
  }
  return true;
};

// скрол к ссылкам
(function () {
  const smoothScroll = function (targetEl, duration) {
    let target = document.querySelector(targetEl);
    let targetPosition = target.getBoundingClientRect().top;
    let startPosition = window.pageYOffset;
    let startTime = null;

    const ease = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };
    const animation = function (currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  };
  const scrollTo = function () {
    const links = document.querySelectorAll(".js-scroll");
    links.forEach((each) => {
      each.addEventListener("click", function () {
        const currentTarget = this.getAttribute("href");
        smoothScroll(currentTarget, 2000);
      });
    });
  };
  scrollTo();
})();
