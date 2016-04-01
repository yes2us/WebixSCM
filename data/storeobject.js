define([], function() {
	var _UserCode = webix.storage.local.get('_UserCode');
	var storeObject = new Object();
	
	storeObject.getRegionList = function(){
		return webix.ajax().post(urlstr+"/WBPartyMng/getRegionList",{MaintainerCode:_UserCode,FieldStr:"PartyCode,PartyName"});
	}
	
	storeObject.getStoreList = function(postData) {
		return webix.ajax().post(urlstr+"/WBPartyMng/getStoreList",postData);
	}

	storeObject.getStoreIndicator = function(postData){
		return webix.ajax().post(urlstr+"/WBPartyMng/getStoreIndicator",postData);
	}

	return storeObject;
});