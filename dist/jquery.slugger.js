/**
 * jQuery Slugger
 * Because "slugify" is already taken.
 *
 * v1.0.0
 *
 * @author  John Lioneil Dionisio
 *
 * @param  {Object} $
 * @param  {Object} document
 * @return
 */
(function ($, document) {

    'use strict';

    var slugSeparator = 'slug-separator';

	var Slugify = {
        init: function (options, elem) {
        	var self = this;
            self.elem = elem;
            self.$elem = $(elem);
            self.options = $.extend( {}, $.fn.slugify.options, options );
            self.options.target = "" == self.$elem.data('slugify') ? self.options.target : self.$elem.data('slugify');
            self.options.separator = undefined == self.$elem.data(slugSeparator) ? self.options.separator : self.$elem.data(slugSeparator);

            self.$elem.on(self.options.bindToEvent, function (e) {
	            var $string = $(this).val();
	            $string = self.convert($string, self);
	            $(self.options.target).val($string);

	            if (self.options.debug) self.debug($string);
            });

        	return true;
        },

        convert: function ($string, self) {
            self.options.beforeConvert(self);

            if (self.options.convertToLowerCase) {
                $string = $string.toLowerCase();
            }

        	$string = $string.replace(/ /g, this.options.separator);

            if (!self.options.isUrlFriendly) {
                $string = $string.replace(/[^\w-]+/g, '');
            }

            self.options.afterConvert(self);

            return $string;
        },

        destroy: function () {
        	this.destroy();
        	this.element.unbind( this.eventNamespace )
		    this.bindings.unbind( this.eventNamespace );
        },

        debug: function ($string) {
        	console.log($string);
        },
    };

    $.fn.slugify = function (options, elem) {
        var slugify = Object.create(Slugify);
        return this.each(function () {
            slugify.init(options, this);
        });
    };

    $.fn.slugify.options = {
        bindToEvent: 'keypress keyup',
        target: '[name=slug]',
        separator: '-',

        convertToLowerCase: true,
        isUrlFriendly: true,

        bannedChars: '',

        beforeConvert: function (self) {},
        afterConvert: function (self) {},

        debug: false,
    };
    jQuery('[data-slugify]').slugify();

})(jQuery, document);