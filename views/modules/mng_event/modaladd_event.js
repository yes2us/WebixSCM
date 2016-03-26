define(function(){

	return {
		$ui:{
			view:"window", modal:true, id:"modaladd-event", position:"center",
			head:"增加新事件",
			body:{
				paddingY:20, paddingX:30, elementsConfig:{labelWidth: 140}, view:"form", id:"event-form", 
				elements:[
					{ view:"text", name:"eventcode",label:"事件编号", id:"eventcode", disabled:true,width:500},
					{ view:"select", name:"eventscopecode", label:"事件范围", id:"eventscopecode", 
						options:urlstr+"/WBEventMng/getScopeSelectList", required:true, width:500,
						on:{
							onChange:function(newval,oldval){
								webix.ajax().post(urlstr+"/WBEventMng/getTypeSelectList",{EventScopeCode:newval,DSSuffix:_DSSuffix},function(response){
									$$("eventtypecode").define('options',JSON.parse(response));
									$$("eventtypecode").refresh();
								});
							}
						}
					},
					{ view:"select", name:"eventtypecode", label:"事件类型", id:"eventtypecode",options:[], required:true,  width:500},
					{ view:"text", name:"event", label:"事件内容", id:"event", required:true, width:500},
					{ view:"text", name:"yscore", label:"给予Y分", id:"yscore", width:500},
					{ view:"text", name:"xscore", label:"给予X分", id:"xscore", width:500},
					{ view:"select", name:"deliveryway", label:"得分方式", id:"deliveryway", 
					options:[{id:1,value:'申请'},{id:2,value:'下达'},{id:3,value:'申请与下达'}], 
					required:true, width:500},

					{ view:"text", name:"eventorder", label:"事件次序", id:"eventorder"},
					
					{ view:"checkbox", name:"enabled", label:"是否启用", id:"enabled", required:true, value:1},
					{ view:"textarea", name:"remark", id:'remark',  height:150, label:"备注", labelPosition:"top"},
					{
						margin:10,
						cols:[
							{},
							{ view:"button", label:"增加", type:"form", align:"center", width:120, click:function(){
								if(!this.getFormView().validate()) {webix.message("请填充带红色*的内容");return;}
								
								$$("dt_events").add(this.getFormView().getValues());
								webix.message('保存成功!');
								webix.$$("modaladd-event").close();
							}},
							{ view:"button", label:"取消",align:"center", width:120, click:function(){
								webix.$$("modaladd-event").close();
							}}
						]
					}

				]
			}
		}
	};

});