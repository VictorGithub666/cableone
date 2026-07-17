/**
 * CableOne — shared site behaviour
 * - Header scroll state
 * - Scroll-to-top button
 * - Subscribe modal: prefills the selected plan
 * - Web3Forms AJAX submission -> redirects to thank-you.html
 */
(function () {
  "use strict";

  /* ---- Header scroll state ---- */
  var header = document.querySelector(".c1-header");
  function toggleHeader() {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", toggleHeader);
  window.addEventListener("load", toggleHeader);

  /* ---- Scroll to top ---- */
  var scrollTopBtn = document.querySelector(".scroll-top");
  function toggleScrollTop() {
    if (!scrollTopBtn) return;
    if (window.scrollY > 300) scrollTopBtn.classList.add("active");
    else scrollTopBtn.classList.remove("active");
  }
  window.addEventListener("scroll", toggleScrollTop);
  window.addEventListener("load", toggleScrollTop);
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---- Subscribe modal prefill ---- */
  var subscribeModalEl = document.getElementById("subscribeModal");
  if (subscribeModalEl) {
    subscribeModalEl.addEventListener("show.bs.modal", function (event) {
      var trigger = event.relatedTarget;
      if (!trigger) return;

      var plan = trigger.getAttribute("data-plan") || "";
      var price = trigger.getAttribute("data-price") || "";
      var category = trigger.getAttribute("data-category") || "";

      var planField = document.getElementById("planField");
      var planDisplay = document.getElementById("planDisplay");
      var priceDisplay = document.getElementById("priceDisplay");

      if (planField) planField.value = plan + (category ? " (" + category + ")" : "");
      if (planDisplay) planDisplay.textContent = plan;
      if (priceDisplay) priceDisplay.textContent = price;
    });
  }

  /* ---- Preloader ---- */
  window.addEventListener("load", function() {
    var preloader = document.getElementById("preloader");
    if (preloader) {
      setTimeout(function() {
        preloader.classList.add("hide");
      }, 800);
    }
  });

  /* ---- Web3Forms submission ---- */
  var form = document.getElementById("subscribeForm");
  if (form) {
    var statusBox = document.getElementById("formStatus");
    var submitBtn = document.getElementById("subscribeSubmitBtn");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var accessKey = form.querySelector('input[name="access_key"]').value;
      if (!accessKey || accessKey.indexOf("YOUR-WEB3FORMS") !== -1) {
        showStatus("Add your Web3Forms access key in the form before going live.", "danger");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      var formData = new FormData(form);
      var payload = Object.fromEntries(formData.entries());

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success) {
            window.location.href = "thank-you.html";
          } else {
            showStatus(data.message || "Something went wrong. Please try again.", "danger");
            resetBtn();
          }
        })
        .catch(function () {
          showStatus("Network error. Please check your connection and try again.", "danger");
          resetBtn();
        });
    });

    function resetBtn() {
      submitBtn.disabled = false;
      submitBtn.textContent = "Subscribe Now";
    }

    function showStatus(msg, type) {
      if (!statusBox) return;
      statusBox.textContent = msg;
      statusBox.className = "show text-" + type;
    }
  }
})();
