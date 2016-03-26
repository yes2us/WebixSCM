define(function(){

	return {
		$ui:{
			view:"window", modal:true, id:"modaladd-deptwage", position:"center",
			head:"增加工资方案",
			body:{
				paddingY:20, paddingX:30, elementsConfig:{labelWidth: 140}, view:"form", id:"order-form", 
				elements:[
					{ view:"select", name:"deptcode", label:"部门名称", id:"deptcode", required:true, 
					options:urlstr+"/WBDeptMng/getDeptSNameList/DSSuffix/"+_DSSuffix},
					{ view:"select", name:"wagelevel", label:"工资方案", id:"wagelevel", required:true, 
					options:[{id:1,value:"导购方案"},{id:2,value:"店长方案"},{id:3,value:"经理方案"}]},
					
					{ view:"text", name:"basicsalary", label:"保底工资", id:"basicsalary", required:true, width:500},
					{ view:"text", name:"dutysalary", label:"职务工资", id:"dutysalary", required:true, width:500},
					{ view:"text", name:"orginalbonusratio", label:"原提升系数", id:"orginalbonusratio", required:true, width:500},
					{ view:"text", name:"wagelevelratios", label:"目标级别", id:"wagelevelratios", required:true, width:500},
					{ view:"text", name:"scorelevelranges", label:"分值系数", id:"scorelevelranges", required:true, width:500},
					
					{
						margin:10,
						cols:[
							{},
							{ view:"button", label:"增加", type:"form", align:"center", width:120, click:function(){
								if(!this.getFormView().validate()) {webix.message("请填充带红色*的内容");return;}
								
								$$("dt_deptwage").add(this.getFormView().getValues());
								webix.message('保存成功!');
								webix.$$("modaladd-deptwage").close();
							}},
							{ view:"button", label:"取消",align:"center", width:120, click:function(){
								webix.$$("modaladd-deptwage").close();
							}}
						]
					}

				]
			}
		}
	};

});