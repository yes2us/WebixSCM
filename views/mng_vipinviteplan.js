define([
	"data/vipobject",

	"views/modules/mng_vip/viplist_inviteplan",
	"views/modules/mng_vip/vip_inviteplan",
	"views/modules/mng_vip/vip_buyhabit",
	"views/modules/mng_vip/vip_buyrecord",
	"views/modules/mng_vip/vip_contrecord",
		"views/modules/mng_vip/vip_privateconsultant"
], function(vipobject,viplist,inviteplan,buyhabit,buyrecord,contrecord,privateconsultant){

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
									{id: "vipInvitePlanView", value: "邀约计划"},
									{id: "vipBuyHabitView", value: "消费快照"},
									{id: "vipBuyRecordView", value: "消费记录"},
									{id: "vipContRecordView", value: "联系记录"},
									//{id: "vipPrivateConsultantView", value: "会员衣橱"}
								]
							},
							{
								cells:[
									inviteplan,
									buyhabit,	
									buyrecord,
									contrecord,
									//privateconsultant
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

		//店铺列表选择变化时
		$$("lt_inviteplanlist").attachEvent("onSelectChange",function(id){
			if(id==1 || !this.getItem(id)) return;						
			inviteplan.$fnInvoke(this.getItem(id).deptcode);				
		});
		
		//象限客户列表选择变化时
		$$("dt_customerinquad").attachEvent("onSelectChange",function(){
			if(!this.getSelectedId()) return;
			var vipcode = this.getItem(this.getSelectedId().toString()).customercode;
			
			var prezVIPBasicInfo = vipobject.getSingleVIPBasicDetail(vipcode);	
	
			$$("vipBuyHabitView").clear();
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