/**
 * 
 */
jQuery.noConflict();

var initDatatables = function () {
	jQuery('.datatable').each(function (idx, elm) { 
		var $table = jQuery(this),
			datatableOptions = {
				renderer : 'bootstrap',
				language : {
					url : '//cdn.datatables.net/plug-ins/1.10.9/i18n/German.json'
				},
				ajax : null
			}
		;
		
		// has data source?
		var $src = jQuery($table).data("src");
		if ($src) {
			datatableOptions.ajax = {
				url : $src,
				type : "POST"
			};
		}
		
		// get columns
		var $columns = false;
		$table.find('THEAD TH').each(function () {
			var columnname = jQuery(this).data("column");
			if (columnname) {
				if (!$columns) { $columns = []; }
				$columns.push({
					data : columnname
				});
			}
		});
		if ($columns) {
			if ($table.find('THEAD TH.actions').size() > 0) {
				$columns.push(null);
		        $columnDefs = [ {
		            targets : -1,
		            data : "user_id",
		            sortable : false,
		            searchable : false,
		            render: function ( data, type, full, meta ) {
		            	console.log(arguments, this);
		            	return "-custom-";
		            }
		        } ];
		        datatableOptions.columnDefs = $columnDefs;
			}
			datatableOptions.columns = $columns;
			// actions' columns
		}
		
		// init table
		console.log(datatableOptions);
		$table.dataTable(datatableOptions);
	});
};

var initCTAXHR = function () {
	var $fancyboxDefaults = {
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
		},
		$ajaxButtons = "A.btn[href*='add'], A.btn[href*='edit'], A.btn[href*='details'], A.btn[href*='delete']",
		$ajaxCTAOpen = "A.btn-cta-xhr",
		$ajaxCTAClose = ".fancybox-wrap .btn-cta-xhr-close, .fancybox-wrap .flashmessages",
		$ajaxForms = ".fancybox-wrap .form-xhr"
	;
	
	jQuery($ajaxCTAOpen).each(function(){
		var $this = jQuery(this),
			$this.addClass('fancybox.ajax'),
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