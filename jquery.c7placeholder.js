/*
 *
 * C7Placeholder
 * Version 1.0
 * @requires jQuery v1.6.2
 *
 * Author: Jerry Harrison, Coalesce
 *
 * Needs two passed vars, placeholder text and/or class name applied to pseudo elements.
 * $('input#UserEmail').placeholder("Enter your name...","c7dPlaceholder");
 *
 * NOTE: Add this to your stylesheet to style like normal placeholders:  .c7dPlaceholder {color:#aaa;}
 *
 */

(function($){
	jQuery.fn.extend({

		placeholder: function(placeholderClass, placeholdertext, data, fn ) {

			return this.each(function() {

				// alert(placeholdertext);
				if (placeholdertext) {
					var pText = placeholdertext;
				} else {
					var pText = $(this).attr('placeholder');
				}

				$(this).attr('data-c7placeholder', pText);

				$(this).focus(function() {
					var input = $(this);

					// are we clicking on a pseudo element?
					if (input.hasClass('pseudoPlaceholder')) {
						input.hide();
					}

					if (input.val() == '' || input.val() == pText) {

						input.attr('placeholder','');
						input.val('');
						input.removeClass(placeholderClass);
					}

				}).blur(function() {
					var input = $(this);
					// if this is a password field, then we make a pseudo text field in it's place...
					if (input.attr('type') == 'password' && input.val() == '') {
						input.hide();
						var inputId = input.attr('id'),
							pseudoClasses = input.attr('class'),
							pseudoInput = $('<input type="text" id="'+inputId+'" class="pseudoPlaceholder c7dPlaceholder '+pseudoClasses+'" value="'+pText+'">');

						pseudoInput.insertAfter(input);

						if ((input.val() == '' || input.val() == pText) && input.is(':visible')) {
							input.addClass(placeholderClass);
							input.val(pText);
						}

					}

					if (input.attr('type') != 'password' && (input.val() == '' || input.val() == pText)) {
							input.addClass(placeholderClass);
							input.val(pText);
					}

				}).blur().parents('form').submit(function() {
					$(this).find('[placeholder]').each(function() {
						if ($(this).val() === $(this).data('c7placeholder')) {
							$(this).val('');
						}
					})
				});

			});

		}

	});
})(jQuery);



$(document).ready(function() {

	$("body").delegate("input.pseudoPlaceholder", "click", function() {
		var myId = $(this).attr('id');
		$(this).prev('#'+myId).show().focus();
		$(this).remove();
	}).delegate("input.pseudoPlaceholder", "focus", function() {
		var myId = $(this).attr('id');
		$(this).prev('#'+myId).show().focus();
		$(this).remove();
	});


});