define(
["data/vipobject",],
function(vipobject){
	var _UserCode = webix.storage.local.get('_UserCode');

	return {
		$ui:{
			width:260,
			type: "clean",
			css: "highlighted_header header5",
			header:"会员列表",
			body:{
			rows:[
			 {
                view:"toolbar",
                elements:[
					{rows:[
								{view: "combo",label: "选择店铺",//css:"fltr",
									options:urlstr+'/WBDeptMng/getDeptSNameList/VIPMngEnabled/1/StaffCode/'+_UserCode+"/DSSuffix/"+_DSSuffix,
									on:{
										onChange:function(newdeptcode, olddeptcode){
											if(newdeptcode!=olddeptcode)
											{
												 $$("lt_emotionplan").clearAll();
												 $$("lt_emotionplan").refresh();
											}
											var postData = {BelongStoreCode:newdeptcode,MaintainerCode:_UserCode,IsReserved:true};
											$$("lt_emotionplan").parse(vipobject.getVIPList(1,postData));
										}
									}},
									
					                {view:"text", id:"grouplist_input",label:"查询员工",placeholder:"请输入姓名,手机号进行查询",
					                  on:{onTimedKeyPress:function(){
					                	        var value = this.getValue();
								       	 		$$("lt_emotionplan").filter(function(obj){
								            	return (obj.mobileno && obj.mobileno.indexOf(value)>=0) || (obj.customername && obj.customername.indexOf(value)>=0);
					                });
					                  }}},
					                
					                { view:"segmented", value:"all", label:"",inputWidth:250, 
										options:[
											{ id:"all", value:"全部" },	
											{ id:"印象期", value:"印象期" },	
											{ id:"追求期", value:"追求期"},
											{ id:"恋爱期", value:"恋爱期"}],
											click:function(){
												var val = this.getValue();
												$$("lt_emotionplan").filter(function(obj){
													if(val=='all') return true;
										            return  obj.anzrelationlevel==val;
										      });
									 		}
									},
				
									]}
                ]
            },
				{					
					view: "list",
					id: "lt_emotionplan",
					select: true,
				    template:"#mobileno# - #customername#<span class='info' style='width:70px'>#anzrelationlevel#</span>",
					scheme:{
					$init:function(obj){
						if (obj.anzrelationlevel=='印象期') obj.$css = "bgcolor1";
						if (obj.anzrelationlevel=='追求期') obj.$css = "bgcolor2";
						if (obj.anzrelationlevel=='恋爱期') obj.$css = "bgcolor3";
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