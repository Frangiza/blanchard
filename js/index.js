function setBurger(params) {
  const btn = document.querySelector(`.${params.btnClass}`);
  const menu = document.querySelector(`.${params.menuClass}`);

  btn.setAttribute('aria-expanded', false);

  menu.addEventListener("animationend", function () {
    if (this.classList.contains(params.hiddenClass)) {
      this.classList.remove(params.activeClass);
      this.classList.remove(params.hiddenClass);
    }
  });

  btn.addEventListener("click", function () {
    this.classList.toggle(params.activeClass);

    if (
      !menu.classList.contains(params.activeClass) &&
      !menu.classList.contains(params.hiddenClass)
    ) {
      menu.classList.add(params.activeClass);
      document.body.style.overflow = 'hidden';
      btn.setAttribute('aria-expanded', true);
    } else {
      menu.classList.add(params.hiddenClass);
      document.body.removeAttribute('style');
      btn.setAttribute('aria-expanded', false);
    }
  });
}

setBurger({
  btnClass: "burger", // класс бургера
  menuClass: "menu-wrap", // класс меню
  activeClass: "is-opened", // класс открытого состояния
  hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
});

function setSearch(params) {
  const openBtn = document.querySelector(`.${params.openBtnClass}`);
  const search = document.querySelector(`.${params.searchClass}`);
  const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

  search.addEventListener("animationend", function (evt) {
    if (this._isOpened) {
      this.classList.remove(params.activeClass);
      this.classList.remove(params.hiddenClass);
      this._isOpened = false;
    } else {
      this._isOpened = true;
    }
  });

  search.addEventListener('click', function(evt) {
    evt._isSearch = true;
  });

  openBtn.addEventListener("click", function (evt) {
    this.disabled = true;

    if (
      !search.classList.contains(params.activeClass) &&
      !search.classList.contains(params.hiddenClass)
    ) {
      search.classList.add(params.activeClass);
    }
  });

  closeBtn.addEventListener('click', function () {
    openBtn.disabled = false;
    search.classList.add(params.hiddenClass);
  });

  document.body.addEventListener('click', function (evt) {
    if (!evt._isSearch && search._isOpened) {
      openBtn.disabled = false;
      search.classList.add(params.hiddenClass);
    }
  });
}

setSearch({
  openBtnClass: "js-open-search", // класс кнопки открытия
  closeBtnClass: "js-close", // класс кнопки закрытия
  searchClass: "js-form", // класс формы поиска
  activeClass: "is-opened", // класс открытого состояния
  hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
});


window.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".bottom__item-btn").forEach(item => {
  item.addEventListener("click", function() {
    let btn = this;
    let dropdown = this.parentElement.querySelector(".bottom__dropdown");

    document.querySelectorAll(".bottom__item-btn").forEach(el => {
      if (el != btn) {
        el.classList.remove("is-active");
      }
    });

    document.querySelectorAll(".bottom__dropdown").forEach(el => {
      if (el != dropdown) {
        el.classList.remove("is-active");
      }
    })
    dropdown.classList.toggle("is-active");
    btn.classList.toggle("is-active")
  })
})

document.addEventListener("click", function(e) {
  let target = e.target;
  if (!target.closest(".bottom__list")) {
    document.querySelectorAll(".bottom__dropdown").forEach(el => {
        el.classList.remove("is-active");
    });
  }
})
})

const swiper = new Swiper('.hero-swiper', {
  allowTouchMove: false,
  loop: true,
  effect: 'fade',
  speed: 10000,
  autoplay: {
    delay: 10000
  }
});

const element = document.querySelector('select');
    const choices = new Choices(element, {
      searchEnabled: false,
      position: 'bottom',
      classNames: {
      containerOuter: 'choices header_choices',
     },
    });


document.addEventListener("DOMContentLoaded", () => {
  let gallerySlider = new Swiper(".slides-container", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,
    pagination: {
      el: ".gallery .gallery__pagination",
      type: "fraction"
    },
    navigation: {
      nextEl: ".gallery__btn-next",
      prevEl: ".gallery__btn-prev"
    },

    breakpoints: {
      441: {
        slidesPerView: 2,
        spaceBetween: 30
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }
  });
});

(() => {
  new Accordion(".catalog__accordion-container", {
    openOnInit: [0]
  });
})();

document.querySelectorAll('.js-tab-btn').forEach(function(tabsBtn){
  tabsBtn.addEventListener('click', function(e){
  const path = e.currentTarget.getAttribute('data-tabs-path');
  document.querySelectorAll('.catalog__tabs-content').forEach(function(tabsBtn){
    tabsBtn.classList.remove('catalog__tabs-content--active')});
    document.querySelector(`[data-tabs-target="${path}"]`).classList.add('catalog__tabs-content--active');
  });
});

