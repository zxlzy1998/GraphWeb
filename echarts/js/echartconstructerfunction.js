var mytheme = 'light'; //eachrt theme

/**
 * main funcion
 * @param algorithm
 * @param dataset
 */

function showAllcharts(algorithm, dataset,eta) {
    var filenameprefix = "";

    if (algorithm === "DCD") {
        filenameprefix = "" + algorithm + dataset;
    }else if (algorithm === "DECD") {
        filenameprefix = "" + algorithm + eta + dataset;
    } else {
        alert("NO!");
    }

    //1
    $.ajax({
        url:  "data/" + filenameprefix + "1.json",
        success: function (data) {
            var charttype = "chart1";
            showeLineSimple(data, charttype);
        }
    });

    //2
    $.ajax({
        url: "data/" + filenameprefix + "2.json",
        success: function (data) {
            var charttype = "chart2";
            showeLineSimple(data, charttype);
        }
    });

    //3
    $.ajax({
        url: "data/" + filenameprefix + "3.json",
        success: function (data) {
            var charttype = "chart3";
            showPieLegend(data, charttype);
        }
    });

    //4
    $.ajax({
        url: "data/" + filenameprefix + "4.json",
        success: function (data) {
            var charttype = "chart4";
            showBarGradient(data, charttype);
        }
    });

    //5
    $.ajax({
        url: "data/" + filenameprefix + "5.json",
        success: function (data) {
            var charttype = "chart5";
            showLineStyle(data, charttype);
        }
    });

    //6
    $.ajax({
        url: "data/" + filenameprefix + "6.json",
        success: function (data) {
            var charttype = "chart6";
            showBarGradient(data, charttype);
        }
    });

    //7
    $.ajax({
        url: "data/" + filenameprefix + "7.json",
        success: function (data) {
            var charttype = "chart7";
            showLineStyle(data, charttype);
        }
    });

    //8
    $.ajax({
        url: "data/" + filenameprefix + "8.json",
        success: function (data) {
            var charttype = "chart8";
            showBar(data, charttype);

        }
    });

    //9
    $.ajax({
        url: "data/" + filenameprefix + "9.json",
        success: function (data) {
            var charttype = "chart9";
            showscattersingleaxis(data, charttype);

        }
    });

}

/**
 * show graph structure
 * 1 2
 * @param graph_dataset, divId
 */
function showGraphealation(graph_dataset, divId){

    var dom = document.getElementById(divId);
    var myChart = echarts.init(dom, mytheme);
    var option;

    myChart.showLoading();
    $.getJSON(
        graph_dataset,
        function (json) {
            myChart.hideLoading();
            myChart.setOption(
                (option = {
                    title: {
                         text: 'Graph Structure'
                    },
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    series: [
                        {
                            type: 'graph',
                            layout: 'none',
                            // progressiveThreshold: 700,
                            data: json.nodes.map(function (node) {
                                return {
                                    x: node.x,
                                    y: node.y,
                                    id: node.id,
                                    name: node.label,
                                    symbolSize: node.size,
                                    itemStyle: {
                                        color: node.color
                                    }
                                };
                            }),
                            edges: json.edges.map(function (edge) {
                                return {
                                    source: edge.sourceID,
                                    target: edge.targetID
                                };
                            }),
                            emphasis: {
                                focus: 'adjacency',
                                label: {
                                    position: 'right',
                                    show: true
                                }
                            },
                            roam: true,
                            lineStyle: {
                                width: 0.5,
                                curveness: 0.3,
                                opacity: 0.7
                            }
                        }
                    ]
                }),
                true
            );
        }
    );

    option && myChart.setOption(option);
}
/**
 * line-simple
 * 1 2
 * @param jsondata
 */
