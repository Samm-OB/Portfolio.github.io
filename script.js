
  const toggleBtn = document.getElementById('toggle-dark-mode');

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Optionally store the user's choice in localStorage
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDark);
});

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// Scroll reveal animation
const scrollElements = document.querySelectorAll(".scroll-reveal");

const elementInView = (el, offset = 100) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= window.innerHeight - offset;
};

const displayScrollElement = (el) => {
  el.classList.add("scrolled");
};

const hideScrollElement = (el) => {
  el.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 100)) {
      displayScrollElement(el);
    } else {
      hideScrollElement(el);
    }
  })
  };

// Back to top button
const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (backToTop) {
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

window.addEventListener("scroll", handleScrollAnimation);

// Back to Top
const backToTopBtn = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


function showComingSoon() {
      const el = document.getElementById("comingSoonPage");
      if(el){
        el.style.display = "flex";
      }
      window.scrollTo(0,0);
    }

    function hideComingSoon() {
      const el = document.getElementById("comingSoonPage");
      if (el) {
        el.style.display = "none";
      }
    }

// Load preference on page load
  if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark-mode');
}


  (function () {
    var emojiSettings = {
      supports: {
        everything: true,
        everythingExceptFlag: true,
      },
      url: "https://s.w.org/images/core/emoji/15.0.3/svg/",
      DOMReady: false,
      readyCallback: function () {
        emojiSettings.DOMReady = true;
      },
    };

    var emojiList = {
      flag: "🇳🇬",
      smile: "😊",
    };

    function cacheSupport(result) {
      sessionStorage.setItem(
        "emojiSupport",
        JSON.stringify({
          timestamp: new Date().valueOf(),
          supportTests: result,
        })
      );
    }

    function canvasSupport() {
      try {
        var canvas = document.createElement("canvas");
        return !!(canvas.getContext && canvas.getContext("2d"));
      } catch (e) {
        return false;
      }
    }

    function pixelCheck(ctx, emoji) {
      ctx.clearRect(0, 0, 16, 16);
      ctx.fillText(emoji, 0, 16);
      var pixels = ctx.getImageData(0, 0, 16, 16).data;
      for (var i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] !== 0) return true;
      }
      return false;
    }

    function testEmojiSupport(list, canvasFn, pixelFn) {
      var support = {};
      if (!canvasFn()) return support;
      var canvas = document.createElement("canvas");
      canvas.width = canvas.height = 16;
      var ctx = canvas.getContext("2d");
      ctx.textBaseline = "top";
      ctx.font = "16px Arial";

      for (var key in list) {
        support[key] = pixelFn(ctx, list[key]);
      }

      return support;
    }
const swiper = new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    })


    new Promise(function (resolve) {
      var cached = null;
      try {
        var item = JSON.parse(sessionStorage.getItem("emojiSupport"));
        if (
          item &&
          typeof item.timestamp === "number" &&
          new Date().valueOf() < item.timestamp + 604800 &&
          typeof item.supportTests === "object"
        ) {
          cached = item.supportTests;
        }
      } catch (e) {}

      if (!cached) {
        if (
          typeof Worker !== "undefined" &&
          typeof OffscreenCanvas !== "undefined"
        ) {
          try {
            var blob = new Blob([
              "onmessage=function(e){postMessage((" +
                testEmojiSupport.toString() +
                ")(" +
                JSON.stringify(emojiList) +
                "," +
                canvasSupport.toString() +
                "," +
                pixelCheck.toString() +
                "))}",
            ]);
            var worker = new Worker(URL.createObjectURL(blob));
            worker.onmessage = function (e) {
              cacheSupport(e.data);
              worker.terminate();
              resolve(e.data);
            };
            return;
          } catch (e) {}
        }
        cached = testEmojiSupport(emojiList, canvasSupport, pixelCheck);
        cacheSupport(cached);
      }

      resolve(cached);
    }).then(function (results) {
      for (var key in results) {
        emojiSettings.supports[key] = results[key];
        emojiSettings.supports.everything =
          emojiSettings.supports.everything && results[key];
        if (key !== "flag") {
          emojiSettings.supports.everythingExceptFlag =
            emojiSettings.supports.everythingExceptFlag && results[key];
        }
      }

      emojiSettings.supports.everythingExceptFlag =
        emojiSettings.supports.everythingExceptFlag &&
        !emojiSettings.supports.flag;

      emojiSettings.readyCallback();
      

      if (!emojiSettings.supports.everything) {
        var script = document.createElement("script");
        script.src =
          "https://s.w.org/images/core/emoji/15.0.3/svg/" + "emoji-polyfill.js";
        script.defer = true;
        document.head.appendChild(script);
      }
    });
  })();

