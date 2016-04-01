define([
	"data/stockobject",
	"views/modules/mng_storets/storeListView",
	"views/modules/mng_storets/storeStockStructView",	
	"views/modules/mng_storets/storeTSView",
	"views/modules/mng_storets/storeSugRepPlanView",
	"views/modules/mng_storets/storeSugRetPlanView",
	"views/modules/mng_storets/storeTodayAdjRecView",
	"views/modules/mng_storets/storeImpTSDataView"
], function(stockobject,
	storeListView,
	storeStockStructView,
	storeTSView,
	storeSugRepPlanView,
	storeSugRetPlanView,
	storeTodayAdjRecView,
	storeImpTSDataView){

checkauthorization(false);


var layout = {
	type: "clean",
	rows:[
		{
				type: "wide",
				cols:[
					storeListView,
					{view:"resizer",width:1},
					{
//						gravity: 2.2,
						rows:[
							{view: "tabbar", multiview: true,optionWidth: 130,
								options:[
									{id: "storeStockStructView", value: "库存结构"},
									{id: "storeTSView", value: "目标库存"},
									{id: "storeSugRepPlanView", value: "建议补货"},
									{id: "storeSugRetPlanView", value: "建议退货"},
									{id: "storeTodayAdjRecView", value: "缓冲调整"},
									{id: "storeImpTSDataView", value: "导入目标库存"}
								]
							},
							{
								cells:[
									storeStockStructView,
								    storeTSView,
									storeSugRepPlanView,	
									storeSugRetPlanView,
									storeTodayAdjRecView,
									storeImpTSDataView
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
		
		$$("lt_stores").attachEvent("onSelectChange",function(id){
			if(id==1 || !this.getItem(id)) return;	
			
			var storecode = this.getItem(id).partycode;
			var promzStoreTSStructData = stockobject.getFGWarehouseTSInfo(storecode);
			
			//显示库存结构-大类
			$$("table_stockstruct").clearAll();
			$$("table_stockstruct").parse(stockobject.getStoreStockStruct(storecode));	
			
			
			//显示目标库存
			$$("table_storets").clearAll();
			$$("table_storets").parse(promzStoreTSStructData);
			
			//显示建议补货量
			$$("table_sugrepplan").clearAll();
			$$("table_sugrepplan").parse(promzStoreTSStructData);
			
			//显示建议退货量
			$$("table_sugretplan").clearAll();
			$$("table_sugretplan").parse(promzStoreTSStructData);

			//显示最近调整记录
			var prezAdjRecData = stockobject.getPartyAdjRec({WHCode:storecode,EndDate:'2016-01-01'});
			$$("table_storetodayadjrec").clearAll();
			$$("table_storetodayadjrec").parse(prezAdjRecData);
			
			});
	}
};

});