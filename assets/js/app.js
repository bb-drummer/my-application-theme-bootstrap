/**
 * 
 */
jQuery.noConflict();

var initDatatables = function () {
	jQuery('.datatable').each(function (idx, elm) { 
		$table = jQuery(this);
		
		var datatableOptions = {
			renderer : 'bootstrap',
			language : {
				url : '//cdn.datatables.net/plug-ins/1.10.9/i18n/German.json'
			},
			ajax : null
		};
		
		// has data source?
		var $src = jQuery.data($table, "src");
		if ($src != "") {
			datatableOptions.ajax = {
				url : $src,
				type : "POST"
			}
		}
		
		// get columns
		var $columns = [];
		$table.find('THEAD TH').each(function () {
			var columnname = jQuery.data(this, "column");
			if (columnname != "") {
				$columns.push({
					data : columnname
				});
			}
		});
		if ($table.find('THEAD TH.actions').size() > 0) {
			$columns.push(null);
		}
		if ($columns.length > 0) {
			datatableOptions.columns = $columns
		}
		console.log(datatableOptions)
		// init table
		$table.dataTable(datatableOptions);
	});
};

var initCTAXHR = function () {
	$fancyboxDefaults = {
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
	};
	$ajaxButtons = "A.btn[href*='add'], A.btn[href*='edit'], A.btn[href*='details'], A.btn[href*='delete']";
	$ajaxCTAOpen = "A.btn-cta-xhr";
	$ajaxCTAClose = ".fancybox-wrap .btn-cta-xhr-close, .fancybox-wrap .flashmessages";
	$ajaxForms = ".fancybox-wrap .form-xhr";
	
	jQuery($ajaxCTAOpen).each(function(){
		$this = jQuery(this);
		$this.addClass('fancybox.ajax');
		$actioncontext = jQuery.data($this, "actioncontext");
		if ($actioncontext != "") {
			this.actioncontext = $actioncontext;
			jQuery.fancybox.actioncontext = $actioncontext;
		}
		$fancyboxDefaults = jQuery.extend($fancyboxDefaults, {
			beforeClose : function () {
				console.log( 
					jQuery.fancybox.actioncontext, 
					(jQuery.fancybox.actioncontext) ? jQuery(jQuery.fancybox.actioncontext).datatable().data() : undefined
				);
			}
		})
		jQuery(this).fancybox($fancyboxDefaults);
	}); 

	jQuery('BODY').on('submit', $ajaxForms, {}, function (oEvent) {
		var formURL = (this.action),
			form = $(this),
			formdata = form.serializeArray();
		
		formdata.push( (jQuery('.fancybox-wrap INPUT[name=del].btn').size() > 0) ? {name: 'del', value: 'delete'} : null );
		
		jQuery.fancybox.showLoading();
		
		jQuery.ajax({
			headers : {
				'Accept' : 'text/html',
				'X-Fancybox' : 'true'
			},
			type	: "POST",
			cache	: false,
			url		: formURL,
			data	: formdata,
			success	: function (data) {
				
				jQuery.fancybox(data, $fancyboxDefaults);
				jQuery('.flashmessages').first().parents('.fancybox-skin').removeClass('fancybox-skin');
				jQuery('.datatable').ajax.reload(function ( tabledata ) {
					console.log( jQuery.fancybox.actioncontext, tabledata );
				}, true);
				
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
};
	
jQuery(document).ready(function ($) {
	initDatatables();
	initCTAXHR();
});