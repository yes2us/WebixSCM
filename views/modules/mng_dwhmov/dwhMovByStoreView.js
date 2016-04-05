define([
	"data/stockobject"
],
	function(stockobject){
	
    var selPartyName;
    	var options1;
	    
     function custom_checkbox(obj, common, value){
				if (value)
					return "<div class='webix_table_checkbox checked'> 删 </div>";
				else
					return "<div class='webix_table_checkbox notchecked'> 删 </div>";
			}
     function getDistName(distcode){
     	if(!options1||!distcode) return '';
		var rs = options1.filter(function(item){return item.partycode.trim()==distcode.trim();});
		if(rs.length) return rs[0].partyname; else return '';
     }
     
      var popup1 = webix.ui({
            view:"gridsuggest",
            body:{
            	   id:'popupid2',
            	   scroll:true,
            	   autoheight:false,
            	   autofocus:true,
               yCount:10,
               rowHeight:_RowHeight,
			   headerRowHeight:_HeaderRowHeight,
                columns:[
                    {id:"partylevel", header:["级别",{content:"selectFilter"}], width:60},
                    {id:"partycode", header:["店编号",{content:"textFilter"}], width:90},
                    {id:"partyname", header:"店名", width:150}
                ],
                on:{onAfterLoad:function(){
                	options1=[];
                	  $$("popupid2").eachRow(function(rowid){
                	  	   var row = $$("popupid2").getItem(rowid);
                	  	   options1.push({partycode:row.partycode,partyname:row.partyname});
                	  });
                }}
            }
        });
        
	var grid_storestockstruct = {
		view:"datatable",
		id:"dt_dwhmovstorestockstruct",
		leftSplit:3,
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{
			  width:250,
			  autoheight:false,
			 scroll:true
		},
		columns:[
				    { id:"partycode",name:"yearname",	header:"门店编号", hidden:true,css:"rank", fillspace:1},
				    { id:"partyname",name:"yearname",	header:"门店", css:"rank", fillspace:1},
				    { id:"yearname",name:"yearname",	header:"年份", css:"rank", fillspace:1},
					{ id:"seasonname",name:"seasonname",	header:"季节", css:"rank", fillspace:1},
					{ id:"seriesname",name:"series",	header:"系列",width:200, fillspace:1},
					{ id:"skcnum",name:"skcnum",header:[{text:"款色结构", colspan:3},"款色数"] ,fillspace:1},
					{ id:"fastrunnerskcnum",name:"fastrunnerskcnum",header:[null,"畅销款色"],fillspace:1},
					{ id:"deadskcnum",name:"deadskcnum",header:[null,"死货款色"],fillspace:1},		
					{ id:"targetqty",name:"targetqty",header:[{text:"库存结构", colspan:5},"目标库存"] ,fillspace:1},
					{ id:"totalqty",name:"totalqty",header:[null,"总库存"] ,fillspace:1},
					{ id:"shortstockqty",name:"shortstockqty",	header:[null,"库存缺口"],fillspace:1},		
					{ id:"overstockqty",name:"overstockqty",header:[null,"超额库存"] ,fillspace:1},
					{ id:"deadstockqty",name:"deadstockqty",header:[null,"死货库存"] ,fillspace:1}
		],
		select: true,
		on:{
			onSelectChange:function(){
					var selRow = this.getSelectedItem();
					if(selRow)
					{	
//						console.log(JSON.stringify(options1));
						$$("dt_dwhMovStoreTSInfo").clearAll();
						$$("dt_dwhMovStoreTSInfo").parse(stockobject.getWHSKCInfo({WHCode:selRow.partycode}));
					}
			}
		}
	};


   var grid_dwhMovStoreTSInfo = {
		view:"datatable",
		rowHeight:_RowHeight+5,
		id:"dt_dwhMovStoreTSInfo",
		headerRowHeight:_HeaderRowHeight,
		editable:true,
		headermenu:{
			width:250,
			autoheight:false,
			scroll:true
		},
		rules:{"targetqty":webix.rules.isNumber,"operatemov":webix.rules.isNumber},
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"skccode",header:["SKC",{content:"textFilter"}], sort:"string",fillspace:1.5},
			{ id:"partycode",	header:"下属门店编号", sort:"string",hidden:true,fillspace:2},
			{ id:"partyname",	header:"下属门店", sort:"string",hidden:true,fillspace:2},
			{ id:"yearname",	header:["年份",{content:"selectFilter"}], sort:"string",fillspace:1,hidden:true},
			{ id:"seasonname",	header:["季节",{content:"selectFilter"}], sort:"string",fillspace:1},
			{ id:"maintypename",	header:["大类",{content:"selectFilter"}], sort:"string",fillspace:1.5},
			{ id:"subtypename",	header:["小类",{content:"selectFilter"}], sort:"string",fillspace:1.5},
			{ id:"saletype",	header:["销售分类",{content:"selectFilter"}], sort:"string",fillspace:1.5},
			{ id:"onshelfdays",header:"上货天数", sort:"string",fillspace:1},
			{ id:"stockqty",	header:"实际库存",sort:"int", fillspace:1},
			{ id:"sale30qty",header:"30天销量",sort:"int", fillspace:1},
			{ id:"saletotalqty",header:"累计销量",sort:"int", fillspace:1},
			{ id:"distcode",header:"目标店号",sort:"string", fillspace:1,editor:"richselect", popup:popup1,css:'bgcolor1'},
			{ id:"distname",header:"目标店名",sort:"string",fillspace:1.5,
				template:function(obj){
				if(!options1||!obj.distcode) return '';
				var rs = options1.filter(function(item){return item.partycode.trim()==obj.distcode.trim();});
				if(rs.length) return rs[0].partyname; else return '';
			  }
			},
		],
	};
	
	var grid_movplanorder2 = {
		view:"datatable",
		id:"dt_movPlanOrder2",
		headerRowHeight:_HeaderRowHeight,
		rowHeight:_RowHeight+5,
		maxWidth:400,
		headermenu:{
			width:400,
			autoheight:false,
			scroll:true
		},
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"delete",header:"",template:custom_checkbox,width:40, editor:"inline-checkbox"},
			{ id:"srcpartycode",	header:"调出门店编号", sort:"string",hidden:true,fillspace:2},
			{ id:"srcpartyname",header:"调出门店",sort:"int", fillspace:1},
			{ id:"trgpartycode",	header:"调入门店编号", sort:"string",hidden:true,fillspace:2},
			{ id:"trgpartyname",header:"调入门店",sort:"int", fillspace:1},
			{ id:"skccode",header:"款色", sort:"string",hidden:true,fillspace:2},
			{ id:"movqty",header:"数量",sort:"int",fillspace:0.5}
		]
	};
	
	var layout = {
		type: "clean",
		id: "dwhMovByStoreView",
		rows:[
			{container:"data_container",
			    cols:[
				grid_storestockstruct,
				{view:"resizer"},
				{ 
					view:"form",height:300, width:300, scroll:false,type: "clean",
					elements:[
					{ view:"button", label:"调拨", type:"next", height:30, width:100, align:"left",
					click:function(){
						$$("dt_dwhMovStoreTSInfo").eachRow(function(rowId){
							var row = $$("dt_dwhMovStoreTSInfo").getItem(rowId);
							if(row.distcode>'' && parseInt(row.stockqty)>0)
							{
								var sameArray = $$("dt_movPlanOrder2").find(function(obj){
								    return obj.srcpartycode===row.partycode && obj.trgpartycode===row.distcode && obj.skccode === row.skccode;
								});

								if(sameArray.length<1)
								$$("dt_movPlanOrder2").add({
									srcpartycode:row.partycode,
									srcpartyname:row.partyname,
									trgpartycode:row.distcode,
									trgpartyname:getDistName(row.distcode),
									skccode:row.skccode,
									movqty:row.stockqty});
							}
						});
					}},
					grid_movplanorder2
					]
				}
			]},
			{view:"resizer"},
			grid_dwhMovStoreTSInfo
		]
	};


	return { $ui: layout };

});
