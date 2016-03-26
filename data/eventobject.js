define([], function() {
	var eventObject = new Object();

	eventObject.getEventScope= function() {
		return webix.ajax().post(urlstr+"/WBEventMng/getEventScope",{DSSuffix:_DSSuffix});
	}

	eventObject.getEventType = function(eventscope) {
		if(arguments.length==1)
		{
			return webix.ajax().post(urlstr+"/WBEventMng/getEventType",
			{EventScopeCode:eventscope,DSSuffix:_DSSuffix});
		}
		else
		{
			return webix.ajax().post(urlstr+"/WBEventMng/getEventType",{DSSuffix:_DSSuffix});
		}
	}

	eventObject.getAllEvent = function(eventtype) {
		if(arguments.length==1)
		{
			return webix.ajax().post(urlstr+"/WBEventMng/getEvent",{EventTypeCode:eventtype,DSSuffix:_DSSuffix});
		}
		else
		{
			return webix.ajax().post(urlstr+"/WBEventMng/getEvent",{DSSuffix:_DSSuffix});
		}
	}
	
	return eventObject;
});