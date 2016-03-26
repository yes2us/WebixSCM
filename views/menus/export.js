define(function(){
    var printer = new Object();

	printer.print = function(printAreaId) {
		return	{
			$ui:{
						view: "submenu",
						id: "exportPopup",
						width: 200,
						padding:0,
						data: [
							{id: 1, icon: "file-excel-o", value: "导出为Excel"},
							{id: 2, icon: "file-pdf-o", value: "导出为PDF"}
						],
						on:{
							onItemClick:function(id){
								if(id==1){
									$$(printAreaId).exportToExcel("http://"+window.location.host+"/POAAdmin/grid-excel-php/generate.php");
								}
								else if(id==2)
									$$(printAreaId).exportToPDF("http://"+window.location.host+"/POAAdmin/grid-pdf-php/generate.php");
							}
						}
		}
		}
	};
	
	return printer;

});