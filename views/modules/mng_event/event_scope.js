define([
	"data/eventobject",
	"views/modules/mng_event/modaladd_eventscope"
	],
	function(eventobject,modaladd){
	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:5,
			paddingY:5,
			height:35,
			cols:[
			    { view:"button", type:"iconButton", icon: "refresh", label: "刷新", width: 120, 
			    	 click: function(){
					$$("dt_eventscope").clearAll();
					$$("dt_eventscope").parse(eventobject.getEventScope());
			    	 }},
			    {},
			    { view:"button", type:"iconButton", icon: "plus-circle", label: "增加范围", width: 120, click: function(){this.$scope.ui(modaladd.$ui).show();}},	
		    ]
	};
	
return {
	    $oninit:function(){
	    	$$("dt_eventscope").parse(eventobject.getEventScope());
	    	webix.dp.$$("dt_eventscope").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;});
	    },
		$ui:{
			id:"eventScopeView",
			type: "clean",
			rows:[
				titleBar,
				{
					id:"dt_eventscope",
					view:"datatable",
					editable:true,
					headerRowHeight:35,
					editaction:"custom",
					dragColumn:true,
					headermenu:{
					    width:250,
					    autoheight:false,
					    scroll:true
					},					
					save:urlstr+"/WBCURDMng/saveEventScope/DSSuffix/"+_DSSuffix,
					columns:[
					    {id:"delete", header:"&nbsp;",id:"deletebutton1",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
						{ id:"_identify",  header:"#",fillspace:0.7},
						{ id:"eventscopecode",  header:"范围编号",fillspace:0.7},
						{ id:"eventscope",  editor:"text",header:"事件范围", fillspace:0.7},
						{ id:"eventscopeorder",	editor:"text", header:"范围次序" ,  fillspace:1},
						{  id:"eventscopeenabled", name:"eventscopeenabled", header:"是否启用",  template:"{common.checkbox()}",value:1},
					],
					autoheight:true,
					rowHeight:40,
					select:"row",
					on:{onItemClick:function(id){this.editRow(id);},},

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
				},
				{}
			]

		}
	}
});