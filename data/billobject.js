define([], function() {
	var billObject = new Object();

	
	billObject.getPartyAdjRec = function(postData) {
		return webix.ajax().post(urlstr+"/WBBillMng/getPartyAdjRec",postData);
	}

	billObject.getRepRetOrder = function(postData){
		return webix.ajax().post(urlstr+"/WBBillMng/getRepRetOrder",postData);
	}

     billObject.getRepRetOrderItem = function(postData){
     	return webix.ajax().post(urlstr+"/WBBillMng/getRepRetOrderItem",postData);
     }
     
     billObject.getRetPlanOrder = function(postData){
     	return webix.ajax().post(urlstr+"/WBBillMng/getRetPlanOrder",postData);
     }
     
     billObject.getRefrSKCPlan = function(postData){
     	return webix.ajax().post(urlstr+"/WBBillMng/getRefrSKCPlan",postData);
     }
     
     billObject.getMovSKCPlan = function(postData){
        return webix.ajax().post(urlstr+"/WBBillMng/getMovSKCPlan",postData);	
     }
     
  
	return billObject;
});