define([
	"data/eventobject",
	"views/modules/mng_event/modaladd_event",
	"views/menus/export"
	],
function(eventobject,modaladd,exports){
	return {
		$oninit:function(){
			$$("dt_events").parse(eventobject.getAllEvent());
			webix.dp.$$("dt_events").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;});
		},
		
		$ui:{
			type: "clean",
			css: "highlighted_header header5",
			rows:[
			     {
			     	view: "toolbar",
			     	css: "highlighted_header header5",
			     	height:35,
			     	cols:[
				     {view:"button", type:"iconButton", icon: "refresh", label: "刷新", width: 70,
				    	 click: function(){
						$$("dt_events").clearAll();
						$$("dt_events").parse(eventobject.getAllEvent());
				    	 }},
				    {},
					{ view: "button", type: "iconButton", icon: "plus", label: "增加", borderless: true,align:"right",
					width: 80, click: function(){this.$scope.ui(modaladd.$ui).show();}},
					{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, popup: exports.print("dt_events")},
			     ]},
				{
					view: "datatable",
					id: "dt_events",
					headerRowHeight:35,
					save:urlstr+"/WBCURDMng/saveEvent/DSSuffix/"+_DSSuffix,
					dragColumn:true,
					headermenu:{
					    width:250,
					    autoheight:false,
					    scroll:true
					},					
					select: true,
					columns:[
						{ id:"delete", header:"&nbsp;",id:"deletebutton2",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
						{ id:"_identify",  header:"#",width:50},
						{ id:"eventenabled", name:"eventenabled", header:["是否启用",{content:"selectFilter"}], template:"{common.checkbox()}",width:100},
						{ id:"event", header:"事件", fillspace:1},
						{ id:"eventtype", header:["事件类型",{content:"selectFilter"}] ,  width:100},
						{ id:"eventscope", header:["事件范围",{content:"selectFilter"}], width:100},
						{ id:"remark", header:["备注",{content:"selectFilter"}],fillspace:1.5,hidden:true},

					],
					on: {
						onAfterLoad: function(){this.select(1);}
					},
					onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_eventscope").remove(id);
								}
							}
						});
					}
				   },
				}
			]
		}
	}
});