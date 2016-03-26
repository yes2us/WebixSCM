define(
		["views/modules/mng_dept/modaladd_deptwage"],
function(modaladd){
	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:5,
			paddingY:5,
			height:35,
			cols:[
			    { view:"button", type:"iconButton", icon: "plus-circle", label: "增加方案", width: 120, click: function(){this.$scope.ui(modaladd.$ui).show();}},	
				{},
		    ]
	};
	
	return {
		$oninit:function(){
			
			webix.dp.$$("dt_deptwage").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;});
					
	     	webix.dp("dt_deptwage").attachEvent("onAfterInsert",
				function(response, id, object){
				$$("dt_deptwage").getItem(id)._identify = response;
				$$("dt_deptwage").refresh();
			});					
		},
		
		$ui:{
			id:"deptWageView",
			type: "clean",
			rows:[
				titleBar,
				{
					id:"dt_deptwage",
					view:"datatable",
					editable:true,
					select:true,
					headerRowHeight:35,
					dragColumn:true,
						headermenu:{
						    width:250,
						    autoheight:false,
						    scroll:true
						},
					save:urlstr+"/WBCURDMng/saveDeptWage/DSSuffix/"+_DSSuffix,
					columns:[
						{id:"deletebutton5", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
						{ id:"_identify",	header:"#", fillspace:0.5},
						{ id:"wagelevel",  editor:"select",	header:"*工资方案",fillspace:1,
						options:[{id:1,value:"导购方案"},{id:2,value:"店长方案"},{id:3,value:"经理方案"}]},
						{ id:"basicsalary",  editor:"text",header:"*保底工资", fillspace:1,format:webix.i18n.priceFormat},
						{ id:"dutysalary",	editor:"text", header:"*职务工资" ,  fillspace:1,format:webix.i18n.priceFormat},
						{ id:"orginalbonusratio", editor:"text",header:"*原提升系数",fillspace:1},
						{ id:"scorelevelranges",  editor:"text",	header:"*目标级别", fillspace:2.5},
						{ id:"wagelevelratios",  editor:"text",header:"*分值系数", fillspace:2.5}
					],
					autoheight:true,
					rowHeight:40,
//					on:{onItemClick:function(id){this.editRow(id);}},
					onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_deptwage").remove(id);
								}
							}
						});
					}}
				},
				{}
			]

		}
	}
});