function showeLineSimple(jsondata, charttype) {
    //set value
    var xdata = jsondata.myData.xdata;
    var ydata = jsondata.myData.ydata;


    var dom = document.getElementById(charttype);
    var myChart = echarts.init(dom, mytheme);
    var app = {};
    option = null;
    option = {
        tooltip: {
            trigger: 'axis',
            formatter: 'est-core:{b} <br/>number: {c}',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: xdata
        },
        yAxis: {
            type: 'value'
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        series: [{
            name: "num",
            data: ydata,
            type: 'line'
        }]
    };

    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}


/**
 * pie-legend
 * @param jsondata
 * @param charttype
 */
function showPieLegend(jsondata, charttype) {
    var legendData=jsondata.myData.myLegendData; //["1-coreness","2-coreness",...]
    var selectedData=jsondata.myData.mySelectedData; //{"1-coreness":true,...}
    var seriesData=jsondata.myData.mySeriesData; //[{"name":"1-coreness","value":20}]


    var dom = document.getElementById(charttype);
    var myChart = echarts.init(dom, mytheme);
    var app = {};
    option = null;

    option = {
        toolbox: {
            show: true,
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: legendData,

            selected: selectedData
        },
        series: [
            {
                name: 'coreness',
                type: 'pie',
                radius: '55%',
                center: ['40%', '50%'],
                data: seriesData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }

}

/**
 * 4,6
 * @param jsondata
 * @param charttype
 */
function showBarGradient(jsondata,charttype) {
    var xdata=jsondata.myData.xdata;
    var ydata=jsondata.myData.ydata;
    var maxValue=jsondata.myData.maxNum;


    var dom = document.getElementById(charttype);
    var myChart = echarts.init(dom, mytheme);
    var app = {};
    option = null;
    var dataAxis = xdata;
    var data = ydata;
    var yMax = maxValue;
    var dataShadow = [];

    for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
    }

    option = {
        tooltip: {
            trigger: 'axis',
            formatter: '{b} <br/>Number:{c}',
            axisPointer: {
                type: 'shadow'
            }
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            data: dataAxis,
            axisLabel: {
                inside: true,
                textStyle: {
                    color: '#fff'
                }
            },
            axisTick: {
                show: true
            },
            axisLine: {
                show: false
            },
            z: 10
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#999'
                }
            }
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            { // For shadow
                type: 'bar',
                itemStyle: {
                    normal: {color: 'rgba(0,0,0,0.05)'}
                },
                barGap: '-100%',
                barCategoryGap: '40%',
                data: dataShadow,
                animation: false
            },
            {
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#83bff6'},
                                {offset: 0.5, color: '#188df0'},
                                {offset: 1, color: '#188df0'}
                            ]
                        )
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#2378f7'},
                                {offset: 0.7, color: '#2378f7'},
                                {offset: 1, color: '#83bff6'}
                            ]
                        )
                    }
                },
                data: data
            }
        ]
    };

    // Enable data zoom when user click bar.
    var zoomSize = 6;
    myChart.on('click', function (params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        myChart.dispatchAction({
            type: 'dataZoom',
            startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
    });
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

/**
 * 5,7
 * @param jsondata
 * @param charttype
 */
function showLineStyle(jsondata,charttype) {

    var xdata=jsondata.myData.xdata; //rounds
    var ydata=jsondata.myData.ydata; //numnber

    var dom = document.getElementById(charttype);
    var myChart = echarts.init(dom, mytheme);
    var app = {};
    option = null;
    option = {
        tooltip: {
            trigger: 'axis',
            formatter: '{b} <br/>vertex:{c}%',
            axisPointer: {
                type: 'shadow'
            }
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            data: xdata
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: ydata,
            type: 'line',
            symbol: 'circle',
            symbolSize: 20,
            lineStyle: {
                normal: {
                    color: '#9FE6B8',
                    width: 4,
                    type: 'dashed'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: '#67E0E3', //#FFDB5C
                    color: '#FFDB5C'
                }
            }
        }]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}


/**
 * 8
 * @param jsondata
 * @param charttype
 */
function showBar(jsondata, charttype) {

    var xdata=jsondata.myData.xdata; //time
    var ydata=jsondata.myData.ydata; //rounds

    var dom = document.getElementById(charttype);
    var myChart = echarts.init(dom, mytheme);
    var app = {};
    option = null;

    option = {
        toolbox: {
            show: true,
            feature: {
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: '{b} <br/>{a} : {c}ms',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'value'
            }
        ],
        yAxis: [
            {
                type: 'category',
                axisTick: {show: true},
                data: ydata
            }
        ],
        series: [
            {
                name: 'running time',
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: '{c}ms'
                    }
                },
                data: xdata
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

/**
 * each round the coreness distribution
 * @param jsondata
 */
function showscattersingleaxis(jsondata, charttype) {

    var coreness = jsondata.myData.ydata;
    var round = jsondata.myData.xdata;
    var datalist = jsondata.myData.zdata;

    var roundsize = round.length;
    var xdata = coreness;
    var ydata = round;
    var maxvalue = datalist[0][2];

    var dom = document.getElementById(charttype);
    var myChart = echarts.init(dom, mytheme);
    var app = {};
    option = null;
    app.title = 'Each round the estimate core distribution';
    // round,core,num
    option = {
        legend: [],
        tooltip: {
            position: 'top'
        },
        title: [],
        singleAxis: [],
        series: []
    };

    echarts.util.each(ydata, function (day, idx) {
        option.title.push({
            textBaseline: 'middle',
            top: ((idx) * 100 / roundsize + 5) + '%',
            text: day
        });
        option.singleAxis.push({
            left: 150,
            type: 'category',
            boundaryGap: false,
            data: xdata,
            top: (idx * 100 / roundsize + 5) + '%',
            height: '1%',
            axisLabel: {
                interval: 1                           //axis distance
            }
        });
        option.series.push({
            singleAxisIndex: idx,
            coordinateSystem: 'singleAxis',
            type: 'scatter',
            data: [],
            symbolSize: function (dataItem) {
                return dataItem[1] * 0.03;
            }
        });
    });

    echarts.util.each(datalist, function (dataItem) {
        option.series[dataItem[0]].data.push([dataItem[1], dataItem[2]]);
    });
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}


/**
 * dataset info
 */
function showdatasetinfo(datasetname) {

    var dom = document.getElementById("datasetinfo");
    var myChart = echarts.init(dom, mytheme);
    myChart.showLoading();
    option = null;
    $.get('datasetinfo/' + datasetname + '.json', function (webkitDep) {
        myChart.hideLoading();

        var mycategory = webkitDep.categories;
        var len = mycategory.length;
        var min = mycategory[0]["base"];

        var dataitem = new Array();
        var index = 0;
        for (var i = parseInt(min); i < len + 1; i++) {
            dataitem[index] = i + "-coreness";
            index++;
        }
        option = {
            toolbox: {
                show: true,
                feature: {
                    dataView: {readOnly: false},
                    saveAsImage: {}
                }
            },
            legend: {
                data: dataitem
            },
            series: [{
                type: 'graph',
                layout: 'force',
                animation: false,
                label: {
                    normal: {
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                draggable: true,
                data: webkitDep.nodes.map(function (node, idx) {
                    node.id = idx;
                    return node;
                }),
                categories: webkitDep.categories,
                force: {
                    initLayout: 'circular',
                    edgeLength: 50,
                    repulsion: 40,
                    gravity: 0.5
                },
                edges: webkitDep.links
            }]
        };

        myChart.setOption(option);
    });
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }

}