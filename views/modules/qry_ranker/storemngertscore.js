define(["data/scoreobject"],function(scoreObject){

	var titleProgress = {
		view: "toolbar",
		css: "highlighted_header header4",
		paddingX:5,
		paddingY:5,
		height:35,
		cols:[
			{
				"template": "<span class='webix_icon fa-adjust'></span>店长T分进度", "css": "sub_title2", borderless: true
			},
//			{ view: "button", type: "iconButton", icon: "sliders", label: "Update", width: 100}
		]
	};
	var gridProgress = {
		view:"datatable",
		id:"storemngertscore",
		select:"row",
		headerRowHeight:35,
		dragColumn: true,
	headermenu: {
		width: 250,
		autoheight: false,
		scroll: true
	},
		columns:[
			{ id:"rankorder", header:"排名", sort:"int",width: 65},
			{ id:"staffname",	header:"店长",  sort:"string", fillspace:1},
			{ id:"deptsname",	header:"店名", sort:"string",fillspace:1.5},
			{ id:"num",	header:"目标达成率%", sort:function(a,b){
				a = a.progress;
				b = b.progress;
				return (a>b?1:(a<b?-1:0));
			}, fillspace:1.5, template:function(obj){
				return parseInt(obj.agratio*100,10)+"%";
			}},
			{ id:"agratio",	header:"进度",  sort:"int",fillspace:2.5,	template:function(obj){
				var html = "<div class='progress_bar_element'>";
				var className = "progress_result "+(obj.type||"");
				html += "<div title='"+(parseInt(obj.agratio*100,10)+"%")+"' class='"+className+"' style='width:"+(obj.agratio*100+"%")+"'></div>";
				return html+"</div>";
			}}
		],

	};


	var layout = {
		type: "clean",
		rows:[
			titleProgress,
			gridProgress
		]
	};


	return { 
			$ui: layout,
			$fnInvoke:function(YearMonth){
				
			var condition = 
			{
				YearMonth:YearMonth,
				RankAtt:'StoreGARatio',
				PageIndex:1,
				PageLen:1000
			}
			
			$$("storemngertscore").clearAll();
			$$("storemngertscore").parse(scoreObject.getRanker(condition));
		}
	};

});