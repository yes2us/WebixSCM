define([
	"data/stockobject",
	"views/modules/mng_cwhts/cwhTSView",
	"views/modules/mng_cwhts/cwhSugRepPlanView",
	"views/modules/mng_cwhts/cwhTodayAdjRecView",
	"views/modules/mng_cwhts/cwhImpTSDataView"
], function(
	stockobject,
	cwhTSView,
	cwhSugRepPlanView,
	cwhTodayAdjRecView,
	cwhImpTSDataView){

checkauthorization(false);


var layout = {
	type: "clean",
	rows:[
		{view: "tabbar", multiview: true,optionWidth: 130,
			options:[
				{id: "cwhTSView", value: "目标库存"},
				{id: "cwhSugRepPlanView", value: "建议补货"},
				{id: "cwhTodayAdjRecView", value: "缓冲调整"},
				{id: "cwhImpTSDataView", value: "导入目标库存"}
			]
		},
		{
			cells:[
			    cwhTSView,
				cwhSugRepPlanView,	
				cwhTodayAdjRecView,
				cwhImpTSDataView
			]
		}
	]
};


return {
	$ui:layout,
	$oninit:function(){
			
			var cwhcode = "T";
			var promzTSData = stockobject.getFGWarehouseTSInfo(cwhcode);

			//显示目标库存
			$$("table_cwhts").clearAll();
			$$("table_cwhts").parse(promzTSData);
			
			//显示建议补货量
			$$("table_cwhsugrepplan").clearAll();
			$$("table_cwhsugrepplan").parse(promzTSData);
			

			//显示最近调整记录
			var promzAdjRecData = stockobject.getPartyAdjRec({WHCode:cwhcode,EndDate:'2016-01-01'});
			$$("table_cwhtodayadjrec").clearAll();
			$$("table_cwhtodayadjrec").parse(promzAdjRecData);
			
	}
};

});