define(["data/scoreobject"],function(scoreObject){

	var titleRating = {

		view: "toolbar",
		css: "highlighted_header header1",
		paddingX:5,
		paddingY:5,
		height:35,
		cols:[
			{
				template: "<span class='webix_icon fa-star-o'></span>店员总Y分", "css": "sub_title2", borderless: true
			},
//			{view: "button", type: "iconButton", icon:"refresh",width:100, label: "Refresh"}
		]
	};

	var gridRating = {
		view:"datatable",
		id:"storestaffyscore",
		headerRowHeight:35,
		select:"row",
		dragColumn: true,
	headermenu: {
		width: 250,
		autoheight: false,
		scroll: true
	},
		columns:[
			{ id:"rankorder", header:"排名", sort:"int",width: 65},
			{ id:"staffname",	header:"店长",  sort:"string", fillspace:1},
			{ id:"deptsname",	header:["店名",{content:"selectFilter"}], sort:"string",fillspace:1.5},
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
		$fnInvoke:function(DeptCode,StartDate,EndDate){		
			var condition = 
			{
				DeptCode:DeptCode,
				StartDate:StartDate,
				EndDate:EndDate,
				RankAtt:'StoreStaffTY',
				PageIndex:1,
				PageLen:1000
			}
			
			$$("storestaffyscore").clearAll();
			$$("storestaffyscore").parse(scoreObject.getRanker(condition));
		}
	};

});