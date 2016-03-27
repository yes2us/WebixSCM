define([
	"data/scoreobject",
	"data/vipobject",
	
	"views/modules/mng_mytask/task_auditlist",
	"views/modules/mng_mytask/task_appeallist",
	"views/modules/mng_mytask/task_invitelist",
	"views/modules/mng_mytask/task_maintainlist",
	"views/modules/mng_mytask/task_annidaylist"
], function(scoreobject,vipobject,auditlist,appeallist,invitelist,maintainlist,annidaylist){
	
	//checkauthorization(false);
	
var layout = {
	type: "clean",
	rows:[
		{
				type: "wide",
				cols:[
//				    deptlist,
					{
						gravity: 2.2,
						rows:[
							{
								view: "tabbar", 
								multiview: true,
								optionWidth: 130,
								options:[
									{id: "toAuditView", value: "待审核"},
									{id: "toAppealView", value: "待仲裁"},
									{id: "toInviteView", value: "待邀约"},
									{id: "toMaintainView", value: "待维护"},
									{id: "toAnnidayView", value: "纪念日"}
								]
							},
							{
								cells:[
									auditlist,
									appeallist,
									invitelist,
									maintainlist,
									annidaylist
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
		
		var _UserCode = webix.storage.local.get('_UserCode');
		
		scoreobject.queryScoreRecord("AuditState = '待审核' and AuditorCode = '"+_UserCode+"'").then(function(response){
			$$("dt_audittask").parse(response.json());
		});
		
		scoreobject.queryScoreRecord("AppealState = '待仲裁' and AppealDealer = '"+_UserCode+"'").then(function(response){
			$$("dt_appealtask").parse(response.json());
		});
		
		
		vipobject.getCurMonthPlan(null,_UserCode,"AnzToInvite").then(function(response){
			$$("dt_invitetask").parse(response.json());
		});

		vipobject.getCurMonthPlan(null,_UserCode,"AnzToMaintain").then(function(response){
			$$("dt_maintaintask").parse(response.json());
		});
		
		vipobject.getCurMonthPlan(null,_UserCode,"AnzToBirthday").then(function(response){
			$$("dt_annidaytask").parse(response.json());
		});
	}
	};

});