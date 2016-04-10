define([
	"data/roleobject",
	"views/modules/modaladd/addrole",
	"views/menus/export"
	],
function(roleobject,modaladd,exports){
	
	checkauthorization(false);
	
  var titleBar = {
		view: "toolbar",
		id:"toolbar",
		css: "highlighted_header header5",
		paddingX:5,
		paddingY:5,
		height:35,
		cols:[
			{  view: "button", type: "iconButton", icon: "refresh", label: "刷新",hidden:false, width: 80, 
			click: function(){
				$$("dt_role").clearAll();
				$$("dt_role").parse(roleobject.getRoleList());
				}},
			{},
			{ view: "button", type: "iconButton", icon: "pencil-square-o", label: "编辑", width: 80,
			click:function(){
				$$('dt_role').define('editable',true);	
				$$('deletebutton').show();	
				$$('addbutton').show();
				$$('addbutton').refresh();	
				
				$$('toolbar').config.css="highlighted_header header4";
				$$('toolbar').reconstruct();
			}},
			{ view: "button", type: "iconButton", icon: "plus",id:"addbutton", label: "增加",hidden:false, width: 80, click: function(){this.$scope.ui(modaladd.$ui).show();}},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, popup: exports.print("dt_role")},
		]
	};
	
	var grid_role = {
		margin:10,
		rows:[
			{
				view:"datatable", 
				id:"dt_role",
				maxHeight:250,
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				editable:true,
				select:true,
				updateFromResponse:true,
				save:urlstr+"/WBCURDMng/saveRole",
				columns:[

					{id:"deletebutton", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
					{id:"roleenabled", header:"启用", template:"{common.checkbox()}", sort:"string",fillspace:1},
					{id:"rolename", header:"角色", sort:"string",fillspace:1},
					{id:"roletype", header:"类型", editor:"text", sort:"string",fillspace:1},
					{id:"roledesc", header:"描述", editor:"text", sort:"string",fillspace:1},
				],
				on: {
					onSelectChange:function(){
						var selRow = this.getSelectedItem();
						if(selRow){
						var PremzRelData = roleobject.getRoleUserList(selRow.rolename);
						$$("dt_roleuser").clearAll();
						$$("dt_roleuser").parse(PremzRelData);
						}
					}
				},
				onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_role").remove(id);
								}
							}
						});
					}
				},
			}
		]

	};

var pager = 	{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:5,
						paddingY:5,
						height:40,
						cols:[{
							view:"pager", 
							id:"para_pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 35,
							group:5
						}]
					};
					
var grid_roleuser ={
	 view:"datatable",
	 id:"dt_roleuser",
	rowHeight:_RowHeight,
	headerRowHeight:_HeaderRowHeight,
	headermenu:{width:250,autoheight:false,scroll:true},
	resizeColumn:true,
	editable:true,
	select:true,
	 columns:[
	    	{id:"deletebutton", header:"&nbsp;",hidden:false, width:60, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
	    {id:"_identify",header:"",hidden:true,width:30},
	    {id:"usercode",header:"用户编号",fillspace:1},
	    {id:"usertruename",header:"用户名",fillspace:1},
	    {id:"usertype",header:"用户类型",fillspace:1},
	 ],
	 onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_roleuser").remove(id);
								}
							}
						});
					}
				},
	pager:"para_pagerA"
}


	var layout = {
		type: "line",
		rows:[
			titleBar,
			grid_role,
			{view:"resizer"},
			grid_roleuser,
			pager,
		]

	};


	return {
		$ui: layout,
		$oninit:function(){
			$$("dt_role").clearAll();
			$$("dt_role").parse(roleobject.getRoleList());//			$$("dt_party").parse(partyobject.getSysPara());

			
//			webix.dp.$$("dt_party").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;});

		}
	};

});