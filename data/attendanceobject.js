define([], function() {
	var attendanceObject = new Object();
	
	attendanceObject.queryAttendanceRecord = function(condition) {
		if(arguments.length>0)
		return webix.ajax().post(urlstr+"/WBAttendanceMng/queryAttendanceRecord",
		{
			Condition:condition,
			DSSuffix:_DSSuffix
		});
		else
		return webix.ajax().post(urlstr+"/WBAttendanceMng/queryAttendanceRecord",{DSSuffix:_DSSuffix});
	}
	return attendanceObject;
});