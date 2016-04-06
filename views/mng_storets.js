define([
	"data/stockobject",
	"libs/pivot",
	"views/modules/mng_storets/storeListView",
	"views/modules/mng_storets/storeStockStructView",	
	"views/modules/mng_storets/storeTSView",
	"views/modules/mng_storets/storeAdjRecView",
	"views/modules/mng_storets/storeImpTSDataView"
], function(stockobject,
	pivot,
	storeListView,
	storeStockStructView,
	storeTSView,
	storeAdjRecView,
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
									{id: "storeAdjRecView", value: "缓冲调整"},
									{id: "storeImpTSDataView", value: "导入目标库存"}
								]
							},
							{
								cells:[
									storeStockStructView,
								    storeTSView,
									storeAdjRecView,
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
			$$("dt_stockstruct").parse(stockobject.getStoreStockStruct({StoreCode:storecode}));
			$$("dt_stockstruct").clearAll();
			
			
			//显示目标库存
			$$("dt_storets").clearAll();
			$$("dt_storets").parse(promzStoreTSStructData);	

			//显示最近调整记录
			var prezAdjRecData = stockobject.getPartyAdjRec({WHCode:storecode,EndDate:'2016-01-01'});
			$$("dt_storeadjrec").clearAll();
			$$("dt_storeadjrec").parse(prezAdjRecData);
			
			});
	}
};

});