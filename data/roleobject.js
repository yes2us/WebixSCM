define([], function() {
	var roleObject = new Object();
	
	roleObject.getRoleList= function() {
		return webix.ajax().post(urlstr+"/WBRoleMng/getRoleList");
	}

	roleObject.getRoleUserList = function(rolename) {
			return webix.ajax().post(urlstr+"/WBRoleMng/getRoleUserList",{RoleName:rolename});
	}

	roleObject.getRolePrevilege = function(rolename) {
			return webix.ajax().post(urlstr+"/WBRoleMng/getRolePrevilege",{RoleName:rolename});
	}
	
	return roleObject;
});