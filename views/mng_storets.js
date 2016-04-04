define([
	"data/stockobject",
	"views/modules/mng_storets/storeListView",
	"views/modules/mng_storets/storeStockStructView",	
	"views/modules/mng_storets/storeTSView",
//	"views/modules/mng_storets/storeSugRepPlanView",
//	"views/modules/mng_storets/storeSugRetPlanView",
	"views/modules/mng_storets/storeTodayAdjRecView",
	"views/modules/mng_storets/storeImpTSDataView"
], function(stockobject,
	storeListView,
	storeStockStructView,
	storeTSView,
//	storeSugRepPlanView,
//	storeSugRetPlanView,
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
						rows:[
							{view: "tabbar", multiview: true,optionWidth: 130,
								options:[
									{id: "storeStockStructView", value: "库存结构"},
									{id: "storeTSView", value: "目标库存"},
//									{id: "storeSugRepPlanView", value: "理论补退"},
//									{id: "storeSugRetPlanView", value: "理论退货"},
									{id: "storeTodayAdjRecView", value: "缓冲调整"},
									{id: "storeImpTSDataView", value: "导入目标库存"}
								]
							},
							{
								cells:[
									storeStockStructView,
								    storeTSView,
//									storeSugRepPlanView,	
//									storeSugRetPlanView,
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
			$$("dt_stockstruct").clearAll();
			$$("dt_stockstruct").parse(stockobject.getStoreStockStruct({StoreCode:storecode}));	
			
			
			//显示目标库存
			$$("dt_storets").clearAll();
			$$("dt_storets").parse(promzStoreTSStructData);
			

			//显示最近调整记录
			var prezAdjRecData = stockobject.getPartyAdjRec({WHCode:storecode,EndDate:'2016-01-01'});
			$$("dt_storetodayadjrec").clearAll();
			$$("dt_storetodayadjrec").parse(prezAdjRecData);
			
			});
	}
};

});