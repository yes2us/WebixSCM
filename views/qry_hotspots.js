define([
	"views/menus/export",
	"data/scoreobject"
], function(exports, scoreobject){

checkauthorization(false);

	var titleBar = {
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:5,
		paddingY:5,
		height:35,
		cols:[
			{
				template: "<span class='webix_icon fa-star-o'></span>查询典型事件", "css": "sub_title2", borderless: true
			},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, popup: exports.print("dt_hotspot")},
		]
	};
	
	var grid = {
		margin:10,
		rows:[
			{
				id:"dt_hotspot",
				view:"datatable",
				headerRowHeight:35,
				dragColumn:true,
				select:true,
					headermenu:{
					    width:250,
					    autoheight:false,
					    scroll:true
					},
				columns:[
					{id:"recordtime", header:"日期", sort:"string", width:120},
					{id:"incenttype", header:["奖扣",{content:"selectFilter"}], width:60},
					{id:"deptsname", header:["部门", {content:"selectFilter"} ], sort:"string", width:120},
					{id:"staffname", header:["得分人", {content:"selectFilter"} ], sort:"string", width:80},
					

					{id:"yscore", header:["Y分",{content:"numberFilter"}], width:60, sort:"string",format:webix.Number.numToStr({decimalSize:0})},
					{id:"event", header:["事件", {content:"selectFilter"}],sort:"string",fillspace:1},
					{id:"eventtype", header:["事件类型", {content:"selectFilter"} ], sort:"string", width:100},
										
					{id:"tscore", header:["T分",{content:"numberFilter"}], width:70, sort:"string",format:webix.Number.numToStr({decimalDelimiter:".",decimalSize:1})},
					{id:"tvalue", header:["金额",{content:"numberFilter"}], width:90, sort:"string", format:webix.i18n.priceFormat},
					{id:"tsaleqty", header:["客单",{content:"numberFilter"}], width:60, sort:"string", format:webix.Number.numToStr({decimalSize:0})},



					{id:"auditorname", header:["审核人",{content:"selectFilter"} ], sort:"string",width:70},
					{id:"remark", header:"备注", sort:"string",fillspace:1.2}
				],
				export: true,
				on: {
					onAfterLoad: function(){
						this.select(1);		
					}
				},
				pager:"pagerA"
			}
		]

	};

	var layout = {
		type: "clean",
		rows:[
			titleBar,
			{
				rows:[
					grid,
					{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:5,
						paddingY:5,
						height:35,
						cols:[{
							view:"pager", id:"pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 35,
							group:5
						}]
					}
				]
			}



		]

	};

	return {
		$ui: layout,
		$oninit:function(){
			$$("dt_hotspot").parse(scoreobject.getPosHotSpot());
		}
	};

});