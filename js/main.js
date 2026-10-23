/* Surya Engineering Works — small site scripts (no libraries) */
(function () {
  "use strict";

  /* ---------- Business details: change them here ---------- */
  var BUSINESS_EMAIL = "saisuryasu20@gmail.com";
  var PLANT_TIMEZONE = "Asia/Kolkata";
  // Opening hours in plant time (IST). 0 = Sunday ... 6 = Saturday. Times are [open, close] in 24h.
  var HOURS = {
    0: [9, 17],
    1: [8, 20], 2: [8, 20], 3: [8, 20], 4: [8, 20], 5: [8, 20],
    6: [9, 19]
  };

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Open / closed status (plant time) ---------- */
  function plantNow() {
    try {
      var parts = new Intl.DateTimeFormat("en-US", {
        timeZone: PLANT_TIMEZONE, weekday: "short", hour: "numeric", minute: "numeric", hour12: false
      }).formatToParts(new Date());
      var map = {};
      parts.forEach(function (p) { map[p.type] = p.value; });
      var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var h = parseInt(map.hour, 10) % 24;
      return { day: days[map.weekday], hour: h + parseInt(map.minute, 10) / 60, label: map.hour + ":" + map.minute };
    } catch (e) {
      return null;
    }
  }

  var status = document.querySelector("[data-open-status]");
  var now = plantNow();
  if (now) {
    var todayRow = document.querySelector('[data-day~="' + now.day + '"]');
    if (todayRow) todayRow.classList.add("today");
    if (status) {
      var span = HOURS[now.day];
      var open = span && now.hour >= span[0] && now.hour < span[1];
      status.classList.toggle("is-open", !!open);
      status.textContent = (open ? "Open now" : "Closed now") + " · " + now.label + " in Viralimalai (IST)";
    }
  } else if (status) {
    status.hidden = true;
  }

  /* ---------- Gallery lightbox ---------- */
  var lightbox = null;
  var lastTrigger = null;

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.remove();
    lightbox = null;
    document.body.style.overflow = "";
    if (lastTrigger) lastTrigger.focus();
  }

  document.addEventListener("click", function (e) {
    var trigger = e.target.closest ? e.target.closest("[data-full]") : null;
    if (!trigger) return;
    e.preventDefault();
    lastTrigger = trigger;
    lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", trigger.getAttribute("data-caption") || "Photo");

    var img = document.createElement("img");
    img.src = trigger.getAttribute("data-full");
    img.alt = trigger.querySelector("img") ? trigger.querySelector("img").alt : "";
    var cap = document.createElement("p");
    cap.textContent = trigger.getAttribute("data-caption") || "";
    var btn = document.createElement("button");
    btn.className = "lightbox-close";
    btn.type = "button";
    btn.textContent = "Close";
    btn.addEventListener("click", closeLightbox);

    lightbox.appendChild(btn);
    lightbox.appendChild(img);
    lightbox.appendChild(cap);
    lightbox.addEventListener("click", function (ev) { if (ev.target === lightbox) closeLightbox(); });
    document.body.appendChild(lightbox);
    document.body.style.overflow = "hidden";
    btn.focus();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  /* ---------- Enquiry form ----------
     The site is static, so the form prepares an email in the visitor's own
     email app instead of sending it from a server.
     To send straight from the page later, sign up for a form service
     (Formspree, Web3Forms or Netlify Forms), set the form's action to the
     URL it gives you, and delete this block. */
  var form = document.getElementById("enquiry-form");
  if (form) {
    var result = document.getElementById("form-result");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (input) {
        var err = form.querySelector('[data-error-for="' + input.id + '"]');
        var bad = !input.value.trim() || (input.type === "email" && !/^\S+@\S+\.\S+$/.test(input.value.trim()));
        if (err) err.hidden = !bad;
        input.setAttribute("aria-invalid", bad ? "true" : "false");
        if (bad && ok) { input.focus(); ok = false; }
      });
      if (!ok) return;

      var v = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; };
      var subject = "Enquiry from website: " + (v("f-company") || v("f-name")) + (v("f-part") ? " — " + v("f-part") : "");
      var lines = [
        "Name: " + v("f-name"),
        "Company: " + (v("f-company") || "-"),
        "Email: " + v("f-email"),
        "Phone: " + (v("f-phone") || "-"),
        "Country: " + (v("f-country") || "-"),
        "Part / component: " + (v("f-part") || "-"),
        "Quantity: " + (v("f-qty") || "-"),
        "",
        v("f-message"),
        "",
        "(Please attach your drawing to this email.)"
      ];
      var href = "mailto:" + BUSINESS_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n"));

      if (result) result.hidden = false;
      window.location.href = href;
    });

    var copyBtn = document.getElementById("copy-email");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        var done = function () { copyBtn.textContent = "Copied"; setTimeout(function () { copyBtn.textContent = "Copy address"; }, 1800); };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(BUSINESS_EMAIL).then(done, function () { selectEmail(); });
        } else {
          selectEmail();
        }
      });
    }
    function selectEmail() {
      var code = document.getElementById("email-text");
      if (!code) return;
      var range = document.createRange();
      range.selectNodeContents(code);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
})();
