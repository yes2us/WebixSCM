define(function(){

var yearMonthArray = [];
for (var i = 0; i < 15; i++) {
	var today = new Date();
	today.setMonth(today.getMonth() +i-2);
	yearMonthArray[i] = today.toString("yyyy-MM");
}


	return {
		$ui:{
			view:"window", modal:true, id:"modaladd-deptgoal", position:"center",
			head:"增加新部门",
			body:{
				paddingY:20, paddingX:30, elementsConfig:{labelWidth: 140}, view:"form", id:"order-form", 
				elements:[
					{ view:"select", name:"deptcode", label:"部门名称", id:"deptcode", required:true, 
					options:urlstr+"/WBDeptMng/getDeptSNameList/DSSuffix/"+_DSSuffix},

					{ view:"combo", name:"yearmonth", label:"年月", id:"yearmonth", required:true, width:500,options:yearMonthArray},
					{ view:"counter", name:"staffnum", label:"人数", id:"staffnum",value:7, required:true, width:500},
					{ view:"text", name:"tvaluepertscore", label:"单分业绩", id:"tvaluepertscore", required:true, width:500},
					{ view:"text", name:"standardmonthgoal", label:"目标业绩", id:"standardmonthgoal", required:true, width:500},
					{ view:"text", name:"totaltvaluetarget", label:"月均目标", id:"singletscoretarget", required:true, width:500},
					{
						margin:10,
						cols:[
							{},
							{ view:"button", label:"增加", type:"form", align:"center", width:120, click:function(){
								if(!this.getFormView().validate()) {webix.message("请填充带红色*的内容");return;}
								
								$$("dt_deptgoal").add(this.getFormView().getValues());
								webix.message('保存成功!');
								webix.$$("modaladd-deptgoal").close();
							}},
							{ view:"button", label:"取消",align:"center", width:120, click:function(){
								webix.$$("modaladd-deptgoal").close();
							}}
						]
					}

				]
			}
		}
	};

});