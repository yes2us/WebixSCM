define([
	"data/deptobject",
//	"data/staffobject",
	
	"views/modules/mng_dept/dept_list",
	"views/modules/mng_dept/dept_basic",	
	"views/modules/mng_dept/dept_staff",
	"views/modules/mng_dept/dept_event",
	"views/modules/mng_dept/dept_goal",
	"views/modules/mng_dept/dept_wage"
//], function(deptobject,staffobject,deptlist,basicinfo,staff,event,goal,wage){
], function(deptobject,deptlist,basicinfo,staff,event,goal,wage){

checkauthorization(false);


var layout = {
	type: "clean",
	rows:[
		{
				type: "wide",
				cols:[
					deptlist,
					{
						gravity: 2.2,
						rows:[
							{view: "tabbar", multiview: true,optionWidth: 130,
								options:[
									{id: "deptBasicView", value: "基本信息"},
									{id: "deptStaffView", value: "部门角色"},
									{id: "deptEventView", value: "部门事件"},
									{id: "deptGoalView", value: "月度目标"},
									{id: "deptWageView", value: "工资标准"}
								]
							},
							{
								cells:[
									basicinfo,
									staff,
									event,
									goal,	
									wage
								]
							}
						]



			}
		]}


	]

};


return {
	$ui:layout,
	$oninit:function(){	
		$$("deptbasicinfo").bind($$("lt_deptlist"));			
		
		$$("lt_deptlist").attachEvent("onSelectChange",function(id){
			
			var deptcode = this.getItem(id).deptcode;
			
			$$("dt_deptgoal").clearAll();
			$$("dt_deptgoal").parse(deptobject.getDeptGoal(deptcode));
			
			$$("dt_deptstaff").clearAll();
			$$("dt_deptstaff").parse(deptobject.getDeptMnger(deptcode));
			
			$$("dt_deptevent").clearAll();
			$$("dt_deptevent").parse(deptobject.getDeptEvent(deptcode,'DeptEvent'));
			
			$$("dt_deptwage").clearAll();
			$$("dt_deptwage").parse(deptobject.getDeptWage(deptcode));
		});
		
	}
};

});