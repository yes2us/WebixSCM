define([
	"data/vipobject",

	"views/modules/mng_vip/viplist_mngbasicinfo",
	"views/modules/mng_vip/vip_basic",
	"views/modules/mng_vip/vip_buyhabit",
	"views/modules/mng_vip/vip_buyrecord",
	"views/modules/mng_vip/vip_contrecord",
	"views/modules/mng_vip/vip_mngmyvip",
	"views/modules/mng_vip/vip_privateconsultant"
], function(vipobject,viplist,basicinfo,buyhabit,buyrecord,contrecord,mngmyvip,privateconsultant){

checkauthorization(false);


var layout = {
	type: "clean",
	rows:[
		{
				type: "wide",
				cols:[
					viplist,
					{
						gravity: 2.2,
						rows:[
							{view: "tabbar", multiview: true,optionWidth: 130,
								options:[
									{id: "vipBasicView", value: "会员画象"},
									{id: "vipBuyHabitView", value: "消费快照"},
									{id: "vipBuyRecordView", value: "消费记录"},
									{id: "vipContRecordView", value: "联系记录"},
									{id: "vipmngMyVIPView", value: "我的会员"},
//									{id: "vipPrivateConsultantView", value: "私人顾问"}
								]
							},
							{
								cells:[
									basicinfo,
									buyhabit,	
									buyrecord,
									contrecord,
									mngmyvip,
//									privateconsultant
								]
							},
						]



			}
		]}


	]

};


return {
	$ui:layout,
	$oninit:function(){

		$$("lt_mngbasicinfo").attachEvent("onSelectChange",function(id){
			if(id==1 || !this.getItem(id)) return;	
			
			var vipcode = this.getItem(id).customercode;						
			var prezVIPBasicInfo = vipobject.getSingleVIPBasicDetail(vipcode);	
			
			$$("vipbasicinfo").clear();
			$$("vipbasicinfo").refresh();
			$$("vipbasicinfo").parse(prezVIPBasicInfo);
			$$("uploaderid").define("upload",urlstr+"/WBUpLoadFile/uploadPersonPhoto/PictureOwner/"+vipcode+"/DSSuffix/"+_DSSuffix);
					
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