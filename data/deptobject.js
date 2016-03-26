define([], function() {
	var deptObject = new Object();
	
	
	deptObject.getDeptList = function(EnabledType,StaffCode) {
		var post={DSSuffix:_DSSuffix};
		if(EnabledType=='ScoreMngEnabled') post.ScoreMngEnabled = true;
		if(EnabledType=='VIPMngEnabled') post.VIPMngEnabled = true;
		if(EnabledType=='Enabled') post.Enabled = true;
		if(StaffCode) post.StaffCode = StaffCode; 
		
		return webix.ajax().post(urlstr+"/WBDeptMng/getDeptList",post);
	}
	
	deptObject.getDeptSNameList = function(EnabledType) {
		var post={DSSuffix:_DSSuffix};
		if(EnabledType=='ScoreMngEnabled') post.ScoreMngEnabled = 1;
		if(EnabledType=='VIPMngEnabled') post.VIPMngEnabled = 1;
		
		return webix.ajax().post(urlstr+"/WBDeptMng/getDeptSNameList",post);
	}
		
	deptObject.getDeptGoal = function(deptcode) {
		return webix.ajax().post(urlstr+"/WBDeptMng/getDeptGoal",
		{DeptCode:deptcode,DSSuffix:_DSSuffix});
	}


	deptObject.getDeptWage = function(deptcode) {
		return webix.ajax().post(urlstr+"/WBDeptMng/getDeptWage",
		{DeptCode:deptcode,DSSuffix:_DSSuffix});
	}

	deptObject.getDeptStaff = function(deptcode) {
		return webix.ajax().post(urlstr+"/WBDeptMng/getDeptStaffs",
		{DeptCode:deptcode,DSSuffix:_DSSuffix});
	}
	
	deptObject.getDeptMnger  = function(deptcode) {
		return webix.ajax().post(urlstr+"/WBDeptMng/getDeptMngers",
		{DeptCode:deptcode,DSSuffix:_DSSuffix});
	}
		
		
	deptObject.getDeptEvent = function(deptcode,showtype) {
		return webix.ajax().post(urlstr+"/WBDeptMng/getDeptEvents",
		{DeptCode:deptcode,ShowType:showtype,DSSuffix:_DSSuffix});
	}

	return deptObject;
});