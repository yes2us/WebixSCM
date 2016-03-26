define([
	"data/vipobject",

	"views/modules/mng_vip/viplist_emotionplan",
	"views/modules/mng_vip/vip_emotionplan",
		
	"views/modules/mng_vip/vip_emotionbasic",
	"views/modules/mng_vip/vip_buyhabit",
	"views/modules/mng_vip/vip_buyrecord",
	"views/modules/mng_vip/vip_contrecord",
	"views/modules/mng_vip/vip_privateconsultant"
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
									{id: "vipBasicView", value: "会员画象"},
									{id: "vipEmotionPlanView", value: "维护计划"},
									{id: "vipBuyHabitView", value: "消费快照"},
									{id: "vipBuyRecordView", value: "消费记录"},
									{id: "vipContRecordView", value: "联系记录"},
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