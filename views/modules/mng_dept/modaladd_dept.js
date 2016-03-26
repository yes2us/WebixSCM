define(function(){

	return {
		$ui:{
			view:"window", modal:true, id:"modaladd-dept", position:"center",
			head:"增加新部门",
			body:{
				paddingY:20, paddingX:30, elementsConfig:{labelWidth: 140}, view:"form", id:"order-form", 
				elements:[
					{ view:"text", name:"deptcode",label:"部门编号", id:"deptcode", required:true,width:500},
					{ view:"text", name:"deptname", label:"部门名称", id:"deptname", required:true, width:500},
					{ view:"text", name:"deptsname", label:"部门简称", id:"deptsname", required:true, width:500},
					{ view:"select", name:"depttype", label:"部门类型", id:"depttype", 
					options:["店铺","部门","办事处","分公司","总公司"], required:true,width:500},
					{ view:"select", name:"supdeptcode", label:"上级部门", id:"supdeptcode", required:true, 
					options:urlstr+"/WBDeptMng/getDeptSNameList/DSSuffix/"+_DSSuffix},
					{ view:"checkbox", name:"enabled", label:"启用部门", id:"enabled", required:true, value:1},

					{
						margin:10,
						cols:[
							{},
							{ view:"button", label:"增加", type:"form", align:"center", width:120, click:function(){
								if(!this.getFormView().validate()) {webix.message("请填充带红色*的内容");return;}
								
								$$("lt_deptlist").add(this.getFormView().getValues());
								webix.message('保存成功!');
								webix.$$("modaladd-dept").close();
							}},
							{ view:"button", label:"取消",align:"center", width:120, click:function(){
								webix.$$("modaladd-dept").close();
							}}
						]
					}

				]
			}
		}
	};

});