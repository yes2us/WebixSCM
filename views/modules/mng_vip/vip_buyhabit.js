define([], function(){

	var form = {
		view: "form",
		id: "vipBuyHabitView",
		type:"clean",

		paddingX:25,
		paddingY:25,
		elementsConfig:{
			labelWidth: 100
		},
		scroll: true,
		elements:[
			{	
				margin:10,
				cols:[
				{rows:[
								{ template:"消费强度", type:"section"},
								{view: "text", name: "anzqtypersale", label: "单次件数",disabled:true},
								{view: "text", name: "anzmoneypersale", label: "单次金额",disabled:true},
								{view: "text", name: "anztotalbuymoney", label: "消费总额",disabled:true}
				]},
				{
					rows:[
								{ template:"消费频度", type:"section"},
								{view: "text", name: "anztotalbuyfreq", label: "消费次数",disabled:true},
								{view: "text", name: "anzbuygapdays", label: "消费间隔",disabled:true},
								{view: "text", name: "anzbuynearity", label: "消费近度",disabled:true}
					]
				}
			]
		 },
			{	
				margin:10,
				rows:[
								{template:"消费宽度", type:"section"},
								{ 
								  view:"datatable",
								  id:"buyspan_list",
								  select: true,
								  headerRowHeight:35,
								  dragColumn:true,
									headermenu:{
									    width:250,
									    autoheight:false,
									    scroll:true
									},
								  columns:[
										{ id:"waveband",name:"waveband",	header:"波段", css:"rank", fillspace:1},
										{ id:"series",name:"series",	header:"系列",width:200, fillspace:2},
										{ id:"salemoney",name:"salemoney",header:"金额" ,fillspace:1},
										{ id:"saleqty",name:"saleqty",	header:"件数",fillspace:1}								  
								  ]
								 }
						]
		 },
//			{},
		]
	};

	var layout = form;

	return {
		$ui:layout
	};
	

});