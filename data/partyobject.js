define([], function() {
	var partyObject = new Object();
	
	partyObject.getRegionList = function(){
		return webix.ajax().post(urlstr+"/WBPartyMng/getRegionList",{MaintainerCode:_UserCode,FieldStr:"PartyCode,PartyName"});
	}
	
	partyObject.getRelPartyList = function(postData) {
		return webix.ajax().post(urlstr+"/WBPartyMng/getRelPartyList",postData);
	}

	partyObject.getPartyIndex = function(postData){
		return webix.ajax().post(urlstr+"/WBPartyMng/getPartyIndex",postData);
	}


	return partyObject;
});