/*
SkinDrop - Skin your dropdown
Works for ?
By: Chonla
Create Date: 15 June 2012
URL: http://blog.chonla.com
*/

(function($) {
	$.fn.skindrop = function(options)
	{
		var defaults = {
			triggerText : '',
			onItemSelected : null,
			onReady : null
		};
		options = $.extend(defaults, options);
		id = 0;
		this.each(function() {
			// create a new id
			ctrl_id = 'skindrop_ctrl_'+id++;

			// create wrapper
			w = $('<div class="skindrop_virtual_wrapper"></div>');
			$(this).before(w).appendTo(w);

			// assign uid to control
			$(this).attr('skindrop_id', ctrl_id);

			// build up drop wrapper
			drop_wrap = $('<div class="skindrop_wrapper"></div>').attr('skindrop_id', ctrl_id);

			// build up the text holder
			txt = $('option:selected', this).html();
			idx = $('option:selected', this).index();
			txt_wrap = $('<div class="skindrop_txt_wrapper"></div>').attr('skindrop_id', ctrl_id).html(txt);

			// build up the trigger
			trigger = $('<div class="skindrop_trigger"></div>').attr('skindrop_id', ctrl_id).html(options.triggerText);

			// build up the list
			opt_wrap = $('<div class="skindrop_opt_wrapper"><ul></ul></div>').attr('skindrop_id', ctrl_id).css({'position':'absolute'}).hide();
			opt_wrap_ul = opt_wrap.find('ul');
			$('option', this).each(function(i) {
				selected = (idx==i)?' skindrop_selected':'';
				opt_wrap_ul.append('<li class="skindrop_opt'+selected+'" value="'+$(this).val()+'">'+$(this).html()+'</li>');
			});

			// attach to page
			drop_wrap.append(txt_wrap).append(trigger);
			$('body').append(opt_wrap);
			$(this).before(drop_wrap).hide();
		});

		// bind events
		$('.skindrop_trigger, .skindrop_txt_wrapper').live('click', function(){
			active_id = $(this).attr('skindrop_id');

			// toggle dropdown
			if ($('.skindrop_opt_wrapper[skindrop_id="'+active_id+'"]').is(':visible')) {
				$('.skindrop_opt_wrapper[skindrop_id="'+active_id+'"]').hide();
			} else {
				p = $('.skindrop_wrapper[skindrop_id="'+active_id+'"]').position();
				h = $('.skindrop_wrapper[skindrop_id="'+active_id+'"]').height();
				w = $('.skindrop_wrapper[skindrop_id="'+active_id+'"]').width();
				bt = parseInt($('.skindrop_wrapper[skindrop_id="'+active_id+'"]').css('border-top-width'), 10);
				bb = parseInt($('.skindrop_wrapper[skindrop_id="'+active_id+'"]').css('border-bottom-width'), 10);

				$('.skindrop_opt_wrapper[skindrop_id="'+active_id+'"]').css({"left":p.left+'px',"top":(p.top+h+bt+bb)+'px',"width":w+'px'}).show();
			}
		});

		$('.skindrop_opt').live('click', function(){
			active_id = $(this).addClass('skindrop_selected').parents('div.skindrop_opt_wrapper').attr('skindrop_id');

			// update selected item
			clicked_idx = $(this).index();
			$('select[skindrop_id="'+active_id+'"]').prop('selectedIndex',clicked_idx);
			$(this).parents('ul').find('li:not(:eq('+clicked_idx+'))').removeClass('skindrop_selected');

			// update text displayed
			$('div.skindrop_txt_wrapper[skindrop_id="'+active_id+'"]').html($('option:selected', 'select[skindrop_id="'+active_id+'"]').html());

			$(this).addClass('skindrop_selected').parents('div.skindrop_opt_wrapper').hide();

			if ($.isFunction(options.onItemSelected)) {
				options.onItemSelected(this);
			}
		});

		if ($.isFunction(options.onReady)) {
			options.onReady($('.skindrop_wrapper'));
		}
	};
})(jQuery);
