define([], function() {
	var _UserCode = webix.storage.local.get('_UserCode');
	var stockObject = new Object();
	
	stockObject.getFGWarehouseTSInfo = function(WHCode){
		return webix.ajax().post(urlstr+"/WBStockMng/getFGWarehouseTSInfo",{WHCode:WHCode});
	}
	
	stockObject.getRetTargetWHSubWHTSInfo = function(postData){
		return webix.ajax().post(urlstr+"/WBStockMng/getRetTargetWHSubWHTSInfo",postData);
	}
	
     
    stockObject.getPartyIndex = function(postData){
    	   return webix.ajax().post(urlstr+"/WBStockMng/getPartyIndex",postData);
    }
         
     stockObject.getWHSKCInfo = function(postData){
       return webix.ajax().post(urlstr+"/WBStockMng/getWHSKCInfo",postData);
     }
  
      stockObject.getWHSKCInfoNewSKC = function(postData){
       return webix.ajax().post(urlstr+"/WBStockMng/getWHSKCInfoNewSKC",postData);
     }
       
      stockObject.getProdHSStock = function(WHCode,SKUCode){
      	var postData={WHCode:WHCode,SKUCode:SKUCode};
     	return webix.ajax().post(urlstr+"/WBStockMng/getProdHSStock",postData);
     }
	return stockObject;
});