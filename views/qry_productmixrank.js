define([],
function(){
	
	checkauthorization(false);


		var myChart;
		var length;
	
		var itemStyle = {
			    normal: {
			        opacity: 0.8,
			        shadowBlur: 10,
			        shadowOffsetX: 0,
			        shadowOffsetY: 0,
			        shadowColor: 'rgba(0, 0, 0, 0.5)'
			    }
			};
			
			var lineStyle = {
			    normal: {
			        width: 1,
			        opacity: 0.8
			    }
			};

			var option = {
			    backgroundColor: '#333',
			    title: {
			        text: '品类相对性分析',
			        left: 'center',
			        orient:'vertical',
			        textStyle: {
			            color: '#eee'
			        }
			    },
			     tooltip: {
			     	padding: 10,
			        backgroundColor: '#222',
			        borderColor: '#777',
			        borderWidth: 1,
			        formatter: function (obj) {
			            var value = obj.value;
			            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
			                + '品类：' + value[6] + '<br>'
			                + '</div>' 			                
			                + '盈利能力：第' + (length-parseInt(value[0])) + '名,	'+parseFloat(value[7]).toFixed(1)+'元/款/店/天<br>'
			                + '销售速度：第' + (length-parseInt(value[1]))+ '名,	'+parseFloat(value[8]).toFixed(3)+'件/款/店/天<br>'
			                + '单件毛利：第' + (length-parseInt(value[2]))+ '名,	'+parseInt(value[9])+'元/件<br>'
			                + '实际盈利：第' + (length-parseInt(value[3])) + '名,	'+parseInt(value[10])+'元<br>'
			                + '推介力度：第' + (length-parseInt(value[4])) + '名,	'+parseInt(value[11])+'分<br>'
			                + '陈列广度：第' + (length-parseInt(value[5]))+ '名,	'+parseInt(value[12])+'款*店*天<br>';
			        }
			     },
			    legend: {
			        left: 'left',
			        width:300,
			        itemGap: 20,
			        textStyle: {
			            color: '#fff',
			            fontSize: 14
			        },
			        selectedMode: 'single'
			    },

			    radar: {
			        indicator: [
			            {name: '盈利能力', max: 50},
			            {name: '销售速度', max: 50},
			            {name: '单件毛利', max: 50},
			            {name: '实际盈利', max: 50},
			            {name: '推介力度', max: 50},
			            {name: '陈列广度', max: 50}
			        ],
			        shape: 'circle',
			        splitNumber: 6,
			        name: {
			            textStyle: {
			                color: 'rgb(238, 197, 102)'
			            }
			        },
			        splitLine: {
			            lineStyle: {
			                color: [
			                    'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
			                    'rgba(238, 197, 102, 0.3)', 'rgba(238, 197, 102, 0.4)',
			                    'rgba(238, 197, 102, 0.5)', 'rgba(238, 197, 102, 0.1)'
			                ].reverse()
			            }
			        },
			        splitArea: {
			            show: false
			        },
			        axisLine: {
			            lineStyle: {
			                color: 'rgba(238, 197, 102, 0.9)'
			            }
			        }
			    },
			    series: [
			        {
			            type: 'radar',
			            lineStyle: lineStyle,
			            symbol: 'none',
			            itemStyle: itemStyle,
			            areaStyle: {
			                normal: {
			                    opacity: 0.8
			                }
			            }
			        },
			   
			    ]
			};

			
	function drawChart(data){

			var legendArray=new Array();
			var chartArray=new Array();
			var legendSelected={};
			
			var item;
			length=data.length;
	
			
			for(var i=0;i<length;i++)
			{
			    item = data[i];
			    
				legendArray.push(item.classname);
				legendSelected[item.classname]=(i===0?true:false);
			    
				var rank_tputpccr=i+1;
				var rank_salepccr=data.filter(function(obj){return parseFloat(obj.salepccr)>=parseFloat(item.salepccr)}).length;	
				var rank_tputpqty=data.filter(function(obj){return parseFloat(obj.tputpqty)>=parseFloat(item.tputpqty)}).length;	
				var rank_totaltput=data.filter(function(obj){return parseInt(obj.periodtput)>=parseInt(item.periodtput)}).length;
				var rank_introtime=data.filter(function(obj){return parseInt(obj.periodsaleqty)>=parseInt(item.periodsaleqty)}).length;	
				var rank_ccrload=data.filter(function(obj){return parseInt(obj.periodccrload)>=parseInt(item.periodccrload)}).length;	
				
				chartArray.push({
					value:
					[
					length-rank_tputpccr,length-rank_salepccr,length-rank_tputpqty,
					length-rank_totaltput,length-rank_introtime,length-rank_ccrload,
					item.classname,
					item.tputpccr,item.salepccr,item.tputpqty,
					item.periodtput,item.periodsaleqty,item.periodccrload,
					],
					name:item.classname
				});
				
			};
			
			  option.legend.data = legendArray;
			  option.legend.selected=legendSelected;
			  option.series[0].name = '各项排名'
			  option.series[0].type = 'radar';	
			  option.series[0].data = chartArray;	
			  
			  for(var i=0;i<6;i++)
			  {
			  	option.radar.indicator[i].max=length+1;
			  }

			console.log(chartArray);

				
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