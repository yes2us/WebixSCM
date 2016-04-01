define([
	"data/stockobject",
	"views/modules/mng_dwhts/dwhListView",
	"views/modules/mng_dwhts/dwhTSView",
	"views/modules/mng_dwhts/dwhSugRepPlanView",
	"views/modules/mng_dwhts/dwhSugRetPlanView",
	"views/modules/mng_dwhts/dwhTodayAdjRecView",
	"views/modules/mng_dwhts/dwhImpTSDataView"
], function(
	stockobject,
	dwhListView,
	dwhTSView,
	dwhSugRepPlanView,
	dwhSugRetPlanView,
	dwhTodayAdjRecView,
	dwhImpTSDataView){

checkauthorization(false);


var layout = {
	type: "clean",
	rows:[
		{
				type: "wide",
				cols:[
					dwhListView,
					{view:"resizer",width:1},
					{
//						gravity: 2.2,
						rows:[
							{view: "tabbar", multiview: true,optionWidth: 130,
								options:[
									{id: "dwhTSView", value: "目标库存"},
									{id: "dwhSugRepPlanView", value: "建议补货"},
									{id: "dwhSugRetPlanView", value: "建议退货"},
									{id: "dwhTodayAdjRecView", value: "缓冲调整"},
									{id: "dwhImpTSDataView", value: "导入目标库存"}
								]
							},
							{
								cells:[
								    dwhTSView,
									dwhSugRepPlanView,	
									dwhSugRetPlanView,
									dwhTodayAdjRecView,
									dwhImpTSDataView
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
		
		$$("lt_dwhs").attachEvent("onSelectChange",function(id){
			if(id==1 || !this.getItem(id)) return;	
			
			var dwhcode = this.getItem(id).id;
			var promzTSData = stockobject.getFGWarehouseTSInfo(dwhcode);

			//显示目标库存
			$$("table_dwhts").clearAll();
			$$("table_dwhts").parse(promzTSData);
			
			//显示建议补货量
			$$("table_dwhsugrepplan").clearAll();
			$$("table_dwhsugrepplan").parse(promzTSData);
			
			//显示建议退货量
			$$("table_dwhsugretplan").clearAll();
			$$("table_dwhsugretplan").parse(promzTSData);

			//显示最近调整记录
			var promzAdjRecData = stockobject.getPartyAdjRec({WHCode:dwhcode,EndDate:'2016-01-01'});
			$$("table_dwhtodayadjrec").clearAll();
			$$("table_dwhtodayadjrec").parse(promzAdjRecData);
			
			});
	}
};

});