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
	$ajaxCTAOpen = "A.btn-cta-xhr";
	$ajaxCTAClose = ".fancybox-type-ajax .btn-cta-xhr-close";
	$ajaxCTASubmit = ".fancybox-type-ajax .form-xhr;
	
	jQuery($ajaxCTAOpen).addClass('fancybox.ajax');
	
	jQuery($ajaxCTAOpen).each(function(){
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
	
	jQuery('BODY').on('click', $ajaxCTASubmit, {}, function (oEvent) {
		alert (this.action);
		$.fancybox.showActivity();
		
		$.ajax({
			type		: "POST",
			cache	: false,
			url		: "/data/login.php",
			data		: $(this).serializeArray(),
			success: function(data) {
				$.fancybox(data);
			}
		});
		
		oEvent.preventDefault();
		oEvent.stopPropagation();
		return (false);
	});
	
	jQuery('BODY').on('click', $ajaxCTAClose, {}, function (oEvent) {
		$.fancybox.close();
		oEvent.preventDefault();
		oEvent.stopPropagation();
		return (false);
	});
	
});