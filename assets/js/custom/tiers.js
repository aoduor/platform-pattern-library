tiersInit = function(element, selected) {
    var context = element !== 'undefined' ? element : $('.tiers'),
        selectedTier = selected !== 'undefined' ? selected : context.find('.tier.selected'), // Selected Tier
        liteTier = context.siblings('.tier.lite'), // Free Tier
        form = context.find('.payment'); // Payment form

    // IF: Payment form is currently visible
    if (context.hasClass('show-payment')) {
        form.fadeOut(500); // Hide the payment form
        context.find('.tier').removeClass('selected'); // Deselect the selected Tier
        context.removeClass('show-payment');
        setTimeout(function(){
            liteTier.slideDown(500).animate({opacity: 1}, 500); // Show the Free Tier
        }, 500);

    // ELSE: Payment form is hidden
    } else {
        form.fadeIn(500); // Show the payment form
        selectedTier.addClass('selected'); // Apple the 'selected' state to the selected Tier
        context.addClass('show-payment');
        setTimeout(function(){
            liteTier.animate({opacity: 0}, 500).slideUp(500); // Hide the Free Tier
        }, 500);
    }

    // Scroll to the top of the window
    context.parent().animate({
        scrollTop: 0
    }, 500);
}

$(document).ready(function(){
    // Click event for Plans buttons
    $('[data-payment]').on('click', function(e) {
        tiersInit($(this).closest('.tiers'), $(this).closest('.tier'));
        e.preventDefault();
    });
});