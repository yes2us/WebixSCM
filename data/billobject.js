define([], function() {
	var billObject = new Object();
	
	billObject.getPartyBMRecord = function(postData) {
		return webix.ajax().post(urlstr+"/WBBillMng/getPartyBMRecord",postData);
	}

     billObject.getMovSKUPlan = function(postData){
        return webix.ajax().post(urlstr+"/WBBillMng/getMovSKUPlan",postData);	
     }


     billObject.getMovSKUPlanItem = function(postData){
        return webix.ajax().post(urlstr+"/WBBillMng/getMovSKUPlanItem",postData);	
     }
  
        
     billObject.getMovSKCPlanItem = function(postData){
     	return webix.ajax().post(urlstr+"/WBBillMng/getMovSKCPlanItem",postData);
     }
     
	return billObject;
});