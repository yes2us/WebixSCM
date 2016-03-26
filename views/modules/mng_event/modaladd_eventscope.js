define(function(){

	return {
		$ui:{
			view:"window", modal:true, id:"modaladd-eventscope", position:"center",
			head:"增加事件范围",
			body:{
				paddingY:20, paddingX:30, elementsConfig:{labelWidth: 140}, view:"form", id:"order-form", 
				elements:[
					{ view:"text", name:"eventscopecode",label:"范围编号", id:"eventscopecode", required:true,width:350},
					{ view:"text", name:"eventscope", label:"事件范围", id:"eventscope", required:true, width:350},
					{ view:"text", name:"eventscopeorder", label:"范围次序", id:"eventscopeorder",width:350},				
					{ view:"textarea", name:"eventscopedesc", label:"描述", id:"eventscopedesc"},

					{
						margin:10,
						cols:[
							{},
							{ view:"button", label:"增加", type:"form", align:"center", width:120, click:function(){
								if(!this.getFormView().validate()) {webix.message("请填充带红色*的内容");return;}
								
								$$("dt_eventscope").add(this.getFormView().getValues());
								webix.message('保存成功!');
								webix.$$("modaladd-eventscope").close();
							}},
							{ view:"button", label:"取消",align:"center", width:120, click:function(){
								webix.$$("modaladd-eventscope").close();
							}}
						]
					}

				]
			}
		}
	};

});