define([
	"data/stockobject"
],
	function(stockobject){
	
    var selPartyName;
    	var options1;
	var regionStores;
 
 	 function LoadPopStoreList(datastr){
	 			options1=[];
	 			
	 			regionStores.forEach(function(item){
	 				if(datastr.indexOf(item.partycode.trim())<=0)
						{
							options1.push({id:item.partycode,
							partylevel:item.partylevel,
							partycode:item.partycode,
							partyname:item.partyname});		
						}
					});

				$$("popupid2").clearAll()
				$$("popupid2").parse(options1);
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
				    { id:"partycode",name:"partycode",	header:"门店编号", hidden:true,css:"rank", fillspace:1},
				    { id:"partyname",name:"partyname",	header:"门店", css:"rank", width:100},
				    { id:"yearname",name:"yearname",	header:"年份", css:"rank", width:60},
					{ id:"seasonname",name:"seasonname",	header:"季节", css:"rank",width:60},
					{ id:"seriesname",name:"seriesname",	header:"系列",width:200,width:100},
					{ id:"skcnum",name:"skcnum",header:[{text:"款色结构", colspan:3},"款色数"] ,width:70},
					{ id:"frskcnuminparty",name:"frskcnuminparty",header:[null,"畅销款色"],width:85},
					{ id:"deadskcnum",name:"deadskcnum",header:[null,"死货款色"],width:85},		
					{ id:"stocktargetqty",name:"stocktargetqty",header:[{text:"库存结构", colspan:5},"目标库存"] ,width:85},
					{ id:"stocktotalqty",name:"stocktotalqty",header:[null,"总库存"] ,width:70},
					{ id:"stockshortinstores",name:"stockshortinstores",	header:[null,"库存缺口"],width:85},		
					{ id:"stockoverinstores",name:"stockoverinstores",header:[null,"超额库存"] ,width:85},
					{ id:"stockdeadqty",name:"stockdeadqty",header:[null,"死货库存"] ,width:85}
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
		leftSplit:4,
		headermenu:{
			width:250,
			autoheight:false,
			scroll:true
		},
		rules:{"targetqty":webix.rules.isNumber,"operatemov":webix.rules.isNumber},
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"skccode",header:["SKC",{content:"textFilter"}], sort:"string",width:100},
			{ id:"partycode",	header:"下属门店编号", sort:"string",hidden:true},
			{ id:"partyname",	header:"下属门店", sort:"string",hidden:true},
			{ id:"yearname",	header:["年份",{content:"selectFilter"}], sort:"string",fillspace:1,hidden:true},
			{ id:"seasonname",	header:["季节",{content:"selectFilter"}], sort:"string",width:60},
			{ id:"maintypename",	header:["大类",{content:"selectFilter"}], sort:"string",width:70},
			{ id:"subtypename",	header:["小类",{content:"selectFilter"}], sort:"string",width:100},
			{ id:"saletype",	header:["销售分类",{content:"selectFilter"}], sort:"string",width:85},
			{ id:"onshelfdays",header:"上货天数", sort:"string",width:85},
			{ id:"stockqty",	header:"实际库存",sort:"int", width:85},
			{ id:"sale30qty",header:"30天销量",sort:"int", width:85},
			{ id:"saletotalqty",header:"累计销量",sort:"int",width:85},
			{ id:"distcode",header:"目标店号",sort:"string", width:85,editor:"richselect", popup:popup1,css:'bgcolor1'},
			{ id:"distname",header:"目标店名",sort:"string",width:150,
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
//		maxWidth:400,
		headermenu:{
//			width:400,
			autoheight:false,
			scroll:true
		},
		editable:true,
		save:urlstr+"/WBCURDMng/saveMovSKCPlan",
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"delete",header:"&nbsp;", width:35,template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
			{ id:"srcpartycode",	header:"调出门店编号", sort:"string",hidden:true,fillspace:2},
			{ id:"srcpartyname",header:"调出门店",sort:"int", fillspace:1},
			{ id:"trgpartycode",	header:"调入门店编号", sort:"string",hidden:true,fillspace:2},
			{ id:"trgpartyname",header:"调入门店",sort:"int", fillspace:1},
			{ id:"skccode",header:"款色", sort:"string",hidden:true,fillspace:2},
			{ id:"movqty",header:"数量",sort:"int",fillspace:0.5}
		],
			on:{
				onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_movPlanOrder2").remove(id);
								}
							}
						});
					}
				},
		}
	};
	
	var form_movplan={ 
					view:"form", scroll:false,type: "clean",minWidth:250,
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
				};
				
	var layout = {
		type: "clean",
		id: "dwhMovByStoreView",
		rows:[
		  grid_storestockstruct,
		  {view:"resizer"},
		  {cols:[grid_dwhMovStoreTSInfo,{view:"resizer"},form_movplan]}
		]
	};


	return { 
		setRegionStores:function(jsonarray){regionStores=jsonarray;},
		$ui: layout,
		$oninit:function(){
	    		webix.dp.$$("dt_movPlanOrder2").attachEvent('onBeforeDataSend', function(obj){
	    			obj.data.MakeDate = new Date((new Date()).toString('yyyy/MM/dd'));
	    			obj.data.PlanType = "人工调拨";
	    			obj.data.Operator = _UserCode+'@'+_UserName;
	    			obj.data.DealState = -1;
	    		});
	    }
	};

});
