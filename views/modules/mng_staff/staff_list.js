define(
	["data/staffobject","views/modules/mng_staff/modaladd_staff"],
function(staffobject,modaladd){
	
	var _UserCode = webix.storage.local.get('_UserCode');
				
	return {
		$oninit:function(){
			webix.dp.$$("lt_stafflist").attachEvent('onBeforeDataSend', 
			function(obj){
				obj.data.DSSuffix = _DSSuffix,
				obj.data.IsResetPWD = $$('isresetpwd').getValue()
			});
			
			$$("lt_stafflist").parse(staffobject.getStaffList(_UserCode));
		},
		$ui:{
			width:200,
			type: "clean",
			css: "highlighted_header header5",
			rows:[
				{
			     	view: "toolbar",
			     	css: "highlighted_header header5",
			     	cols:[
				     {view:"button", type:"iconButton", icon: "refresh", label: "刷新", width: 80,
				    	 click: function(){
						$$("lt_stafflist").clearAll();
						$$("lt_stafflist").parse(staffobject.getStaffList(_UserCode));
				    	 }},
				    {},
					{ view: "button", type: "iconButton", icon: "plus", label: "增加", borderless: true,align:"right",
					width: 80, click: function(){this.$scope.ui(modaladd.$ui).show();}}
			     ]},
				{
					view: "grouplist",
					id: "lt_stafflist",
					select: true,
					save:urlstr+"/WBCURDMng/saveStaff",
					templateGroup:"#value#<br> Results:#$count#",
					templateBack: "#value#<br> Results:#$count#",
				    templateItem:"#staffcode#- #staffname#<div class='marker  status#isonjob#' style='width:50px;'>&nbsp;</div>",
				    scheme:{
				        $group:function(obj){
				                return obj.deptsname; //data is grouped by "year"
				        },
				    }, 
					on: {
						onAfterLoad: function(){this.select(1);}
					}
				}
			]
		}
	}
});