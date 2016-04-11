define([
	"data/stockobject",
	"data/billobject",
	"views/modules/mng_storets/storeListView",
	"views/modules/mng_storets/storeStockStructView",	
	"views/modules/mng_storets/storeTSView",
	"views/modules/mng_storets/storeBMRecordView",
	"views/modules/mng_storets/storeImpTSDataView"
], function(stockobject,
	billobject,
	storeListView,
	storeStockStructView,
	storeTSView,
	storeBMRecordView,
	storeImpTSDataView){

checkauthorization(false);


var layout = {
				type: "line",
				cols:[
					storeListView,
					{view:"resizer",width:1},
					{
						rows:[
							{view: "tabbar", multiview: true,optionWidth: 130,
								options:[
									{id: "storeStockStructView", value: "库存结构"},
									{id: "storeTSView", value: "目标库存"},
									{id: "storeBMRecordView", value: "缓冲调整"},
									{id: "storeImpTSDataView", value: "导入目标库存"}
								]
							},
							{
								cells:[
									storeStockStructView,
								    storeTSView,
									storeBMRecordView,
									storeImpTSDataView
								]
							}
						]
			}
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
			$$("dt_stockstruct").showOverlay("正在加载......");
			$$("dt_stockstruct").parse(stockobject.getPartyIndex({StoreCode:storecode}));

			//显示目标库存
			$$("dt_storets").clearAll();
			$$("dt_storets").showOverlay("正在加载......");
			$$("dt_storets").parse(promzStoreTSStructData);	

			//显示最近调整记录
			var promzBMData = billobject.getPartyBMRecord({WHCode:storecode,EndDate:'2016-01-01'});
			$$("dt_storebmrecord").clearAll();
			$$("dt_storebmrecord").showOverlay("正在加载......");
			$$("dt_storebmrecord").parse(promzBMData);
			
			});
	}
};

});