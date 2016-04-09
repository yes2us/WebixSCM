define([
	"data/stockobject",
	"data/billobject",
	"views/modules/mng_dwhts/dwhListView",
	"views/modules/mng_dwhts/dwhTSView",
	"views/modules/mng_dwhts/dwhAdjRecView",
	"views/modules/mng_dwhts/dwhImpTSDataView"
], function(
	stockobject,
	billobject,
	dwhListView,
	dwhTSView,
	dwhAdjRecView,
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
//									{id: "dwhSugRepPlanView", value: "理论补退"},
//									{id: "dwhSugRetPlanView", value: "理论退货"},
									{id: "dwhAdjRecView", value: "缓冲调整"},
									{id: "dwhImpTSDataView", value: "导入目标库存"}
								]
							},
							{
								cells:[
								    dwhTSView,
//									dwhSugRepPlanView,	
//									dwhSugRetPlanView,
									dwhAdjRecView,
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
			$$("dt_dwhts").clearAll();
			$$("dt_dwhts").showOverlay("正在加载......");
			$$("dt_dwhts").parse(promzTSData);

			//显示最近调整记录
			var promzAdjRecData = billobject.getPartyAdjRec({WHCode:dwhcode,EndDate:'2016-01-01'});
			$$("dt_dwhadjrec").clearAll();
			$$("dt_dwhadjrec").showOverlay("正在加载......");
			$$("dt_dwhadjrec").parse(promzAdjRecData);
			
			});
	}
};

});