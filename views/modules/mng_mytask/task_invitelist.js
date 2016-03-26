define(function(){
	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
//			paddingX:5,
//			paddingY:5,
			height:35,
			cols:[
			{
				"template": "<span class='webix_icon fa-cogs'></span>邀约顾客", "css": "sub_title2", borderless: true
			}
			]
	};
	
    var customerinQuad={
			view:"datatable",
			id:"dt_invitetask",
			headerRowHeight:35,
			dragColumn:true,
				headermenu:{
				    width:250,
				    autoheight:false,
				    scroll:true
				},
			select:true,
			columns:[
							{ id:"row_number",name:"row_number",header:"#",fillspace:0.5},
//							{id:"invitefinished", header:"已邀约", fillspace:0.5, template:"<span  style='color:#777777; cursor:pointer;' class='invitefinished webix_icon fa-thumbs-o-up'></span>"},
							{ id:"anzbuyhabitquad",name:"anzbuyhabitquad",header:["象限",{content:"selectFilter"}],fillspace:1},
							{ id:"customercode",name:"customercode",	header:["顾客编号",{content:"textFilter"}],sort:"string", css:"rank", fillspace:1},
							{ id:"customername",name:"customername",	header:["顾客姓名",{content:"textFilter"}],fillspace:2},
							{ id:"mobileno",name:"mobileno",	header:"手机号",fillspace:1.5},
							{ id:"anzcontnearity",name:"anzcontnearity",header:["联系近度",{content:"numberFilter"}],fillspace:1},	
							{ id:"anzbuynearity",name:"anzbuynearity",header:["消费近度",{content:"numberFilter"}],fillspace:1}	,
							{ id:"anzimportantlevel",name:"anzimportantlevel",	header:["重要级别",{content:"selectFilter"}],fillspace:1},	
							{ id:"anzstatelevel",name:"anzstatelevel",header:["会员状态",{content:"selectFilter"}],fillspace:1},	
							{ id:"anzmidtermbuymoney",name:"anzmidtermbuymoney",header:["中期购买金额",{content:"numberFilter"}],fillspace:1},	
							{ id:"anzmidtermbuyfreq",name:"anzmidtermbuyfreq",	header:["中期购买次数",{content:"numberFilter"}],fillspace:1},
							],
				onClick:{
						"invitefinished":function(e,id,node){
							var row = $$("dt_invitetask").getItem(id);
						webix.confirm({
							text:"你已完成邀此会员.<br/>确定吗?", ok:"批准", cancel:"拒绝",
							callback:function(result){
									if(result)  
									{
										$$("dt_invitetask").updateItem(id, row);
									}
							}
						});
					},
				},
				pager:"pagerA"
			};
	var pager = 	{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:5,
						paddingY:5,
						height:40,
						cols:[{
							view:"pager", id:"pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 35,
							group:5
						}]
					};		
	return {
		$ui:{
			id:"toInviteView",
			type: "clean",
			rows:[
			titleBar,
			customerinQuad,
			pager
			]

		}
	}
});