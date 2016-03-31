define(function(){

	var gridTree = {
		view:"treetable",
		headerRowHeight:35,
		id:"tabletree_storets",
		dragColumn:true,
				headermenu:{
				    width:250,
				    autoheight:false,
				    scroll:true
		},
		columns:[
			{ id:"id",header:"#",width:35,hidden:true},
			{ id:"recordtime",	header:"消费日期",	 fillspace:2,template:"{common.treetable()} #recordtime#" },
//			{ id:"sku",	header:"SKU", sort:"string",fillspace:2},
			
			{ id:"productcode",	header:"款式", sort:"string",fillspace:1.5},
			{ id:"color",	header:"颜色", sort:"string",fillspace:1},
			{ id:"size",	header:"尺码", sort:"string",fillspace:1},
			
			{ id:"year",	header:"年份", sort:"string",fillspace:1,hidden:true},
			{ id:"waveband",	header:"波段", sort:"string",fillspace:1},
			{ id:"series",	header:"系列", sort:"string",fillspace:2},

			{ id:"saleqty",	header:"件数", fillspace:1},
			{ id:"salemoney",	header:"金额", format:webix.i18n.priceFormat,align:"right", fillspace:1},
			{ id:"discount",	header:"折扣",fillspace:1},
			{ id:"picturepath",	header:"图片",fillspace:2,hidden:true}
		],
		select: true,
		type: {
			icon:function(obj,common){
				if (obj.$count){
					if (obj.open)
						return "<span class='webix_icon fa-angle-down'></span>";
					else
						return "<div class='webix_icon fa-angle-right'></div>";
				} else
					return "<div class='webix_tree_none'></div>";
			},
			folder:function(obj, common){
				if (obj.$count){
					if (obj.open)
						return "<span class='webix_icon fa-folder-open-o'></span>";
					else
						return "<span class='webix_icon fa-folder-o'></span>";
				}
				return "<div class='webix_icon fa-file-o'></div>";
			}
		},
		onClick:{
			"fa-angle-down":function(e,id){

				this.close(id);
			},
			"fa-angle-right":function(e,id){
				this.open(id);
			}
		},
		on:{
			onAfterLoad:function(){
				this.select(12)
			}
		}
	};

	var layout = {
		type: "clean",
		id: "storeTSView",
		cols:[
			gridTree,
		]
	};


	return { $ui: layout };

});
