define([],
function(){
			
	var gridTree = {
                id:"pivot",
				view:"pivot",
                max: false,
                readonly:true,
                readonlyTitle: "目标库存",
                structure: {
                    rows: ["maintypename", "skccode"],
                    columns: ["sizename"],
                    values: [{ name:"targetqty", operation:["sum"]}],
                    filters:[{name:"partycode",type:"multiselect"},{name:"yearname",type:"multiselect"},{name:"maintypename",type:"multiselect"}]
                },
                columnWidth: 70,   // width for column 2..N
				yScaleWidth: 200,    // width for the first column
				filterWidth: 200,
				filterMinWidth: 150,
				filterLabelWidth: 60,

				// change titles
				fieldMap:{
					partycode: "门店",
					yearname: "年份",
					maintypename: "大类",
					skccode: "款色杯",
					sizename: "尺码",
					targetqty: "目标",
					stockqty: "库存"
				}
			};


	var layout = {
		type: "clean",
		id: "storeTargetGridView",
		cols:[
			gridTree,
		]
	};


	return { 
		$ui: layout ,
		$oninit:function(){
			webix.i18n.pivot = {
			apply: "应用",
			cancel: "取消",
			columns: "列",
			count: "计数",
			date: "日期",
			fields: "字段",
			filters: "筛选",
			max: "最大",
			min: "最小",
			multiselect: "多选",
			operationNotDefined: "操作没定义",
			pivotMessage: "[点击配置]",
			rows: "行",
			select: "选择",
			sum: "求和",
			text: "文字",
			values: "值",
			total: "累计",
			windowTitle: "配置",
			windowMessage: "[把字段拖到期望的地方]"
		};
		}
	};

});
