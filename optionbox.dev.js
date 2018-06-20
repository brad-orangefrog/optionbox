/*!

Materialize - Content Box Plugin (v0.0.1 alpha)
Copyright (c) 2018 Brad Leitch, brad@orangefrog.ca

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


(function($) {
	$.fn.OptionBox = function(options) {

		$('.optionbox-trigger').each(function() {
		
			var settings = $.extend({
				width : 'auto',
				maxWidth : 'auto',
				height: 'auto'
			}, options);

			var self          = $(this);
			var box_id        = self.attr('data-box');
			var box           = $('#' + box_id);

			box.prepend('<div id="' + box_id + '-arrow" class="arrow-clip"><div class="arrow"></div></div>');
			box.width(settings.width);
			box.css('max-width', settings.maxWidth + 'px');
			
			$('html').click(function(event) {
				if (!box.is(event.target) && !self.is(event.target) && box.has(event.target).length === 0) 
					box.hide();
			});

			$(window).resize(function() {
				box.hide();
			});

			$(this).click(function(event) {
				// Prevent child elements of the trigger from causing multiple calls; needed unless event bubbling like a volcanic eruption from the fires of Mount Doom is your idea of a pleasant vacation... not good
				event.stopImmediatePropagation();

				var self_offset   = self.offset();
				var self_width    = self.outerWidth();
				var self_height   = self.outerHeight();
				var box_width     = box.outerWidth();
				var arrow         = $('#' + box_id + '-arrow');
				var arrow_x       = (box.width() / 2);

				var y = self_offset.top + self_height + 12;
				var x = self_offset.left - (box_width / 2) + (self_width / 2);

				// Check to see if the box runs off the right of the page; get back here!!
				if((x + box_width) > $(window).width())
				{
					console.log('collision-right -> detected');

					x       = self_offset.left + self_width - box_width;
					arrow_x = box_width - self_width + (self_width / 2);
					
					// Adjusting the box to right-align caused it to now move off the left side of the page; need to introduce forced box width to the equation
					if(x < 0)
					{
						console.log('collision-right -> caused left collision');
						box_width = $(window).width() - 40;
						x         = 20;
						arrow_x   = self_offset.left + (self_width / 2) - 20;
					}
				}

				// Check to see if the box runs off the left of the page
				if(x < 0)
				{
					console.log('collision-left -> detected');
					x       = self_offset.left;
					arrow_x = (self_width / 2);

					// Adjusting the box to right-align caused it to now move off the left side of the page; need to introduce forced box width to the equation
					if((x + box_width) > $(window).width())
					{
						console.log('collision-left -> caused right collision');
						box_width = $(window).width() - self_offset.left - 40;
					}
				}

				console.log('-------- ' + box_id + ' --------');
				console.log('self_offset.left: ' + self_offset.left);
				console.log('box_width: ' + box_width);
				console.log('self_width: ' + self_width);
				console.log('box x: ' + x);
				console.log('(window).width: ' + $(window).width());

				// Hide any other open option boxes
				box.siblings('.optionbox').hide();

				if(box.is(':visible'))
					box.slideUp(100);
				else
					box.slideDown(100);

				// Render everything
				box.width(box_width);
				box.css({top: y + 'px', left: x + 'px'});
				arrow.css({ left: arrow_x + 'px' });
			});
		});
		
		return this;
	};
}( jQuery ));
