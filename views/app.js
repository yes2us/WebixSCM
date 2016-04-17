define([
	"views/menus/profile",
	"views/menus/sysmenu"
],function(profile, menu){
	
		var __UserObject = webix.storage.local.get('UserObject');
		if(__UserObject)
		{
			_UserObject = JSON.parse(__UserObject);
			_UserCode = _UserObject['MyBasic'][0]['usercode'];
			_UserName = _UserObject['MyBasic'][0]['usertruename'];
		}
		
	//Top toolbar
	var mainToolbar = {
		view: "toolbar",
		maxHeight:40,
		elements:[
//			{view: "label", label: "<a href='#'><img  src='assets/imgs/logo.png' height='30' /></a>", width: 150},
//			
			{view: "button", type: "icon", icon: "bars",
						width: 37, align: "left", css: "app_button", click: function(){
							$$("sysmenu").toggle()
						}
			},
			{},
			{  id: "person_template", css: "header_person", borderless:true, data: {id:3,name: _UserName},
				template: function(obj){
					var html = 	"<div style='height:70%;width:70%;' onclick='webix.$$(\"profilePopup\").show(this)'>";
					html += "<img class='photo' src='assets/imgs/photos/"+obj.id+".png' /><span class='name'>"+obj.name+"</span>";
					html += "<span class='webix_icon fa-angle-down'></span></div>";
					return html;
				}
		},

		]
	};

	var body = {
		rows:[
			{
				view: "scrollview", 
				scroll:"native-y",
				body:{ cols:[{ $subview:true}] }
			}
		]
	};

	var layout = {
		type:"line",
//		cols:[
//			{view:"accordion",multi:true,borderless:true,
//				cols:[{ header:"下属店的库存结构", body:menu, height:200}]
//			},body]
			
		cols:[
			{rows:[mainToolbar,menu]},
			body]
		
//		rows:[
//			mainToolbar,
//			{
//				cols:[
//					menu,
//					body
//				]
//			}
//		]
	};



	return {
		$ui:layout,
		$menu:"sysmenu",
		$oninit:function(view, scope){
//			scope.ui(search.$ui);
//			scope.ui(mail.$ui);
//			scope.ui(message.$ui);
			scope.ui(profile.$ui);
		}
	};
	
});