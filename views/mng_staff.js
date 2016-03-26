define([
	"data/deptobject",
	"data/staffobject",
	
	"views/modules/mng_staff/staff_list",
	"views/modules/mng_staff/staff_basic",
	"views/modules/mng_staff/staff_fixedevent",
	"views/modules/mng_staff/staff_subscriber",
	"views/modules/mng_vip/vip_mngmyvip"
], function(deptobject,staffobject,stafflist,basicinfo,fixedevent,subscriber,maintainvip){

checkauthorization(false);


var layout = {
	type: "clean",
	rows:[
		{
				type: "wide",
				cols:[
					stafflist,
					{
						gravity: 2.2,
						rows:[
							{view: "tabbar", multiview: true,optionWidth: 130,
								options:[
									{id: "staffBasicView", value: "基本信息"},//所部门角色,管理角色
									{id: "fixedEventView", value: "固定得分"},
									{id: "staffSubcriberView", value: "订阅对象"},
								]
							},
							{
								cells:[
									basicinfo,
									fixedevent,	
									subscriber,
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
		$$("staffBasicInfo").bind($$("lt_stafflist"));
			
		/**以下是异步获得数据*/
		var deptlist = null;
		 deptobject.getDeptList().then(function(response){		
			deptlist = response.json(); //也可以使用response.text()
		});
		
		$$("lt_stafflist").attachEvent("onSelectChange",function(id){
			
			var staffcode = this.getItem(id).staffcode;
			$$("uploaderid").define("upload",urlstr+"/WBUpLoadFile/uploadPersonPhoto/PictureOwner/"+staffcode+"/DSSuffix/"+_DSSuffix);			
			
			$$("dt_fixedevent").clearAll();
			$$("dt_fixedevent").parse(staffobject.getStaffFixedEvent(staffcode,"StaffEvent"));
	
			$$("dt_staffsubcriber").clearAll();
			$$("dt_staffsubcriber").parse(staffobject.getStaffSubcriber(staffcode));

			});
		

		

	}
};

});