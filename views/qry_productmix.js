define([],
function(){
	
	checkauthorization(false);
		var myChart;
	
		var itemStyle = {
			    normal: {
			        opacity: 0.8,
			        shadowBlur: 10,
			        shadowOffsetX: 0,
			        shadowOffsetY: 0,
			        shadowColor: 'rgba(0, 0, 0, 0.5)'
			    }
			};
			
			var markLineOpt = {
			    animation: false,
			    lineStyle: {
			        normal: {
			            type: 'solid'
			        }
			    },
			    tooltip: {
			        formatter: 'y = 3'
			    },
			    data: [
			    [{coord: [0, 50],symbol: 'none'}, {coord: [0.05, 50],symbol: 'none'}],
			    [{coord: [0.03, 350],symbol: 'none'}, {coord: [0.03, 10], symbol: 'none'}]
			    ]
			};

			var option = {
			    backgroundColor: '#333',
			    color: ['#dd4444', '#fec42c', '#80F1BE'],
			    legend: {
			        y: 'top',
			        data: ['陈列广度', '有效产出', '销售数量','盈利能力曲线'],
			        textStyle: {
			        color: '#fff',
            			fontSize: 16
        				}
    				},
    				
			    grid: {
			        x: '10%',
			        x2: 150,
			        y: '18%',
			        y2: '10%'
			    },
    
			    tooltip: {
			        padding: 10,
			        backgroundColor: '#222',
			        borderColor: '#777',
			        borderWidth: 1,
			        formatter: function (obj) {
			            var value = obj.value;
			            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
			                + '品类：' + value[5] + '<br>'
			                + obj.seriesName + '： ' + value[2]+ '<br>'
			                + '</div>'
			                
			            	    +'<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 12px;padding-bottom: 7px;margin-bottom: 7px">'               
			                + '销售速度：' + parseFloat(value[0]).toFixed(3) + '件/店/日<br>'
			                + '单件有效产出：' + parseInt(value[1]) + '元<br>'
			                + '单店单日产出：' + parseFloat(value[4]).toFixed(2) + '元<br>'
			                + '</div>'
			                
			                + '盈利能力排名：' + value[6] + '<br>'
			                + '实际盈利排名：' + value[7] + '<br>'
			                + '陈列广度排名：' + value[8] + '<br>';
			        }
			    },
    
			    xAxis: {
			        type: 'value',
			        name: '销售速度',
//			        name: '销售速度(件/店/款色/天)',
			        nameGap: -16,
			        max:0.1,
			        nameTextStyle: {color: '#fff',fontSize: 14},
			        splitLine: {show: false},
			        axisLine: {lineStyle: {color: '#777'}},
			        axisTick: {lineStyle: {color: '#777'}},
			        axisLabel: {formatter: '{value}',textStyle: {color: '#fff'}}
			    },
    
			    yAxis: {
			        type: 'value',
			        name: '单件有效产出',
//			        name: '单件有效产出(元/件)',
			        nameLocation: 'end',
			        nameGap: 20,
			        max:500,
			        min:1,
			        nameTextStyle: { color: '#fff', fontSize: 16},
			        axisLine: {lineStyle: {color: '#777'}},
			        axisTick: {lineStyle: {color: '#777'}},
			        splitLine: {show: false},
			        axisLabel: {textStyle: {color: '#fff'}}
			    },
			    
			    visualMap: [
			        {
			            left: 'right',
			            top: '10%',
			            dimension: 3,
			            min: 0,
			            max: 250,
			            itemWidth: 30,
			            itemHeight: 120,
			            calculable: true,
			            precision: 0.1,
			            text: ['圆形大小'],
			            textGap: 30,
			            textStyle: {color: '#fff'},
			            inRange: {symbolSize: [10, 70]},
			            outOfRange: {symbolSize: [10, 70],color: ['rgba(255,255,255,.2)']},
			            controller: {
			                inRange: {color: ['#c23531']},
			                outOfRange: {color: ['#444']}
			            }
			        },
			    ],
				    series: [
				        {
				            name: '陈列广度',
				            type: 'scatter',
				            itemStyle: itemStyle,
				            data: [],
				        },
				        {
				            name: '有效产出',
				            type: 'scatter',
				            itemStyle: itemStyle,
				            data: [],
				        },
				        {
				            name: '销售数量',
				            type: 'scatter',
				            itemStyle: itemStyle,
				            data: [],
				        },
				        {
				            name: '盈利能力曲线',
				            type: 'line',
				            itemStyle: itemStyle,
				            data: [],
				        }
				    ]
			};
			
	function drawChart(data){
			
			var CCRLoad=new Array();
			var TotalTPut=new Array();
			var SaleQty=new Array();
			var Curve=new Array();
			
			var rank_tputpccr=0;
			var rank_totaltput=0;
			var rank_ccrload=0;
			var item;
			var count =data.length;

			var maxX=-1000,minX=1000;
			var maxY=-1000,minY=1000;
			
			var maxPeriodCCRLoad=-1000;
			var maxPeriodTput=-1000;
			var maxPeriodSaleQty=-1000;
			
			var totalPeriodCCRLoad = 0;
			var totalPeriodTput = 0;
			var totalPeriodSaleQty = 0;
			
			for(var i=0;i<count;i++)
			{
				item = data[i];
				
				if(parseFloat(item.salepccr)>maxX) maxX=parseFloat(item.salepccr);
				if(parseFloat(item.salepccr)<minX) minX=parseFloat(item.salepccr);
				
				if(parseFloat(item.tputpqty)>maxY) maxY=parseFloat(item.tputpqty);
				if(parseFloat(item.tputpqty)<minY) minY=parseFloat(item.tputpqty);
				
				if(parseFloat(item.periodccrload)>maxPeriodCCRLoad) maxPeriodCCRLoad=parseFloat(item.periodccrload);
				if(parseFloat(item.periodtput)>maxPeriodTput) maxPeriodTput=parseFloat(item.periodtput);
				if(parseFloat(item.periodsaleqty)>maxPeriodSaleQty) maxPeriodSaleQty=parseFloat(item.periodsaleqty);
				
				totalPeriodCCRLoad += parseFloat(item.periodccrload);
				totalPeriodTput += parseFloat(item.periodtput);
				totalPeriodSaleQty += parseFloat(item.periodsaleqty);
			};
				
			for(var i=0;i<count;i++)
			{
			    item = data[i];
				rank_tputpccr++;
				
				rank_totaltput=data.filter(function(obj){return parseInt(obj.periodtput)>=parseInt(item.periodtput)}).length;
				rank_ccrload=data.filter(function(obj){return parseInt(obj.periodccrload)>=parseInt(item.periodccrload)}).length;
				
				CCRLoad.push([parseFloat(item.salepccr),parseInt(item.tputpqty),parseInt(item.periodccrload),
				parseInt(250*parseInt(item.periodccrload)/maxPeriodCCRLoad),parseFloat(item.tputpccr),item.classname,
				rank_tputpccr+'/'+count,rank_totaltput+'/'+count,rank_ccrload+'/'+count]);
				
				TotalTPut.push([parseFloat(item.salepccr),parseInt(item.tputpqty),parseInt(item.periodtput),
				parseInt(250*parseInt(item.periodtput)/maxPeriodTput),parseFloat(item.tputpccr),item.classname,
				rank_tputpccr+'/'+count,rank_totaltput+'/'+count,rank_ccrload+'/'+count]);
				
				SaleQty.push([parseFloat(item.salepccr),parseInt(item.tputpqty),parseInt(item.periodsaleqty),
				parseInt(250*parseInt(item.periodsaleqty)/maxPeriodSaleQty),parseFloat(item.tputpccr),item.classname,
				rank_tputpccr+'/'+count,rank_totaltput+'/'+count,rank_ccrload+'/'+count]);
			};
			
			option.xAxis.max =parseFloat(maxX*1.1).toFixed(3);
			option.xAxis.min = 0;

			option.yAxis.max =  parseInt(maxY*1.1);
			option.yAxis.min =  0;
			
			markLineOpt.tooltip={formatter:"x="+parseFloat(totalPeriodSaleQty/totalPeriodCCRLoad).toFixed(3)+",y="+parseInt(totalPeriodTput/totalPeriodSaleQty)};
			markLineOpt.data=[
			    [{coord: [option.xAxis.min, parseInt(totalPeriodTput/totalPeriodSaleQty)],symbol: 'none'}, 
			    {coord: [option.xAxis.max, parseInt(totalPeriodTput/totalPeriodSaleQty)],symbol: 'none'}],
			    [{coord: [parseFloat(totalPeriodSaleQty/totalPeriodCCRLoad), option.yAxis.min],symbol: 'none'},
			    {coord: [parseFloat(totalPeriodSaleQty/totalPeriodCCRLoad), option.yAxis.max], symbol: 'none'}]
			    ];

			option.series[0].data = CCRLoad;		
			option.series[0].markLine = markLineOpt;		

			option.series[1].data = TotalTPut;
			option.series[1].markLine = markLineOpt;		
			
			option.series[2].data = SaleQty;
			option.series[2].markLine = markLineOpt;		
	
			for(var i=1;i<100;i++)
			Curve.push([option.xAxis.max*i/100,parseFloat(totalPeriodTput/totalPeriodCCRLoad)/(option.xAxis.max/100*i)]);
			option.series[3].data = Curve;
			
			myChart.hideLoading();
			myChart.setOption(option);
		};
		
		

	 var toolbar={
			view:"toolbar", 
			css: "highlighted_header header4",
			scroll:false, 
			width:1200,
				rows:[
				{cols:[
					{ view:"segmented", name:"lifestage", label:"新旧类别",options:["所有", "新品", "旧品"],value:"所有"},
					{ view:"segmented", name:"prodtype",  label:"分析粒度",options:["大类","小类"], value:"小类"},
					{ view:"button", value:"确定", width:100, align:"center",
						click:function(){
						var values = this.getParentView().getParentView().getValues();
						var postData={};
						if(values.lifestage!='所有')  postData.LifeStage = values.lifestage;
						postData.ProdType = values.prodtype==='大类'? "MainType":"SubType";
						
						myChart.showLoading();
						webix.ajax().post(urlstr+"/WBProdMng/getPMixData",postData).then(function(response){
							drawChart(response.json())
						});
					}},
					{}
					]},
					
			]
		};
	
	var layout = 
			{rows:[toolbar,
			     { template: "<div id='charid' style='height:650px;margin:0 auto;'></div>" },
			]};


	return {
		$ui: layout,	
		$oninit:function(){			

		myChart = echarts.init(document.getElementById('charid'));
		myChart.setOption(option);
		
		}
	};

});