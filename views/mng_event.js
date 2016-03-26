define([
//	"data/eventobject",

	"views/modules/mng_event/event_basic",
	"views/modules/mng_event/event_scope",
	"views/modules/mng_event/event_type"
], function(eventbasic,eventscope,eventtype){

checkauthorization(false);


var layout = {
	type: "clean",
	rows:[
		{
				type: "wide",
				cols:[
					{
						gravity: 2.2,
						rows:[
							{view: "tabbar", multiview: true,optionWidth: 130,
								options:[
									{id: "eventBasicView", value: "基本信息"},//所部门角色,管理角色
									{id: "eventScopeView", value: "事件范围"},
									{id: "eventTypeView", value: "事件类型"}
								]
							},
							{
								cells:[
									eventbasic,
									eventscope,	
									eventtype
								]
							},
						]



			}
		]}


	]

};

checkauthorization(false);

return {
	$ui:layout,
	$oninit:function(){
		
		$$("eventBasicInfo").bind($$("dt_events"));
				
	}
};

});