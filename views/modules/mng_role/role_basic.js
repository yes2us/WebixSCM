define(["views/webix/ckeditor"], function(){

	var form = {
		view: "form",
		id: "roleBasicInfo",
		elementsConfig:{
			labelWidth: 130
		},
		scroll: true,
		elements:[
		
					{ view:"text", name:"rolename",label:"角色", id:"eventcode"},
					{ view:"text", name:"roletype", label:"角色类型", id:"event"},
					{ view:"checkbox", name:"roleenabled", label:"是否启用", value:1},
					{view:"textarea", name:'roledesc', id:"roledesc" ,height:200, label:"备注", labelPosition:"top"},
					{},
		]
	};

	var layout = {
				view: "form",
				id: "roleBasicView",
				type:"clean",
					rows:[
							 form,
							   {
											css: "highlighted_header header6",
											paddingX:5,
											paddingY:5,

											cols:[
												{ view: "button", type: "form", icon: "plus", label: "保存", width: 90,
												click:function(){
													var selid = $$("lt_rolelist").getSelectedId();
													var item = $$("lt_rolelist").getSelectedItem();
													var values = $$("roleBasicInfo").getValues();
													for(var att in values)
													{
														item[att] = values[att];
													}
													$$("lt_rolelist").updateItem(selid, item);
													
													webix.message('保存成功');
												}},
												{ view: "button", css: "button0", icon: "times", label: "删除", width: 90,
													click:function(){
													webix.confirm({text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
														callback:function(res){
														if(res){$$("lt_rolelist").remove($$("lt_rolelist").getSelectedId());}}});										
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