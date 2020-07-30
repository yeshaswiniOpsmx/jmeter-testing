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

    var data = {"OkPercent": 84.41558441558442, "KoPercent": 15.584415584415584};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7705882352941177, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "oes-64"], "isController": false}, {"data": [1.0, 500, 1500, "oes-65"], "isController": false}, {"data": [0.0, 500, 1500, "oes-62"], "isController": false}, {"data": [0.5, 500, 1500, "oes-63"], "isController": false}, {"data": [1.0, 500, 1500, "oes-60"], "isController": false}, {"data": [0.0, 500, 1500, "oes-61"], "isController": false}, {"data": [0.5, 500, 1500, "oes-152"], "isController": false}, {"data": [1.0, 500, 1500, "oes-153"], "isController": false}, {"data": [1.0, 500, 1500, "oes-150"], "isController": false}, {"data": [1.0, 500, 1500, "oes-151"], "isController": false}, {"data": [1.0, 500, 1500, "oes-105"], "isController": false}, {"data": [0.0, 500, 1500, "oes-106"], "isController": false}, {"data": [1.0, 500, 1500, "oes-147"], "isController": false}, {"data": [1.0, 500, 1500, "oes-148"], "isController": false}, {"data": [1.0, 500, 1500, "oes-146"], "isController": false}, {"data": [1.0, 500, 1500, "oes-143"], "isController": false}, {"data": [1.0, 500, 1500, "oes-144"], "isController": false}, {"data": [1.0, 500, 1500, "oes-109"], "isController": false}, {"data": [1.0, 500, 1500, "oes-66"], "isController": false}, {"data": [1.0, 500, 1500, "oes-107"], "isController": false}, {"data": [1.0, 500, 1500, "oes-108"], "isController": false}, {"data": [1.0, 500, 1500, "oes-93"], "isController": false}, {"data": [1.0, 500, 1500, "oes-94"], "isController": false}, {"data": [0.0, 500, 1500, "oes-91"], "isController": false}, {"data": [1.0, 500, 1500, "oes-92"], "isController": false}, {"data": [1.0, 500, 1500, "oes-90"], "isController": false}, {"data": [1.0, 500, 1500, "oes-120"], "isController": false}, {"data": [1.0, 500, 1500, "oes-116"], "isController": false}, {"data": [1.0, 500, 1500, "oes-117"], "isController": false}, {"data": [1.0, 500, 1500, "oes-114"], "isController": false}, {"data": [1.0, 500, 1500, "oes-115"], "isController": false}, {"data": [0.0, 500, 1500, "oes-112"], "isController": false}, {"data": [1.0, 500, 1500, "oes-113"], "isController": false}, {"data": [1.0, 500, 1500, "oes-110"], "isController": false}, {"data": [0.0, 500, 1500, "oes-154"], "isController": false}, {"data": [1.0, 500, 1500, "oes-111"], "isController": false}, {"data": [1.0, 500, 1500, "oes-155"], "isController": false}, {"data": [1.0, 500, 1500, "oes-59"], "isController": false}, {"data": [0.0, 500, 1500, "oes-57"], "isController": false}, {"data": [1.0, 500, 1500, "oes-118"], "isController": false}, {"data": [0.0, 500, 1500, "oes-119"], "isController": false}, {"data": [1.0, 500, 1500, "oes-86"], "isController": false}, {"data": [1.0, 500, 1500, "oes-87"], "isController": false}, {"data": [1.0, 500, 1500, "oes-84"], "isController": false}, {"data": [1.0, 500, 1500, "oes-85"], "isController": false}, {"data": [1.0, 500, 1500, "oes-82"], "isController": false}, {"data": [1.0, 500, 1500, "oes-83"], "isController": false}, {"data": [1.0, 500, 1500, "oes-80"], "isController": false}, {"data": [1.0, 500, 1500, "oes-81"], "isController": false}, {"data": [1.0, 500, 1500, "oes-130"], "isController": false}, {"data": [1.0, 500, 1500, "oes-131"], "isController": false}, {"data": [1.0, 500, 1500, "oes-123"], "isController": false}, {"data": [1.0, 500, 1500, "oes-124"], "isController": false}, {"data": [1.0, 500, 1500, "oes-121"], "isController": false}, {"data": [1.0, 500, 1500, "oes-122"], "isController": false}, {"data": [0.25, 500, 1500, "oes"], "isController": true}, {"data": [1.0, 500, 1500, "oes-88"], "isController": false}, {"data": [0.0, 500, 1500, "oes-89"], "isController": false}, {"data": [1.0, 500, 1500, "oes-75"], "isController": false}, {"data": [1.0, 500, 1500, "oes-76"], "isController": false}, {"data": [1.0, 500, 1500, "oes-73"], "isController": false}, {"data": [1.0, 500, 1500, "oes-74"], "isController": false}, {"data": [1.0, 500, 1500, "oes-72"], "isController": false}, {"data": [1.0, 500, 1500, "oes-70"], "isController": false}, {"data": [1.0, 500, 1500, "oes-142"], "isController": false}, {"data": [1.0, 500, 1500, "oes-138"], "isController": false}, {"data": [1.0, 500, 1500, "oes-136"], "isController": false}, {"data": [1.0, 500, 1500, "oes-137"], "isController": false}, {"data": [0.0, 500, 1500, "oes-134"], "isController": false}, {"data": [0.5, 500, 1500, "oes-135"], "isController": false}, {"data": [1.0, 500, 1500, "oes-132"], "isController": false}, {"data": [0.0, 500, 1500, "oes-133"], "isController": false}, {"data": [1.0, 500, 1500, "oes-79"], "isController": false}, {"data": [1.0, 500, 1500, "oes-57-0"], "isController": false}, {"data": [1.0, 500, 1500, "oes-57-1"], "isController": false}, {"data": [1.0, 500, 1500, "oes-77"], "isController": false}, {"data": [0.0, 500, 1500, "oes-57-2"], "isController": false}, {"data": [1.0, 500, 1500, "oes-78"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 77, 12, 15.584415584415584, 160.53246753246748, 1, 1293, 287.00000000000006, 580.7999999999986, 1293.0, 0.4915981408652127, 0.4942416779457582, 0.21761796759282903], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["oes-64", 1, 0, 0.0, 19.0, 19, 19, 19.0, 19.0, 19.0, 52.63157894736842, 110.45435855263158, 22.51233552631579], "isController": false}, {"data": ["oes-65", 1, 0, 0.0, 19.0, 19, 19, 19.0, 19.0, 19.0, 52.63157894736842, 43.534128289473685, 21.227384868421055], "isController": false}, {"data": ["oes-62", 1, 1, 100.0, 58.0, 58, 58, 58.0, 58.0, 58.0, 17.241379310344826, 18.049568965517242, 7.256869612068965], "isController": false}, {"data": ["oes-63", 1, 0, 0.0, 813.0, 813, 813, 813.0, 813.0, 813.0, 1.2300123001230012, 1.1459294280442804, 0.5068996002460024], "isController": false}, {"data": ["oes-60", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 17.543859649122805, 26.26439144736842, 7.247121710526316], "isController": false}, {"data": ["oes-61", 1, 1, 100.0, 248.0, 248, 248, 248.0, 248.0, 248.0, 4.032258064516129, 4.201581401209677, 1.6696068548387097], "isController": false}, {"data": ["oes-152", 1, 0, 0.0, 853.0, 853, 853, 853.0, 853.0, 853.0, 1.1723329425556857, 0.9616793669402111, 0.6159327373974208], "isController": false}, {"data": ["oes-153", 1, 0, 0.0, 205.0, 205, 205, 205.0, 205.0, 205.0, 4.878048780487805, 3.663300304878049, 2.1532012195121952], "isController": false}, {"data": ["oes-150", 1, 0, 0.0, 138.0, 138, 138, 138.0, 138.0, 138.0, 7.246376811594203, 6.666100543478261, 3.149060235507246], "isController": false}, {"data": ["oes-151", 1, 0, 0.0, 126.0, 126, 126, 126.0, 126.0, 126.0, 7.936507936507936, 7.804749503968254, 3.448970734126984], "isController": false}, {"data": ["oes-105", 1, 0, 0.0, 213.0, 213, 213, 213.0, 213.0, 213.0, 4.694835680751174, 3.8833259976525825, 2.049405809859155], "isController": false}, {"data": ["oes-106", 1, 1, 100.0, 210.0, 210, 210, 210.0, 210.0, 210.0, 4.761904761904763, 4.961867559523809, 1.9717261904761905], "isController": false}, {"data": ["oes-147", 1, 0, 0.0, 269.0, 269, 269, 269.0, 269.0, 269.0, 3.717472118959108, 3.321764637546468, 2.4069179832713754], "isController": false}, {"data": ["oes-148", 1, 0, 0.0, 45.0, 45, 45, 45.0, 45.0, 45.0, 22.22222222222222, 21.85329861111111, 9.657118055555555], "isController": false}, {"data": ["oes-146", 1, 0, 0.0, 12.0, 12, 12, 12.0, 12.0, 12.0, 83.33333333333333, 70.80078125, 41.748046875], "isController": false}, {"data": ["oes-143", 1, 0, 0.0, 18.0, 18, 18, 18.0, 18.0, 18.0, 55.55555555555555, 41.72092013888889, 24.14279513888889], "isController": false}, {"data": ["oes-144", 1, 0, 0.0, 38.0, 38, 38, 38.0, 38.0, 38.0, 26.31578947368421, 23.4375, 11.71875], "isController": false}, {"data": ["oes-109", 1, 0, 0.0, 126.0, 126, 126, 126.0, 126.0, 126.0, 7.936507936507936, 6.564670138888889, 3.4644717261904763], "isController": false}, {"data": ["oes-66", 1, 0, 0.0, 19.0, 19, 19, 19.0, 19.0, 19.0, 52.63157894736842, 39.782072368421055, 21.63856907894737], "isController": false}, {"data": ["oes-107", 1, 0, 0.0, 127.0, 127, 127, 127.0, 127.0, 127.0, 7.874015748031496, 6.512979822834645, 3.4371924212598426], "isController": false}, {"data": ["oes-108", 1, 0, 0.0, 147.0, 147, 147, 147.0, 147.0, 147.0, 6.802721088435374, 5.6268601190476195, 2.9695471938775513], "isController": false}, {"data": ["oes-93", 1, 0, 0.0, 163.0, 163, 163, 163.0, 163.0, 163.0, 6.134969325153374, 5.074530291411043, 2.678057898773006], "isController": false}, {"data": ["oes-94", 1, 0, 0.0, 122.0, 122, 122, 122.0, 122.0, 122.0, 8.196721311475411, 6.779905225409836, 3.578060963114754], "isController": false}, {"data": ["oes-91", 1, 1, 100.0, 220.0, 220, 220, 220.0, 220.0, 220.0, 4.545454545454545, 4.736328125, 1.9220525568181819], "isController": false}, {"data": ["oes-92", 1, 0, 0.0, 185.0, 185, 185, 185.0, 185.0, 185.0, 5.405405405405405, 4.471072635135135, 2.3595861486486487], "isController": false}, {"data": ["oes-90", 1, 0, 0.0, 152.0, 152, 152, 152.0, 152.0, 152.0, 6.578947368421052, 5.441766036184211, 2.9296875], "isController": false}, {"data": ["oes-120", 1, 0, 0.0, 155.0, 155, 155, 155.0, 155.0, 155.0, 6.451612903225806, 5.336441532258065, 2.816280241935484], "isController": false}, {"data": ["oes-116", 1, 0, 0.0, 155.0, 155, 155, 155.0, 155.0, 155.0, 6.451612903225806, 5.336441532258065, 2.816280241935484], "isController": false}, {"data": ["oes-117", 1, 0, 0.0, 182.0, 182, 182, 182.0, 182.0, 182.0, 5.4945054945054945, 4.544771634615385, 2.398480425824176], "isController": false}, {"data": ["oes-114", 1, 0, 0.0, 155.0, 155, 155, 155.0, 155.0, 155.0, 6.451612903225806, 5.336441532258065, 2.816280241935484], "isController": false}, {"data": ["oes-115", 1, 0, 0.0, 262.0, 262, 262, 262.0, 262.0, 262.0, 3.8167938931297707, 3.157055104961832, 1.6661199904580153], "isController": false}, {"data": ["oes-112", 1, 1, 100.0, 47.0, 47, 47, 47.0, 47.0, 47.0, 21.27659574468085, 22.17004654255319, 8.809840425531915], "isController": false}, {"data": ["oes-113", 1, 0, 0.0, 120.0, 120, 120, 120.0, 120.0, 120.0, 8.333333333333334, 6.892903645833334, 3.6376953125], "isController": false}, {"data": ["oes-110", 1, 0, 0.0, 170.0, 170, 170, 170.0, 170.0, 170.0, 5.88235294117647, 4.865579044117647, 2.567784926470588], "isController": false}, {"data": ["oes-154", 1, 1, 100.0, 228.0, 228, 228, 228.0, 228.0, 228.0, 4.385964912280701, 4.570141173245614, 1.8460457785087718], "isController": false}, {"data": ["oes-111", 1, 0, 0.0, 178.0, 178, 178, 178.0, 178.0, 178.0, 5.617977528089887, 4.646901334269663, 2.452378862359551], "isController": false}, {"data": ["oes-155", 1, 0, 0.0, 140.0, 140, 140, 140.0, 140.0, 140.0, 7.142857142857142, 5.364118303571428, 3.1529017857142856], "isController": false}, {"data": ["oes-59", 1, 0, 0.0, 8.0, 8, 8, 8.0, 8.0, 8.0, 125.0, 119.2626953125, 49.6826171875], "isController": false}, {"data": ["oes-57", 1, 1, 100.0, 555.0, 555, 555, 555.0, 555.0, 555.0, 1.8018018018018018, 8.16969313063063, 1.831714527027027], "isController": false}, {"data": ["oes-118", 1, 0, 0.0, 149.0, 149, 149, 149.0, 149.0, 149.0, 6.7114093959731544, 5.551331795302014, 2.9296875], "isController": false}, {"data": ["oes-119", 1, 1, 100.0, 210.0, 210, 210, 210.0, 210.0, 210.0, 4.761904761904763, 4.961867559523809, 1.9717261904761905], "isController": false}, {"data": ["oes-86", 1, 0, 0.0, 21.0, 21, 21, 21.0, 21.0, 21.0, 47.61904761904761, 36.923363095238095, 20.74032738095238], "isController": false}, {"data": ["oes-87", 1, 0, 0.0, 16.0, 16, 16, 16.0, 16.0, 16.0, 62.5, 53.1005859375, 30.45654296875], "isController": false}, {"data": ["oes-84", 1, 0, 0.0, 28.0, 28, 28, 28.0, 28.0, 28.0, 35.714285714285715, 27.69252232142857, 15.485491071428571], "isController": false}, {"data": ["oes-85", 1, 0, 0.0, 19.0, 19, 19, 19.0, 19.0, 19.0, 52.63157894736842, 40.81003289473684, 22.872121710526315], "isController": false}, {"data": ["oes-82", 1, 0, 0.0, 65.0, 65, 65, 65.0, 65.0, 65.0, 15.384615384615385, 11.929086538461538, 6.640625], "isController": false}, {"data": ["oes-83", 1, 0, 0.0, 67.0, 67, 67, 67.0, 67.0, 67.0, 14.925373134328359, 11.572994402985074, 6.4569729477611935], "isController": false}, {"data": ["oes-80", 1, 0, 0.0, 29.0, 29, 29, 29.0, 29.0, 29.0, 34.48275862068965, 26.737607758620687, 14.816810344827585], "isController": false}, {"data": ["oes-81", 1, 0, 0.0, 69.0, 69, 69, 69.0, 69.0, 69.0, 14.492753623188406, 11.237545289855072, 6.241508152173912], "isController": false}, {"data": ["oes-130", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1000.0, 286.1328125, 344.7265625], "isController": false}, {"data": ["oes-131", 1, 0, 0.0, 26.0, 26, 26, 26.0, 26.0, 26.0, 38.46153846153847, 36.69621394230769, 15.286959134615385], "isController": false}, {"data": ["oes-123", 1, 0, 0.0, 218.0, 218, 218, 218.0, 218.0, 218.0, 4.587155963302752, 3.7942588876146788, 2.0024010894495414], "isController": false}, {"data": ["oes-124", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 333.3333333333333, 586.5885416666666, 119.140625], "isController": false}, {"data": ["oes-121", 1, 0, 0.0, 167.0, 167, 167, 167.0, 167.0, 167.0, 5.9880239520958085, 4.952984655688622, 2.6139127994011973], "isController": false}, {"data": ["oes-122", 1, 0, 0.0, 184.0, 184, 184, 184.0, 184.0, 184.0, 5.434782608695652, 4.495371942934782, 2.3724099864130435], "isController": false}, {"data": ["oes", 8, 6, 75.0, 1480.75, 126, 3600, 3600.0, 3600.0, 3600.0, 0.06084159131182076, 0.5542660056164394, 0.25149887775783525], "isController": true}, {"data": ["oes-88", 1, 0, 0.0, 75.0, 75, 75, 75.0, 75.0, 75.0, 13.333333333333334, 10.598958333333334, 12.760416666666668], "isController": false}, {"data": ["oes-89", 1, 1, 100.0, 15.0, 15, 15, 15.0, 15.0, 15.0, 66.66666666666667, 69.79166666666667, 28.645833333333336], "isController": false}, {"data": ["oes-75", 1, 0, 0.0, 179.0, 179, 179, 179.0, 179.0, 179.0, 5.58659217877095, 4.331791201117318, 2.3841218575418996], "isController": false}, {"data": ["oes-76", 1, 0, 0.0, 128.0, 128, 128, 128.0, 128.0, 128.0, 7.8125, 6.0577392578125, 3.3416748046875], "isController": false}, {"data": ["oes-73", 1, 0, 0.0, 84.0, 84, 84, 84.0, 84.0, 84.0, 11.904761904761903, 9.056454613095237, 5.045572916666666], "isController": false}, {"data": ["oes-74", 1, 0, 0.0, 204.0, 204, 204, 204.0, 204.0, 204.0, 4.901960784313726, 3.80093443627451, 2.0871629901960786], "isController": false}, {"data": ["oes-72", 1, 0, 0.0, 307.0, 307, 307, 307.0, 307.0, 307.0, 3.257328990228013, 8.016083061889251, 1.3773666530944626], "isController": false}, {"data": ["oes-70", 1, 0, 0.0, 406.0, 406, 406, 406.0, 406.0, 406.0, 2.4630541871921183, 2.037311422413793, 1.0751808805418719], "isController": false}, {"data": ["oes-142", 1, 0, 0.0, 129.0, 129, 129, 129.0, 129.0, 129.0, 7.751937984496124, 6.396862887596899, 3.368762112403101], "isController": false}, {"data": ["oes-138", 1, 0, 0.0, 101.0, 101, 101, 101.0, 101.0, 101.0, 9.900990099009901, 7.483756188118812, 4.070621905940594], "isController": false}, {"data": ["oes-136", 1, 0, 0.0, 75.0, 75, 75, 75.0, 75.0, 75.0, 13.333333333333334, 27.981770833333336, 5.703125], "isController": false}, {"data": ["oes-137", 1, 0, 0.0, 53.0, 53, 53, 53.0, 53.0, 53.0, 18.867924528301884, 15.60657429245283, 7.609817216981132], "isController": false}, {"data": ["oes-134", 1, 1, 100.0, 282.0, 282, 282, 282.0, 282.0, 282.0, 3.5460992907801416, 3.7123226950354615, 1.49254765070922], "isController": false}, {"data": ["oes-135", 1, 0, 0.0, 1293.0, 1293, 1293, 1293.0, 1293.0, 1293.0, 0.7733952049497294, 0.7205263921113689, 0.3187234145398299], "isController": false}, {"data": ["oes-132", 1, 0, 0.0, 35.0, 35, 35, 35.0, 35.0, 35.0, 28.57142857142857, 42.77343749999999, 11.802455357142856], "isController": false}, {"data": ["oes-133", 1, 1, 100.0, 53.0, 53, 53, 53.0, 53.0, 53.0, 18.867924528301884, 19.67865566037736, 7.8125], "isController": false}, {"data": ["oes-79", 1, 0, 0.0, 76.0, 76, 76, 76.0, 76.0, 76.0, 13.157894736842104, 10.20250822368421, 5.640933388157895], "isController": false}, {"data": ["oes-57-0", 1, 0, 0.0, 432.0, 432, 432, 432.0, 432.0, 432.0, 2.314814814814815, 1.7361111111111112, 1.1641890914351851], "isController": false}, {"data": ["oes-57-1", 1, 0, 0.0, 82.0, 82, 82, 82.0, 82.0, 82.0, 12.195121951219512, 8.7890625, 6.264291158536585], "isController": false}, {"data": ["oes-77", 1, 0, 0.0, 50.0, 50, 50, 50.0, 50.0, 50.0, 20.0, 15.5078125, 8.57421875], "isController": false}, {"data": ["oes-57-2", 1, 1, 100.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1000.0, 3063.4765625, 0.0], "isController": false}, {"data": ["oes-78", 1, 0, 0.0, 72.0, 72, 72, 72.0, 72.0, 72.0, 13.888888888888888, 10.769314236111112, 5.940755208333334], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["404", 10, 83.33333333333333, 12.987012987012987], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException\/Non HTTP response message: Connect to localhost:9000 [localhost\\\/127.0.0.1] failed: Connection refused (Connection refused)", 2, 16.666666666666668, 2.5974025974025974], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 77, 12, "404", 10, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException\/Non HTTP response message: Connect to localhost:9000 [localhost\\\/127.0.0.1] failed: Connection refused (Connection refused)", 2, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["oes-62", 1, 1, "404", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["oes-61", 1, 1, "404", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["oes-106", 1, 1, "404", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["oes-91", 1, 1, "404", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["oes-112", 1, 1, "404", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["oes-154", 1, 1, "404", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["oes-57", 1, 1, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException\/Non HTTP response message: Connect to localhost:9000 [localhost\\\/127.0.0.1] failed: Connection refused (Connection refused)", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["oes-119", 1, 1, "404", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["oes-89", 1, 1, "404", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["oes-134", 1, 1, "404", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["oes-133", 1, 1, "404", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["oes-57-2", 1, 1, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException\/Non HTTP response message: Connect to localhost:9000 [localhost\\\/127.0.0.1] failed: Connection refused (Connection refused)", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
