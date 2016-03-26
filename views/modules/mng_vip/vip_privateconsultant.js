define(["data/data_arrays"],function(data_arrays){
	// datasource
	var images = [
		{id:1, src:"data/imgs/image001.jpg", title: "Image 1"},
		{id:2, src:"data/imgs/image002.jpg", title: "Image 2"},
		{id:3, src:"data/imgs/image003.jpg", title: "Image 3"},
		{id:4, src:"data/imgs/image004.jpg", title: "Image 4"},
		{id:5, src:"data/imgs/image005.jpg", title: "Image 5"},
		{id:6, src:"data/imgs/image006.jpg", title: "Image 6"}
	];

	// create an array with carousel views
	var viewsArray = [];
	for(var i = 0; i < images.length; i++){
		viewsArray.push({
			id: images[i].id,
			css: "image",
			template:img,
			data: webix.copy(images[i])
		});
	}
	function img(obj){
		return '<img src="'+obj.src+'" class="content" ondragstart="return false"/>'
	}
	
	
	var titleBar = {
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:5,
		paddingY:5,
		height:35,
		cols:[
			{ view: "button", type: "iconButton", icon: "plus", label: "配衣方案", width: 120, click: function(){$$("fittingSolution").show();}},
			{ view: "button", type: "iconButton", icon: "plus", label: "增加", width: 80, click: function(){this.$scope.ui(makesolution).show();}},
	 	    { view: "button", type: "iconButton", icon: "pencil-square-o", label: "修改", width: 80},
	 	    {},
//	 	    { template: "<span class='webix_icon fa-cogs'></span>订制会员云衣橱", "css": "sub_title2", borderless: true	},
		]
	};
	
	var gridTree = {
		view:"treetable",
		columns:[
			{ id:"id",	header:"", width:35},
			{ id:"name",	header:"年份-波段",	 fillspace:4,template:"{common.treetable()} #name#" },
			{ id:"code",	header:"款式", sort:"string",fillspace:2},
		],
		select: true,
		data: data_arrays.treetable,
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

	var makesolution = {
				id:"makesolution",
				hidden:false,
				type:"wide",
				cols:[
				gridTree,
				{	
					heigth:500,
					rows:[
							{view: "button", type: "iconButton", icon: "close",label: "关闭",click: function(){this.$scope.ui(makesolution).hide();}},
							
							{
								view: "carousel",
								id: "carousel",
								cols: viewsArray,
								align:"center",
								navigation: {
									type: "side",
									items: false
								}
							},
							{
								view: "dataview",
								id: "imageList",
								css: "nav_list",
								yCount: 1,
								select: true,
								scroll: false,
								type: {
									width: 100,
									height: 65
								},
								template: img,
								data: images
							}
						]
				}
			   ]
	};
	
	webix.protoUI({
			name:"dataview_edit"
		}, webix.EditAbility, webix.ui.dataview);
		
	var existidea = {
			view:"dataview_edit",
			template:"<div class='webix_strong'>#id#</div> 主题: #name#, <br/>推荐理由: #name#",
			xCount:4, //the number of items in a row
			data:data_arrays.treetable,

			editable:true,
			editor:"text",
			editValue:"name",
			autoHeight:true,
			type: {
				height: 400,
				width:350,
//				autoHeight:true,
			}
	};
	
	var layout = {
		id: "vipPrivateConsultantView",
		type: "clean",
		autoheight:true,
		cols:[
				{
				id:"fittingSolution",
				header:"配装方案", 
				hidden:true,
				body:
					{
					view:"list", 
					width:250,
					template:"#rank#. #title#",
//					data:big_film_set 
					}
				},
				{rows:[titleBar,existidea,makesolution]}
		]

	};


	
	return { $ui: layout };

});
