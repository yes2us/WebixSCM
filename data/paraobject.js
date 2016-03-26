define([], function() {
	var paraObject = new Object();

	paraObject.getSysPara = function() {
		return webix.ajax().post(urlstr+"/WBParaMng/getSysPara",{DSSuffix:_DSSuffix});
	}

	paraObject.getWBMenu = function(_UserCode) {
		return webix.ajax().post(urlstr+"/WBParaMng/getWBMenu",{DSSuffix:_DSSuffix,UserCode:_UserCode});
	}
	
	paraObject.getSQLList = function() {
		return webix.ajax().post(urlstr+"/WBParaMng/getSQLList",{DSSuffix:_DSSuffix});
	}
	
	paraObject.getDebugRecord = function(){
		return webix.ajax().post(urlstr+"/WBParaMng/getDebugRecord",{DSSuffix:_DSSuffix});
	}
	
	return paraObject;
});