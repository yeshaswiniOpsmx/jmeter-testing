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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 6;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "oes-64"], "isController": false}, {"data": [1.0, 500, 1500, "oes-65"], "isController": false}, {"data": [1.0, 500, 1500, "oes-62"], "isController": false}, {"data": [1.0, 500, 1500, "oes-63"], "isController": false}, {"data": [1.0, 500, 1500, "oes-60"], "isController": false}, {"data": [1.0, 500, 1500, "oes-61"], "isController": false}, {"data": [0.0, 500, 1500, "oes-152"], "isController": false}, {"data": [1.0, 500, 1500, "oes-153"], "isController": false}, {"data": [1.0, 500, 1500, "oes-150"], "isController": false}, {"data": [1.0, 500, 1500, "oes-151"], "isController": false}, {"data": [1.0, 500, 1500, "oes-105"], "isController": false}, {"data": [1.0, 500, 1500, "oes-106"], "isController": false}, {"data": [1.0, 500, 1500, "oes-147"], "isController": false}, {"data": [1.0, 500, 1500, "oes-148"], "isController": false}, {"data": [1.0, 500, 1500, "oes-146"], "isController": false}, {"data": [1.0, 500, 1500, "oes-143"], "isController": false}, {"data": [1.0, 500, 1500, "oes-144"], "isController": false}, {"data": [1.0, 500, 1500, "oes-109"], "isController": false}, {"data": [1.0, 500, 1500, "oes-66"], "isController": false}, {"data": [1.0, 500, 1500, "oes-107"], "isController": false}, {"data": [1.0, 500, 1500, "oes-108"], "isController": false}, {"data": [1.0, 500, 1500, "oes-93"], "isController": false}, {"data": [1.0, 500, 1500, "oes-94"], "isController": false}, {"data": [1.0, 500, 1500, "oes-91"], "isController": false}, {"data": [1.0, 500, 1500, "oes-92"], "isController": false}, {"data": [1.0, 500, 1500, "oes-90"], "isController": false}, {"data": [1.0, 500, 1500, "oes-120"], "isController": false}, {"data": [1.0, 500, 1500, "oes-116"], "isController": false}, {"data": [1.0, 500, 1500, "oes-117"], "isController": false}, {"data": [1.0, 500, 1500, "oes-114"], "isController": false}, {"data": [1.0, 500, 1500, "oes-115"], "isController": false}, {"data": [1.0, 500, 1500, "oes-112"], "isController": false}, {"data": [1.0, 500, 1500, "oes-113"], "isController": false}, {"data": [1.0, 500, 1500, "oes-110"], "isController": false}, {"data": [1.0, 500, 1500, "oes-154"], "isController": false}, {"data": [1.0, 500, 1500, "oes-111"], "isController": false}, {"data": [1.0, 500, 1500, "oes-155"], "isController": false}, {"data": [1.0, 500, 1500, "oes-59"], "isController": false}, {"data": [0.0, 500, 1500, "oes-57"], "isController": false}, {"data": [1.0, 500, 1500, "oes-118"], "isController": false}, {"data": [1.0, 500, 1500, "oes-119"], "isController": false}, {"data": [1.0, 500, 1500, "oes-86"], "isController": false}, {"data": [0.5, 500, 1500, "oes-87"], "isController": false}, {"data": [1.0, 500, 1500, "oes-84"], "isController": false}, {"data": [1.0, 500, 1500, "oes-85"], "isController": false}, {"data": [1.0, 500, 1500, "oes-82"], "isController": false}, {"data": [1.0, 500, 1500, "oes-83"], "isController": false}, {"data": [1.0, 500, 1500, "oes-80"], "isController": false}, {"data": [1.0, 500, 1500, "oes-81"], "isController": false}, {"data": [1.0, 500, 1500, "oes-130"], "isController": false}, {"data": [1.0, 500, 1500, "oes-131"], "isController": false}, {"data": [1.0, 500, 1500, "oes-123"], "isController": false}, {"data": [1.0, 500, 1500, "oes-124"], "isController": false}, {"data": [1.0, 500, 1500, "oes-121"], "isController": false}, {"data": [1.0, 500, 1500, "oes-122"], "isController": false}, {"data": [0.375, 500, 1500, "oes"], "isController": true}, {"data": [1.0, 500, 1500, "oes-88"], "isController": false}, {"data": [1.0, 500, 1500, "oes-89"], "isController": false}, {"data": [1.0, 500, 1500, "oes-75"], "isController": false}, {"data": [1.0, 500, 1500, "oes-76"], "isController": false}, {"data": [1.0, 500, 1500, "oes-73"], "isController": false}, {"data": [1.0, 500, 1500, "oes-74"], "isController": false}, {"data": [1.0, 500, 1500, "oes-72"], "isController": false}, {"data": [1.0, 500, 1500, "oes-70"], "isController": false}, {"data": [1.0, 500, 1500, "oes-142"], "isController": false}, {"data": [1.0, 500, 1500, "oes-138"], "isController": false}, {"data": [1.0, 500, 1500, "oes-136"], "isController": false}, {"data": [1.0, 500, 1500, "oes-137"], "isController": false}, {"data": [1.0, 500, 1500, "oes-134"], "isController": false}, {"data": [1.0, 500, 1500, "oes-135"], "isController": false}, {"data": [1.0, 500, 1500, "oes-132"], "isController": false}, {"data": [1.0, 500, 1500, "oes-133"], "isController": false}, {"data": [1.0, 500, 1500, "oes-79"], "isController": false}, {"data": [0.0, 500, 1500, "oes-57-0"], "isController": false}, {"data": [1.0, 500, 1500, "oes-57-1"], "isController": false}, {"data": [1.0, 500, 1500, "oes-77"], "isController": false}, {"data": [1.0, 500, 1500, "oes-57-2"], "isController": false}, {"data": [1.0, 500, 1500, "oes-78"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 77, 0, 0.0, 258.25974025974034, 44, 4236, 428.2, 765.299999999992, 4236.0, 0.4790016858371021, 0.5506684736797904, 0.23007244122898146], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["oes-64", 1, 0, 0.0, 50.0, 50, 50, 50.0, 50.0, 50.0, 20.0, 42.12890625, 9.0625], "isController": false}, {"data": ["oes-65", 1, 0, 0.0, 51.0, 51, 51, 51.0, 51.0, 51.0, 19.607843137254903, 24.854473039215687, 8.40609681372549], "isController": false}, {"data": ["oes-62", 1, 0, 0.0, 56.0, 56, 56, 56.0, 56.0, 56.0, 17.857142857142858, 16.636439732142858, 7.969447544642857], "isController": false}, {"data": ["oes-63", 1, 0, 0.0, 397.0, 397, 397, 397.0, 397.0, 397.0, 2.5188916876574305, 2.3663806675062973, 1.102015113350126], "isController": false}, {"data": ["oes-60", 1, 0, 0.0, 54.0, 54, 54, 54.0, 54.0, 54.0, 18.51851851851852, 27.86820023148148, 8.119936342592593], "isController": false}, {"data": ["oes-61", 1, 0, 0.0, 54.0, 54, 54, 54.0, 54.0, 54.0, 18.51851851851852, 20.03761574074074, 8.138020833333334], "isController": false}, {"data": ["oes-152", 1, 0, 0.0, 2037.0, 2037, 2037, 2037.0, 2037.0, 2037.0, 0.49091801669121254, 0.4065414825724104, 0.2703884388807069], "isController": false}, {"data": ["oes-153", 1, 0, 0.0, 228.0, 228, 228, 228.0, 228.0, 228.0, 4.385964912280701, 3.328022203947368, 2.047354714912281], "isController": false}, {"data": ["oes-150", 1, 0, 0.0, 101.0, 101, 101, 101.0, 101.0, 101.0, 9.900990099009901, 9.137144183168317, 4.554068688118812], "isController": false}, {"data": ["oes-151", 1, 0, 0.0, 193.0, 193, 193, 193.0, 193.0, 193.0, 5.181347150259067, 5.591199805699482, 2.3832172927461137], "isController": false}, {"data": ["oes-105", 1, 0, 0.0, 263.0, 263, 263, 263.0, 263.0, 263.0, 3.802281368821293, 3.1747564163498097, 1.7563272338403042], "isController": false}, {"data": ["oes-106", 1, 0, 0.0, 113.0, 113, 113, 113.0, 113.0, 113.0, 8.849557522123893, 9.575497787610619, 3.888965707964602], "isController": false}, {"data": ["oes-147", 1, 0, 0.0, 148.0, 148, 148, 148.0, 148.0, 148.0, 6.756756756756757, 6.09031883445946, 4.546294341216217], "isController": false}, {"data": ["oes-148", 1, 0, 0.0, 58.0, 58, 58, 58.0, 58.0, 58.0, 17.241379310344826, 17.08984375, 7.93036099137931], "isController": false}, {"data": ["oes-146", 1, 0, 0.0, 92.0, 92, 92, 92.0, 92.0, 92.0, 10.869565217391305, 9.319802989130435, 5.721382472826087], "isController": false}, {"data": ["oes-143", 1, 0, 0.0, 71.0, 71, 71, 71.0, 71.0, 71.0, 14.084507042253522, 10.687169894366198, 6.478323063380282], "isController": false}, {"data": ["oes-144", 1, 0, 0.0, 496.0, 496, 496, 496.0, 496.0, 496.0, 2.0161290322580645, 2.4768460181451615, 0.9489982358870968], "isController": false}, {"data": ["oes-109", 1, 0, 0.0, 166.0, 166, 166, 166.0, 166.0, 166.0, 6.024096385542169, 5.02988516566265, 2.782614834337349], "isController": false}, {"data": ["oes-66", 1, 0, 0.0, 45.0, 45, 45, 45.0, 45.0, 45.0, 22.22222222222222, 16.97048611111111, 9.700520833333334], "isController": false}, {"data": ["oes-107", 1, 0, 0.0, 181.0, 181, 181, 181.0, 181.0, 181.0, 5.524861878453039, 4.613043853591161, 2.552011395027624], "isController": false}, {"data": ["oes-108", 1, 0, 0.0, 127.0, 127, 127, 127.0, 127.0, 127.0, 7.874015748031496, 6.574495570866142, 3.6371186023622046], "isController": false}, {"data": ["oes-93", 1, 0, 0.0, 80.0, 80, 80, 80.0, 80.0, 80.0, 12.5, 10.43701171875, 5.77392578125], "isController": false}, {"data": ["oes-94", 1, 0, 0.0, 73.0, 73, 73, 73.0, 73.0, 73.0, 13.698630136986301, 11.437821061643836, 6.327589897260275], "isController": false}, {"data": ["oes-91", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 16.949152542372882, 18.33951271186441, 7.5973252118644075], "isController": false}, {"data": ["oes-92", 1, 0, 0.0, 97.0, 97, 97, 97.0, 97.0, 97.0, 10.309278350515465, 8.607844716494846, 4.762000644329897], "isController": false}, {"data": ["oes-90", 1, 0, 0.0, 79.0, 79, 79, 79.0, 79.0, 79.0, 12.658227848101266, 10.569125791139241, 5.958267405063291], "isController": false}, {"data": ["oes-120", 1, 0, 0.0, 139.0, 139, 139, 139.0, 139.0, 139.0, 7.194244604316547, 6.00691321942446, 3.323122751798561], "isController": false}, {"data": ["oes-116", 1, 0, 0.0, 110.0, 110, 110, 110.0, 110.0, 110.0, 9.09090909090909, 7.5905539772727275, 4.19921875], "isController": false}, {"data": ["oes-117", 1, 0, 0.0, 116.0, 116, 116, 116.0, 116.0, 116.0, 8.620689655172413, 7.19793911637931, 3.9820177801724137], "isController": false}, {"data": ["oes-114", 1, 0, 0.0, 105.0, 105, 105, 105.0, 105.0, 105.0, 9.523809523809526, 7.952008928571429, 4.3991815476190474], "isController": false}, {"data": ["oes-115", 1, 0, 0.0, 152.0, 152, 152, 152.0, 152.0, 152.0, 6.578947368421052, 5.4931640625, 3.0389083059210527], "isController": false}, {"data": ["oes-112", 1, 0, 0.0, 77.0, 77, 77, 77.0, 77.0, 77.0, 12.987012987012989, 14.052353896103897, 5.707183441558442], "isController": false}, {"data": ["oes-113", 1, 0, 0.0, 147.0, 147, 147, 147.0, 147.0, 147.0, 6.802721088435374, 5.68000637755102, 3.1422725340136055], "isController": false}, {"data": ["oes-110", 1, 0, 0.0, 126.0, 126, 126, 126.0, 126.0, 126.0, 7.936507936507936, 6.626674107142857, 3.665984623015873], "isController": false}, {"data": ["oes-154", 1, 0, 0.0, 84.0, 84, 84, 84.0, 84.0, 84.0, 11.904761904761903, 16.71781994047619, 5.312965029761904], "isController": false}, {"data": ["oes-111", 1, 0, 0.0, 267.0, 267, 267, 267.0, 267.0, 267.0, 3.745318352059925, 3.12719452247191, 1.730015215355805], "isController": false}, {"data": ["oes-155", 1, 0, 0.0, 80.0, 80, 80, 80.0, 80.0, 80.0, 12.5, 9.48486328125, 5.8349609375], "isController": false}, {"data": ["oes-59", 1, 0, 0.0, 44.0, 44, 44, 44.0, 44.0, 44.0, 22.727272727272727, 25.279651988636367, 9.61026278409091], "isController": false}, {"data": ["oes-57", 1, 0, 0.0, 4236.0, 4236, 4236, 4236.0, 4236.0, 4236.0, 0.23607176581680833, 2.072083038243626, 0.36655674575070823], "isController": false}, {"data": ["oes-118", 1, 0, 0.0, 114.0, 114, 114, 114.0, 114.0, 114.0, 8.771929824561402, 7.32421875, 4.05187774122807], "isController": false}, {"data": ["oes-119", 1, 0, 0.0, 172.0, 172, 172, 172.0, 172.0, 172.0, 5.813953488372093, 6.290879360465117, 2.554960029069768], "isController": false}, {"data": ["oes-86", 1, 0, 0.0, 50.0, 50, 50, 50.0, 50.0, 50.0, 20.0, 15.6640625, 9.21875], "isController": false}, {"data": ["oes-87", 1, 0, 0.0, 624.0, 624, 624, 624.0, 624.0, 624.0, 1.6025641025641024, 1.374073517628205, 0.8216271033653846], "isController": false}, {"data": ["oes-84", 1, 0, 0.0, 46.0, 46, 46, 46.0, 46.0, 46.0, 21.73913043478261, 17.026154891304348, 9.977921195652174], "isController": false}, {"data": ["oes-85", 1, 0, 0.0, 47.0, 47, 47, 47.0, 47.0, 47.0, 21.27659574468085, 16.663896276595743, 9.786402925531915], "isController": false}, {"data": ["oes-82", 1, 0, 0.0, 48.0, 48, 48, 48.0, 48.0, 48.0, 20.833333333333332, 16.316731770833332, 9.521484375], "isController": false}, {"data": ["oes-83", 1, 0, 0.0, 45.0, 45, 45, 45.0, 45.0, 45.0, 22.22222222222222, 17.40451388888889, 10.17795138888889], "isController": false}, {"data": ["oes-80", 1, 0, 0.0, 51.0, 51, 51, 51.0, 51.0, 51.0, 19.607843137254903, 15.356924019607844, 8.923100490196079], "isController": false}, {"data": ["oes-81", 1, 0, 0.0, 50.0, 50, 50, 50.0, 50.0, 50.0, 20.0, 15.6640625, 9.12109375], "isController": false}, {"data": ["oes-130", 1, 0, 0.0, 93.0, 93, 93, 93.0, 93.0, 93.0, 10.752688172043012, 3.6227318548387095, 3.874747983870968], "isController": false}, {"data": ["oes-131", 1, 0, 0.0, 68.0, 68, 68, 68.0, 68.0, 68.0, 14.705882352941176, 16.357421875, 6.218405330882352], "isController": false}, {"data": ["oes-123", 1, 0, 0.0, 306.0, 306, 306, 306.0, 306.0, 306.0, 3.2679738562091503, 2.7286305147058822, 1.5095230800653594], "isController": false}, {"data": ["oes-124", 1, 0, 0.0, 319.0, 319, 319, 319.0, 319.0, 319.0, 3.134796238244514, 5.516506661442006, 1.144935344827586], "isController": false}, {"data": ["oes-121", 1, 0, 0.0, 487.0, 487, 487, 487.0, 487.0, 487.0, 2.053388090349076, 1.7144988449691991, 0.9484888347022588], "isController": false}, {"data": ["oes-122", 1, 0, 0.0, 107.0, 107, 107, 107.0, 107.0, 107.0, 9.345794392523365, 7.803373247663552, 4.316953855140187], "isController": false}, {"data": ["oes", 8, 0, 0.0, 1961.375, 194, 5886, 5886.0, 5886.0, 5886.0, 0.058829585398496906, 0.5864071600201491, 0.26055359099466124], "isController": true}, {"data": ["oes-88", 1, 0, 0.0, 81.0, 81, 81, 81.0, 81.0, 81.0, 12.345679012345679, 9.910300925925926, 12.12866512345679], "isController": false}, {"data": ["oes-89", 1, 0, 0.0, 50.0, 50, 50, 50.0, 50.0, 50.0, 20.0, 19.98046875, 9.1015625], "isController": false}, {"data": ["oes-75", 1, 0, 0.0, 53.0, 53, 53, 53.0, 53.0, 53.0, 18.867924528301884, 14.77741745283019, 8.531102594339623], "isController": false}, {"data": ["oes-76", 1, 0, 0.0, 88.0, 88, 88, 88.0, 88.0, 88.0, 11.363636363636363, 8.900035511363637, 5.1491477272727275], "isController": false}, {"data": ["oes-73", 1, 0, 0.0, 49.0, 49, 49, 49.0, 49.0, 49.0, 20.408163265306122, 18.136160714285715, 9.167729591836734], "isController": false}, {"data": ["oes-74", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 17.543859649122805, 13.740405701754385, 7.915296052631579], "isController": false}, {"data": ["oes-72", 1, 0, 0.0, 78.0, 78, 78, 78.0, 78.0, 78.0, 12.82051282051282, 31.650641025641026, 5.746694711538462], "isController": false}, {"data": ["oes-70", 1, 0, 0.0, 86.0, 86, 86, 86.0, 86.0, 86.0, 11.627906976744185, 9.708848110465118, 5.37109375], "isController": false}, {"data": ["oes-142", 1, 0, 0.0, 159.0, 159, 159, 159.0, 159.0, 159.0, 6.289308176100629, 5.23904284591195, 2.8928360849056602], "isController": false}, {"data": ["oes-138", 1, 0, 0.0, 71.0, 71, 71, 71.0, 71.0, 71.0, 14.084507042253522, 10.755941901408452, 6.148217429577465], "isController": false}, {"data": ["oes-136", 1, 0, 0.0, 428.0, 428, 428, 428.0, 428.0, 428.0, 2.336448598130841, 4.921601197429907, 1.0587032710280373], "isController": false}, {"data": ["oes-137", 1, 0, 0.0, 81.0, 81, 81, 81.0, 81.0, 81.0, 12.345679012345679, 15.649112654320987, 5.29272762345679], "isController": false}, {"data": ["oes-134", 1, 0, 0.0, 87.0, 87, 87, 87.0, 87.0, 87.0, 11.494252873563218, 11.516702586206897, 5.129759339080461], "isController": false}, {"data": ["oes-135", 1, 0, 0.0, 370.0, 370, 370, 370.0, 370.0, 370.0, 2.7027027027027026, 2.5390625, 1.1824324324324325], "isController": false}, {"data": ["oes-132", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 16.666666666666668, 25.081380208333336, 7.307942708333334], "isController": false}, {"data": ["oes-133", 1, 0, 0.0, 62.0, 62, 62, 62.0, 62.0, 62.0, 16.129032258064516, 17.452116935483872, 7.087953629032258], "isController": false}, {"data": ["oes-79", 1, 0, 0.0, 46.0, 46, 46, 46.0, 46.0, 46.0, 21.73913043478261, 17.026154891304348, 9.871773097826088], "isController": false}, {"data": ["oes-57-0", 1, 0, 0.0, 3709.0, 3709, 3709, 3709.0, 3709.0, 3709.0, 0.26961445133459155, 0.21353253909409545, 0.1450757448099218], "isController": false}, {"data": ["oes-57-1", 1, 0, 0.0, 58.0, 58, 58, 58.0, 58.0, 58.0, 17.241379310344826, 13.082570043103448, 9.361530172413792], "isController": false}, {"data": ["oes-77", 1, 0, 0.0, 54.0, 54, 54, 54.0, 54.0, 54.0, 18.51851851851852, 14.503761574074074, 8.409288194444445], "isController": false}, {"data": ["oes-57-2", 1, 0, 0.0, 429.0, 429, 429, 429.0, 429.0, 429.0, 2.331002331002331, 16.845134032634032, 1.099486451048951], "isController": false}, {"data": ["oes-78", 1, 0, 0.0, 51.0, 51, 51, 51.0, 51.0, 51.0, 19.607843137254903, 15.356924019607844, 8.884803921568627], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Percentile 1
            case 8:
            // Percentile 2
            case 9:
            // Percentile 3
            case 10:
            // Throughput
            case 11:
            // Kbytes/s
            case 12:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 77, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
