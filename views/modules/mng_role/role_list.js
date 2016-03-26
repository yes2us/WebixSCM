define(
	["data/roleobject","views/modules/mng_role/modaladd_role"],
function(roleobject,modaladd){
	return {
		$oninit:function(){
			$$("lt_rolelist").parse(roleobject.getAllRole());
			webix.dp.$$("lt_rolelist").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix});			
		},
		$ui:{
			width:250,
			type: "clean",
			css: "highlighted_header header5",
			rows:[
			     {
			     	view: "toolbar",
			     	css: "highlighted_header header5",
			     	cols:[
				     {view:"button", type:"iconButton", icon: "refresh", label: "刷新", 
				    	 click: function(){
						$$("lt_rolelist").clearAll();
						$$("lt_rolelist").parse(roleobject.getAllRole());
				    	 }},
				    {},
					{ view: "button", type: "iconButton", icon: "plus", label: "增加", borderless: true,align:"right",
					width: 80, click: function(){this.$scope.ui(modaladd.$ui).show();}}
			     ]},
				{
					view: "grouplist",
					id: "lt_rolelist",
					save:urlstr+"/WBCURDMng/saveRole/DSSuffix/"+_DSSuffix,
					select: true,
//					template: "<div class='marker status#roleenabled#'></div>#roletype# - #rolename#",
					
					templateGroup:"角色类型 - #value#<br> Results:#$count#",
					templateBack: "角色类型 - #value#<br> Results:#$count#",
				    templateItem:"#roletype#- #rolename#<div class='marker  status#roleenabled#' style='width:60px;'>&nbsp;</div>",
				    scheme:{
				        $group:function(obj){
				                return obj.roletype; //data is grouped by "year"
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