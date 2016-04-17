define([], function() {
	var impObject = new Object();
	
		
	impObject.getImportData = function(TargetTable,PageIndex,PageLen) {
		return webix.ajax().post(urlstr+"/WBUpLoadFile/getImportData",
		{TargetTable:TargetTable,Page:PageIndex+","+PageLen});
	}

	impObject.clearImportData = function(TargetTable) {
		return webix.ajax().post(urlstr+"/WBUpLoadFile/clearImportData",{TargetTable:TargetTable});
	}
	
	impObject.saveImportData = function(TargetTable) {
		return webix.ajax().post(urlstr+"/WBUpLoadFile/saveImportData",{TargetTable:TargetTable});
	}
		
	return impObject;
});