/* ============================================================
   Rob Wigboldus Vishandel — page behaviour
   Classic script (no modules) so the page runs straight off
   file:// with no server. Everything here is an enhancement:
   the page is complete and usable with JavaScript disabled.
   ============================================================ */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── 1. Open / closed status ──────────────────────────────
     Hours come from the shop's own Instagram bio: open every
     day, 09:00–18:00. Computed in Europe/Amsterdam so the
     answer is right regardless of where the visitor is. */

  var OPEN_HOUR = 9;
  var CLOSE_HOUR = 18;

  function amsterdamNow() {
    // Read the wall clock in Amsterdam rather than the visitor's.
    try {
      var parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Amsterdam",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }).formatToParts(new Date());

      var out = {};
      parts.forEach(function (p) { out[p.type] = p.value; });
      return { h: parseInt(out.hour, 10), m: parseInt(out.minute, 10) };
    } catch (e) {
      return null; // Intl or the tz database unavailable — leave the fallback copy.
    }
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function renderStatus() {
    var el = document.getElementById("status");
    if (!el) return;

    var now = amsterdamNow();
    if (!now) return;

    var text = el.querySelector(".status__text");
    var mins = now.h * 60 + now.m;
    var opens = OPEN_HOUR * 60;
    var closes = CLOSE_HOUR * 60;
    var state, copy;

    if (mins < opens) {
      state = "closed";
      copy = "Closed — opens at " + pad(OPEN_HOUR) + ":00";
    } else if (mins >= closes) {
      state = "closed";
      copy = "Closed — opens tomorrow at " + pad(OPEN_HOUR) + ":00";
    } else if (closes - mins <= 60) {
      state = "open";
      copy = "Closing soon — open until " + pad(CLOSE_HOUR) + ":00";
    } else {
      state = "open";
      copy = "Open now — until " + pad(CLOSE_HOUR) + ":00 today";
    }

    el.setAttribute("data-status", state);
    if (text) text.textContent = copy;
  }

  renderStatus();
  window.setInterval(renderStatus, 60000);

  /* ── 2. Mobile navigation ─────────────────────────────── */

  var toggle = document.getElementById("navtoggle");
  var nav = document.getElementById("nav");

  function setNav(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("is-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setNav(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".site")) setNav(false);
    });

    // Leaving the mobile breakpoint must not strand the panel open.
    var wide = window.matchMedia("(min-width: 56em)");
    var onWide = function (e) { if (e.matches) setNav(false); };
    if (wide.addEventListener) wide.addEventListener("change", onWide);
    else if (wide.addListener) wide.addListener(onWide);
  }

  /* ── 3. Header shadow once the page has scrolled ───────── */

  var header = document.querySelector(".site");
  if (header) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        header.classList.toggle("is-stuck", window.scrollY > 8);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ── 4. Reveal on scroll ───────────────────────────────── */

  if (!reduceMotion && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll(
      ".hero__text, .hero__img, .alley .wrap, .hero-item, .menu__item," +
      " .how__text, .how__img, .scores, .quotes blockquote, .visit__map, .visit__info"
    );

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });

    Array.prototype.forEach.call(targets, function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 4) * 60 + "ms";
      io.observe(el);
    });
  }

  /* ── 5. Move focus with the anchor ─────────────────────────
     Smooth scrolling is CSS; this makes it work for keyboard
     users, who otherwise stay parked at the top of the page. */

  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;

    var id = link.getAttribute("href");
    if (!id || id === "#") return;

    var target = document.querySelector(id);
    if (!target) return;

    if (!target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
    }
    // Let the browser finish scrolling before taking focus.
    window.setTimeout(function () {
      target.focus({ preventScroll: true });
    }, reduceMotion ? 0 : 420);
  });
})();
