define(
	["data/deptobject","views/modules/mng_dept/modaladd_dept"],
function(deptobject,modaladd){
	var _UserCode = webix.storage.local.get('_UserCode');
				
	return {
		$oninit:function(){
			$$("lt_deptlist").parse(deptobject.getDeptList(null,_UserCode));	
			webix.dp.$$("lt_deptlist").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;});
	     	webix.dp("lt_deptlist").attachEvent("onAfterInsert",
				function(response, id, object){
				$$("lt_deptlist").getItem(id)._identify = response;
				$$("lt_deptlist").refresh();
			});					
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
				     {view:"button", type:"iconButton", icon: "refresh", label: "刷新", width:80,
				    	 click: function(){
						$$("lt_deptlist").clearAll();
						$$("lt_deptlist").parse(deptobject.getDeptList(null,_UserCode));
				    	 }},
				    {},
					{ view: "button", type: "iconButton", icon: "plus", label: "增加", borderless: true,align:"right",
					width: 80, click: function(){this.$scope.ui(modaladd.$ui).show();}}
			     ]},
				{
					view: "list",
					id: "lt_deptlist",
					select: true,
					save:urlstr+"/WBCURDMng/saveDept",
					template: "<div class='marker status#enabled#'></div>#deptcode# - #deptsname#",
					on: {
						onAfterLoad: function(){this.select(1);}
					}
				}
			]
		}
	}
});