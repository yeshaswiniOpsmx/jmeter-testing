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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7647058823529411, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "oes-64"], "isController": false}, {"data": [1.0, 500, 1500, "oes-65"], "isController": false}, {"data": [0.0, 500, 1500, "oes-62"], "isController": false}, {"data": [0.5, 500, 1500, "oes-63"], "isController": false}, {"data": [1.0, 500, 1500, "oes-60"], "isController": false}, {"data": [0.0, 500, 1500, "oes-61"], "isController": false}, {"data": [0.5, 500, 1500, "oes-152"], "isController": false}, {"data": [1.0, 500, 1500, "oes-153"], "isController": false}, {"data": [1.0, 500, 1500, "oes-150"], "isController": false}, {"data": [1.0, 500, 1500, "oes-151"], "isController": false}, {"data": [1.0, 500, 1500, "oes-105"], "isController": false}, {"data": [0.0, 500, 1500, "oes-106"], "isController": false}, {"data": [1.0, 500, 1500, "oes-147"], "isController": false}, {"data": [1.0, 500, 1500, "oes-148"], "isController": false}, {"data": [1.0, 500, 1500, "oes-146"], "isController": false}, {"data": [1.0, 500, 1500, "oes-143"], "isController": false}, {"data": [1.0, 500, 1500, "oes-144"], "isController": false}, {"data": [1.0, 500, 1500, "oes-109"], "isController": false}, {"data": [1.0, 500, 1500, "oes-66"], "isController": false}, {"data": [1.0, 500, 1500, "oes-107"], "isController": false}, {"data": [1.0, 500, 1500, "oes-108"], "isController": false}, {"data": [1.0, 500, 1500, "oes-93"], "isController": false}, {"data": [1.0, 500, 1500, "oes-94"], "isController": false}, {"data": [0.0, 500, 1500, "oes-91"], "isController": false}, {"data": [1.0, 500, 1500, "oes-92"], "isController": false}, {"data": [1.0, 500, 1500, "oes-90"], "isController": false}, {"data": [1.0, 500, 1500, "oes-120"], "isController": false}, {"data": [1.0, 500, 1500, "oes-116"], "isController": false}, {"data": [1.0, 500, 1500, "oes-117"], "isController": false}, {"data": [1.0, 500, 1500, "oes-114"], "isController": false}, {"data": [1.0, 500, 1500, "oes-115"], "isController": false}, {"data": [0.0, 500, 1500, "oes-112"], "isController": false}, {"data": [1.0, 500, 1500, "oes-113"], "isController": false}, {"data": [1.0, 500, 1500, "oes-110"], "isController": false}, {"data": [0.0, 500, 1500, "oes-154"], "isController": false}, {"data": [1.0, 500, 1500, "oes-111"], "isController": false}, {"data": [1.0, 500, 1500, "oes-155"], "isController": false}, {"data": [1.0, 500, 1500, "oes-59"], "isController": false}, {"data": [0.0, 500, 1500, "oes-57"], "isController": false}, {"data": [1.0, 500, 1500, "oes-118"], "isController": false}, {"data": [0.0, 500, 1500, "oes-119"], "isController": false}, {"data": [1.0, 500, 1500, "oes-86"], "isController": false}, {"data": [1.0, 500, 1500, "oes-87"], "isController": false}, {"data": [1.0, 500, 1500, "oes-84"], "isController": false}, {"data": [1.0, 500, 1500, "oes-85"], "isController": false}, {"data": [1.0, 500, 1500, "oes-82"], "isController": false}, {"data": [1.0, 500, 1500, "oes-83"], "isController": false}, {"data": [1.0, 500, 1500, "oes-80"], "isController": false}, {"data": [1.0, 500, 1500, "oes-81"], "isController": false}, {"data": [1.0, 500, 1500, "oes-130"], "isController": false}, {"data": [1.0, 500, 1500, "oes-131"], "isController": false}, {"data": [1.0, 500, 1500, "oes-123"], "isController": false}, {"data": [1.0, 500, 1500, "oes-124"], "isController": false}, {"data": [1.0, 500, 1500, "oes-121"], "isController": false}, {"data": [1.0, 500, 1500, "oes-122"], "isController": false}, {"data": [0.1875, 500, 1500, "oes"], "isController": true}, {"data": [1.0, 500, 1500, "oes-88"], "isController": false}, {"data": [0.0, 500, 1500, "oes-89"], "isController": false}, {"data": [1.0, 500, 1500, "oes-75"], "isController": false}, {"data": [1.0, 500, 1500, "oes-76"], "isController": false}, {"data": [1.0, 500, 1500, "oes-73"], "isController": false}, {"data": [1.0, 500, 1500, "oes-74"], "isController": false}, {"data": [1.0, 500, 1500, "oes-72"], "isController": false}, {"data": [1.0, 500, 1500, "oes-70"], "isController": false}, {"data": [1.0, 500, 1500, "oes-142"], "isController": false}, {"data": [1.0, 500, 1500, "oes-138"], "isController": false}, {"data": [1.0, 500, 1500, "oes-136"], "isController": false}, {"data": [1.0, 500, 1500, "oes-137"], "isController": false}, {"data": [0.0, 500, 1500, "oes-134"], "isController": false}, {"data": [0.5, 500, 1500, "oes-135"], "isController": false}, {"data": [1.0, 500, 1500, "oes-132"], "isController": false}, {"data": [0.0, 500, 1500, "oes-133"], "isController": false}, {"data": [1.0, 500, 1500, "oes-79"], "isController": false}, {"data": [1.0, 500, 1500, "oes-57-0"], "isController": false}, {"data": [1.0, 500, 1500, "oes-57-1"], "isController": false}, {"data": [1.0, 500, 1500, "oes-77"], "isController": false}, {"data": [0.0, 500, 1500, "oes-57-2"], "isController": false}, {"data": [1.0, 500, 1500, "oes-78"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 77, 12, 15.584415584415584, 171.7272727272727, 0, 1071, 346.00000000000017, 593.1999999999971, 1071.0, 0.4890317171999441, 0.4916552512956165, 0.2164818772466879], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["oes-64", 1, 0, 0.0, 31.0, 31, 31, 31.0, 31.0, 31.0, 32.25806451612903, 67.69783266129032, 13.79788306451613], "isController": false}, {"data": ["oes-65", 1, 0, 0.0, 28.0, 28, 28, 28.0, 28.0, 28.0, 35.714285714285715, 29.541015625, 14.404296875], "isController": false}, {"data": ["oes-62", 1, 1, 100.0, 64.0, 64, 64, 64.0, 64.0, 64.0, 15.625, 16.357421875, 6.5765380859375], "isController": false}, {"data": ["oes-63", 1, 0, 0.0, 1063.0, 1063, 1063, 1063.0, 1063.0, 1063.0, 0.9407337723424272, 0.8764257996237066, 0.38768520696142994], "isController": false}, {"data": ["oes-60", 1, 0, 0.0, 31.0, 31, 31, 31.0, 31.0, 31.0, 32.25806451612903, 48.292590725806456, 13.325352822580646], "isController": false}, {"data": ["oes-61", 1, 1, 100.0, 234.0, 234, 234, 234.0, 234.0, 234.0, 4.273504273504274, 4.452958066239316, 1.769497863247863], "isController": false}, {"data": ["oes-152", 1, 0, 0.0, 1071.0, 1071, 1071, 1071.0, 1071.0, 1071.0, 0.9337068160597572, 0.7659313725490197, 0.4905608076563959], "isController": false}, {"data": ["oes-153", 1, 0, 0.0, 279.0, 279, 279, 279.0, 279.0, 279.0, 3.5842293906810037, 2.691672267025089, 1.5821012544802866], "isController": false}, {"data": ["oes-150", 1, 0, 0.0, 209.0, 209, 209, 209.0, 209.0, 209.0, 4.784688995215311, 3.9483029306220097, 2.079283791866029], "isController": false}, {"data": ["oes-151", 1, 0, 0.0, 35.0, 35, 35, 35.0, 35.0, 35.0, 28.57142857142857, 31.08258928571428, 12.416294642857142], "isController": false}, {"data": ["oes-105", 1, 0, 0.0, 216.0, 216, 216, 216.0, 216.0, 216.0, 4.62962962962963, 3.829390914351852, 2.0209418402777777], "isController": false}, {"data": ["oes-106", 1, 1, 100.0, 398.0, 398, 398, 398.0, 398.0, 398.0, 2.512562814070352, 2.620524497487437, 1.0403580402010049], "isController": false}, {"data": ["oes-147", 1, 0, 0.0, 461.0, 461, 461, 461.0, 461.0, 461.0, 2.1691973969631237, 1.9234680043383947, 1.4044705802603037], "isController": false}, {"data": ["oes-148", 1, 0, 0.0, 36.0, 36, 36, 36.0, 36.0, 36.0, 27.777777777777775, 27.153862847222225, 12.071397569444445], "isController": false}, {"data": ["oes-146", 1, 0, 0.0, 19.0, 19, 19, 19.0, 19.0, 19.0, 52.63157894736842, 44.71628289473684, 26.3671875], "isController": false}, {"data": ["oes-143", 1, 0, 0.0, 23.0, 23, 23, 23.0, 23.0, 23.0, 43.47826086956522, 32.65115489130435, 18.89436141304348], "isController": false}, {"data": ["oes-144", 1, 0, 0.0, 17.0, 17, 17, 17.0, 17.0, 17.0, 58.8235294117647, 52.389705882352935, 26.194852941176467], "isController": false}, {"data": ["oes-109", 1, 0, 0.0, 180.0, 180, 180, 180.0, 180.0, 180.0, 5.555555555555555, 4.595269097222222, 2.4251302083333335], "isController": false}, {"data": ["oes-66", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 100.0, 75.5859375, 41.11328125], "isController": false}, {"data": ["oes-107", 1, 0, 0.0, 266.0, 266, 266, 266.0, 266.0, 266.0, 3.7593984962406015, 3.109580592105263, 1.641065554511278], "isController": false}, {"data": ["oes-108", 1, 0, 0.0, 119.0, 119, 119, 119.0, 119.0, 119.0, 8.403361344537815, 6.950827205882353, 3.668264180672269], "isController": false}, {"data": ["oes-93", 1, 0, 0.0, 144.0, 144, 144, 144.0, 144.0, 144.0, 6.944444444444444, 5.744086371527779, 3.031412760416667], "isController": false}, {"data": ["oes-94", 1, 0, 0.0, 146.0, 146, 146, 146.0, 146.0, 146.0, 6.8493150684931505, 5.665400256849315, 2.9898865582191783], "isController": false}, {"data": ["oes-91", 1, 1, 100.0, 269.0, 269, 269, 269.0, 269.0, 269.0, 3.717472118959108, 3.8772072490706315, 1.5719388940520445], "isController": false}, {"data": ["oes-92", 1, 0, 0.0, 292.0, 292, 292, 292.0, 292.0, 292.0, 3.4246575342465753, 2.8327001284246576, 1.4949432791095891], "isController": false}, {"data": ["oes-90", 1, 0, 0.0, 160.0, 160, 160, 160.0, 160.0, 160.0, 6.25, 5.169677734375, 2.783203125], "isController": false}, {"data": ["oes-120", 1, 0, 0.0, 163.0, 163, 163, 163.0, 163.0, 163.0, 6.134969325153374, 5.074530291411043, 2.678057898773006], "isController": false}, {"data": ["oes-116", 1, 0, 0.0, 232.0, 232, 232, 232.0, 232.0, 232.0, 4.310344827586206, 3.565294989224138, 1.8815665409482758], "isController": false}, {"data": ["oes-117", 1, 0, 0.0, 221.0, 221, 221, 221.0, 221.0, 221.0, 4.524886877828055, 3.7427531108597285, 1.9752191742081449], "isController": false}, {"data": ["oes-114", 1, 0, 0.0, 157.0, 157, 157, 157.0, 157.0, 157.0, 6.369426751592357, 5.268461385350318, 2.780404060509554], "isController": false}, {"data": ["oes-115", 1, 0, 0.0, 333.0, 333, 333, 333.0, 333.0, 333.0, 3.003003003003003, 2.4839292417417416, 1.3108811936936937], "isController": false}, {"data": ["oes-112", 1, 1, 100.0, 33.0, 33, 33, 33.0, 33.0, 33.0, 30.303030303030305, 31.575520833333332, 12.547348484848484], "isController": false}, {"data": ["oes-113", 1, 0, 0.0, 163.0, 163, 163, 163.0, 163.0, 163.0, 6.134969325153374, 5.074530291411043, 2.678057898773006], "isController": false}, {"data": ["oes-110", 1, 0, 0.0, 153.0, 153, 153, 153.0, 153.0, 153.0, 6.5359477124183005, 5.4061989379084965, 2.853094362745098], "isController": false}, {"data": ["oes-154", 1, 1, 100.0, 228.0, 228, 228, 228.0, 228.0, 228.0, 4.385964912280701, 4.574424342105263, 1.8460457785087718], "isController": false}, {"data": ["oes-111", 1, 0, 0.0, 141.0, 141, 141, 141.0, 141.0, 141.0, 7.092198581560283, 5.866300975177306, 3.0959109042553195], "isController": false}, {"data": ["oes-155", 1, 0, 0.0, 171.0, 171, 171, 171.0, 171.0, 171.0, 5.847953216374268, 4.391675804093567, 2.5813230994152043], "isController": false}, {"data": ["oes-59", 1, 0, 0.0, 8.0, 8, 8, 8.0, 8.0, 8.0, 125.0, 119.2626953125, 49.6826171875], "isController": false}, {"data": ["oes-57", 1, 1, 100.0, 543.0, 543, 543, 543.0, 543.0, 543.0, 1.8416206261510129, 8.350238835174954, 1.8721944060773479], "isController": false}, {"data": ["oes-118", 1, 0, 0.0, 331.0, 331, 331, 331.0, 331.0, 331.0, 3.0211480362537766, 2.4989378776435043, 1.318801925981873], "isController": false}, {"data": ["oes-119", 1, 1, 100.0, 95.0, 95, 95, 95.0, 95.0, 95.0, 10.526315789473683, 10.978618421052632, 4.358552631578947], "isController": false}, {"data": ["oes-86", 1, 0, 0.0, 40.0, 40, 40, 40.0, 40.0, 40.0, 25.0, 19.384765625, 10.888671875], "isController": false}, {"data": ["oes-87", 1, 0, 0.0, 21.0, 21, 21, 21.0, 21.0, 21.0, 47.61904761904761, 40.457589285714285, 23.204985119047617], "isController": false}, {"data": ["oes-84", 1, 0, 0.0, 138.0, 138, 138, 138.0, 138.0, 138.0, 7.246376811594203, 5.618772644927536, 3.141983695652174], "isController": false}, {"data": ["oes-85", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 16.666666666666668, 12.923177083333334, 7.242838541666667], "isController": false}, {"data": ["oes-82", 1, 0, 0.0, 38.0, 38, 38, 38.0, 38.0, 38.0, 26.31578947368421, 20.40501644736842, 11.358963815789474], "isController": false}, {"data": ["oes-83", 1, 0, 0.0, 92.0, 92, 92, 92.0, 92.0, 92.0, 10.869565217391305, 8.428158967391305, 4.702360733695652], "isController": false}, {"data": ["oes-80", 1, 0, 0.0, 30.0, 30, 30, 30.0, 30.0, 30.0, 33.333333333333336, 25.846354166666668, 14.322916666666668], "isController": false}, {"data": ["oes-81", 1, 0, 0.0, 32.0, 32, 32, 32.0, 32.0, 32.0, 31.25, 24.23095703125, 13.458251953125], "isController": false}, {"data": ["oes-130", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, Infinity, Infinity, Infinity], "isController": false}, {"data": ["oes-131", 1, 0, 0.0, 16.0, 16, 16, 16.0, 16.0, 16.0, 62.5, 59.63134765625, 24.84130859375], "isController": false}, {"data": ["oes-123", 1, 0, 0.0, 214.0, 214, 214, 214.0, 214.0, 214.0, 4.672897196261682, 3.8651796144859816, 2.0398291471962615], "isController": false}, {"data": ["oes-124", 1, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 500.0, 879.8828125, 178.7109375], "isController": false}, {"data": ["oes-121", 1, 0, 0.0, 172.0, 172, 172, 172.0, 172.0, 172.0, 5.813953488372093, 4.8090025436046515, 2.5379269622093026], "isController": false}, {"data": ["oes-122", 1, 0, 0.0, 149.0, 149, 149, 149.0, 149.0, 149.0, 6.7114093959731544, 5.551331795302014, 2.9296875], "isController": false}, {"data": ["oes", 8, 6, 75.0, 1587.5, 35, 3300, 3300.0, 3300.0, 3300.0, 0.06048006048006048, 0.5509650822150822, 0.2500044296919297], "isController": true}, {"data": ["oes-88", 1, 0, 0.0, 135.0, 135, 135, 135.0, 135.0, 135.0, 7.407407407407407, 5.888310185185185, 7.08912037037037], "isController": false}, {"data": ["oes-89", 1, 1, 100.0, 24.0, 24, 24, 24.0, 24.0, 24.0, 41.666666666666664, 43.619791666666664, 17.903645833333332], "isController": false}, {"data": ["oes-75", 1, 0, 0.0, 29.0, 29, 29, 29.0, 29.0, 29.0, 34.48275862068965, 26.737607758620687, 14.715786637931034], "isController": false}, {"data": ["oes-76", 1, 0, 0.0, 29.0, 29, 29, 29.0, 29.0, 29.0, 34.48275862068965, 26.737607758620687, 14.749461206896552], "isController": false}, {"data": ["oes-73", 1, 0, 0.0, 13.0, 13, 13, 13.0, 13.0, 13.0, 76.92307692307693, 58.518629807692314, 32.60216346153846], "isController": false}, {"data": ["oes-74", 1, 0, 0.0, 106.0, 106, 106, 106.0, 106.0, 106.0, 9.433962264150942, 7.315005896226415, 4.016804245283019], "isController": false}, {"data": ["oes-72", 1, 0, 0.0, 295.0, 295, 295, 295.0, 295.0, 295.0, 3.389830508474576, 8.342161016949152, 1.4333951271186443], "isController": false}, {"data": ["oes-70", 1, 0, 0.0, 297.0, 297, 297, 297.0, 297.0, 297.0, 3.3670033670033668, 2.7850115740740744, 1.4697758838383839], "isController": false}, {"data": ["oes-142", 1, 0, 0.0, 166.0, 166, 166, 166.0, 166.0, 166.0, 6.024096385542169, 4.9710560993975905, 2.6178934487951806], "isController": false}, {"data": ["oes-138", 1, 0, 0.0, 23.0, 23, 23, 23.0, 23.0, 23.0, 43.47826086956522, 32.86345108695652, 17.875339673913043], "isController": false}, {"data": ["oes-136", 1, 0, 0.0, 39.0, 39, 39, 39.0, 39.0, 39.0, 25.64102564102564, 53.811097756410255, 10.967548076923077], "isController": false}, {"data": ["oes-137", 1, 0, 0.0, 174.0, 174, 174, 174.0, 174.0, 174.0, 5.747126436781609, 4.753726652298851, 2.31793283045977], "isController": false}, {"data": ["oes-134", 1, 1, 100.0, 313.0, 313, 313, 313.0, 313.0, 313.0, 3.1948881789137378, 3.3415285543130993, 1.3447234424920127], "isController": false}, {"data": ["oes-135", 1, 0, 0.0, 1045.0, 1045, 1045, 1045.0, 1045.0, 1045.0, 0.9569377990430622, 0.8915221291866029, 0.394363038277512], "isController": false}, {"data": ["oes-132", 1, 0, 0.0, 86.0, 86, 86, 86.0, 86.0, 86.0, 11.627906976744185, 17.40779433139535, 4.803324854651163], "isController": false}, {"data": ["oes-133", 1, 1, 100.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 16.666666666666668, 17.366536458333336, 6.901041666666667], "isController": false}, {"data": ["oes-79", 1, 0, 0.0, 20.0, 20, 20, 20.0, 20.0, 20.0, 50.0, 38.76953125, 21.435546875], "isController": false}, {"data": ["oes-57-0", 1, 0, 0.0, 497.0, 497, 497, 497.0, 497.0, 497.0, 2.012072434607646, 1.5090543259557345, 1.0119309607645874], "isController": false}, {"data": ["oes-57-1", 1, 0, 0.0, 21.0, 21, 21, 21.0, 21.0, 21.0, 47.61904761904761, 34.31919642857142, 24.460565476190474], "isController": false}, {"data": ["oes-77", 1, 0, 0.0, 31.0, 31, 31, 31.0, 31.0, 31.0, 32.25806451612903, 25.012600806451612, 13.829385080645162], "isController": false}, {"data": ["oes-57-2", 1, 1, 100.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 200.0, 612.6953125, 0.0], "isController": false}, {"data": ["oes-78", 1, 0, 0.0, 38.0, 38, 38, 38.0, 38.0, 38.0, 26.31578947368421, 20.40501644736842, 11.256167763157896], "isController": false}]}, function(index, item){
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
