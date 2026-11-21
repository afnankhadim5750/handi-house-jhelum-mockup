/* Handi House Restaurant Jhelum — mobile menu, scroll-spy, accordion, lightbox, booking form */
(function () {
  "use strict";

  /* ---- mobile menu : instant toggle, no transition ---- */
  var toggle = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-mobile-menu]");
  if (toggle && menu) {
    var setMenu = function (open) {
      if (open) {
        menu.removeAttribute("hidden");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close menu");
      } else {
        menu.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    };
    toggle.addEventListener("click", function () {
      setMenu(menu.hasAttribute("hidden"));
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hasAttribute("hidden")) setMenu(false);
    });
  }

  /* ---- scroll-spy : highlight current section in the desktop nav ---- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".main-nav a"));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = "#" + entry.target.id;
        navLinks.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---- reveal on scroll ---- */
  var revealEls = document.querySelectorAll(".menu-chapter, .bread-card, .why-card, .family-tile, .family-big, .drinks-photos figure, .gallery-item, .house-note");
  revealEls.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          ro.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".acc-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = btn.parentElement.querySelector(".acc-panel");
      var open = btn.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".acc-btn").forEach(function (b) {
        b.setAttribute("aria-expanded", "false");
        b.querySelector(".acc-icon").textContent = "+";
        b.parentElement.querySelector(".acc-panel").hidden = true;
      });
      if (!open) {
        btn.setAttribute("aria-expanded", "true");
        btn.querySelector(".acc-icon").textContent = "\u2212";
        panel.hidden = false;
      }
    });
  });

  /* ---- lightbox gallery ---- */
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightboxImg");
  var lbCaption = document.getElementById("lightboxCaption");
  var lbClose = document.getElementById("lightboxClose");
  var openLb = function (item) {
    lbImg.src = item.getAttribute("data-full");
    lbImg.alt = item.querySelector("img").alt;
    lbCaption.textContent = item.getAttribute("data-caption") || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lbClose.focus();
  };
  var closeLb = function () {
    lightbox.hidden = true;
    lbImg.src = "";
    document.body.style.overflow = "";
  };
  document.querySelectorAll(".gallery-item").forEach(function (item) {
    item.addEventListener("click", function () { openLb(item); });
  });
  lbClose.addEventListener("click", closeLb);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLb();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lightbox.hidden) closeLb();
  });

  /* ---- booking form : opens WhatsApp with a prefilled message ---- */
  var form = document.getElementById("bookingForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var party = form.party.value.trim();
      var when = form.when.value.trim();
      var msg = "Hello Handi House, I would like to book a table. Name: " + name +
        ", party of " + party + ", " + when + ".";
      window.open("https://wa.me/923135444333?text=" + encodeURIComponent(msg), "_blank");
    });
  }
})();
