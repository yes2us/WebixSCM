define([
	"data/paraObject",
	],
function(paraObject){

checkauthorization(false);

	var toolbar = {
		view: "toolbar",
		id:"toolbar",
		css: "highlighted_header header5",
		paddingX:5,
		paddingY:5,
		height:35,
		cols:[
			{  view: "button", type: "iconButton", icon: "refresh", label: "刷新",hidden:false, width: 80, 
			click: function(){
				$$("dt_debugrecord").clearAll();
				$$("dt_debugrecord").parse(paraObject.getDebugRecord());
				}},
			{},
			{},
		]
	};
	
	var grid = {
		margin:10,
		rows:[
			{
				id:"dt_debugrecord",
				view:"datatable", 
				headerRowHeight:35,
				select:"row",
				editable:true,
					dragColumn:true,
					headermenu:{
					    width:250,
					    autoheight:false,
					    scroll:true
					},				
				save:urlstr+"/WBCURDMng/saveDebugRecord/DSSuffix/"+_DSSuffix,
				columns:[
					{id:"deletebutton", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
					{id:"_identify", header:"#", sort:"int",width:70},
					{id:"label", header:"label",width:200},
					{id:"time", header:"time", width:200},
					{id:"context", name:"sqlcode",header:"sqlcode",width:100,hidden:true}			
				],
				on: {
					onAfterLoad: function(){
						this.select(1);		
					},

				},
				onClick:{webix_icon:function(e,id,node){webix.$$("dt_debugrecord").remove(id);}},
				pager:"para_pagerA"
			}
		]

	};

	var page = {
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:5,
						paddingY:5,
						height:40,
						cols:[{
							view:"pager", id:"para_pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 35,
							group:5
						}]
					};
					
	var detailform = {
		view:"form",
		id:"detailform",	
		autowidth:true,
		elements:[	
			{view:"textarea",name:"context",	id:"context",	paddingX:5,	paddingY:5, }
		]

	};
	
							
	var layout = {
		type: "clean",
		rows:[
			toolbar,
			{
				cols:[{rows:[grid,page]},detailform]
			}
		]

	};


	return {
		$ui: layout,
		$oninit:function(){
			$$("dt_debugrecord").parse(paraObject.getDebugRecord());
			$$("detailform").bind($$("dt_debugrecord"));	
			
			webix.dp.$$("dt_debugrecord").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;});
		}
	};

});