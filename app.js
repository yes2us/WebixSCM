/*
	App configuration
*/

define([
	"libs/core",
	"helpers/menu",
	"helpers/locale",
	"helpers/theme",
	"libs/rollbar"
], function(core, menu, locale, theme, tracker){


	//webix.codebase = "libs/webix/";
	//CKEditor requires full path
	webix.codebase = document.location.href.split("#")[0].replace("index.html","")+"libs/webix/";

	if(!webix.env.touch && webix.ui.scrollSize && webix.CustomScroll)
		webix.CustomScroll.init();


	if (webix.production)
		tracker.init({
			accessToken: '650b007d5d794bb68d056584451a57a8',
			captureUncaught: true,
			source_map_enabled: true,
			code_version:"0.8.0",
			payload: {
				environment: 'production'
			}
		});

	//configuration
	var app = core.create({
		id:			"admin-demo",
		name:		"TOC供应链管理",
		version:	"0.1",
		debug:		true,
//		debug:		false,
		start:		"/app/mng_storets"		
	});

	app.use(menu);
	app.use(locale);
	app.use(theme);

/**
 *以下关于日历的设定是Ricky增加的 
 */
webix.i18n.locales["zh-CN"]={   //"es-ES" - the locale name, the same as the file name
	groupDelimiter:",",
	groupSize:3,
	decimalDelimiter:".",
	decimalSize:2,
	dateFormat:"%Y/%m/%j",
	timeFormat:"%G:%i",
	longDateFormat:"%Y'年'%m'月'%j'日'",
	fullDateFormat:"%Y'年'%m'月'%j'日' %G:%i",
	am:["上午","上午"],
	pm:["下午","下午"],
	price:"¥{obj}",
	priceSettings:{
		groupDelimiter:",",
		groupSize:3,
		decimalDelimiter:".",
		decimalSize:0
	},
	calendar:{
		monthFull:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
		monthShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
		dayFull:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
		dayShort:["周日","周一","周二","周三","周四","周五","周六"],
		hours: "小时",
		minutes: "分钟",
		done:"准备",
		clear: "清空",
		today: "今天"
    },

    controls:{
    	select:"选择"
    }
};
webix.i18n.setLocale("zh-CN");

//	_UserCode = webix.storage.local.get('_UserCode');
//	_UserName = JSON.parse(webix.storage.local.get('UserObject'))['mybasic'][0]['staffname'];
//	_BelongDeptCode = JSON.parse(webix.storage.local.get('UserObject'))['mybasic'][0]['belongdeptcode'];
//	_DSSuffix = webix.storage.local.get('_DSSuffix');
	
       urlstr = "http://"+window.location.host+"/SCMAdmin/index.php/Home";
//	urlstr = "http://bmte.cn/POAAdmin/index.php/Home";

    
	homestr = "http://"+window.location.host+"/WebixSCM";
//	homestr = "http://"+window.location.host;
	
	localhost = "http://"+window.location.host;

	
	return app;
});