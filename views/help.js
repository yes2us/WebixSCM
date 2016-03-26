define([
	"data/paraobject",
	"views/modules/mng_para/modaladd_para",
	"views/menus/export"
	],
function(paraobject,modaladd,exports){
	
	checkauthorization(false);

var video_set = [

	{ id:1, title:"1.得分管理", path:"1.得分管理"},
	{ id:2, title:"2.会员管理", path:"2.会员管理"},
	{ id:3, title:"3.相关配置", path:"3.相关配置"},

//	{ id:1, title:"第1部分:得分管理", path:"1.我的当日任务"},
//	{ id:2, title:"第1部分:得分管理", path:"2.排名各种查询"},
//	{ id:3, title:"第1部分:得分管理", path:"3.查询得分明细和汇总"},
//	
//	{ id:4, title:"第2部分:会员管理", path:"1.管理会员资料"},
//	{ id:5, title:"第2部分:会员管理", path:"2.制订维护计划"},
//	{ id:6, title:"第2部分:会员管理", path:"3.制订邀约计划"},
//	{ id:7, title:"第2部分:会员管理", path:"4.在手机上操作会员管理"},
//	 
//	{ id:8, title:"第3部分:系统管理", path:"1.管理部门资料"},
//	{ id:9, title:"第3部分:系统管理", path:"2.管理员工资料"},
];

var video = {
//		view:"window",
		body:{
			view:"video",
			id: "video1",
			src: [
				"http://cdn.webix.io/demodata/movie.ogv",
				"http://cdn.webix.io/demodata/movie.mp4"
			],
			controls: true
		},
		head:{
			view:"toolbar", elements:[
				{view:"label", label: "Video", align:'帮助视频'},
				{view: "button", id: "playButton", width: 100, value: "Play", click: playPause}
			]
		},

//		width:1024,
		height:500,
		move:true
};
	
	var videolist = {
			view: "list",
			id: "videolist",
			width:250,
			select: true,
			padding:40,
			template: "<div class='overall'>#path#</div> ",
//			on: {
//					onAfterLoad: function(){this.select(1);}
//			},
//			uniteBy:function(obj){return obj.title;},
			data:video_set
	};
	
	var layout = {
		type: "wide",
		cols:[videolist,video]
	};

	function playPause(){
		var video = $$("video1").getVideo();

		if (video.paused){
			video.play();
			$$("playButton").setValue("Pause")
		}

		else{
			video.pause();
			$$("playButton").setValue("Play")
		}

	}
	
	return {
		$ui: layout,
	};

});