define(["data/scoreobject"],function(scoreObject){

	var titleRating = {

		view: "toolbar",
		css: "highlighted_header header1",
		paddingX:5,
		paddingY:5,
		height:35,
		cols:[
			{
				template: "<span class='webix_icon fa-star-o'></span>店长Y分", "css": "sub_title2", borderless: true
			},
//			{view: "button", type: "iconButton", icon:"refresh",width:100, label: "Refresh"}
		]
	};

	var gridRating = {
		view:"datatable",
		id:"storemngeryscore",
		headerRowHeight:35,
		dragColumn: true,
	headermenu: {
		width: 250,
		autoheight: false,
		scroll: true
	},
		select:"row",
		columns:[
			{ id:"rankorder", header:"排名", sort:"int",width: 65},
			{ id:"staffname",	header:"店长",  sort:"string", fillspace:1},
			{ id:"deptsname",	header:"店名", sort:"string",fillspace:1.5},
			{ id:"yscore",	header:"Y分", sort:"string",fillspace:1,format:webix.Number.numToStr({decimalSize:0})},
		]
	};


	var layout = {
		type: "clean",
		rows:[
			titleRating,
			gridRating
		]
	};

	return { 
		$ui: layout,
		$fnInvoke:function(StartDate,EndDate){		
			var condition = 
			{
				StartDate:StartDate,
				EndDate:EndDate,
				RankAtt:'StoreMngerTY',
				PageIndex:1,
				PageLen:1000
			}
			
			$$("storemngeryscore").clearAll();
			$$("storemngeryscore").parse(scoreObject.getRanker(condition));
		}
	};

});