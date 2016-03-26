define(function(){

	var header = {
		"template": "<span class='webix_icon fa-comments-o'></span>联系记录", "css": "sub_title", "height": 50
	};

	var list = {
		view: "list",
		id:"chatlist_contrecord",
		css: "chat_list",
		type: {
			height: "auto",
			template: function(obj){
//				var text = "我们进行了热烈的讨论,并约定下周一见一次面. ";
			var icon = 'phone';

				switch (obj.contway){
					case "电话":
						icon = "phone"
						break;
					case "微信":
						icon = "weixin";
						break;
					case "短信":
						icon = "envelope";
						break;
					default:
						icon = "coffee";
						break;
				}
				
				var html = 	"<img class='photo' src='assets/imgs/photos/"+"2"+".png' />";
				html += "<div class='text'><div class='name'>"+obj.maintainername+"<div class='time webix_icon fa fa-"+icon+"'></div>2015/03/25</div>";
				html += obj.contcontent+"<div class='name'>"+obj.responselevel+"响应</div></div>";
				return html;
			}
		},
	};

	var form = {
		view: "form",
		css: "show_all",
		paddingX: 10,
		paddingY: 2,

		cols:[
			{
				view: "text", placeholder: "Type a message here",height:36
			},
			{
				view: "icon", icon: "search",height:36
			}
		]
	};


	return {
		$ui:{
			view: "form",
			id: "vipContRecordView",
			type: "clean",
			rows:[
				header,
				{ rows:[ 
					list,
				//	form 
				] }
			]
		}
	};

});