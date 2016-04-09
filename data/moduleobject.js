define([], function() {
	var moduleObject = new Object();

	moduleObject.getModuleList = function() {
		return webix.ajax().post(urlstr+"/WBModuleMng/getModuleList");
	}

	moduleObject.getSubModuleList = function(parentmoduleid) {
		return webix.ajax().post(urlstr+"/WBModuleMng/getSubModuleList",
		{ParentModuleID:parentmoduleid});
	}

	moduleObject.getMyMenuTree = function(usercode) {
		return webix.ajax().post(urlstr+"/WBModuleMng/getMyMenuTree",
		{UserCode:usercode});
	}
	return moduleObject;
});