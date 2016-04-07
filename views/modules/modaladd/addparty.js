define(function(){

	return {
		$ui:{
			view:"window", modal:true, id:"modaladd-party", position:"center",
			head:"增加仓库",
			body:{
				view:"form", 
				id:"party-form",
				paddingY:20, 
				paddingX:30, 
				elementsConfig:{labelWidth: 140}, 
				elements:[
					{ view:"text",id:"partycode",name:"partycode",label:"仓库编号", required:true,width:500},
					{ view:"text",id:"partyname",name:"partyname", label:"仓库名称", required:true,width:500},
					{
						margin:10,
						cols:[
							{},
							{ view:"button", label:"增加", type:"form", align:"center", width:120, click:function(){
								
								if(!this.getFormView().validate()) {webix.message("请填充带红色*的内容");return;}
								
								$$("dt_party").add(this.getFormView().getValues());
								webix.message('保存成功!');
//								var values = this.getFormView().getValues();
//								values.webix_operation = 'insert';
//								webix.ajax().post(urlstr+"/WBCURDMng/saveParameter",values);
//								webix.message(JSON.stringify(values));

								webix.$$("modaladd-party").close();
							}},
							{ view:"button", label:"取消",align:"center", width:120, click:function(){
								webix.$$("modaladd-party").close();
							}}
						]
					}

				]
			}
		}
	};

});