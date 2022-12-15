// появление стартовой картинки
window.onload = () => {
  setTimeout(startBlockOnLoad, "500");
};
function startBlockOnLoad() {
  document.querySelector(".bg_image").classList.add("start_block_active");
  document
    .querySelector(".delivery_block__inner")
    .classList.add("start_block_active");
}
// плавный скрол к ссылкам
(function () {
  const smoothScroll = function (targetEl, duration) {
    let headerElHeight = document.querySelector(".header").clientHeight;
    let target = document.querySelector(targetEl);
    let targetPosition = target.getBoundingClientRect().top - headerElHeight;
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
        smoothScroll(currentTarget, 1000);
      });
    });
  };
  scrollTo();
})();

// изменение картинки в блоке Volume
let volumeButtons = document.querySelectorAll(".volume_item_btn");
volumeButtons.forEach((btn, index) => {
  btn.onclick = function () {
    document.querySelector(".volume__inner .active").classList.remove("active");
    this.classList.add("active");
    document.querySelector(
      ".volume__image"
    ).style.background = `url(img/${index}.png) no-repeat center`;
    document.querySelector(".volume__image").style.backgroundSize = "contain";
  };
});

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

//анимация блока callback
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

// Функция валидации номера телефона
function validateUserPhone(phone) {
  let reg = /^[a-z0-9_-]{3,16}$/;
  return reg.test(String(phone));
}

// функция проверки на пустые поля и валидный номер телефона
function validateEmptyFields(inputClassName, userPhoneIdName) {
  let formInputs = document.querySelectorAll(inputClassName);
  let userPhoneVal = document.getElementById(userPhoneIdName).value;
  let emptyInputs = Array.from(formInputs).filter(
    (input) => input.value === ""
  );
  formInputs.forEach((input) => {
    input.value = input.value.trim();
    if (input.value == "") {
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  });
  if (emptyInputs.length !== 0) {
    return false;
  }
  if (!validateUserPhone(userPhoneVal)) {
    userPhone.classList.add("error");
    return false;
  } else {
    userPhone.classList.remove("error");
  }
  return true;
}

// обработка сабмита form1
let form1 = document.querySelector(".form_input");
let thankYou = document.getElementById("popup_thankYou");
form1.onsubmit = function (e) {
  e.preventDefault();
  if (!validateEmptyFields(".js-input", "userPhone")) {
    return false;
  } else {
    thankYou.classList.add("active_thankYou");
    return true;
  }
};

// обработка сабмита form2
let form2 = document.querySelector(".popup_form_input");
form2.onsubmit = function (e) {
  e.preventDefault();
  if (!validateEmptyFields(".popup-input", "CallBackUserPhone")) {
    return false;
  } else {
    thankYou.classList.add("active_thankYou");
    return true;
  }
};

// закрытие окна спасибо
let backBtn = document.querySelector(".backBtn");
backBtn.addEventListener("click", () => {
  thankYou.classList.remove("active_thankYou");
});

// добавление класса группе элементов
function addClass(el, className) {
  let items = document.querySelectorAll(el);
  items.forEach((item) => {
    item.classList.add(className);
  });
}
// функция появления логотипов
function addLogos() {
  setInterval(addClass, "100", ".start_first", "unHide");
  setInterval(addClass, "600", ".start_second", "unHide");
  setInterval(addClass, "1000", ".start_third", "unHide");
}
// событие появления логотипов
let headerElHeight = document.querySelector(".header").clientHeight;
window.addEventListener("scroll", () => {
  let start = document.querySelector(".callback_block");
  if (
    window.pageYOffset + start.getBoundingClientRect().top - headerElHeight <
    window.pageYOffset
  ) {
    addLogos();
  }
});
