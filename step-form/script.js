$(document).ready(function() {
  var currentStep = 0;
  var steps = $('fieldset').length;
  var $form = $('#myForm');

  // Show the first step
  $('fieldset:first').addClass('show');

  // Handle input changes
  $form.find('input, select').change(function() {
    var isValid = true;

    // Validate all required inputs in the current step
    $form.find('fieldset.show input[required], fieldset.show select[required]').each(function() {
      if ($(this).is(':radio')) {
        // For radio buttons, check if at least one option is selected
        if (!$('input[name="' + $(this).attr('name') + '"]:checked').length) {
          isValid = false;
          return false; // Exit the loop if no option is selected
        }
      } else {
        // For other required inputs (including select)
        if ($(this).val() === '') {
          isValid = false;
          return false; // Exit the loop if the field is empty
        }
      }
    });

    if (isValid) {
      // Increment the current step
      currentStep++;
     
      showStep(currentStep);

      // Check if all steps are completed
      if (currentStep === steps) {
        // All steps are completed, submit the form
        submitForm();
      }
    }
  });

  // Handle previous step button click
  $form.find('.prev-step').click(function() {
    if (currentStep > 0) {
      // Decrement the current step
      currentStep--;
    
      showStep(currentStep);
    }
  });

  // Show the specified step
  function showStep(step) {
    $('fieldset').removeClass('show');
    $('fieldset:nth-child(' + (step + 1) + ')').addClass('show');
  }

  // Handle form submission
  // function submitForm() {
  //   $form.off('submit');    // Remove previous submit handler to prevent recursion
  //   $form.submit();         // Submit the form
  // }

  // Prevent default form submission
  $form.submit(function(event) {
    event.preventDefault();
    // Optionally perform final form submission or processing here
  });
});