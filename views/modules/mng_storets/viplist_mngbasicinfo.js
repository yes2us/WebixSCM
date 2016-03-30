define(
["data/vipobject",],
function(vipobject){
	var _UserCode = webix.storage.local.get('_UserCode');
	
	var toolbar = {
                view:"toolbar",
                elements:[
					{rows:[
									{view: "combo",label: "选择店铺",
									options:urlstr+'/WBDeptMng/getDeptSNameList/VIPMngEnabled/1/StaffCode/'+_UserCode+"/DSSuffix/"+_DSSuffix,
									on:{
										onChange:function(newdeptcode, olddeptcode){
											if(newdeptcode!=olddeptcode)
											{
												 $$("lt_mngbasicinfo").clearAll();
												 var postData={BelongStoreCode:newdeptcode,MaintainerCode:_UserCode};
												 $$("lt_mngbasicinfo").parse(vipobject.getVIPList(1,postData));
												 
												$$("dt_mydeptvip").clearAll();
												postData={BelongStoreCode:newdeptcode};
												$$("dt_mydeptvip").parse(vipobject.getVIPList(2,postData));
											}
					
										}
									}},
									
					                {view:"text", id:"grouplist_input",label:"查询员工",placeholder:"请输入姓名,手机号进行查询",
					                  on:{onTimedKeyPress:function(){
					                	        var value = this.getValue();
								       	 		$$("lt_mngbasicinfo").filter(function(obj){
								            	return (obj.mobileno && obj.mobileno.indexOf(value)>=0) || (obj.customername && obj.customername.indexOf(value)>=0);
					                });
					                  }}},
					                
									]}
                ]
           };
       
       var grouplist = {
					view: "grouplist",
					id: "lt_mngbasicinfo",
					select: true,
				    template:"#mobileno#- #customername#<div class='marker  status#isreserved#' style='width:50px;'>&nbsp;</div>",
					on: {
						onAfterLoad: function(){this.select(1);}
					}
				};
				
	return {
		$ui:{
			width:250,
			type: "clean",
			css: "highlighted_header header5",
			header:"会员列表",
			body:{
			rows:[
				toolbar,
				grouplist
			]}
		}
	}
});