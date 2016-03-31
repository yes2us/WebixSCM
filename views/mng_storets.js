define([
	"data/storeobject",
	"views/modules/mng_storets/storeListView",
	"views/modules/mng_storets/storeStockStructView",	
	"views/modules/mng_storets/storeTSView",
	"views/modules/mng_storets/storeSugRepPlanView",
	"views/modules/mng_storets/storeSugRetPlanView",
	"views/modules/mng_storets/storeTodayAdjReView"
], function(storeobject,storeListView,storeStockStructView,storeTSView,storeSugRepPlanView,storeSugRetPlanView,storeTodayAdjRecView){

checkauthorization(false);


var layout = {
	type: "clean",
	rows:[
		{
				type: "wide",
				cols:[
					viplist,
					{view:"resizer"},
					{
						gravity: 2.2,
						rows:[
							{view: "tabbar", multiview: true,optionWidth: 130,
								options:[
									{id: "storeStockStructView", value: "库存结构"},
									{id: "storeTSView", value: "目标库存"},
									{id: "storeSugRepPlanView", value: "建议补货"},
									{id: "storeSugRetPlanView", value: "建议退货"},
									{id: "storeTodayAdjRecView", value: "调整记录"}
								]
							},
							{
								cells:[
									storeStockStructView,
								    storeTSView,
									storeSugRepPlanView,	
									storeSugRetPlanView,
									storeTodayAdjRecView
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
		
		emotionplan.$invoke("");

		$$("lt_emotionplan").attachEvent("onSelectChange",function(id){
			if(id==1 || !this.getItem(id)) return;	
			
			var vipcode = this.getItem(id).customercode;
			
			var prezVIPBasicInfo = vipobject.getSingleVIPBasicDetail(vipcode);	
			
			emotionplan.$invoke(vipcode);
			
			$$("emotionPlanForm").clear();
			$$("emotionPlanForm").refresh();
			$$("emotionPlanForm").parse(prezVIPBasicInfo);
			
			$$("vipbasicinfo").clear();
			$$("vipbasicinfo").refresh();
			$$("vipbasicinfo").parse(prezVIPBasicInfo);
			
			$$("vipBuyHabitView").clear();
			$$("vipBuyHabitView").refresh();
			$$("vipBuyHabitView").parse(prezVIPBasicInfo);

			
			$$("buyspan_list").clearAll();
			$$("buyspan_list").parse(vipobject.getSaleSpan(vipcode));
			
			$$("chatlist_contrecord").clearAll();
			$$("chatlist_contrecord").parse(vipobject.getContRecord(vipcode));

			$$("tabletree_buyrecord").clearAll();
			$$("tabletree_buyrecord").parse(vipobject.getSaleRecord(vipcode));
			
			});
	}
};

});