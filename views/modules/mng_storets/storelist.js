define(
["data/storeobject",],
function(storeobject){
	var _UserCode = webix.storage.local.get('_UserCode');

	return {
		$ui:{
			width:260,
			type: "clean",
			css: "highlighted_header header5",
			header:"店铺列表",
			body:{
			rows:[
			 {
                view:"toolbar",
                elements:[
					{rows:[
								{view: "combo",label: "选择区域",//css:"fltr",
									options:urlstr+'/WBDeptMng/getDeptSNameList/VIPMngEnabled/1/StaffCode/'+_UserCode+"/DSSuffix/"+_DSSuffix,
									on:{
										onChange:function(newregioncode, oldregioncode){
											if(newregioncode!=oldregioncode)
											{
												 $$("lt_stores").clearAll();
												 $$("lt_stores").refresh();
											}
											var postData = {RegionCode:newregioncode,MaintainerCode:_UserCode};
											$$("lt_stores").parse(storeobject.getStoreList(postData));
										}
									}},
									
					                {view:"text", id:"grouplist_input",label:"查询门店",placeholder:"请输入门店编号，名称进行查询",
					                  on:{onTimedKeyPress:function(){
					                	        var value = this.getValue();
								       	 		$$("lt_stores").filter(function(obj){
								            	return (obj.partycode && obj.partycode.indexOf(value)>=0) || (obj.partyname && obj.partyname.indexOf(value)>=0);
					                });
					                  }}},
					                
									]}
                ]
            },
				{					
					view: "list",
					id: "lt_stores",
					select: true,
				    template:"#partycode# - #partyname#<span class='info' style='width:70px'>#partyname#</span>",
					scheme:{
					$init:function(obj){
					}
				},
				    
					on: {
						onAfterLoad: function(){this.select(1);}
					}
				}
			]
			}
		}
	}
});