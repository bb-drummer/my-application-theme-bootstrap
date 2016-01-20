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
	$ajaxCTAClose = ".fancybox-wrap .btn-cta-xhr-close, .fancybox-wrap .flashmessages .close";
	$ajaxForms = ".fancybox-wrap .form-xhr";
	
	jQuery($ajaxCTAOpen).addClass('fancybox.ajax');
	
	jQuery($ajaxCTAOpen).each(function(){
		// console.debug(this);
		jQuery(this).fancybox({
			minWidth	: 720,
			maxWidth	: 720,
			maxHeight	: 572,
			fitToView	: false,
			width		: '99%',
			height		: '99%',
			autoSize	: true,
			autoCenter	: true,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none',
			modal		: true,
			helpers 	: {
				overlay		: {
					closeClick : false
				}
			}
		});
	}); 
	
	//var initCTA = function () {
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
					jQuery.fancybox(data, {
						minWidth	: 720,
						maxWidth	: 720,
						maxHeight	: 572,
						fitToView	: false,
						width		: '99%',
						height		: '99%',
						autoSize	: true,
						autoCenter	: true,
						closeClick	: true,
						openEffect	: 'none',
						closeEffect	: 'none',
						helpers 	: {
							overlay		: {
								closeClick : false
							}
						}
					});
					jQuery('.flashmessages').first().parents('.fancybox-skin').removeClass('fancybox-skin');
					//initCTA();
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
	//};
	//initCTA();
});