define([], function() {
	var _UserCode = webix.storage.local.get('_UserCode');
	var stockObject = new Object();
	
	stockObject.getStoreTSInfo = function(StoreCode){
		return webix.ajax().post(urlstr+"/WBStockMng/getStoreTSInfo",{StoreCode:StoreCode});
	}

	stockObject.getCWHTSInfo = function(CWHCode){
		return webix.ajax().post(urlstr+"/WBStockMng/getCWHTSInfo",{CWHCode:CWHCode});
	}
	
	stockObject.getPartyAdjRec = function(postData) {
		return webix.ajax().post(urlstr+"/WBStockMng/getPartyAdjRec",postData);
	}

	stockObject.getRepRetOrder = function(postData){
		return webix.ajax().post(urlstr+"/WBStockMng/getRepRetOrder",postData);
	}

     stockObject.getRepRetOrderItem = function(postData){
     	return webix.ajax().post(urlstr+"/WBStockMng/getRepRetOrderItem",postData);
     }
     
      stockObject.getProdHSStock = function(WHCode,SKUCode){
      	var postData={WHCode:WHCode,SKUCode:SKUCode};
     	return webix.ajax().post(urlstr+"/WBStockMng/getProdHSStock",postData);
     }
	return stockObject;
});