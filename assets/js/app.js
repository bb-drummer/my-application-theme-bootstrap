/**
 * 
 */
jQuery.noConflict();

jQuery(document).ready(function () {
	
	// ... your actions here ...

	jQuery('A.fancybox.ajax').each(function(){
		//console.debug(this);
		jQuery(this).fancybox({
			maxWidth	: 800,
			maxHeight	: 600,
			fitToView	: false,
			width		: '99%',
			height		: '99%',
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none'
		});
	}); 
	
});