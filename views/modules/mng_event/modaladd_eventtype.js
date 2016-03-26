define(function(){

	return {
		$ui:{
			view:"window", modal:true, id:"modaladd-eventtype", position:"center",
			head:"增加事件类型",
			body:{
				paddingY:20, paddingX:30, elementsConfig:{labelWidth: 140}, view:"form", id:"order-form", 
				elements:[
					{ view:"text", name:"eventtypecode",label:"类型编号", id:"eventtypecode", required:true,width:350},
					{ view:"text", name:"eventtype", label:"事件类型", id:"eventtype", required:true, width:350},
					{ view:"text", name:"eventtypeorder", label:"类型次序", id:"eventtypeorder",width:350},				
					{ view:"select", name:"eventscopecode", label:"所属范围", id:"eventscopecode", required:true,
					options:urlstr+"/WBEventMng/getScopeSelectList/DSSuffix/"+_DSSuffix},
					{ view:"textarea", name:"eventtypedesc", label:"描述", id:"eventtypedesc"},

					{
						margin:10,
						cols:[
							{},
							{ view:"button", label:"增加", type:"form", align:"center", width:120, click:function(){
								if(!this.getFormView().validate()) {webix.message("请填充带红色*的内容");return;}
								
								$$("dt_eventtype").add(this.getFormView().getValues());
								webix.message('保存成功!');
								webix.$$("modaladd-eventtype").close();
							}},
							{ view:"button", label:"取消",align:"center", width:120, click:function(){
								webix.$$("modaladd-eventtype").close();
							}}
						]
					}

				]
			}
		}
	};

});