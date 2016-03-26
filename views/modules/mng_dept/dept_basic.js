define(function(){

	var form = {
		view: "form",
		id:"deptbasicinfo",
		elementsConfig:{
			labelWidth: 130
		},
		scroll: true,
		elements:[
			{view: "text", name: "deptcode", label: "部门编号"},
			{view: "text", name: "deptname", label: "部门名称"},
			{view: "text", name: "deptsname", label: "部门简称"},
			
			{view:"select", name:"depttype", id:"depttype",label:"部门类型",options:["店铺","部门","办事处","分公司","总公司"]},
			 
			{ view:"select", name:"supdeptcode", id:"supdeptcode",label:"上级部门", 
			 options:urlstr+"/WBDeptMng/getDeptSNameList/DSSuffix/"+_DSSuffix},
						
			{view: "checkbox", name: "enabled", label: "启用部门",value: 1},
			{view: "checkbox", name: "scoremngenabled", label: "得分管理",value: 1},
			{view: "checkbox", name: "vipmngenabled", label: "会员管理",value: 1},
			{view:"textarea",name:'deptdesc', id:'deptdesc',  height:200, label:"部门描述", labelPosition:"top"},
			{},

		]
	};

	var layout = {
				view: "form",
				id: "deptBasicView",
				type:"clean",

					rows:[
							 form,
							{
								css: "highlighted_header header6",
								paddingX:5,
								paddingY:5,
//								height:40,
								cols:[
									{ view: "button", type: "form", icon: "plus", label: "保存", width: 90,
									click:function(){
										var selid = $$("lt_deptlist").getSelectedId();
										var item = $$("lt_deptlist").getSelectedItem();
										var values = $$("deptbasicinfo").getValues();
										for(var att in values) item[att] = values[att];
										$$("lt_deptlist").updateItem(selid, item);
										
										webix.message('保存成功');
									}},
									{ view: "button", css: "button0", icon: "times", label: "删除", width: 90,
										click:function(){
										webix.confirm({text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
											callback:function(res){
											if(res){$$("lt_deptlist").remove($$("lt_deptlist").getSelectedId());}}});										
									}},
									{}
								]
							}
					]
		};


	return {
		$ui:layout
	};
	

});