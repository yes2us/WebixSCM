define([
	"data/roleobject",

	"views/modules/mng_role/role_list",
	"views/modules/mng_role/role_basic",
	"views/modules/mng_role/role_staff",
	"views/modules/mng_role/role_authtask"
], function(roleobject,rolelist,basicinfo,rolestaff,authtask){

checkauthorization(false);


var layout = {
	type: "clean",
	rows:[
		{
				type: "wide",
				cols:[
					rolelist,
					{
						gravity: 2.2,
						rows:[
							{view: "tabbar", multiview: true,optionWidth: 130,
								options:[
									{id: "roleBasicView", value: "基本信息"},//所部门角色,管理角色
									{id: "roleStaffView", value: "角色成员"},
									{id: "roleAuthTaskView", value: "奖扣权限与任务"}
								]
							},
							{
								cells:[
									basicinfo,
									rolestaff,	
									authtask
								]
							},

						]



			}
		]}


	]

};

return {
	$ui:layout,
	$oninit:function(){
		
		$$("roleBasicInfo").bind($$("lt_rolelist"));

		
		$$("lt_rolelist").attachEvent("onSelectChange",function(id){
			var rolename = this.getItem(id).rolename;

			$$("dt_rolestaff").clearAll();
			$$("dt_rolestaff").parse(roleobject.getRoleStaff(rolename));
			
			$$("dt_roleauthtask").clearAll();
			$$("dt_roleauthtask").parse(roleobject.getRoleAuthTask(rolename));
		});		
	}
};

});