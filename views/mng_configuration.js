define([
	"data/paraobject",
	"views/modules/mng_para/modaladd_para"
	],
function(paraobject,modaladd){
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
				$$("dt_sqllist").clearAll();
				$$("dt_sqllist").parse(paraobject.getSQLList());
				}},
			{ view: "button", type: "iconButton", icon: "plus",id:"addbutton", label: "增加",hidden:false, width: 80, click: function(){
				$$("dt_sqllist").add({sqlindex:"xxsql"+parseInt(Math.random()*100),debug:0	});
			}},
			{},
			{},
		]
	};
	
	var grid = {
		margin:10,
		rows:[
			{
				id:"dt_sqllist",
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
				save:urlstr+"/WBCURDMng/saveSQLCode/DSSuffix/"+_DSSuffix,
				columns:[
					{id:"deletebutton", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
					{id:"_identify", header:"#", sort:"int",width:40},
					{id:"debug", header:"debug", template:"{common.checkbox()}",width:50, disabled:true,format:webix.i18n.numberFormat},
					{id:"sqlindex", header:"sqlindex", editor:"text",sort:"string",fillspace:0.5},
					{id:"sqlcode", name:"sqlcode",header:"sqlcode",width:100,hidden:true},					
					{id:"remark", header:"备注",editor:"popup", sort:"string",fillspace:1},
					{id:"sqlcodebak", header:"sqlcodebak",editor:"popup",  fillspace:1},
				],
				on: {
					onAfterLoad: function(){
						this.select(1);		
					},

				},
				onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_sqllist").remove(id);
								}
							}
						});
					}
				},
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
							view:"pager", 
							id:"para_pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 35,
							group:5
						}]
					};
					
	var detailform = {
		view:"form",
		id:"sqlform",	
		type:"clean", 
		elements:[	
			{view:"textarea",name:"sqlcode",	id:"sqlcode",	paddingX:5,	paddingY:5, }
		]

	};
	
	var footer={
									css: "highlighted_header header6",
									paddingX:5,
									paddingY:5,
									cols:[
											{ view: "button", type: "form", icon: "plus", label: "保存", width: 90,
											click:function(){
														var selid = $$("dt_sqllist").getSelectedId();
														var item = $$("dt_sqllist").getSelectedItem();
														var sqlcode = $$("sqlcode").getValue();
														item["sqlcode"] = sqlcode;
														$$("dt_sqllist").updateItem(selid, item);
													}},
											{}
											]
							};
							
	var layout = {
		type: "clean",
		rows:[
			toolbar,
			{
				cols:[{rows:[grid,page]},{view:"resizer"},{rows:[detailform,footer]}]
			}
		]

	};


	return {
		$ui: layout,
		$oninit:function(){
			$$("dt_sqllist").parse(paraobject.getSQLList());
			$$("sqlform").bind($$("dt_sqllist"));	
			
			webix.dp.$$("dt_sqllist").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;});
			
			webix.dp("dt_sqllist").attachEvent("onAfterInsert",
				function(response, id, object){
				$$("dt_sqllist").getItem(id)._identify = response;
				$$("dt_sqllist").refresh();
			});
			
		}
	};

});