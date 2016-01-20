/**
 * 
 */
jQuery.noConflict();

jQuery(document).ready(function ($) {
	
	jQuery('.datatable').dataTable( {
		renderer	: 'bootstrap',
		language	: {
			url	: '//cdn.datatables.net/plug-ins/1.10.9/i18n/German.json'
		}
	} );

	$ajaxButtons = "A.btn[href*='add'], A.btn[href*='edit'], A.btn[href*='details'], A.btn[href*='delete']";
	$ajaxAction = ".btn-cta-xhr";
	
	jQuery($ajaxButtons).addClass('fancybox.ajax');
	jQuery($ajaxButtons).each(function(){
		// console.debug(this);
		jQuery(this).fancybox({
			minWidth	: 800,
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