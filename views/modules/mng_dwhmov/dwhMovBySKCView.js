define([
	"data/stockobject"
],
	function(stockobject){
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
     
	var grid_skc = {
		view:"datatable",
		id:"dt_dwhmovskc",
		leftSplit:3,
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{
			  width:250,
			  autoheight:false,
			 scroll:true
		},
		columns:[
//			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"partycode",header:"#",width:35,hidden:true},
			
			{ id:"skccode",	header:["款色",{content:"textFilter"}], sort:"string",fillspace:1.5},
			{ id:"colorname",	header:"颜色", sort:"string",fillspace:1},
			
			{ id:"yearname",	header:["年份",{content:"selectFilter"}], sort:"string",fillspace:1,hidden:true},
			{ id:"seasonname",	header:["季节",{content:"selectFilter"}], sort:"string",fillspace:1},
			{ id:"maintypename",	header:["大类",{content:"selectFilter"}], sort:"string",fillspace:1.5},
			{ id:"subtypename",	header:["小类",{content:"selectFilter"}], sort:"string",fillspace:1.5},
			{ id:"saletype",	header:["销售分类",{content:"selectFilter"}], sort:"string",fillspace:1.5},
			{ id:"targetqty",	header:"目标库存",sort:"int", fillspace:1},
			{ id:"stockqty",	header:"实际库存",sort:"int", fillspace:1},
			{ id:"shortstockqty",header:"缺口库存",sort:"int",align:"right", fillspace:1},
			{ id:"overstockqty",	header:"超额库存",sort:"int",align:"right", fillspace:1}
		],
		select: true,
		on:{
			onSelectChange:function(){
						var selRow = this.getSelectedItem();
						if(selRow)
						{				
						var postData={ParentWHCode:selRow.partycode,SKCCode:selRow.skccode};
						var presWHSKCInfoData = stockobject.getWHSKCInfo(postData);
						presWHSKCInfoData.then(function(data){
								$$("dt_dwhMovBySKC").clearAll();
								$$("dt_dwhMovBySKC").parse(data.json());
								
								options1=[];
								$$("dt_dwhMovBySKC").eachRow(function(itemid){
									var item = $$("dt_dwhMovBySKC").getItem(itemid);

									if(parseInt(item.instore)<1)
										options1.push({id:item.partycode,//options1.length+1,
											partylevel:item.partylevel,
											partycode:item.partycode,
											partyname:item.partyname});
								});
								$$("popupid").clearAll()
								$$("popupid").parse(options1);
						});
						}
			}
		}
	};

     var popup1 = webix.ui({
            view:"gridsuggest",
            body:{
            	   id:'popupid',
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
                ]
            }
        });
       
						
   var grid_whlistbyskc = {
		view:"datatable",
		rowHeight:_RowHeight+5,
		id:"dt_dwhMovBySKC",
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
			{ id:"skccode",header:["SKC",{content:"textFilter"}], sort:"string",hidden:true,fillspace:2},
			{ id:"partycode",	header:"下属门店编号", sort:"string",hidden:true,fillspace:2},
			{ id:"partyname",header:"下属门店", sort:"string",fillspace:2},
			{ id:"partylevel",	header:["门店级别",{content:"selectFilter"}],sort:"string", fillspace:1},
			{ id:"onshelfdays",header:"上货天数", sort:"string",fillspace:1},
			{ id:"stockqty",	header:"实际库存",sort:"int", fillspace:1},
			{ id:"sale30qty",header:"30天销量",sort:"int", fillspace:1},
			{ id:"saletotalqty",header:"累计销量",sort:"int", fillspace:1},
			{ id:"distcode",header:"目标店号",sort:"string", fillspace:1,
				editor:"richselect", popup:popup1,css:'bgcolor1'},
			{ id:"distname",header:"目标店名",sort:"string",fillspace:1.5,
				template:function(obj){
				if(!options1||!obj.distcode) return '';
				var rs = options1.filter(function(item){return item.partycode.trim()==obj.distcode.trim();});
				if(rs.length) return rs[0].partyname; else return '';
			  }
			},
		],
	};
	
	var grid_movplanorder = {
		view:"datatable",
		id:"dt_movPlanOrder",
		headerRowHeight:_HeaderRowHeight,
		rowHeight:_RowHeight+5,
		minWidth:400,
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
		id: "dwhMovBySKCView",
		rows:[
			grid_skc,
			{view:"resizer"},
			{container:"data_container",
			    cols:[
				grid_whlistbyskc,
				{view:"resizer"},
				{ 
					view:"form",height:300, width:300, scroll:false,type: "clean",
					elements:[
					{ view:"button", label:"调拨", type:"next", height:30, width:100, align:"left",
					click:function(){
						$$("dt_dwhMovBySKC").eachRow(function(rowId){
							var row = $$("dt_dwhMovBySKC").getItem(rowId);
							if(row.distcode>'' && parseInt(row.stockqty)>0)
							{
								var sameArray = $$("dt_movPlanOrder").find(function(obj){
								    return obj.srcpartycode===row.partycode && obj.trgpartycode===row.distcode && obj.skccode === row.skccode;
								});

								if(sameArray.length<1)
								$$("dt_movPlanOrder").add({
									srcpartycode:row.partycode,
									srcpartyname:row.partyname,
									trgpartycode:row.distcode,
									trgpartyname:getDistName(row.distcode),
									skccode:row.skccode,
									movqty:row.stockqty});
							}
						});
					}},
					grid_movplanorder
					]
				}
			]}
		]
	};

   
	return { $ui: layout };

});
