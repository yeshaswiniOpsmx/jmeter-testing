/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1.0, "series": [{"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-64", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-65", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-62", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "oes-63", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-60", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-61", "isController": false}, {"data": [[2000.0, 1.0]], "isOverall": false, "label": "oes-152", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "oes-153", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "oes-150", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "oes-151", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "oes-105", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "oes-106", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "oes-147", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-148", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-146", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-143", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "oes-144", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "oes-109", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-66", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "oes-107", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "oes-108", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-93", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-94", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-91", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-92", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-90", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "oes-120", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "oes-116", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "oes-117", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "oes-114", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "oes-115", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-112", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "oes-113", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "oes-110", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-154", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "oes-111", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-155", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-59", "isController": false}, {"data": [[4200.0, 1.0]], "isOverall": false, "label": "oes-57", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "oes-118", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "oes-119", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-86", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "oes-87", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-84", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-85", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-82", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-83", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-80", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-81", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-130", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-131", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "oes-123", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "oes-124", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "oes-121", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "oes-122", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 1.0], [2400.0, 1.0], [1300.0, 1.0], [2600.0, 1.0], [5800.0, 1.0], [1500.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "oes", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-88", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-89", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-75", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-76", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-73", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-74", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-72", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-70", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "oes-142", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-138", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "oes-136", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-137", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-134", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "oes-135", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-132", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-133", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-79", "isController": false}, {"data": [[3700.0, 1.0]], "isOverall": false, "label": "oes-57-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-57-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-77", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "oes-57-2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "oes-78", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 5800.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 73.0, "series": [{"data": [[0.0, 73.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 1.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 3.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.59611742E12, "maxY": 1.0, "series": [{"data": [[1.59611748E12, 1.0], [1.59611742E12, 1.0], [1.59611754E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59611754E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 44.0, "minX": 1.0, "maxY": 4236.0, "series": [{"data": [[1.0, 50.0]], "isOverall": false, "label": "oes-64", "isController": false}, {"data": [[1.0, 50.0]], "isOverall": false, "label": "oes-64-Aggregated", "isController": false}, {"data": [[1.0, 51.0]], "isOverall": false, "label": "oes-65", "isController": false}, {"data": [[1.0, 51.0]], "isOverall": false, "label": "oes-65-Aggregated", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "oes-62", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "oes-62-Aggregated", "isController": false}, {"data": [[1.0, 397.0]], "isOverall": false, "label": "oes-63", "isController": false}, {"data": [[1.0, 397.0]], "isOverall": false, "label": "oes-63-Aggregated", "isController": false}, {"data": [[1.0, 54.0]], "isOverall": false, "label": "oes-60", "isController": false}, {"data": [[1.0, 54.0]], "isOverall": false, "label": "oes-60-Aggregated", "isController": false}, {"data": [[1.0, 54.0]], "isOverall": false, "label": "oes-61", "isController": false}, {"data": [[1.0, 54.0]], "isOverall": false, "label": "oes-61-Aggregated", "isController": false}, {"data": [[1.0, 2037.0]], "isOverall": false, "label": "oes-152", "isController": false}, {"data": [[1.0, 2037.0]], "isOverall": false, "label": "oes-152-Aggregated", "isController": false}, {"data": [[1.0, 228.0]], "isOverall": false, "label": "oes-153", "isController": false}, {"data": [[1.0, 228.0]], "isOverall": false, "label": "oes-153-Aggregated", "isController": false}, {"data": [[1.0, 101.0]], "isOverall": false, "label": "oes-150", "isController": false}, {"data": [[1.0, 101.0]], "isOverall": false, "label": "oes-150-Aggregated", "isController": false}, {"data": [[1.0, 193.0]], "isOverall": false, "label": "oes-151", "isController": false}, {"data": [[1.0, 193.0]], "isOverall": false, "label": "oes-151-Aggregated", "isController": false}, {"data": [[1.0, 263.0]], "isOverall": false, "label": "oes-105", "isController": false}, {"data": [[1.0, 263.0]], "isOverall": false, "label": "oes-105-Aggregated", "isController": false}, {"data": [[1.0, 113.0]], "isOverall": false, "label": "oes-106", "isController": false}, {"data": [[1.0, 113.0]], "isOverall": false, "label": "oes-106-Aggregated", "isController": false}, {"data": [[1.0, 148.0]], "isOverall": false, "label": "oes-147", "isController": false}, {"data": [[1.0, 148.0]], "isOverall": false, "label": "oes-147-Aggregated", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "oes-148", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "oes-148-Aggregated", "isController": false}, {"data": [[1.0, 92.0]], "isOverall": false, "label": "oes-146", "isController": false}, {"data": [[1.0, 92.0]], "isOverall": false, "label": "oes-146-Aggregated", "isController": false}, {"data": [[1.0, 71.0]], "isOverall": false, "label": "oes-143", "isController": false}, {"data": [[1.0, 71.0]], "isOverall": false, "label": "oes-143-Aggregated", "isController": false}, {"data": [[1.0, 496.0]], "isOverall": false, "label": "oes-144", "isController": false}, {"data": [[1.0, 496.0]], "isOverall": false, "label": "oes-144-Aggregated", "isController": false}, {"data": [[1.0, 166.0]], "isOverall": false, "label": "oes-109", "isController": false}, {"data": [[1.0, 166.0]], "isOverall": false, "label": "oes-109-Aggregated", "isController": false}, {"data": [[1.0, 45.0]], "isOverall": false, "label": "oes-66", "isController": false}, {"data": [[1.0, 45.0]], "isOverall": false, "label": "oes-66-Aggregated", "isController": false}, {"data": [[1.0, 181.0]], "isOverall": false, "label": "oes-107", "isController": false}, {"data": [[1.0, 181.0]], "isOverall": false, "label": "oes-107-Aggregated", "isController": false}, {"data": [[1.0, 127.0]], "isOverall": false, "label": "oes-108", "isController": false}, {"data": [[1.0, 127.0]], "isOverall": false, "label": "oes-108-Aggregated", "isController": false}, {"data": [[1.0, 80.0]], "isOverall": false, "label": "oes-93", "isController": false}, {"data": [[1.0, 80.0]], "isOverall": false, "label": "oes-93-Aggregated", "isController": false}, {"data": [[1.0, 73.0]], "isOverall": false, "label": "oes-94", "isController": false}, {"data": [[1.0, 73.0]], "isOverall": false, "label": "oes-94-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "oes-91", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "oes-91-Aggregated", "isController": false}, {"data": [[1.0, 97.0]], "isOverall": false, "label": "oes-92", "isController": false}, {"data": [[1.0, 97.0]], "isOverall": false, "label": "oes-92-Aggregated", "isController": false}, {"data": [[1.0, 79.0]], "isOverall": false, "label": "oes-90", "isController": false}, {"data": [[1.0, 79.0]], "isOverall": false, "label": "oes-90-Aggregated", "isController": false}, {"data": [[1.0, 139.0]], "isOverall": false, "label": "oes-120", "isController": false}, {"data": [[1.0, 139.0]], "isOverall": false, "label": "oes-120-Aggregated", "isController": false}, {"data": [[1.0, 110.0]], "isOverall": false, "label": "oes-116", "isController": false}, {"data": [[1.0, 110.0]], "isOverall": false, "label": "oes-116-Aggregated", "isController": false}, {"data": [[1.0, 116.0]], "isOverall": false, "label": "oes-117", "isController": false}, {"data": [[1.0, 116.0]], "isOverall": false, "label": "oes-117-Aggregated", "isController": false}, {"data": [[1.0, 105.0]], "isOverall": false, "label": "oes-114", "isController": false}, {"data": [[1.0, 105.0]], "isOverall": false, "label": "oes-114-Aggregated", "isController": false}, {"data": [[1.0, 152.0]], "isOverall": false, "label": "oes-115", "isController": false}, {"data": [[1.0, 152.0]], "isOverall": false, "label": "oes-115-Aggregated", "isController": false}, {"data": [[1.0, 77.0]], "isOverall": false, "label": "oes-112", "isController": false}, {"data": [[1.0, 77.0]], "isOverall": false, "label": "oes-112-Aggregated", "isController": false}, {"data": [[1.0, 147.0]], "isOverall": false, "label": "oes-113", "isController": false}, {"data": [[1.0, 147.0]], "isOverall": false, "label": "oes-113-Aggregated", "isController": false}, {"data": [[1.0, 126.0]], "isOverall": false, "label": "oes-110", "isController": false}, {"data": [[1.0, 126.0]], "isOverall": false, "label": "oes-110-Aggregated", "isController": false}, {"data": [[1.0, 84.0]], "isOverall": false, "label": "oes-154", "isController": false}, {"data": [[1.0, 84.0]], "isOverall": false, "label": "oes-154-Aggregated", "isController": false}, {"data": [[1.0, 267.0]], "isOverall": false, "label": "oes-111", "isController": false}, {"data": [[1.0, 267.0]], "isOverall": false, "label": "oes-111-Aggregated", "isController": false}, {"data": [[1.0, 80.0]], "isOverall": false, "label": "oes-155", "isController": false}, {"data": [[1.0, 80.0]], "isOverall": false, "label": "oes-155-Aggregated", "isController": false}, {"data": [[1.0, 44.0]], "isOverall": false, "label": "oes-59", "isController": false}, {"data": [[1.0, 44.0]], "isOverall": false, "label": "oes-59-Aggregated", "isController": false}, {"data": [[1.0, 4236.0]], "isOverall": false, "label": "oes-57", "isController": false}, {"data": [[1.0, 4236.0]], "isOverall": false, "label": "oes-57-Aggregated", "isController": false}, {"data": [[1.0, 114.0]], "isOverall": false, "label": "oes-118", "isController": false}, {"data": [[1.0, 114.0]], "isOverall": false, "label": "oes-118-Aggregated", "isController": false}, {"data": [[1.0, 172.0]], "isOverall": false, "label": "oes-119", "isController": false}, {"data": [[1.0, 172.0]], "isOverall": false, "label": "oes-119-Aggregated", "isController": false}, {"data": [[1.0, 50.0]], "isOverall": false, "label": "oes-86", "isController": false}, {"data": [[1.0, 50.0]], "isOverall": false, "label": "oes-86-Aggregated", "isController": false}, {"data": [[1.0, 624.0]], "isOverall": false, "label": "oes-87", "isController": false}, {"data": [[1.0, 624.0]], "isOverall": false, "label": "oes-87-Aggregated", "isController": false}, {"data": [[1.0, 46.0]], "isOverall": false, "label": "oes-84", "isController": false}, {"data": [[1.0, 46.0]], "isOverall": false, "label": "oes-84-Aggregated", "isController": false}, {"data": [[1.0, 47.0]], "isOverall": false, "label": "oes-85", "isController": false}, {"data": [[1.0, 47.0]], "isOverall": false, "label": "oes-85-Aggregated", "isController": false}, {"data": [[1.0, 48.0]], "isOverall": false, "label": "oes-82", "isController": false}, {"data": [[1.0, 48.0]], "isOverall": false, "label": "oes-82-Aggregated", "isController": false}, {"data": [[1.0, 45.0]], "isOverall": false, "label": "oes-83", "isController": false}, {"data": [[1.0, 45.0]], "isOverall": false, "label": "oes-83-Aggregated", "isController": false}, {"data": [[1.0, 51.0]], "isOverall": false, "label": "oes-80", "isController": false}, {"data": [[1.0, 51.0]], "isOverall": false, "label": "oes-80-Aggregated", "isController": false}, {"data": [[1.0, 50.0]], "isOverall": false, "label": "oes-81", "isController": false}, {"data": [[1.0, 50.0]], "isOverall": false, "label": "oes-81-Aggregated", "isController": false}, {"data": [[1.0, 93.0]], "isOverall": false, "label": "oes-130", "isController": false}, {"data": [[1.0, 93.0]], "isOverall": false, "label": "oes-130-Aggregated", "isController": false}, {"data": [[1.0, 68.0]], "isOverall": false, "label": "oes-131", "isController": false}, {"data": [[1.0, 68.0]], "isOverall": false, "label": "oes-131-Aggregated", "isController": false}, {"data": [[1.0, 306.0]], "isOverall": false, "label": "oes-123", "isController": false}, {"data": [[1.0, 306.0]], "isOverall": false, "label": "oes-123-Aggregated", "isController": false}, {"data": [[1.0, 319.0]], "isOverall": false, "label": "oes-124", "isController": false}, {"data": [[1.0, 319.0]], "isOverall": false, "label": "oes-124-Aggregated", "isController": false}, {"data": [[1.0, 487.0]], "isOverall": false, "label": "oes-121", "isController": false}, {"data": [[1.0, 487.0]], "isOverall": false, "label": "oes-121-Aggregated", "isController": false}, {"data": [[1.0, 107.0]], "isOverall": false, "label": "oes-122", "isController": false}, {"data": [[1.0, 107.0]], "isOverall": false, "label": "oes-122-Aggregated", "isController": false}, {"data": [[1.0, 1961.375]], "isOverall": false, "label": "oes", "isController": true}, {"data": [[1.0, 1961.375]], "isOverall": false, "label": "oes-Aggregated", "isController": true}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "oes-88", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "oes-88-Aggregated", "isController": false}, {"data": [[1.0, 50.0]], "isOverall": false, "label": "oes-89", "isController": false}, {"data": [[1.0, 50.0]], "isOverall": false, "label": "oes-89-Aggregated", "isController": false}, {"data": [[1.0, 53.0]], "isOverall": false, "label": "oes-75", "isController": false}, {"data": [[1.0, 53.0]], "isOverall": false, "label": "oes-75-Aggregated", "isController": false}, {"data": [[1.0, 88.0]], "isOverall": false, "label": "oes-76", "isController": false}, {"data": [[1.0, 88.0]], "isOverall": false, "label": "oes-76-Aggregated", "isController": false}, {"data": [[1.0, 49.0]], "isOverall": false, "label": "oes-73", "isController": false}, {"data": [[1.0, 49.0]], "isOverall": false, "label": "oes-73-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "oes-74", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "oes-74-Aggregated", "isController": false}, {"data": [[1.0, 78.0]], "isOverall": false, "label": "oes-72", "isController": false}, {"data": [[1.0, 78.0]], "isOverall": false, "label": "oes-72-Aggregated", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "oes-70", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "oes-70-Aggregated", "isController": false}, {"data": [[1.0, 159.0]], "isOverall": false, "label": "oes-142", "isController": false}, {"data": [[1.0, 159.0]], "isOverall": false, "label": "oes-142-Aggregated", "isController": false}, {"data": [[1.0, 71.0]], "isOverall": false, "label": "oes-138", "isController": false}, {"data": [[1.0, 71.0]], "isOverall": false, "label": "oes-138-Aggregated", "isController": false}, {"data": [[1.0, 428.0]], "isOverall": false, "label": "oes-136", "isController": false}, {"data": [[1.0, 428.0]], "isOverall": false, "label": "oes-136-Aggregated", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "oes-137", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "oes-137-Aggregated", "isController": false}, {"data": [[1.0, 87.0]], "isOverall": false, "label": "oes-134", "isController": false}, {"data": [[1.0, 87.0]], "isOverall": false, "label": "oes-134-Aggregated", "isController": false}, {"data": [[1.0, 370.0]], "isOverall": false, "label": "oes-135", "isController": false}, {"data": [[1.0, 370.0]], "isOverall": false, "label": "oes-135-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "oes-132", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "oes-132-Aggregated", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "oes-133", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "oes-133-Aggregated", "isController": false}, {"data": [[1.0, 46.0]], "isOverall": false, "label": "oes-79", "isController": false}, {"data": [[1.0, 46.0]], "isOverall": false, "label": "oes-79-Aggregated", "isController": false}, {"data": [[1.0, 3709.0]], "isOverall": false, "label": "oes-57-0", "isController": false}, {"data": [[1.0, 3709.0]], "isOverall": false, "label": "oes-57-0-Aggregated", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "oes-57-1", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "oes-57-1-Aggregated", "isController": false}, {"data": [[1.0, 54.0]], "isOverall": false, "label": "oes-77", "isController": false}, {"data": [[1.0, 54.0]], "isOverall": false, "label": "oes-77-Aggregated", "isController": false}, {"data": [[1.0, 429.0]], "isOverall": false, "label": "oes-57-2", "isController": false}, {"data": [[1.0, 429.0]], "isOverall": false, "label": "oes-57-2-Aggregated", "isController": false}, {"data": [[1.0, 51.0]], "isOverall": false, "label": "oes-78", "isController": false}, {"data": [[1.0, 51.0]], "isOverall": false, "label": "oes-78-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 76.96666666666667, "minX": 1.59611742E12, "maxY": 710.6, "series": [{"data": [[1.59611748E12, 655.05], [1.59611742E12, 710.6], [1.59611754E12, 145.1]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.59611748E12, 317.15], [1.59611742E12, 237.08333333333334], [1.59611754E12, 76.96666666666667]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59611754E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 44.0, "minX": 1.59611742E12, "maxY": 4236.0, "series": [{"data": [[1.59611742E12, 50.0]], "isOverall": false, "label": "oes-64", "isController": false}, {"data": [[1.59611742E12, 51.0]], "isOverall": false, "label": "oes-65", "isController": false}, {"data": [[1.59611742E12, 56.0]], "isOverall": false, "label": "oes-62", "isController": false}, {"data": [[1.59611742E12, 397.0]], "isOverall": false, "label": "oes-63", "isController": false}, {"data": [[1.59611742E12, 54.0]], "isOverall": false, "label": "oes-60", "isController": false}, {"data": [[1.59611742E12, 54.0]], "isOverall": false, "label": "oes-61", "isController": false}, {"data": [[1.59611754E12, 2037.0]], "isOverall": false, "label": "oes-152", "isController": false}, {"data": [[1.59611754E12, 228.0]], "isOverall": false, "label": "oes-153", "isController": false}, {"data": [[1.59611754E12, 101.0]], "isOverall": false, "label": "oes-150", "isController": false}, {"data": [[1.59611754E12, 193.0]], "isOverall": false, "label": "oes-151", "isController": false}, {"data": [[1.59611748E12, 263.0]], "isOverall": false, "label": "oes-105", "isController": false}, {"data": [[1.59611748E12, 113.0]], "isOverall": false, "label": "oes-106", "isController": false}, {"data": [[1.59611754E12, 148.0]], "isOverall": false, "label": "oes-147", "isController": false}, {"data": [[1.59611754E12, 58.0]], "isOverall": false, "label": "oes-148", "isController": false}, {"data": [[1.59611754E12, 92.0]], "isOverall": false, "label": "oes-146", "isController": false}, {"data": [[1.59611748E12, 71.0]], "isOverall": false, "label": "oes-143", "isController": false}, {"data": [[1.59611748E12, 496.0]], "isOverall": false, "label": "oes-144", "isController": false}, {"data": [[1.59611748E12, 166.0]], "isOverall": false, "label": "oes-109", "isController": false}, {"data": [[1.59611742E12, 45.0]], "isOverall": false, "label": "oes-66", "isController": false}, {"data": [[1.59611748E12, 181.0]], "isOverall": false, "label": "oes-107", "isController": false}, {"data": [[1.59611748E12, 127.0]], "isOverall": false, "label": "oes-108", "isController": false}, {"data": [[1.59611748E12, 80.0]], "isOverall": false, "label": "oes-93", "isController": false}, {"data": [[1.59611748E12, 73.0]], "isOverall": false, "label": "oes-94", "isController": false}, {"data": [[1.59611748E12, 59.0]], "isOverall": false, "label": "oes-91", "isController": false}, {"data": [[1.59611748E12, 97.0]], "isOverall": false, "label": "oes-92", "isController": false}, {"data": [[1.59611748E12, 79.0]], "isOverall": false, "label": "oes-90", "isController": false}, {"data": [[1.59611748E12, 139.0]], "isOverall": false, "label": "oes-120", "isController": false}, {"data": [[1.59611748E12, 110.0]], "isOverall": false, "label": "oes-116", "isController": false}, {"data": [[1.59611748E12, 116.0]], "isOverall": false, "label": "oes-117", "isController": false}, {"data": [[1.59611748E12, 105.0]], "isOverall": false, "label": "oes-114", "isController": false}, {"data": [[1.59611748E12, 152.0]], "isOverall": false, "label": "oes-115", "isController": false}, {"data": [[1.59611748E12, 77.0]], "isOverall": false, "label": "oes-112", "isController": false}, {"data": [[1.59611748E12, 147.0]], "isOverall": false, "label": "oes-113", "isController": false}, {"data": [[1.59611748E12, 126.0]], "isOverall": false, "label": "oes-110", "isController": false}, {"data": [[1.59611754E12, 84.0]], "isOverall": false, "label": "oes-154", "isController": false}, {"data": [[1.59611748E12, 267.0]], "isOverall": false, "label": "oes-111", "isController": false}, {"data": [[1.59611754E12, 80.0]], "isOverall": false, "label": "oes-155", "isController": false}, {"data": [[1.59611742E12, 44.0]], "isOverall": false, "label": "oes-59", "isController": false}, {"data": [[1.59611742E12, 4236.0]], "isOverall": false, "label": "oes-57", "isController": false}, {"data": [[1.59611748E12, 114.0]], "isOverall": false, "label": "oes-118", "isController": false}, {"data": [[1.59611748E12, 172.0]], "isOverall": false, "label": "oes-119", "isController": false}, {"data": [[1.59611742E12, 50.0]], "isOverall": false, "label": "oes-86", "isController": false}, {"data": [[1.59611748E12, 624.0]], "isOverall": false, "label": "oes-87", "isController": false}, {"data": [[1.59611742E12, 46.0]], "isOverall": false, "label": "oes-84", "isController": false}, {"data": [[1.59611742E12, 47.0]], "isOverall": false, "label": "oes-85", "isController": false}, {"data": [[1.59611742E12, 48.0]], "isOverall": false, "label": "oes-82", "isController": false}, {"data": [[1.59611742E12, 45.0]], "isOverall": false, "label": "oes-83", "isController": false}, {"data": [[1.59611742E12, 51.0]], "isOverall": false, "label": "oes-80", "isController": false}, {"data": [[1.59611742E12, 50.0]], "isOverall": false, "label": "oes-81", "isController": false}, {"data": [[1.59611748E12, 93.0]], "isOverall": false, "label": "oes-130", "isController": false}, {"data": [[1.59611748E12, 68.0]], "isOverall": false, "label": "oes-131", "isController": false}, {"data": [[1.59611748E12, 306.0]], "isOverall": false, "label": "oes-123", "isController": false}, {"data": [[1.59611748E12, 319.0]], "isOverall": false, "label": "oes-124", "isController": false}, {"data": [[1.59611748E12, 487.0]], "isOverall": false, "label": "oes-121", "isController": false}, {"data": [[1.59611748E12, 107.0]], "isOverall": false, "label": "oes-122", "isController": false}, {"data": [[1.59611748E12, 1509.75], [1.59611742E12, 3514.5], [1.59611754E12, 1311.5]], "isOverall": false, "label": "oes", "isController": true}, {"data": [[1.59611748E12, 81.0]], "isOverall": false, "label": "oes-88", "isController": false}, {"data": [[1.59611748E12, 50.0]], "isOverall": false, "label": "oes-89", "isController": false}, {"data": [[1.59611742E12, 53.0]], "isOverall": false, "label": "oes-75", "isController": false}, {"data": [[1.59611742E12, 88.0]], "isOverall": false, "label": "oes-76", "isController": false}, {"data": [[1.59611742E12, 49.0]], "isOverall": false, "label": "oes-73", "isController": false}, {"data": [[1.59611742E12, 57.0]], "isOverall": false, "label": "oes-74", "isController": false}, {"data": [[1.59611742E12, 78.0]], "isOverall": false, "label": "oes-72", "isController": false}, {"data": [[1.59611742E12, 86.0]], "isOverall": false, "label": "oes-70", "isController": false}, {"data": [[1.59611748E12, 159.0]], "isOverall": false, "label": "oes-142", "isController": false}, {"data": [[1.59611748E12, 71.0]], "isOverall": false, "label": "oes-138", "isController": false}, {"data": [[1.59611748E12, 428.0]], "isOverall": false, "label": "oes-136", "isController": false}, {"data": [[1.59611748E12, 81.0]], "isOverall": false, "label": "oes-137", "isController": false}, {"data": [[1.59611748E12, 87.0]], "isOverall": false, "label": "oes-134", "isController": false}, {"data": [[1.59611748E12, 370.0]], "isOverall": false, "label": "oes-135", "isController": false}, {"data": [[1.59611748E12, 60.0]], "isOverall": false, "label": "oes-132", "isController": false}, {"data": [[1.59611748E12, 62.0]], "isOverall": false, "label": "oes-133", "isController": false}, {"data": [[1.59611742E12, 46.0]], "isOverall": false, "label": "oes-79", "isController": false}, {"data": [[1.59611742E12, 3709.0]], "isOverall": false, "label": "oes-57-0", "isController": false}, {"data": [[1.59611742E12, 58.0]], "isOverall": false, "label": "oes-57-1", "isController": false}, {"data": [[1.59611742E12, 54.0]], "isOverall": false, "label": "oes-77", "isController": false}, {"data": [[1.59611742E12, 429.0]], "isOverall": false, "label": "oes-57-2", "isController": false}, {"data": [[1.59611742E12, 51.0]], "isOverall": false, "label": "oes-78", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59611754E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 44.0, "minX": 1.59611742E12, "maxY": 3709.0, "series": [{"data": [[1.59611742E12, 50.0]], "isOverall": false, "label": "oes-64", "isController": false}, {"data": [[1.59611742E12, 51.0]], "isOverall": false, "label": "oes-65", "isController": false}, {"data": [[1.59611742E12, 56.0]], "isOverall": false, "label": "oes-62", "isController": false}, {"data": [[1.59611742E12, 397.0]], "isOverall": false, "label": "oes-63", "isController": false}, {"data": [[1.59611742E12, 54.0]], "isOverall": false, "label": "oes-60", "isController": false}, {"data": [[1.59611742E12, 53.0]], "isOverall": false, "label": "oes-61", "isController": false}, {"data": [[1.59611754E12, 2037.0]], "isOverall": false, "label": "oes-152", "isController": false}, {"data": [[1.59611754E12, 228.0]], "isOverall": false, "label": "oes-153", "isController": false}, {"data": [[1.59611754E12, 101.0]], "isOverall": false, "label": "oes-150", "isController": false}, {"data": [[1.59611754E12, 193.0]], "isOverall": false, "label": "oes-151", "isController": false}, {"data": [[1.59611748E12, 263.0]], "isOverall": false, "label": "oes-105", "isController": false}, {"data": [[1.59611748E12, 106.0]], "isOverall": false, "label": "oes-106", "isController": false}, {"data": [[1.59611754E12, 148.0]], "isOverall": false, "label": "oes-147", "isController": false}, {"data": [[1.59611754E12, 58.0]], "isOverall": false, "label": "oes-148", "isController": false}, {"data": [[1.59611754E12, 92.0]], "isOverall": false, "label": "oes-146", "isController": false}, {"data": [[1.59611748E12, 71.0]], "isOverall": false, "label": "oes-143", "isController": false}, {"data": [[1.59611748E12, 496.0]], "isOverall": false, "label": "oes-144", "isController": false}, {"data": [[1.59611748E12, 166.0]], "isOverall": false, "label": "oes-109", "isController": false}, {"data": [[1.59611742E12, 45.0]], "isOverall": false, "label": "oes-66", "isController": false}, {"data": [[1.59611748E12, 181.0]], "isOverall": false, "label": "oes-107", "isController": false}, {"data": [[1.59611748E12, 127.0]], "isOverall": false, "label": "oes-108", "isController": false}, {"data": [[1.59611748E12, 80.0]], "isOverall": false, "label": "oes-93", "isController": false}, {"data": [[1.59611748E12, 73.0]], "isOverall": false, "label": "oes-94", "isController": false}, {"data": [[1.59611748E12, 59.0]], "isOverall": false, "label": "oes-91", "isController": false}, {"data": [[1.59611748E12, 97.0]], "isOverall": false, "label": "oes-92", "isController": false}, {"data": [[1.59611748E12, 79.0]], "isOverall": false, "label": "oes-90", "isController": false}, {"data": [[1.59611748E12, 139.0]], "isOverall": false, "label": "oes-120", "isController": false}, {"data": [[1.59611748E12, 109.0]], "isOverall": false, "label": "oes-116", "isController": false}, {"data": [[1.59611748E12, 116.0]], "isOverall": false, "label": "oes-117", "isController": false}, {"data": [[1.59611748E12, 105.0]], "isOverall": false, "label": "oes-114", "isController": false}, {"data": [[1.59611748E12, 152.0]], "isOverall": false, "label": "oes-115", "isController": false}, {"data": [[1.59611748E12, 77.0]], "isOverall": false, "label": "oes-112", "isController": false}, {"data": [[1.59611748E12, 146.0]], "isOverall": false, "label": "oes-113", "isController": false}, {"data": [[1.59611748E12, 125.0]], "isOverall": false, "label": "oes-110", "isController": false}, {"data": [[1.59611754E12, 84.0]], "isOverall": false, "label": "oes-154", "isController": false}, {"data": [[1.59611748E12, 248.0]], "isOverall": false, "label": "oes-111", "isController": false}, {"data": [[1.59611754E12, 80.0]], "isOverall": false, "label": "oes-155", "isController": false}, {"data": [[1.59611742E12, 44.0]], "isOverall": false, "label": "oes-59", "isController": false}, {"data": [[1.59611742E12, 3709.0]], "isOverall": false, "label": "oes-57", "isController": false}, {"data": [[1.59611748E12, 114.0]], "isOverall": false, "label": "oes-118", "isController": false}, {"data": [[1.59611748E12, 172.0]], "isOverall": false, "label": "oes-119", "isController": false}, {"data": [[1.59611742E12, 50.0]], "isOverall": false, "label": "oes-86", "isController": false}, {"data": [[1.59611748E12, 624.0]], "isOverall": false, "label": "oes-87", "isController": false}, {"data": [[1.59611742E12, 46.0]], "isOverall": false, "label": "oes-84", "isController": false}, {"data": [[1.59611742E12, 47.0]], "isOverall": false, "label": "oes-85", "isController": false}, {"data": [[1.59611742E12, 48.0]], "isOverall": false, "label": "oes-82", "isController": false}, {"data": [[1.59611742E12, 45.0]], "isOverall": false, "label": "oes-83", "isController": false}, {"data": [[1.59611742E12, 51.0]], "isOverall": false, "label": "oes-80", "isController": false}, {"data": [[1.59611742E12, 50.0]], "isOverall": false, "label": "oes-81", "isController": false}, {"data": [[1.59611748E12, 93.0]], "isOverall": false, "label": "oes-130", "isController": false}, {"data": [[1.59611748E12, 68.0]], "isOverall": false, "label": "oes-131", "isController": false}, {"data": [[1.59611748E12, 306.0]], "isOverall": false, "label": "oes-123", "isController": false}, {"data": [[1.59611748E12, 319.0]], "isOverall": false, "label": "oes-124", "isController": false}, {"data": [[1.59611748E12, 487.0]], "isOverall": false, "label": "oes-121", "isController": false}, {"data": [[1.59611748E12, 107.0]], "isOverall": false, "label": "oes-122", "isController": false}, {"data": [[1.59611748E12, 1502.25], [1.59611742E12, 3250.5], [1.59611754E12, 1311.0]], "isOverall": false, "label": "oes", "isController": true}, {"data": [[1.59611748E12, 81.0]], "isOverall": false, "label": "oes-88", "isController": false}, {"data": [[1.59611748E12, 50.0]], "isOverall": false, "label": "oes-89", "isController": false}, {"data": [[1.59611742E12, 53.0]], "isOverall": false, "label": "oes-75", "isController": false}, {"data": [[1.59611742E12, 88.0]], "isOverall": false, "label": "oes-76", "isController": false}, {"data": [[1.59611742E12, 49.0]], "isOverall": false, "label": "oes-73", "isController": false}, {"data": [[1.59611742E12, 57.0]], "isOverall": false, "label": "oes-74", "isController": false}, {"data": [[1.59611742E12, 78.0]], "isOverall": false, "label": "oes-72", "isController": false}, {"data": [[1.59611742E12, 86.0]], "isOverall": false, "label": "oes-70", "isController": false}, {"data": [[1.59611748E12, 159.0]], "isOverall": false, "label": "oes-142", "isController": false}, {"data": [[1.59611748E12, 71.0]], "isOverall": false, "label": "oes-138", "isController": false}, {"data": [[1.59611748E12, 428.0]], "isOverall": false, "label": "oes-136", "isController": false}, {"data": [[1.59611748E12, 80.0]], "isOverall": false, "label": "oes-137", "isController": false}, {"data": [[1.59611748E12, 87.0]], "isOverall": false, "label": "oes-134", "isController": false}, {"data": [[1.59611748E12, 370.0]], "isOverall": false, "label": "oes-135", "isController": false}, {"data": [[1.59611748E12, 60.0]], "isOverall": false, "label": "oes-132", "isController": false}, {"data": [[1.59611748E12, 62.0]], "isOverall": false, "label": "oes-133", "isController": false}, {"data": [[1.59611742E12, 46.0]], "isOverall": false, "label": "oes-79", "isController": false}, {"data": [[1.59611742E12, 3709.0]], "isOverall": false, "label": "oes-57-0", "isController": false}, {"data": [[1.59611742E12, 58.0]], "isOverall": false, "label": "oes-57-1", "isController": false}, {"data": [[1.59611742E12, 54.0]], "isOverall": false, "label": "oes-77", "isController": false}, {"data": [[1.59611742E12, 428.0]], "isOverall": false, "label": "oes-57-2", "isController": false}, {"data": [[1.59611742E12, 51.0]], "isOverall": false, "label": "oes-78", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59611754E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.59611742E12, "maxY": 3609.0, "series": [{"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-64", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-65", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-62", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-63", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-60", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-61", "isController": false}, {"data": [[1.59611754E12, 1309.0]], "isOverall": false, "label": "oes-152", "isController": false}, {"data": [[1.59611754E12, 0.0]], "isOverall": false, "label": "oes-153", "isController": false}, {"data": [[1.59611754E12, 0.0]], "isOverall": false, "label": "oes-150", "isController": false}, {"data": [[1.59611754E12, 129.0]], "isOverall": false, "label": "oes-151", "isController": false}, {"data": [[1.59611748E12, 106.0]], "isOverall": false, "label": "oes-105", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-106", "isController": false}, {"data": [[1.59611754E12, 0.0]], "isOverall": false, "label": "oes-147", "isController": false}, {"data": [[1.59611754E12, 0.0]], "isOverall": false, "label": "oes-148", "isController": false}, {"data": [[1.59611754E12, 39.0]], "isOverall": false, "label": "oes-146", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-143", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-144", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-109", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-66", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-107", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-108", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-93", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-94", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-91", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-92", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-90", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-120", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-116", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-117", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-114", "isController": false}, {"data": [[1.59611748E12, 47.0]], "isOverall": false, "label": "oes-115", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-112", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-113", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-110", "isController": false}, {"data": [[1.59611754E12, 0.0]], "isOverall": false, "label": "oes-154", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-111", "isController": false}, {"data": [[1.59611754E12, 0.0]], "isOverall": false, "label": "oes-155", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-59", "isController": false}, {"data": [[1.59611742E12, 3609.0]], "isOverall": false, "label": "oes-57", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-118", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-119", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-86", "isController": false}, {"data": [[1.59611748E12, 338.0]], "isOverall": false, "label": "oes-87", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-84", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-85", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-82", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-83", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-80", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-81", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-130", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-131", "isController": false}, {"data": [[1.59611748E12, 152.0]], "isOverall": false, "label": "oes-123", "isController": false}, {"data": [[1.59611748E12, 250.0]], "isOverall": false, "label": "oes-124", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-121", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-122", "isController": false}, {"data": [[1.59611748E12, 163.25], [1.59611742E12, 1994.0], [1.59611754E12, 719.0]], "isOverall": false, "label": "oes", "isController": true}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-88", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-89", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-75", "isController": false}, {"data": [[1.59611742E12, 41.0]], "isOverall": false, "label": "oes-76", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-73", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-74", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-72", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-70", "isController": false}, {"data": [[1.59611748E12, 59.0]], "isOverall": false, "label": "oes-142", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-138", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-136", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-137", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-134", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-135", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-132", "isController": false}, {"data": [[1.59611748E12, 0.0]], "isOverall": false, "label": "oes-133", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-79", "isController": false}, {"data": [[1.59611742E12, 3609.0]], "isOverall": false, "label": "oes-57-0", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-57-1", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-77", "isController": false}, {"data": [[1.59611742E12, 221.0]], "isOverall": false, "label": "oes-57-2", "isController": false}, {"data": [[1.59611742E12, 0.0]], "isOverall": false, "label": "oes-78", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59611754E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 44.0, "minX": 1.59611742E12, "maxY": 4236.0, "series": [{"data": [[1.59611748E12, 624.0], [1.59611742E12, 4236.0], [1.59611754E12, 2037.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.59611748E12, 50.0], [1.59611742E12, 44.0], [1.59611754E12, 58.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.59611748E12, 422.19999999999993], [1.59611742E12, 757.0000000000047], [1.59611754E12, 2037.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.59611748E12, 624.0], [1.59611742E12, 4236.0], [1.59611754E12, 2037.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.59611748E12, 495.54999999999995], [1.59611742E12, 3998.8499999999985], [1.59611754E12, 2037.0]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59611754E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 50.5, "minX": 1.0, "maxY": 1883.5, "series": [{"data": [[2.0, 1883.5], [16.0, 50.5], [1.0, 172.5], [4.0, 105.5], [10.0, 54.0], [5.0, 93.0], [3.0, 107.0], [7.0, 127.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 16.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 50.5, "minX": 1.0, "maxY": 1883.5, "series": [{"data": [[2.0, 1883.5], [16.0, 50.5], [1.0, 172.5], [4.0, 105.0], [10.0, 53.5], [5.0, 93.0], [3.0, 107.0], [7.0, 127.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 16.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.15, "minX": 1.59611742E12, "maxY": 0.6666666666666666, "series": [{"data": [[1.59611748E12, 0.6666666666666666], [1.59611742E12, 0.4666666666666667], [1.59611754E12, 0.15]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59611754E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.59611742E12, "maxY": 0.6666666666666666, "series": [{"data": [[1.59611748E12, 0.6666666666666666], [1.59611742E12, 0.43333333333333335], [1.59611754E12, 0.15]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.59611742E12, 0.03333333333333333]], "isOverall": false, "label": "302", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59611754E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.59611742E12, "maxY": 0.06666666666666667, "series": [{"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-57-0-success", "isController": false}, {"data": [[1.59611754E12, 0.016666666666666666]], "isOverall": false, "label": "oes-150-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-86-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-120-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-137-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-105-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-122-success", "isController": false}, {"data": [[1.59611754E12, 0.016666666666666666]], "isOverall": false, "label": "oes-152-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-88-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-109-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-118-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-135-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-131-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-73-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-80-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-116-success", "isController": false}, {"data": [[1.59611754E12, 0.016666666666666666]], "isOverall": false, "label": "oes-148-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-57-2-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-60-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-133-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-75-success", "isController": false}, {"data": [[1.59611754E12, 0.016666666666666666]], "isOverall": false, "label": "oes-146-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-79-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-113-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-91-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-63-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-94-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-111-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-77-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-142-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-65-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-144-success", "isController": false}, {"data": [[1.59611754E12, 0.016666666666666666]], "isOverall": false, "label": "oes-154-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-82-success", "isController": false}, {"data": [[1.59611748E12, 0.06666666666666667], [1.59611742E12, 0.03333333333333333], [1.59611754E12, 0.03333333333333333]], "isOverall": false, "label": "oes-success", "isController": true}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-108-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-84-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-123-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-70-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-136-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-85-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-57-1-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-106-success", "isController": false}, {"data": [[1.59611754E12, 0.016666666666666666]], "isOverall": false, "label": "oes-151-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-57-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-72-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-119-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-134-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-121-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-87-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-81-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-117-success", "isController": false}, {"data": [[1.59611754E12, 0.016666666666666666]], "isOverall": false, "label": "oes-147-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-89-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-130-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-74-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-76-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-115-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-61-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-59-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-132-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-62-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-78-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-92-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-143-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-93-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-114-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-90-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-112-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-64-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-124-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-66-success", "isController": false}, {"data": [[1.59611754E12, 0.016666666666666666]], "isOverall": false, "label": "oes-153-success", "isController": false}, {"data": [[1.59611742E12, 0.016666666666666666]], "isOverall": false, "label": "oes-83-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-110-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-107-success", "isController": false}, {"data": [[1.59611754E12, 0.016666666666666666]], "isOverall": false, "label": "oes-155-success", "isController": false}, {"data": [[1.59611748E12, 0.016666666666666666]], "isOverall": false, "label": "oes-138-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59611754E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.18333333333333332, "minX": 1.59611742E12, "maxY": 0.7333333333333333, "series": [{"data": [[1.59611748E12, 0.7333333333333333], [1.59611742E12, 0.5], [1.59611754E12, 0.18333333333333332]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59611754E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
