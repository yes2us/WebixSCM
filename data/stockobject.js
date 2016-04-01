define([], function() {
	var _UserCode = webix.storage.local.get('_UserCode');
	var stockObject = new Object();
	
	stockObject.getFGWarehouseTSInfo = function(WHCode){
		return webix.ajax().post(urlstr+"/WBStockMng/getFGWarehouseTSInfo",{WHCode:WHCode});
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
     
     
    stockObject.getStoreStockStruct = function(storecode){
    	   return webix.ajax().post(urlstr+"/WBStockMng/getStoreStockStruct",{StoreCode:storecode});
    }
         
      stockObject.getProdHSStock = function(WHCode,SKUCode){
      	var postData={WHCode:WHCode,SKUCode:SKUCode};
     	return webix.ajax().post(urlstr+"/WBStockMng/getProdHSStock",postData);
     }
	return stockObject;
});