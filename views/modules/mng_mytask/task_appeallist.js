define(function(){
		var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
//			paddingX:5,
//			paddingY:5,
			height:35,
			cols:[
				{"template": "<span class='webix_icon fa-check'></span>请对每一条仲裁申请单独处理", "css": "sub_title2", borderless: true}
		    ]
	};
	
	var grid = {
		margin:10,
		rows:[
			{
				id:"dt_appealtask",
				view:"datatable", 
				select:true,
				dragColumn:true,
				headerRowHeight:35,
				dragColumn:true,
				headermenu:{
				    width:250,
				    autoheight:false,
				    scroll:true
				},
				save:urlstr+"/WBCURDMng/saveEventRecord/DSSuffix/"+_DSSuffix,
				columns:[
					{ id:"row_number",name:"row_number",header:"#",fillspace:0.5},
					{id:"appeal", header:"仲裁", fillspace:0.5, template:"<span  style='color:#777777; cursor:pointer;' class='appeal webix_icon fa-thumbs-o-up'></span>"},
					{id:"appealstate", header:["状态", {content:"selectFilter"} ], sort:"string" ,minWidth:50, fillspace:0.4,
					template:"<span class='status status#appealvalue#'>#appealstate#</span>"},
					{id:"_identify", header:"#",hidden:true},
					{id:"recordcode", header:"记录编号", width:120,hidden:true},
					{id:"recordtime", header:"日期", sort:"string", width:120},
					{id:"recordtype", header:["类型",{content:"selectFilter"}], width:70,hidden:true},
					{id:"incenttype", header:["奖扣",{content:"selectFilter"}], width:70,hidden:true},
					{id:"deptsname", header:["部门", {content:"selectFilter"} ], sort:"string", width:100},
					{id:"staffname", header:["得分人", {content:"selectFilter"} ], sort:"string", width:100},
					

					{id:"yscore", header:["Y分", {content:"numberFilter"}],width:90, sort:"string",format:webix.Number.numToStr({decimalSize:0})},
					{id:"tscore", header:["T分", {content:"numberFilter"}],width:90, sort:"string",hidden:true, format:webix.Number.numToStr({decimalDelimiter:".",decimalSize:1})},
					{id:"tsaleqty", header:"客单", width:90, sort:"string",hidden:true, format:webix.Number.numToStr({decimalSize:0})},
					{id:"tvalue", header:"金额", width:90, sort:"string",hidden:true, format:webix.i18n.priceFormat},
					{id:"atvalue", header:"实绩", width:90, sort:"string", format:webix.i18n.priceFormat,hidden:true},
					{id:"vtvalue", header:"虚绩", width:90, sort:"string", format:webix.i18n.priceFormat,hidden:true},


					{id:"eventtype", header:["事件类型", {content:"selectFilter"} ], sort:"string", minWidth:150},
					{id:"event", header:"事件", sort:"string" ,minWidth:100, fillspace:1},
					{id:"eventcode", header:"事件编号", sort:"string" ,minWidth:100, fillspace:1,hidden:true},
					
					{id:"appealdate", header:"审核日期", minWidth:100, fillspace:1,hidden:true},

				],
				pager:"appealtask_pagerA",
				onClick:{
						"appeal":function(e,id,node){
							var row = $$("dt_appealtask").getItem(id);
//							console.log(id);
							if(row['appealstate'] != "待仲裁") 
							{
							   webix.message("不可对已经审核记录再次审核");
							   return;
							}
							
						webix.confirm({
							text:"你将审核本条记录.<br/>确定吗?", ok:"批准", cancel:"拒绝",
							callback:function(result){
									var appealstate = "拒绝";	
									var appealvalue = 0;
									if(result)  
									{
										appealstate = "批准";
										appealvalue = 1;
									}

									row['appealstate'] = appealstate;
									row['appealvalue'] = appealvalue;
									row['appealdate'] = new Date().toString('yyyy/MM/dd');
									
									$$("dt_appealtask").updateItem(id, row);
							}
						});
					},
				}
			}
		]

	};
	
	var page=	{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:5,
						paddingY:5,
						height:40,
						cols:[{
							view:"pager",
							id:"appealtask_pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 35,
							group:5
						}]
					};
					
	return {
		$oninit:function(){	webix.dp.$$("dt_appealtask").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;});},
		$ui:{
			id:"toAppealView",
			type: "clean",
			rows:[
				titleBar,
				grid,	
				page,
//				{}
			]

		}
	}
});