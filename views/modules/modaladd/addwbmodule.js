define(function(){

	return {
		$ui:{
			view:"window", modal:true, id:"modaladd-wbmodule", position:"center",
			head:"增加模块",
			body:{
				view:"form", 
				id:"user-wbmodule",
				paddingY:20, 
				paddingX:30, 
				elementsConfig:{labelWidth: 140}, 
				elements:[
					{ view:"text",id:"moduleid",name:"moduleid",label:"模块ID", required:true,width:500},
					{ view:"text",id:"modulename",name:"modulename", label:"模块名称", required:true,width:500},
					{ view:"text",id:"moduleicon",name:"moduleicon",label:"模块图标", required:true,width:500},
					{ view:"text",id:"moduledesc",name:"moduledesc",label:"模块描述", required:true,width:500},
					{ view:"text",id:"openstate",name:"openstate",label:"展示状态", required:true,width:500},
					{ view:"text",id:"moduleorder",name:"moduleorder",label:"模块次序", required:true,width:500},
					{
						margin:10,
						cols:[
							{},
							{ view:"button", label:"增加", type:"form", align:"center", width:120, click:function(){
								
								if(!this.getFormView().validate()) {webix.message("请填充带红色*的内容");return;}
								
								$$("dt_wbmodule").add(this.getFormView().getValues());
								webix.message('保存成功!');
//								var values = this.getFormView().getValues();
//								values.webix_operation = 'insert';
//								webix.ajax().post(urlstr+"/WBCURDMng/saveParameter",values);
//								webix.message(JSON.stringify(values));

								webix.$$("modaladd-wbmodule").close();
							}},
							{ view:"button", label:"取消",align:"center", width:120, click:function(){
								webix.$$("modaladd-wbmodule").close();
							}}
						]
					}

				]
			}
		}
	};

});