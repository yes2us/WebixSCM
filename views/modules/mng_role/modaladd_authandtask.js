define(function(){

	return {
		$ui:{
			view:"window", 
			modal:true, 
			id:"modaladd-authandtask", 
			position:"center",
			head:"增加奖扣任务与权限",
			body:{
				paddingY:20, paddingX:30, elementsConfig:{labelWidth: 140}, view:"form", id:"event-form", 
				elements:[
				
				    { view:"fieldset", label:"角色信息", body:{	rows:[
						{ view:"text", name:"rolename",label:"角色", id:"rolename", required:true,width:500},
						{ view:"checkbox", name:"enabled", label:"是否启用", id:"enabled", required:true,  width:500},
					]}},
					
					{ view:"fieldset", label:"单次奖扣限制", body:{	rows:[
						{ view:"text", name:"yscoreuplimit",label:"奖Y分上限", id:"yscoreuplimit", required:true,width:500},
						{ view:"text", name:"yscoredownlimit",label:"扣Y分下限", id:"yscoredownlimit", required:true,width:500},
						{ view:"text", name:"xscoreuplimit",label:"奖X分上限", id:"xscoreuplimit", width:500},
						{ view:"text", name:"xscoredownlimit",label:"扣X分下限", id:"xscoredownlimit", width:500},
					]}},
					
					{ view:"fieldset", label:"单月奖扣任务", body:{	rows:[
						{ view:"text", name:"posyscoretaskpermonth",label:"奖分任务", id:"posyscoretaskpermonth", width:500},
						{ view:"text", name:"negyscoretaskpermonth",label:"扣分任务", id:"negyscoretaskpermonth", width:500},
					]}},
					
					{ view:"textarea",name:"authtaskdesc", id:'authtaskdesc', height:150, label:"备注", labelPosition:"top"},
					{
						margin:10,
						cols:[
							{},
							{ view:"button", label:"增加", type:"form", align:"center", width:120, click:function(){
								if(!this.getFormView().validate()) {webix.message("请填充带红色*的内容");return;}
								
								$$("dt_roleauthtask").add(this.getFormView().getValues());
								webix.message('保存成功!');
								webix.$$("modaladd-authandtask").close();
							}},
							{ view:"button", label:"取消",align:"center", width:120, click:function(){
								webix.$$("modaladd-authandtask").close();
							}}
						]
					}

				]
			}
		}
	};

});