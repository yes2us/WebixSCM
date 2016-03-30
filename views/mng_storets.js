define([
	"data/vipobject",

	"views/modules/mng_storets/viplist_emotionplan",
	"views/modules/mng_storets/vip_emotionplan",
		
	"views/modules/mng_storets/vip_emotionbasic",
	"views/modules/mng_storets/vip_buyhabit",
	"views/modules/mng_storets/vip_buyrecord",
	"views/modules/mng_storets/vip_contrecord",
	"views/modules/mng_storets/vip_privateconsultant"
], function(vipobject,viplist,emotionplan,basicinfo,buyhabit,buyrecord,contrecord,privateconsultant){

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
									{id: "vipBasicView", value: "库存结构"},
									{id: "vipEmotionPlanView", value: "目标库存"},
									{id: "vipBuyHabitView", value: "建议补货"},
									{id: "vipBuyRecordView", value: "建议退货"},
									{id: "vipContRecordView", value: "调整记录"},
//									{id: "vipPrivateConsultantView", value: "私人顾问"}
								]
							},
							{
								cells:[
									basicinfo,
								    emotionplan,
									buyhabit,	
									buyrecord,
									contrecord,
//									privateconsultant
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
		
		var elements = $$("vipbasicinfo").elements;
		for(var att in elements)
		{
			if(att != 'uploader')	$$(att).disable();
		}
		
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