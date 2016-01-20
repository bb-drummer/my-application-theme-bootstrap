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
	$ajaxCTAClose = ".fancybox-type-ajax .btn-cta-xhr-close, .fancybox-type-ajax .flashmessages .close";
	$ajaxForms = ".fancybox-type-ajax .form-xhr";
	
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
			closeEffect	: 'none',
			overlay		: {
				closeClick : false
			}
		});
	}); 
	
	jQuery('BODY').on('submit', $ajaxForms, {}, function (oEvent) {
		var formURL = (this.action)
			form = this;
		
		jQuery.fancybox.showLoading();
		
		jQuery.ajax({
			headers : {
				'Accept' : 'text/html, */*; q=0.01',
				'X-Fancybox' : 'true'
			},
			type	: "POST",
			cache	: false,
			url		: formURL,
			data	: $(this).serializeArray(),
			success	: function (data) {
				jQuery.fancybox(jQuery('<div />').html(data).remove(".close"));
			}
		});
		
		oEvent.preventDefault();
		oEvent.stopPropagation();
		return (false);
	});
	
	jQuery('BODY').on('click', $ajaxCTAClose, {}, function (oEvent) {
		jQuery.fancybox.close();
		oEvent.preventDefault();
		oEvent.stopPropagation();
		return (false);
	});
	
});