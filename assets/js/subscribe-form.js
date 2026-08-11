// CableOne — Subscription modal + Web3Forms
(function () {
  'use strict';

  function initSubscribe() {
    var modalEl = document.getElementById('subscribeModal');
    var form = document.getElementById('subscribeForm');
    if (!modalEl || !form) return;

    var planDisplay = document.getElementById('planDisplay');
    var priceDisplay = document.getElementById('priceDisplay');
    var planField = form.querySelector('[name="plan"]');
    var priceField = form.querySelector('[name="package_price"]');
    var categoryField = form.querySelector('[name="category"]');
    var subjectField = form.querySelector('[name="subject"]');

    function openModal(button) {
      var plan = button.getAttribute('data-plan') || '';
      var price = button.getAttribute('data-price') || '';
      var category = button.getAttribute('data-category') || '';

      if (planDisplay) planDisplay.textContent = plan || '—';
      if (priceDisplay) priceDisplay.textContent = price || '—';
      if (planField) planField.value = plan;
      if (priceField) priceField.value = price;
      if (categoryField) categoryField.value = category;
      if (subjectField) subjectField.value = 'New ' + (category ? category + ' ' : '') + 'Subscription Request — ' + plan;

      // Use Bootstrap when available.
      if (window.bootstrap && bootstrap.Modal) {
        bootstrap.Modal.getOrCreateInstance(modalEl).show();
        return;
      }

      // Fallback so the button still works if Bootstrap JS fails to load.
      modalEl.classList.add('show');
      modalEl.style.display = 'block';
      modalEl.removeAttribute('aria-hidden');
      document.body.classList.add('modal-open');
      var backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show cableone-modal-backdrop';
      document.body.appendChild(backdrop);
    }

    // Do NOT rely only on Bootstrap's data-bs-toggle. Handle clicks ourselves.
    document.querySelectorAll('.btn-subscribe[data-plan]').forEach(function (button) {
      button.setAttribute('type', 'button');
      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        openModal(button);
      });
    });

    // Fallback close for the modal X and backdrop if Bootstrap JS is unavailable.
    modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach(function (button) {
      button.addEventListener('click', function () {
        if (window.bootstrap && bootstrap.Modal) return;
        modalEl.classList.remove('show');
        modalEl.style.display = 'none';
        modalEl.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        var backdrop = document.querySelector('.cableone-modal-backdrop');
        if (backdrop) backdrop.remove();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSubscribe);
  } else {
    initSubscribe();
  }
})();
