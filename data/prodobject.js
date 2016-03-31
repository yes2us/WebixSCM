define([], function() {
	var _UserCode = webix.storage.local.get('_UserCode');
	var prodObject = new Object();
	
	prodObject.getProductList = function(PostData){
		return webix.ajax().post(urlstr+"/WBProdMng/getProductList",PostData);
	}
	
	prodObject.getProdSale = function(PartyCode,SKUCode) {
		var postData={PartyCode:PartyCode,SKUCode:SKUCode};
		return webix.ajax().post(urlstr+"/WBProdMng/getProdSale",postData);
	}

	prodObject.getProdIndicator = function(PostData){
		return webix.ajax().post(urlstr+"/WBProdMng/getProdIndicator",postData);
	}

     prodObject.getProdIndicatorItem = function(ProductColorCode){
     	return webix.ajax().post(urlstr+"/WBProdMng/getProdIndicatorItem",{ProductColorCode:ProductColorCode});
     }
	return prodObject;
});