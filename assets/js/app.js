/**
 * 
 */
jQuery.noConflict();

jQuery(document).ready(function () {
	
	// ... your actions here ...

	jQuery('A#xhrtest').each(function(){
		//console.debug(this);
		jQuery(this).fancybox({
			maxWidth	: 800,
			maxHeight	: 600,
			fitToView	: false,
			width		: '99%',
			height		: '99%',
			autoSize	: true,
			autoCenter	: true,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none'
		});
	}); 
	
});