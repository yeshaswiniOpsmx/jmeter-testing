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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 77, 12, 15.584415584415584, 143.42857142857142, 1, 982, 310.6, 513.9999999999975, 982.0, 0.496233139351288, 0.5005819763451462, 0.21966976329034793], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["oes-64", 1, 0, 0.0, 31.0, 31, 31, 31.0, 31.0, 31.0, 32.25806451612903, 67.69783266129032, 13.79788306451613], "isController": false}, {"data": ["oes-65", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 16.949152542372882, 14.019465042372882, 6.8359375], "isController": false}, {"data": ["oes-62", 1, 1, 100.0, 29.0, 29, 29, 29.0, 29.0, 29.0, 34.48275862068965, 36.06546336206896, 14.51373922413793], "isController": false}, {"data": ["oes-63", 1, 0, 0.0, 901.0, 901, 901, 901.0, 901.0, 901.0, 1.1098779134295227, 1.0340073529411764, 0.4573910932297447], "isController": false}, {"data": ["oes-60", 1, 0, 0.0, 55.0, 55, 55, 55.0, 55.0, 55.0, 18.18181818181818, 27.219460227272727, 7.510653409090909], "isController": false}, {"data": ["oes-61", 1, 1, 100.0, 242.0, 242, 242, 242.0, 242.0, 242.0, 4.132231404958678, 4.309788223140496, 1.7110020661157026], "isController": false}, {"data": ["oes-152", 1, 0, 0.0, 972.0, 972, 972, 972.0, 972.0, 972.0, 1.02880658436214, 0.8439429012345679, 0.5405253343621399], "isController": false}, {"data": ["oes-153", 1, 0, 0.0, 212.0, 212, 212, 212.0, 212.0, 212.0, 4.716981132075471, 3.5423422759433962, 2.0821049528301887], "isController": false}, {"data": ["oes-150", 1, 0, 0.0, 266.0, 266, 266, 266.0, 266.0, 266.0, 3.7593984962406015, 3.102238016917293, 1.6337229793233081], "isController": false}, {"data": ["oes-151", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 16.666666666666668, 18.131510416666668, 7.242838541666667], "isController": false}, {"data": ["oes-105", 1, 0, 0.0, 313.0, 313, 313, 313.0, 313.0, 313.0, 3.1948881789137378, 2.642646765175719, 1.39464357028754], "isController": false}, {"data": ["oes-106", 1, 1, 100.0, 471.0, 471, 471, 471.0, 471.0, 471.0, 2.1231422505307855, 2.21437101910828, 0.8791135881104034], "isController": false}, {"data": ["oes-147", 1, 0, 0.0, 185.0, 185, 185, 185.0, 185.0, 185.0, 5.405405405405405, 4.79835304054054, 3.4997888513513513], "isController": false}, {"data": ["oes-148", 1, 0, 0.0, 167.0, 167, 167, 167.0, 167.0, 167.0, 5.9880239520958085, 6.514315119760479, 2.60221744011976], "isController": false}, {"data": ["oes-146", 1, 0, 0.0, 141.0, 141, 141, 141.0, 141.0, 141.0, 7.092198581560283, 6.0255984042553195, 3.553025265957447], "isController": false}, {"data": ["oes-143", 1, 0, 0.0, 15.0, 15, 15, 15.0, 15.0, 15.0, 66.66666666666667, 65.16927083333334, 28.971354166666668], "isController": false}, {"data": ["oes-144", 1, 0, 0.0, 34.0, 34, 34, 34.0, 34.0, 34.0, 29.41176470588235, 26.194852941176467, 13.097426470588234], "isController": false}, {"data": ["oes-109", 1, 0, 0.0, 129.0, 129, 129, 129.0, 129.0, 129.0, 7.751937984496124, 6.412003391472868, 3.3839026162790695], "isController": false}, {"data": ["oes-66", 1, 0, 0.0, 25.0, 25, 25, 25.0, 25.0, 25.0, 40.0, 30.234375, 16.4453125], "isController": false}, {"data": ["oes-107", 1, 0, 0.0, 202.0, 202, 202, 202.0, 202.0, 202.0, 4.9504950495049505, 4.0947942450495045, 2.1610071163366333], "isController": false}, {"data": ["oes-108", 1, 0, 0.0, 125.0, 125, 125, 125.0, 125.0, 125.0, 8.0, 6.6171875, 3.4921875], "isController": false}, {"data": ["oes-93", 1, 0, 0.0, 111.0, 111, 111, 111.0, 111.0, 111.0, 9.00900900900901, 7.451787725225225, 3.932643581081081], "isController": false}, {"data": ["oes-94", 1, 0, 0.0, 162.0, 162, 162, 162.0, 162.0, 162.0, 6.172839506172839, 5.105854552469135, 2.6945891203703702], "isController": false}, {"data": ["oes-91", 1, 1, 100.0, 64.0, 64, 64, 64.0, 64.0, 64.0, 15.625, 16.2811279296875, 6.6070556640625], "isController": false}, {"data": ["oes-92", 1, 0, 0.0, 204.0, 204, 204, 204.0, 204.0, 204.0, 4.901960784313726, 4.054649203431373, 2.139820772058824], "isController": false}, {"data": ["oes-90", 1, 0, 0.0, 159.0, 159, 159, 159.0, 159.0, 159.0, 6.289308176100629, 5.20219143081761, 2.8007075471698113], "isController": false}, {"data": ["oes-120", 1, 0, 0.0, 118.0, 118, 118, 118.0, 118.0, 118.0, 8.474576271186441, 7.009732521186441, 3.6993511652542375], "isController": false}, {"data": ["oes-116", 1, 0, 0.0, 115.0, 115, 115, 115.0, 115.0, 115.0, 8.695652173913043, 7.192595108695651, 3.795855978260869], "isController": false}, {"data": ["oes-117", 1, 0, 0.0, 117.0, 117, 117, 117.0, 117.0, 117.0, 8.547008547008549, 7.069644764957265, 3.730969551282051], "isController": false}, {"data": ["oes-114", 1, 0, 0.0, 152.0, 152, 152, 152.0, 152.0, 152.0, 6.578947368421052, 5.441766036184211, 2.8718647203947367], "isController": false}, {"data": ["oes-115", 1, 0, 0.0, 239.0, 239, 239, 239.0, 239.0, 239.0, 4.184100418410042, 3.4608721234309625, 1.8264578974895398], "isController": false}, {"data": ["oes-112", 1, 1, 100.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 17.543859649122805, 18.280564692982455, 7.264254385964912], "isController": false}, {"data": ["oes-113", 1, 0, 0.0, 165.0, 165, 165, 165.0, 165.0, 165.0, 6.0606060606060606, 5.013020833333333, 2.645596590909091], "isController": false}, {"data": ["oes-110", 1, 0, 0.0, 148.0, 148, 148, 148.0, 148.0, 148.0, 6.756756756756757, 5.588840793918919, 2.949482685810811], "isController": false}, {"data": ["oes-154", 1, 1, 100.0, 310.0, 310, 310, 310.0, 310.0, 310.0, 3.225806451612903, 3.3675655241935485, 1.3577368951612903], "isController": false}, {"data": ["oes-111", 1, 0, 0.0, 176.0, 176, 176, 176.0, 176.0, 176.0, 5.681818181818182, 4.69970703125, 2.480246803977273], "isController": false}, {"data": ["oes-155", 1, 0, 0.0, 173.0, 173, 173, 173.0, 173.0, 173.0, 5.780346820809248, 4.340904985549133, 2.5514812138728327], "isController": false}, {"data": ["oes-59", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 100.0, 95.41015625, 39.74609375], "isController": false}, {"data": ["oes-57", 1, 1, 100.0, 401.0, 401, 401, 401.0, 401.0, 401.0, 2.493765586034913, 11.307181265586035, 2.5351659912718203], "isController": false}, {"data": ["oes-118", 1, 0, 0.0, 128.0, 128, 128, 128.0, 128.0, 128.0, 7.8125, 6.46209716796875, 3.41033935546875], "isController": false}, {"data": ["oes-119", 1, 1, 100.0, 240.0, 240, 240, 240.0, 240.0, 240.0, 4.166666666666667, 4.337565104166667, 1.7252604166666667], "isController": false}, {"data": ["oes-86", 1, 0, 0.0, 16.0, 16, 16, 16.0, 16.0, 16.0, 62.5, 48.4619140625, 27.2216796875], "isController": false}, {"data": ["oes-87", 1, 0, 0.0, 19.0, 19, 19, 19.0, 19.0, 19.0, 52.63157894736842, 44.71628289473684, 25.64761513157895], "isController": false}, {"data": ["oes-84", 1, 0, 0.0, 13.0, 13, 13, 13.0, 13.0, 13.0, 76.92307692307693, 59.64543269230769, 33.35336538461539], "isController": false}, {"data": ["oes-85", 1, 0, 0.0, 20.0, 20, 20, 20.0, 20.0, 20.0, 50.0, 38.76953125, 21.728515625], "isController": false}, {"data": ["oes-82", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 100.0, 77.5390625, 43.1640625], "isController": false}, {"data": ["oes-83", 1, 0, 0.0, 40.0, 40, 40, 40.0, 40.0, 40.0, 25.0, 19.384765625, 10.8154296875], "isController": false}, {"data": ["oes-80", 1, 0, 0.0, 15.0, 15, 15, 15.0, 15.0, 15.0, 66.66666666666667, 51.692708333333336, 28.645833333333336], "isController": false}, {"data": ["oes-81", 1, 0, 0.0, 16.0, 16, 16, 16.0, 16.0, 16.0, 62.5, 48.4619140625, 26.91650390625], "isController": false}, {"data": ["oes-130", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1000.0, 286.1328125, 344.7265625], "isController": false}, {"data": ["oes-131", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 166.66666666666666, 159.01692708333334, 66.24348958333333], "isController": false}, {"data": ["oes-123", 1, 0, 0.0, 140.0, 140, 140, 140.0, 140.0, 140.0, 7.142857142857142, 5.908203124999999, 3.1180245535714284], "isController": false}, {"data": ["oes-124", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 100.0, 175.9765625, 35.7421875], "isController": false}, {"data": ["oes-121", 1, 0, 0.0, 113.0, 113, 113, 113.0, 113.0, 113.0, 8.849557522123893, 7.31989767699115, 3.8630392699115044], "isController": false}, {"data": ["oes-122", 1, 0, 0.0, 115.0, 115, 115, 115.0, 115.0, 115.0, 8.695652173913043, 7.192595108695651, 3.795855978260869], "isController": false}, {"data": ["oes", 8, 6, 75.0, 1332.75, 60, 2486, 2486.0, 2486.0, 2486.0, 0.061397719074736366, 0.56133344333758, 0.2537977247348386], "isController": true}, {"data": ["oes-88", 1, 0, 0.0, 75.0, 75, 75, 75.0, 75.0, 75.0, 13.333333333333334, 10.598958333333334, 12.760416666666668], "isController": false}, {"data": ["oes-89", 1, 1, 100.0, 32.0, 32, 32, 32.0, 32.0, 32.0, 31.25, 32.684326171875, 13.427734375], "isController": false}, {"data": ["oes-75", 1, 0, 0.0, 9.0, 9, 9, 9.0, 9.0, 9.0, 111.1111111111111, 86.1545138888889, 47.41753472222223], "isController": false}, {"data": ["oes-76", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 100.0, 77.5390625, 42.7734375], "isController": false}, {"data": ["oes-73", 1, 0, 0.0, 49.0, 49, 49, 49.0, 49.0, 49.0, 20.408163265306122, 15.525350765306122, 8.649553571428571], "isController": false}, {"data": ["oes-74", 1, 0, 0.0, 58.0, 58, 58, 58.0, 58.0, 58.0, 17.241379310344826, 13.368803879310343, 7.341056034482758], "isController": false}, {"data": ["oes-72", 1, 0, 0.0, 190.0, 190, 190, 190.0, 190.0, 190.0, 5.263157894736842, 12.952302631578947, 2.225534539473684], "isController": false}, {"data": ["oes-70", 1, 0, 0.0, 259.0, 259, 259, 259.0, 259.0, 259.0, 3.8610038610038613, 3.1936233108108105, 1.6854186776061775], "isController": false}, {"data": ["oes-142", 1, 0, 0.0, 121.0, 121, 121, 121.0, 121.0, 121.0, 8.264462809917356, 6.206417871900826, 3.591490185950413], "isController": false}, {"data": ["oes-138", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 142.85714285714286, 107.97991071428571, 58.73325892857143], "isController": false}, {"data": ["oes-136", 1, 0, 0.0, 22.0, 22, 22, 22.0, 22.0, 22.0, 45.45454545454545, 95.39240056818183, 19.442471590909093], "isController": false}, {"data": ["oes-137", 1, 0, 0.0, 43.0, 43, 43, 43.0, 43.0, 43.0, 23.25581395348837, 19.236010174418606, 9.379542151162791], "isController": false}, {"data": ["oes-134", 1, 1, 100.0, 248.0, 248, 248, 248.0, 248.0, 248.0, 4.032258064516129, 4.221270161290323, 1.697171118951613], "isController": false}, {"data": ["oes-135", 1, 0, 0.0, 982.0, 982, 982, 982.0, 982.0, 982.0, 1.0183299389002036, 0.9487175407331976, 0.4196633146639511], "isController": false}, {"data": ["oes-132", 1, 0, 0.0, 34.0, 34, 34, 34.0, 34.0, 34.0, 29.41176470588235, 44.03147977941176, 12.149586397058822], "isController": false}, {"data": ["oes-133", 1, 1, 100.0, 78.0, 78, 78, 78.0, 78.0, 78.0, 12.82051282051282, 13.358874198717949, 5.308493589743589], "isController": false}, {"data": ["oes-79", 1, 0, 0.0, 11.0, 11, 11, 11.0, 11.0, 11.0, 90.9090909090909, 70.49005681818183, 38.97372159090909], "isController": false}, {"data": ["oes-57-0", 1, 0, 0.0, 363.0, 363, 363, 363.0, 363.0, 363.0, 2.7548209366391188, 2.066115702479339, 1.3854812327823691], "isController": false}, {"data": ["oes-57-1", 1, 0, 0.0, 18.0, 18, 18, 18.0, 18.0, 18.0, 55.55555555555555, 40.0390625, 28.53732638888889], "isController": false}, {"data": ["oes-77", 1, 0, 0.0, 8.0, 8, 8, 8.0, 8.0, 8.0, 125.0, 96.923828125, 53.5888671875], "isController": false}, {"data": ["oes-57-2", 1, 1, 100.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1000.0, 3063.4765625, 0.0], "isController": false}, {"data": ["oes-78", 1, 0, 0.0, 9.0, 9, 9, 9.0, 9.0, 9.0, 111.1111111111111, 86.1545138888889, 47.52604166666667], "isController": false}]}, function(index, item){
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
