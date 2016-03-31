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

	stockObject.getReplenishBill = function(postData){
		return webix.ajax().post(urlstr+"/WBStockMng/getReplenishBill",postData);
	}

     stockObject.getReturnBill = function(postData){
     	return webix.ajax().post(urlstr+"/WBStockMng/getReturnBill",postData);
     }
     
      stockObject.getProdHSStock = function(WHCode,SKUCode){
      	var postData={WHCode:WHCode,SKUCode:SKUCode};
     	return webix.ajax().post(urlstr+"/WBStockMng/getProdHSStock",postData);
     }
	return stockObject;
});