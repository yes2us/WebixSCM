define(function(){

	return {
		$ui:{
			view:"window", modal:true, id:"modaladd-role", position:"center",
			head:"增加仓库",
			body:{
				view:"form", 
				id:"role-form",
				paddingY:20, 
				paddingX:30, 
				elementsConfig:{labelWidth: 140}, 
				elements:[
					{ view:"text",id:"rolename",name:"rolename",label:"角色", required:true,width:500},
					{ view:"text",id:"roleenabled",name:"roleenabled", label:"启用", required:true,width:500},
					{ view:"text",id:"roletype",name:"roletype", label:"类型", required:true,width:500},
					{ view:"text",id:"roledesc",name:"roledesc", label:"描述",width:500},
					{
						margin:10,
						cols:[
							{},
							{ view:"button", label:"增加", type:"form", align:"center", width:120, click:function(){
								
								if(!this.getFormView().validate()) {webix.message("请填充带红色*的内容");return;}
								
								$$("dt_role").add(this.getFormView().getValues());
								webix.message('保存成功!');

								webix.$$("modaladd-role").close();
							}},
							{ view:"button", label:"取消",align:"center", width:120, click:function(){
								webix.$$("modaladd-role").close();
							}}
						]
					}

				]
			}
		}
	};

});