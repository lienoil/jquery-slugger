/**
 * jQuery Slugify
 * v1.0.0
 *
 * @author  John Lioneil Dionisio
 *
 * @param  {Object} $
 * @param  {Object} document
 * @return
 */
(function ($, document) {

	var Slugify = {
        init: function (options, elem) {
        	var self = this;
            self.elem = elem;
            self.$elem = $(elem);
            self.options = $.extend( {}, $.fn.slugify.options, options );
            self.options.target = "" == self.$elem.data('slugify') ? self.options.target : self.$elem.data('slugify');
            self.options.separator = undefined == self.$elem.data('slug-separator') ? self.options.separator : self.$elem.data('slug-separator');
            console.log(self.options);


            self.$elem.on('keyup', function (e) {
	            var $string = $(this).val();
	            $string = self.convert($string);
	            $(self.options.target).val($string);

	            if (self.options.debug) self.debug($string);
            });

        	return true;
        },

        convert: function ($string) {
        	return $string.toLowerCase()
        			.replace(/ /g, this.options.separator)
        			.replace(/[^\w-]+/g, '');
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
        target: '[name=slug]',
        separator: '-',
        debug: false,

        beforeConvert: function (self) {},
        afterConvert: function (self) {},
    };
    jQuery('[data-slugify]').slugify();

})(jQuery, document);