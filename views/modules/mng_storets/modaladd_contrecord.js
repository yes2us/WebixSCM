define(function(){

	return {
		$ui:{
			view:"window", modal:true, id:"modaladd-staff", position:"center",
			head:"增加新员工",
			body:{
				paddingY:20, paddingX:30, elementsConfig:{labelWidth: 140}, view:"form", id:"order-form", 
				elements:[
					{ view:"text", name:"staffcode",label:"员工编号", id:"staffcode", required:true,width:350},
					{ view:"text", name:"staffname", label:"员工姓名", id:"staffname", required:true, width:350},
					{ view:"text", name:"idcardno", label:"身份证号", id:"idcardno", width:350},
					{ view:"text", name:"mobileno", label:"手机号", id:"mobileno", width:350},
					{ view:"datepicker", name:"birthday", label:"生日", id:"birthday",value:"1990-01-01", stringResult:true, format:"%Y-%m-%d",width:350},
					{ view:"combo", name:"wagelevel", label:"工资级别", id:"wagelevel", value:"1",options:["1","2","3"], required:true,width:350},
					{ view:"combo", name:"belongdeptcode", label:"所属部门", id:"belongdeptcode", required:true, options:[]},
					{ view:"checkbox", name:"isonjob", label:"是否在职", id:"isonjob", required:true, value:1},

					{
						margin:10,
						cols:[
							{},
							{ view:"button", label:"增加", type:"form", align:"center", width:120, click:function(){
								if(!this.getFormView().validate()) {webix.message("请填充带红色*的内容");return;}
								webix.message('保存成功!');
								webix.$$("modaladd-staff").close();
							}},
							{ view:"button", label:"取消",align:"center", width:120, click:function(){
								webix.$$("modaladd-staff").close();
							}}
						]
					}

				]
			}
		}
	};

});