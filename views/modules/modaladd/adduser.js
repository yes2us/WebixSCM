define(function(){

	return {
		$ui:{
			view:"window", modal:true, id:"modaladd-user", position:"center",
			head:"增加仓库",
			body:{
				view:"form", 
				id:"user-form",
				paddingY:20, 
				paddingX:30, 
				elementsConfig:{labelWidth: 140}, 
				elements:[
					{ view:"text",id:"usercode",name:"usercode",label:"用户编号", required:true,width:500},
					{ view:"text",id:"usertruename",name:"usertruename", label:"用户真名", required:true,width:500},
					{ view:"text",id:"password",name:"password", type:"password",label:"密码", required:true,width:500},
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

								webix.$$("modaladd-user").close();
							}},
							{ view:"button", label:"取消",align:"center", width:120, click:function(){
								webix.$$("modaladd-user").close();
							}}
						]
					}

				]
			}
		}
	};

});