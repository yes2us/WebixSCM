define(function(){
	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:5,
			paddingY:5,
			height:35,
			cols:[
			{
				"template": "<span class='webix_icon fa-cogs'></span>问候本月有纪念日的会员", "css": "sub_title2", borderless: true
			}
			]
	};
	
	var curMonth = new Date().getMonth();
    var dt_annidaytask={
			view:"datatable",
			id:"dt_annidaytask",
			headerRowHeight:35,
			select:true,
			dragColumn:true,
				headermenu:{
				    width:250,
				    autoheight:false,
				    scroll:true
				},
			columns:[
							{ id:"row_number",name:"row_number",header:"#",fillspace:0.5},
							{ id:"anzbuyhabitquad",name:"anzbuyhabitquad",header:"象限",fillspace:1},
							{ id:"customercode",name:"customercode",	header:"顾客编号",sort:"string", css:"rank", fillspace:1},
							{ id:"customername",name:"customername",	header:"顾客姓名",fillspace:1},
							{ id:"mobileno",name:"mobileno",	header:"手机号",fillspace:1.5},
							{ id:"anzimportantlevel",name:"anzimportantlevel",	header:"重要级别",fillspace:1},	
							{ id:"anzstatelevel",name:"anzstatelevel",header:"会员状态",fillspace:1},	
							
							{ id:"ntbirthdate",name:"ntbirthdate",header:"会员生日",fillspace:1,template:
							function(obj){if(new Date('2015-'+obj.ntbirthdate).getMonth() == curMonth) return obj.ntbirthdate;else return " "}},
							
							{ id:"ntmatebirthdate",name:"ntmatebirthdate",header:"配偶生日",fillspace:1,template:
							function(obj){if(new Date('2015-'+obj.ntmatebirthdate).getMonth() == curMonth) return obj.ntmatebirthdate; else return " "}},
							
							{ id:"ntchildbirthdate",name:"ntchildbirthdate",header:"子女生日",fillspace:1,template:
							function(obj){if(new Date('2015-'+obj.ntchildbirthdate).getMonth() == curMonth) return obj.ntchildbirthdate;else return " "}},	
							
							{ id:"ntweddingannidate",name:"ntweddingannidate",header:"结婚纪念日",fillspace:1,template:
							function(obj){if(new Date('2015-'+obj.ntweddingannidate).getMonth() == curMonth) return obj.ntweddingannidate;else return " "}},

							],
				pager:"pagerE"
			};
	var pager = 	{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:5,
						paddingY:5,
						height:40,
						cols:[{
							view:"pager", id:"pagerE",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 35,
							group:5
						}]
					};				
	return {
		$ui:{
			id:"toAnnidayView",
			type: "clean",
			rows:[
			titleBar,
			dt_annidaytask,
			pager
			]

		}
	}
});