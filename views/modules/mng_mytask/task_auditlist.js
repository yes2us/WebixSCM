define(function(){
		var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:5,
			paddingY:5,
			height:35,
			cols:[
//				{view:"checkbox", width:100,align: "left", label: '全选',	labelWidth:40},
			    { view: "button", type: "iconButton", icon: "check-square-o", label: "一键审核", width: 120, click: function(){
			    	
			    			webix.confirm({
							text:"你将审核所有待审核的记录.<br/>确定吗?", ok:"批准", cancel:"拒绝",
							callback:function(result){
									if(result)  
									{
								    	$$("dt_audittask").eachRow( 
										    function (rowid){
										    	var row = $$("dt_audittask").getItem(rowid);
												if(row['auditstate'] == "待审核") 
												{
														row['auditstate'] = "批准";
														row['auditvalue'] = 1;
														row['auditdate'] = new Date().toString('yyyy/MM/dd');									
														$$("dt_audittask").updateItem(rowid, row);
												}							
										    }
										);
									}
							}
						});
						
			    }},
				{},
		    ]
	};
	
	var grid = {
		margin:10,
		rows:[
			{
				id:"dt_audittask",
				view:"datatable", 
				select:true,
				headerRowHeight:35,
				dragColumn:true,
				headermenu:{
				    width:250,
				    autoheight:false,
				    scroll:true
				},
				save:urlstr+"/WBCURDMng/saveEventRecord/DSSuffix/"+_DSSuffix,
				columns:[
					{ id:"row_number",name:"row_number",header:"#",width:30},
					{id:"audit", header:"审核", width:65, template:"<span  style='color:#777777; cursor:pointer;' class='audit webix_icon fa-thumbs-o-up'></span>"},
					{id:"auditstate", header:["状态", {content:"selectFilter"} ], sort:"string" ,width:80, 
					template:"<span class='status status#auditvalue#'>#auditstate#</span>"},
					{id:"_identify", header:"#",width:120,hidden:true},
					{id:"recordcode", header:"记录编号", width:120},
					{id:"recordtime", header:"日期", sort:"string", width:120},
					{id:"recordtype", header:["类型",{content:"selectFilter"}], width:100},
					{id:"incenttype", header:["奖扣",{content:"selectFilter"}], width:100},
					{id:"deptsname", header:["部门", {content:"selectFilter"} ], sort:"string",  width:100,hidden:true},
					{id:"staffname", header:["得分人", {content:"selectFilter"} ], sort:"string", width:100},
					

					{id:"yscore", header:["Y分", {content:"numberFilter"}],width:90, sort:"string",format:webix.Number.numToStr({decimalSize:0})},
					{id:"tscore", header:["T分", {content:"numberFilter"}],width:90, sort:"string", format:webix.Number.numToStr({decimalDelimiter:".",decimalSize:1})},
					{id:"tsaleqty", header:"客单", width:90, sort:"string", format:webix.Number.numToStr({decimalSize:0}),hidden:true},
					{id:"tvalue", header:"金额", width:90, sort:"string", format:webix.i18n.priceFormat,hidden:true},
					{id:"atvalue", header:"实绩", width:90, sort:"string", format:webix.i18n.priceFormat,hidden:true},
					{id:"vtvalue", header:"虚绩", width:90, sort:"string", format:webix.i18n.priceFormat,hidden:true},


					{id:"eventtype", header:["事件类型", {content:"selectFilter"} ], sort:"string", width:100},
					{id:"event", header:"事件", sort:"string" , fillspace:1},
					{id:"eventcode", header:"事件编号", sort:"string" ,fillspace:1,hidden:true},
					
					{id:"auditdate", header:"审核日期", width:100,hidden:true},

				],
				pager:"audittask_pagerA",
				onClick:{
						"audit":function(e,id,node){
							var row = $$("dt_audittask").getItem(id);
//							console.log(id);
							if(row['auditstate'] != "待审核") 
							{
							   webix.message("不可对已经审核记录再次审核");
							   return;
							}
							
						webix.confirm({
							text:"你将审核本条记录.<br/>确定吗?", ok:"批准", cancel:"拒绝",
							callback:function(result){
									var auditstate = "拒绝";	
									var auditvalue = 0;
									if(result)  
									{
										auditstate = "批准";
										auditvalue = 1;
									}

									row['auditstate'] = auditstate;
									row['auditvalue'] = auditvalue;
									row['auditdate'] = new Date().toString('yyyy/MM/dd');
									
									$$("dt_audittask").updateItem(id, row);
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
							id:"audittask_pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 35,
							group:5
						}]
					};
					
	return {
		$oninit:function(){	
			webix.dp.$$("dt_audittask").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;});
		},
		$ui:{
			id:"toAuditView",
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