define([
	"data/eventobject",
	"views/modules/mng_event/modaladd_eventtype"],
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
					$$("dt_eventtype").clearAll();
					$$("dt_eventtype").parse(eventobject.getEventType());
			    	 }},
			    {},
			    { view:"button", type:"iconButton", icon: "plus-circle", label: "增加类型", width: 120, click: function(){this.$scope.ui(modaladd.$ui).show();}},	
		    ]
	};

	return {
		$oninit:function(){
			$$("dt_eventtype").parse(eventobject.getEventType());
			webix.dp.$$("dt_eventtype").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;});
		},
		$ui:{
			id:"eventTypeView",
			type: "clean",
			rows:[
				titleBar,
				{
					id:"dt_eventtype",
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
					save:urlstr+"/WBCURDMng/saveEventType/DSSuffix/"+_DSSuffix,
					columns:[
						{ id:"delete", header:"&nbsp;",id:"deletebutton2",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
						{ id:"_identify",  header:"#",fillspace:0.7},
						{ id:"eventtypecode",editor:"text",  header:"类型编号",fillspace:1},
						{ id:"eventtype",  editor:"text",header:["事件类型",{content:"selectFilter"}], fillspace:1},
						{ id:"eventtypeorder",	editor:"text", header:"类型次序" ,  fillspace:1},
						{ id:"eventscope",  editor:"text",header:["事件范围",{content:"selectFilter"}],fillspace:1},
						{ id:"eventtypeenabled", name:"eventtypeenabled", header:["是否启用",{content:"selectFilter"}], template:"{common.checkbox()}",format:webix.i18n.numberFormat},
					],
					rowHeight:40,
					select:"row",
//					on:{onItemClick:function(id){this.editRow(id);},},
					onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_eventtype").remove(id);
								}
							}
						});
					}
				   },
					pager:"eventtype_pagerA"
				},
				{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:5,
						paddingY:5,
						height:40,
						cols:[{
							view:"pager", id:"eventtype_pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 35,
							group:5
						}]
				},
//				{}
			]

		}
	}
});