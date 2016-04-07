define([], function() {
	var partyObject = new Object();
	
	partyObject.getPartyList = function(){
				return webix.ajax().post(urlstr+"/WBPartyMng/getPartyList");
	}
	partyObject.getRegionList = function(){
		return webix.ajax().post(urlstr+"/WBPartyMng/getRegionList",{MaintainerCode:_UserCode,FieldStr:"PartyCode,PartyName"});
	}
	
	partyObject.getRelPartyList = function(postData) {
		return webix.ajax().post(urlstr+"/WBPartyMng/getRelPartyList",postData);
	}

    partyObject.getPartyRelation = function(partycode){
    			return webix.ajax().post(urlstr+"/WBPartyMng/getPartyRelation",{PartyCode:partycode});
    }
	return partyObject;
});