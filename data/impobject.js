define([], function() {
	var impObject = new Object();
	
		
	impObject.getImportData = function(PageIndex,PageLen) {
		return webix.ajax().post(urlstr+"/WBUpLoadFile/getImportData",{DSSuffix:_DSSuffix,PageIndex:PageIndex,PageLen:PageLen});
	}

	impObject.clearImportData = function() {
		return webix.ajax().post(urlstr+"/WBUpLoadFile/clearImportData",{DSSuffix:_DSSuffix});
	}
	
	impObject.saveImportData = function() {
		return webix.ajax().post(urlstr+"/WBUpLoadFile/saveImportData",{DSSuffix:_DSSuffix});
	}
		
	return impObject;
});