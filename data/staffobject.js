define([], function() {
	var staffObject = new Object();

	staffObject.getStaffList = function(StaffCode) {
		var postdata = {DSSuffix:_DSSuffix};
		if(StaffCode) postdata.StaffCode = StaffCode;
		
		return webix.ajax().post(urlstr+"/WBStaffMng/getAllStaffs",postdata);
	}

	staffObject.getStaffFixedEvent = function(staffcode,showtype) {
		return webix.ajax().post(urlstr+"/WBStaffMng/getStaffFixedEvent",
		{StaffCode:staffcode,ShowType:showtype,DSSuffix:_DSSuffix});
	}

	staffObject.getStaffSubcriber = function(subcribercode) {
		return webix.ajax().post(urlstr+"/WBStaffMng/getStaffSubcriber",
		{SubcriberCode:subcribercode,DSSuffix:_DSSuffix});
	}
	
	return staffObject;
});