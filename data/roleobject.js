define([], function() {
	var roleObject = new Object();
	
	roleObject.getAllRole= function() {
		return webix.ajax().post(urlstr+"/WBRoleMng/getAllRole",{DSSuffix:_DSSuffix});
	}

	roleObject.getRoleStaff = function(rolename) {
			return webix.ajax().post(urlstr+"/WBRoleMng/getRoleStaff",{RoleName:rolename,DSSuffix:_DSSuffix});
	}

	roleObject.getRoleAuthTask = function(rolename) {
			return webix.ajax().post(urlstr+"/WBRoleMng/getRoleAuthTask",{RoleName:rolename,DSSuffix:_DSSuffix});
	}
	
	return roleObject;
});