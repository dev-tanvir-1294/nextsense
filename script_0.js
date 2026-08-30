
      (function () {
        // FAQ accordion
        var container = document.getElementById("faqs");
        if (container) {
          var items = container.querySelectorAll("[data-faq-item]");
          items.forEach(function (item) {
            var toggle = item.querySelector("[data-faq-toggle]");
            if (!toggle) return;
            toggle.addEventListener("click", function () {
              var isActive = item.classList.contains("active");
              items.forEach(function (other) {
                other.classList.remove("active");
              });
              if (!isActive) item.classList.add("active");
            });
          });
        }

        // Gallery stage + thumbs
        var stageSlides = document.querySelectorAll(".ns-pdp2__stage-slide");
        var thumbs = document.querySelectorAll(".ns-pdp2__thumb");
        var activeIdx = 0;

        function hydrateImage(slide) {
          if (!slide) return;
          var img = slide.querySelector("img[data-src]");
          if (img && !img.getAttribute("src"))
            img.setAttribute("src", img.getAttribute("data-src"));
        }

        function setActive(idx) {
          if (stageSlides.length === 0) return;
          if (idx < 0) idx = stageSlides.length - 1;
          if (idx >= stageSlides.length) idx = 0;
          activeIdx = idx;
          stageSlides.forEach(function (s, i) {
            s.classList.toggle("ns-pdp2__stage-slide--active", i === idx);
          });
          thumbs.forEach(function (t, i) {
            t.classList.toggle("ns-pdp2__thumb--active", i === idx);
          });
          hydrateImage(stageSlides[idx]);
          if (stageSlides[idx + 1]) hydrateImage(stageSlides[idx + 1]);
          if (stageSlides[idx - 1]) hydrateImage(stageSlides[idx - 1]);
        }

        var prev = document.querySelector("[data-stage-prev]");
        var next = document.querySelector("[data-stage-next]");
        if (prev)
          prev.addEventListener("click", function (e) {
            e.stopPropagation();
            setActive(activeIdx - 1);
          });
        if (next)
          next.addEventListener("click", function (e) {
            e.stopPropagation();
            setActive(activeIdx + 1);
          });
        thumbs.forEach(function (thumb) {
          thumb.addEventListener("click", function () {
            setActive(parseInt(thumb.dataset.idx, 10) || 0);
          });
        });

        // Quote rotation
        var quotesWrap = document.querySelector("[data-quotes]");
        if (quotesWrap) {
          var quotes = quotesWrap.querySelectorAll(".ns-pdp2__quote");
          var dots = quotesWrap.querySelectorAll(".ns-pdp2__quote-dot");
          var quoteIdx = 0;
          function showQuote(idx) {
            if (quotes.length === 0) return;
            if (idx < 0) idx = quotes.length - 1;
            if (idx >= quotes.length) idx = 0;
            quoteIdx = idx;
            quotes.forEach(function (q, i) {
              q.classList.toggle("ns-pdp2__quote--active", i === idx);
            });
            dots.forEach(function (d, i) {
              d.classList.toggle("ns-pdp2__quote-dot--active", i === idx);
            });
          }
          dots.forEach(function (d) {
            d.addEventListener("click", function () {
              showQuote(parseInt(d.getAttribute("data-quote-idx"), 10));
            });
          });
          var qPrev = quotesWrap.querySelector("[data-quote-prev]");
          var qNext = quotesWrap.querySelector("[data-quote-next]");
          if (qPrev)
            qPrev.addEventListener("click", function () {
              showQuote(quoteIdx - 1);
            });
          if (qNext)
            qNext.addEventListener("click", function () {
              showQuote(quoteIdx + 1);
            });
          setInterval(function () {
            if (!document.hidden) showQuote(quoteIdx + 1);
          }, 18000);
        }

        // Tile selection
        var tiles = document.querySelectorAll(".ns-pdp2__tile");
        tiles.forEach(function (tile) {
          tile.addEventListener("click", function () {
            tiles.forEach(function (t) {
              t.classList.remove("ns-pdp2__tile--active");
            });
            tile.classList.add("ns-pdp2__tile--active");
            var input = tile.querySelector('input[type="radio"]');
            if (input) input.checked = true;
          });
        });

        // Sticky ATC visibility
        var stickyBar = document.getElementById("ns-sticky-atc");
        var buyAnchor =
          document.querySelector(".ns-pdp2__subtrust") ||
          document.getElementById("ns-pdp2-cta");
        if (stickyBar && buyAnchor && "IntersectionObserver" in window) {
          new IntersectionObserver(
            function (entries) {
              entries.forEach(function (e) {
                var visible = e.isIntersecting || e.boundingClientRect.top > 0;
                if (visible) stickyBar.classList.remove("visible");
                else stickyBar.classList.add("visible");
              });
            },
            { threshold: 0 },
          ).observe(buyAnchor);
        }

        // Header scroll state
        var headerSection = document.querySelector(".header-section");
        function onScroll() {
          if (headerSection) {
            if (window.scrollY > 10) headerSection.classList.add("ns-scrolled");
            else headerSection.classList.remove("ns-scrolled");
          }
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        // Mobile drawer
        var mobileToggle = document.getElementById("ns-mobile-toggle");
        var mobileClose = document.getElementById("ns-mobile-close");
        var mobileDrawer = document.getElementById("ns-mobile-drawer");
        var mobileBackdrop = document.getElementById("ns-mobile-backdrop");
        function openMobileMenu() {
          if (!mobileDrawer) return;
          mobileDrawer.classList.add("is-open");
          mobileDrawer.setAttribute("aria-hidden", "false");
          if (mobileBackdrop) mobileBackdrop.classList.add("is-open");
          document.body.classList.add("ns-mobile-menu-open");
        }
        function closeMobileMenu() {
          if (!mobileDrawer) return;
          mobileDrawer.classList.remove("is-open");
          mobileDrawer.setAttribute("aria-hidden", "true");
          if (mobileBackdrop) mobileBackdrop.classList.remove("is-open");
          document.body.classList.remove("ns-mobile-menu-open");
        }
        if (mobileToggle)
          mobileToggle.addEventListener("click", openMobileMenu);
        if (mobileClose) mobileClose.addEventListener("click", closeMobileMenu);
        if (mobileBackdrop)
          mobileBackdrop.addEventListener("click", closeMobileMenu);

        // Cart drawer
        var cartTrigger = document.getElementById("ns-cart-trigger");
        var cartClose = document.getElementById("ns-cart-close");
        var cartDrawer = document.getElementById("ns-cart-drawer");
        var cartBackdrop = document.getElementById("ns-cart-backdrop");
        function openCart() {
          if (!cartDrawer) return;
          cartDrawer.classList.add("open");
          if (cartBackdrop) cartBackdrop.classList.add("open");
          document.body.classList.add("ns-cart-open");
        }
        function closeCart() {
          if (!cartDrawer) return;
          cartDrawer.classList.remove("open");
          if (cartBackdrop) cartBackdrop.classList.remove("open");
          document.body.classList.remove("ns-cart-open");
        }
        if (cartTrigger) cartTrigger.addEventListener("click", openCart);
        if (cartClose) cartClose.addEventListener("click", closeCart);
        if (cartBackdrop) cartBackdrop.addEventListener("click", closeCart);

        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape") {
            closeMobileMenu();
            closeCart();
          }
        });
      })();
    