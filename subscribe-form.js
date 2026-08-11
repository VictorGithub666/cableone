// CableOne — Subscribe modal + Web3Forms wiring
// Populates the modal with the selected plan and sets a per-plan email subject
// before the form does a normal POST to Web3Forms (no extra JS needed for sending).

document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('subscribeModal');
  if (!modal) return;

  modal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;
    if (!button) return;

    var plan = button.getAttribute('data-plan') || '';
    var price = button.getAttribute('data-price') || '';
    var category = button.getAttribute('data-category') || '';

    var planDisplay = document.getElementById('planDisplay');
    var priceDisplay = document.getElementById('priceDisplay');
    var planField = document.getElementById('planField');
    var priceField = document.getElementById('priceField');
    var categoryField = document.getElementById('categoryField');
    var subjectField = document.getElementById('subjectField');

    if (planDisplay) planDisplay.textContent = plan || '—';
    if (priceDisplay) priceDisplay.textContent = price || '—';
    if (planField) planField.value = plan;
    if (priceField) priceField.value = price;
    if (categoryField) categoryField.value = category;
    if (subjectField) {
      subjectField.value = 'New ' + (category ? category + ' ' : '') + 'Subscription Request — ' + plan;
    }
  });
});
