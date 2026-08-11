// CableOne — Subscribe Form + Web3Forms
document.addEventListener('DOMContentLoaded', function () {

  var modal = document.getElementById('subscribeModal');
  var form = document.getElementById('subscribeForm');

  if (!modal || !form) return;

  modal.addEventListener('show.bs.modal', function (event) {

    var button = event.relatedTarget;

    if (!button) return;

    // Get package information directly from the clicked button
    var plan = button.dataset.plan || '';
    var price = button.dataset.price || '';
    var category = button.dataset.category || '';

    // Find form fields
    var planDisplay = document.getElementById('planDisplay');
    var priceDisplay = document.getElementById('priceDisplay');

    var planField = form.querySelector('[name="plan"]');
    var priceField = form.querySelector('[name="package_price"]');
    var categoryField = form.querySelector('[name="category"]');
    var subjectField = form.querySelector('[name="subject"]');

    // Display selected package
    if (planDisplay) {
      planDisplay.textContent = plan;
    }

    if (priceDisplay) {
      priceDisplay.textContent = price;
    }

    // Populate hidden form fields
    if (planField) {
      planField.value = plan;
    }

    if (priceField) {
      priceField.value = price;
    }

    if (categoryField) {
      categoryField.value = category;
    }

    // Set email subject
    if (subjectField) {
      subjectField.value =
        'New ' +
        (category ? category + ' ' : '') +
        'Subscription Request — ' +
        plan;
    }

    // Debugging — remove later if desired
    console.log('Subscription details:', {
      plan: plan,
      price: price,
      category: category
    });

    console.log('Form values:', {
      plan: planField ? planField.value : '',
      package_price: priceField ? priceField.value : '',
      category: categoryField ? categoryField.value : ''
    });
  });

});