(() => {
	const MOBILE_WIDTH = 1020;

	function getWindowWidth () {
	  return Math.max(
	    document.body.scrollWidth,
	    document.documentElement.scrollWidth,
	    document.body.offsetWidth,
	    document.documentElement.offsetWidth,
	    document.body.clientWidth,
	    document.documentElement.clientWidth
	  );
	}

	function scrollToContent (link, isMobile) {
		if (isMobile && getWindowWidth() > MOBILE_WIDTH) {
			return;
		}

	  const href = link.getAttribute('data-scroll-target');
	  const scrollTarget = document.getElementById(href);
	  const elementPosition = scrollTarget.getBoundingClientRect().top;

	  window.scrollBy({
	      top: elementPosition,
	      behavior: 'smooth'
	  });
	}

	document.querySelectorAll('.js-scroll-tab').forEach(link => {
	  link.addEventListener('click', function(e) {
	      e.preventDefault();

	      scrollToContent(this, true);
	  });
	});
})();

document.querySelectorAll('.js-scroll-link').forEach(link => {
  link.addEventListener('click', function(e) {
      e.preventDefault();

      const href = this.getAttribute('href').substring(1);
      const scrollTarget = document.getElementById(href);
      const elementPosition = scrollTarget.getBoundingClientRect().top;

      window.scrollBy({
          top: elementPosition,
          behavior: 'smooth'
      });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  let eventsSlider = new Swiper(".events__swiper", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    pagination: {
      el: ".events .events-pagination",
      clickable: true,
      type: "bullets",
    },
    navigation: {
      nextEl: ".events__btn-next",
      prevEl: ".events__btn-prev"
    },

    breakpoints: {
      635: {
        slidesPerView: 2,
        spaceBetween: 25
      },
      1024: {
        slidesPerView: 3,
        slidesPerGroup: 2,
        spaceBetween: 27
      },

      1200: {
        slidesPerView: 3,
        slidesPerGroup: 2,
        spaceBetween: 50
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },

    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  let partnersSlider = new Swiper(".projects__partners-swiper", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,
    navigation: {
      nextEl: ".projects__partners-btn-next",
      prevEl: ".projects__partners-btn-prev"
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      1024: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 50
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },

    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }
  });
});

(() => {
  tippy('.projects__tooltip-js', {
    theme: 'tooltip',
    maxWidth: 264,
  });
})()



ymaps.ready(init);
function init(){
  var myMap = new ymaps.Map("map", {
      center: [55.75846806898367,37.60108849999989],
      zoom: 13,
      controls: ['geolocationControl', 'zoomControl'],
  },
  {
    suppressMapOpenBlock: true,
    geolocationControlSize: "large",
    geolocationControlPosition:  { top: "350px", right: "20px" },
    geolocationControlFloat: 'none',
    zoomControlSize: "small",
    zoomControlFloat: "none",
    zoomControlPosition: { top: "270px", right: "20px" }
  }
  );

  myMap.behaviors.disable('scrollZoom');
  const myPlacemark = new ymaps.Placemark(
    [55.75846806898367,37.60108849999989],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "./img/map icon.svg",
      iconImageSize: [20, 20],
      iconImageOffset: [-10, -15],
    }
  );

  myMap.geoObjects.add(myPlacemark);
}

const form = document.querySelector('.contacts__form');
const telSelector = form.querySelector('input[type="tel"]');
const inputMask = new Inputmask('+7 (999) 999-99-99');
inputMask.mask(telSelector);

const validation = new JustValidate('.contacts__form',
{
  errorFieldCssClass: 'is-invalid',
  errorFieldStyle: {
    border: '1px solid rgb(209, 22, 22)',
  },
  errorLabelCssClass: 'is-label-invalid',
  errorLabelStyle: {
    color: '#D11616',
  },
},
);

validation
  .addField('.contacts__input-name', [
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Введите от 2 до 30 букв'
    },
    {
      rule: 'maxLength',
      value: 30,
    },
    {
      rule: 'required',
      value: true,
      errorMessage: 'Введите имя'
    }
  ])
  .addField('.contacts__input-tel', [
    {
      rule: 'required',
      value: true,
      errorMessage: 'Введите телефон',
    },
    {
      rule: 'function',
      validator: function() {
        const phone = telSelector.inputmask.unmaskedvalue();
        return phone.length === 10;
      },
      errorMessage: 'Введите корректный телефон',
    },
  ])

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => console.log("Form successfully submitted"))
      .catch((error) => console.log('Sending form failed'));

    e.target.reset();

  });
