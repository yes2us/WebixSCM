define(function(){

	return {
		$ui:{
			view:"window", modal:true, id:"modaladd-role", position:"center",
			head:"增加新角色",
			body:{
				paddingY:20, paddingX:30, elementsConfig:{labelWidth: 140}, view:"form", id:"event-form", 
				elements:[
					{ view:"text", name:"rolename",label:"角色", id:"rolename", required:true,width:500},
					{ view:"text", name:"roletype", label:"角色类型", id:"eventtype", required:true,  width:500},
					
					{ view:"checkbox", name:"roleenabled", label:"是否启用", id:"roleenabled", required:true, value:1},
					{ view:"textarea",name:"roledesc", id:'roledesc', height:200, label:"备注", labelPosition:"top"},
					{
						margin:10,
						cols:[
							{},
							{ view:"button", label:"增加", type:"form", align:"center", width:120, click:function(){
								if(!this.getFormView().validate()) {webix.message("请填充带红色*的内容");return;}
								
								$$("lt_rolelist").add(this.getFormView().getValues());
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