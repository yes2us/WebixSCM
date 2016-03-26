define(function(){

	return {
		$ui:{
			view:"window", modal:true, id:"modaladd-para", position:"center",
			head:"增加新参数",
			body:{
				view:"form", 
				id:"para-form",
				paddingY:20, 
				paddingX:30, 
				elementsConfig:{labelWidth: 140}, 
				elements:[
					{ view:"text", name:"name",label:"参数名", id:"name", required:true,width:500},
					{ view:"select", name:"type", label:"参数类型", required:true, id:"type", 
					options:[
						{id:"VInteger", value:"VInteger"},
						{ id:"VFloat", value:"VFloat"}, 
						{ id:"VDate", value:"VDate"}, 
						{ id:"VBool", value:"VBool"}, 
						{ id:"VString", value:"VString"},
						{ id:"VText", value:"VText"}
						],width:500},
					{ view:"text", name:"vinteger", label:"整型值", id:"vinteger", width:500},
					{ view:"text", name:"vfloat", label:"浮点值", id:"vfloat",width:500},
					{ view:"datepicker", name:"vdate", label:"日期值",  id:"vdate", stringResult:true, format:"%Y-%m-%d"},
					{ view:"checkbox", name:"vbool", label:"布尔值", id:"vbool", value:1},
					{ view:"text", name:"vstring", label:"字符串", id:"vstring"},
				    { view:"textarea", id:'vtext',  height:150, label:"文本值", labelPosition:"top"},
				    { view:"textarea", id:'desc',  height:60, label:"备注", labelPosition:"top"},
					{
						margin:10,
						cols:[
							{},
							{ view:"button", label:"增加", type:"form", align:"center", width:120, click:function(){
								
								if(!this.getFormView().validate()) {webix.message("请填充带红色*的内容");return;}
								
								$$("dt_para").add(this.getFormView().getValues());
								webix.message('保存成功!');
//								var values = this.getFormView().getValues();
//								values.webix_operation = 'insert';
//								webix.ajax().post(urlstr+"/WBCURDMng/saveParameter",values);
//								webix.message(JSON.stringify(values));

								webix.$$("modaladd-para").close();
							}},
							{ view:"button", label:"取消",align:"center", width:120, click:function(){
								webix.$$("modaladd-para").close();
							}}
						]
					}

				]
			}
		}
	};

});