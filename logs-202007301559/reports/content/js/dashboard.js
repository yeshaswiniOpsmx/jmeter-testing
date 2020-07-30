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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7529411764705882, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "oes-64"], "isController": false}, {"data": [1.0, 500, 1500, "oes-65"], "isController": false}, {"data": [0.0, 500, 1500, "oes-62"], "isController": false}, {"data": [0.0, 500, 1500, "oes-63"], "isController": false}, {"data": [1.0, 500, 1500, "oes-60"], "isController": false}, {"data": [0.0, 500, 1500, "oes-61"], "isController": false}, {"data": [0.5, 500, 1500, "oes-152"], "isController": false}, {"data": [1.0, 500, 1500, "oes-153"], "isController": false}, {"data": [1.0, 500, 1500, "oes-150"], "isController": false}, {"data": [1.0, 500, 1500, "oes-151"], "isController": false}, {"data": [1.0, 500, 1500, "oes-105"], "isController": false}, {"data": [0.0, 500, 1500, "oes-106"], "isController": false}, {"data": [0.5, 500, 1500, "oes-147"], "isController": false}, {"data": [1.0, 500, 1500, "oes-148"], "isController": false}, {"data": [1.0, 500, 1500, "oes-146"], "isController": false}, {"data": [1.0, 500, 1500, "oes-143"], "isController": false}, {"data": [1.0, 500, 1500, "oes-144"], "isController": false}, {"data": [1.0, 500, 1500, "oes-109"], "isController": false}, {"data": [1.0, 500, 1500, "oes-66"], "isController": false}, {"data": [1.0, 500, 1500, "oes-107"], "isController": false}, {"data": [1.0, 500, 1500, "oes-108"], "isController": false}, {"data": [1.0, 500, 1500, "oes-93"], "isController": false}, {"data": [1.0, 500, 1500, "oes-94"], "isController": false}, {"data": [0.0, 500, 1500, "oes-91"], "isController": false}, {"data": [1.0, 500, 1500, "oes-92"], "isController": false}, {"data": [1.0, 500, 1500, "oes-90"], "isController": false}, {"data": [1.0, 500, 1500, "oes-120"], "isController": false}, {"data": [1.0, 500, 1500, "oes-116"], "isController": false}, {"data": [1.0, 500, 1500, "oes-117"], "isController": false}, {"data": [1.0, 500, 1500, "oes-114"], "isController": false}, {"data": [1.0, 500, 1500, "oes-115"], "isController": false}, {"data": [0.0, 500, 1500, "oes-112"], "isController": false}, {"data": [1.0, 500, 1500, "oes-113"], "isController": false}, {"data": [1.0, 500, 1500, "oes-110"], "isController": false}, {"data": [0.0, 500, 1500, "oes-154"], "isController": false}, {"data": [1.0, 500, 1500, "oes-111"], "isController": false}, {"data": [1.0, 500, 1500, "oes-155"], "isController": false}, {"data": [1.0, 500, 1500, "oes-59"], "isController": false}, {"data": [0.0, 500, 1500, "oes-57"], "isController": false}, {"data": [1.0, 500, 1500, "oes-118"], "isController": false}, {"data": [0.0, 500, 1500, "oes-119"], "isController": false}, {"data": [1.0, 500, 1500, "oes-86"], "isController": false}, {"data": [1.0, 500, 1500, "oes-87"], "isController": false}, {"data": [1.0, 500, 1500, "oes-84"], "isController": false}, {"data": [1.0, 500, 1500, "oes-85"], "isController": false}, {"data": [1.0, 500, 1500, "oes-82"], "isController": false}, {"data": [1.0, 500, 1500, "oes-83"], "isController": false}, {"data": [1.0, 500, 1500, "oes-80"], "isController": false}, {"data": [1.0, 500, 1500, "oes-81"], "isController": false}, {"data": [1.0, 500, 1500, "oes-130"], "isController": false}, {"data": [1.0, 500, 1500, "oes-131"], "isController": false}, {"data": [1.0, 500, 1500, "oes-123"], "isController": false}, {"data": [1.0, 500, 1500, "oes-124"], "isController": false}, {"data": [1.0, 500, 1500, "oes-121"], "isController": false}, {"data": [1.0, 500, 1500, "oes-122"], "isController": false}, {"data": [0.1875, 500, 1500, "oes"], "isController": true}, {"data": [1.0, 500, 1500, "oes-88"], "isController": false}, {"data": [0.0, 500, 1500, "oes-89"], "isController": false}, {"data": [1.0, 500, 1500, "oes-75"], "isController": false}, {"data": [1.0, 500, 1500, "oes-76"], "isController": false}, {"data": [1.0, 500, 1500, "oes-73"], "isController": false}, {"data": [1.0, 500, 1500, "oes-74"], "isController": false}, {"data": [1.0, 500, 1500, "oes-72"], "isController": false}, {"data": [1.0, 500, 1500, "oes-70"], "isController": false}, {"data": [1.0, 500, 1500, "oes-142"], "isController": false}, {"data": [1.0, 500, 1500, "oes-138"], "isController": false}, {"data": [1.0, 500, 1500, "oes-136"], "isController": false}, {"data": [1.0, 500, 1500, "oes-137"], "isController": false}, {"data": [0.0, 500, 1500, "oes-134"], "isController": false}, {"data": [0.5, 500, 1500, "oes-135"], "isController": false}, {"data": [1.0, 500, 1500, "oes-132"], "isController": false}, {"data": [0.0, 500, 1500, "oes-133"], "isController": false}, {"data": [1.0, 500, 1500, "oes-79"], "isController": false}, {"data": [1.0, 500, 1500, "oes-57-0"], "isController": false}, {"data": [1.0, 500, 1500, "oes-57-1"], "isController": false}, {"data": [1.0, 500, 1500, "oes-77"], "isController": false}, {"data": [0.0, 500, 1500, "oes-57-2"], "isController": false}, {"data": [1.0, 500, 1500, "oes-78"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 77, 12, 15.584415584415584, 187.27272727272728, 1, 3045, 311.0000000000001, 555.5999999999975, 3045.0, 0.48537875301785816, 0.4885674983768178, 0.214864803106424], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["oes-64", 1, 0, 0.0, 190.0, 190, 190, 190.0, 190.0, 190.0, 5.263157894736842, 11.045435855263158, 2.2512335526315788], "isController": false}, {"data": ["oes-65", 1, 0, 0.0, 148.0, 148, 148, 148.0, 148.0, 148.0, 6.756756756756757, 5.588840793918919, 2.725137246621622], "isController": false}, {"data": ["oes-62", 1, 1, 100.0, 67.0, 67, 67, 67.0, 67.0, 67.0, 14.925373134328359, 15.624999999999998, 6.282066231343284], "isController": false}, {"data": ["oes-63", 1, 0, 0.0, 3045.0, 3045, 3045, 3045.0, 3045.0, 3045.0, 0.3284072249589491, 0.30595751231527096, 0.13533969622331693], "isController": false}, {"data": ["oes-60", 1, 0, 0.0, 116.0, 116, 116, 116.0, 116.0, 116.0, 8.620689655172413, 12.905778556034482, 3.561085668103448], "isController": false}, {"data": ["oes-61", 1, 1, 100.0, 259.0, 259, 259, 259.0, 259.0, 259.0, 3.8610038610038613, 4.026906370656371, 1.5986969111969112], "isController": false}, {"data": ["oes-152", 1, 0, 0.0, 948.0, 948, 948, 948.0, 948.0, 948.0, 1.0548523206751055, 0.8653085443037976, 0.5542095200421941], "isController": false}, {"data": ["oes-153", 1, 0, 0.0, 118.0, 118, 118, 118.0, 118.0, 118.0, 8.474576271186441, 6.364208156779662, 3.74073093220339], "isController": false}, {"data": ["oes-150", 1, 0, 0.0, 173.0, 173, 173, 173.0, 173.0, 173.0, 5.780346820809248, 5.317467485549133, 2.511967124277457], "isController": false}, {"data": ["oes-151", 1, 0, 0.0, 45.0, 45, 45, 45.0, 45.0, 45.0, 22.22222222222222, 23.914930555555557, 9.657118055555555], "isController": false}, {"data": ["oes-105", 1, 0, 0.0, 226.0, 226, 226, 226.0, 226.0, 226.0, 4.424778761061947, 3.659948838495575, 1.9315196349557522], "isController": false}, {"data": ["oes-106", 1, 1, 100.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 16.949152542372882, 17.660884533898304, 7.018008474576272], "isController": false}, {"data": ["oes-147", 1, 0, 0.0, 512.0, 512, 512, 512.0, 512.0, 512.0, 1.953125, 1.7452239990234375, 1.2645721435546875], "isController": false}, {"data": ["oes-148", 1, 0, 0.0, 166.0, 166, 166, 166.0, 166.0, 166.0, 6.024096385542169, 5.924086972891566, 2.6178934487951806], "isController": false}, {"data": ["oes-146", 1, 0, 0.0, 28.0, 28, 28, 28.0, 28.0, 28.0, 35.714285714285715, 30.343191964285715, 17.892020089285715], "isController": false}, {"data": ["oes-143", 1, 0, 0.0, 38.0, 38, 38, 38.0, 38.0, 38.0, 26.31578947368421, 19.762541118421055, 11.436060855263158], "isController": false}, {"data": ["oes-144", 1, 0, 0.0, 49.0, 49, 49, 49.0, 49.0, 49.0, 20.408163265306122, 18.176020408163264, 9.088010204081632], "isController": false}, {"data": ["oes-109", 1, 0, 0.0, 134.0, 134, 134, 134.0, 134.0, 134.0, 7.462686567164179, 6.172749533582089, 3.2576375932835817], "isController": false}, {"data": ["oes-66", 1, 0, 0.0, 49.0, 49, 49, 49.0, 49.0, 49.0, 20.408163265306122, 15.425701530612244, 8.39046556122449], "isController": false}, {"data": ["oes-107", 1, 0, 0.0, 125.0, 125, 125, 125.0, 125.0, 125.0, 8.0, 6.6171875, 3.4921875], "isController": false}, {"data": ["oes-108", 1, 0, 0.0, 116.0, 116, 116, 116.0, 116.0, 116.0, 8.620689655172413, 7.130589978448276, 3.7631330818965516], "isController": false}, {"data": ["oes-93", 1, 0, 0.0, 158.0, 158, 158, 158.0, 158.0, 158.0, 6.329113924050633, 5.235116693037974, 2.762806566455696], "isController": false}, {"data": ["oes-94", 1, 0, 0.0, 119.0, 119, 119, 119.0, 119.0, 119.0, 8.403361344537815, 6.950827205882353, 3.668264180672269], "isController": false}, {"data": ["oes-91", 1, 1, 100.0, 481.0, 481, 481, 481.0, 481.0, 481.0, 2.079002079002079, 2.1642736486486487, 0.8791092775467776], "isController": false}, {"data": ["oes-92", 1, 0, 0.0, 252.0, 252, 252, 252.0, 252.0, 252.0, 3.968253968253968, 3.2823350694444446, 1.7322358630952381], "isController": false}, {"data": ["oes-90", 1, 0, 0.0, 181.0, 181, 181, 181.0, 181.0, 181.0, 5.524861878453039, 4.569880870165746, 2.4602900552486187], "isController": false}, {"data": ["oes-120", 1, 0, 0.0, 167.0, 167, 167, 167.0, 167.0, 167.0, 5.9880239520958085, 4.952984655688622, 2.6139127994011973], "isController": false}, {"data": ["oes-116", 1, 0, 0.0, 199.0, 199, 199, 199.0, 199.0, 199.0, 5.025125628140704, 4.156524811557789, 2.1935851130653266], "isController": false}, {"data": ["oes-117", 1, 0, 0.0, 171.0, 171, 171, 171.0, 171.0, 171.0, 5.847953216374268, 4.837125365497076, 2.552768640350877], "isController": false}, {"data": ["oes-114", 1, 0, 0.0, 118.0, 118, 118, 118.0, 118.0, 118.0, 8.474576271186441, 7.009732521186441, 3.6993511652542375], "isController": false}, {"data": ["oes-115", 1, 0, 0.0, 128.0, 128, 128, 128.0, 128.0, 128.0, 7.8125, 6.46209716796875, 3.41033935546875], "isController": false}, {"data": ["oes-112", 1, 1, 100.0, 16.0, 16, 16, 16.0, 16.0, 16.0, 62.5, 65.185546875, 25.87890625], "isController": false}, {"data": ["oes-113", 1, 0, 0.0, 126.0, 126, 126, 126.0, 126.0, 126.0, 7.936507936507936, 6.564670138888889, 3.4644717261904763], "isController": false}, {"data": ["oes-110", 1, 0, 0.0, 114.0, 114, 114, 114.0, 114.0, 114.0, 8.771929824561402, 7.255688048245614, 3.8291529605263155], "isController": false}, {"data": ["oes-154", 1, 1, 100.0, 347.0, 347, 347, 347.0, 347.0, 347.0, 2.881844380403458, 3.002859329971182, 1.2129637968299714], "isController": false}, {"data": ["oes-111", 1, 0, 0.0, 133.0, 133, 133, 133.0, 133.0, 133.0, 7.518796992481203, 6.219161184210526, 3.282131109022556], "isController": false}, {"data": ["oes-155", 1, 0, 0.0, 109.0, 109, 109, 109.0, 109.0, 109.0, 9.174311926605505, 6.889693233944954, 4.049598623853211], "isController": false}, {"data": ["oes-59", 1, 0, 0.0, 37.0, 37, 37, 37.0, 37.0, 37.0, 27.027027027027028, 25.786528716216218, 10.7421875], "isController": false}, {"data": ["oes-57", 1, 1, 100.0, 280.0, 280, 280, 280.0, 280.0, 280.0, 3.571428571428571, 16.19349888392857, 3.6307198660714284], "isController": false}, {"data": ["oes-118", 1, 0, 0.0, 134.0, 134, 134, 134.0, 134.0, 134.0, 7.462686567164179, 6.172749533582089, 3.2576375932835817], "isController": false}, {"data": ["oes-119", 1, 1, 100.0, 296.0, 296, 296, 296.0, 296.0, 296.0, 3.3783783783783785, 3.5202438766891895, 1.3988597972972974], "isController": false}, {"data": ["oes-86", 1, 0, 0.0, 48.0, 48, 48, 48.0, 48.0, 48.0, 20.833333333333332, 16.153971354166668, 9.073893229166666], "isController": false}, {"data": ["oes-87", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 100.0, 84.9609375, 48.73046875], "isController": false}, {"data": ["oes-84", 1, 0, 0.0, 38.0, 38, 38, 38.0, 38.0, 38.0, 26.31578947368421, 20.40501644736842, 11.410361842105264], "isController": false}, {"data": ["oes-85", 1, 0, 0.0, 45.0, 45, 45, 45.0, 45.0, 45.0, 22.22222222222222, 17.23090277777778, 9.657118055555555], "isController": false}, {"data": ["oes-82", 1, 0, 0.0, 38.0, 38, 38, 38.0, 38.0, 38.0, 26.31578947368421, 20.40501644736842, 11.358963815789474], "isController": false}, {"data": ["oes-83", 1, 0, 0.0, 39.0, 39, 39, 39.0, 39.0, 39.0, 25.64102564102564, 19.881810897435898, 11.092748397435898], "isController": false}, {"data": ["oes-80", 1, 0, 0.0, 54.0, 54, 54, 54.0, 54.0, 54.0, 18.51851851851852, 14.359085648148149, 7.957175925925926], "isController": false}, {"data": ["oes-81", 1, 0, 0.0, 94.0, 94, 94, 94.0, 94.0, 94.0, 10.638297872340425, 8.248836436170214, 4.581532579787234], "isController": false}, {"data": ["oes-130", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 100.0, 28.61328125, 34.47265625], "isController": false}, {"data": ["oes-131", 1, 0, 0.0, 11.0, 11, 11, 11.0, 11.0, 11.0, 90.9090909090909, 86.73650568181819, 36.1328125], "isController": false}, {"data": ["oes-123", 1, 0, 0.0, 295.0, 295, 295, 295.0, 295.0, 295.0, 3.389830508474576, 2.8038930084745766, 1.479740466101695], "isController": false}, {"data": ["oes-124", 1, 0, 0.0, 29.0, 29, 29, 29.0, 29.0, 29.0, 34.48275862068965, 60.681573275862064, 12.32489224137931], "isController": false}, {"data": ["oes-121", 1, 0, 0.0, 125.0, 125, 125, 125.0, 125.0, 125.0, 8.0, 6.6171875, 3.4921875], "isController": false}, {"data": ["oes-122", 1, 0, 0.0, 159.0, 159, 159, 159.0, 159.0, 159.0, 6.289308176100629, 5.20219143081761, 2.7454304245283017], "isController": false}, {"data": ["oes", 8, 6, 75.0, 1771.25, 45, 5532, 5532.0, 5532.0, 5532.0, 0.06003121623244087, 0.5475723352705907, 0.24814905704091125], "isController": true}, {"data": ["oes-88", 1, 0, 0.0, 204.0, 204, 204, 204.0, 204.0, 204.0, 4.901960784313726, 3.8966758578431375, 4.691329656862745], "isController": false}, {"data": ["oes-89", 1, 1, 100.0, 271.0, 271, 271, 271.0, 271.0, 271.0, 3.6900369003690034, 3.866610931734317, 1.5855627306273061], "isController": false}, {"data": ["oes-75", 1, 0, 0.0, 25.0, 25, 25, 25.0, 25.0, 25.0, 40.0, 31.015625, 17.0703125], "isController": false}, {"data": ["oes-76", 1, 0, 0.0, 27.0, 27, 27, 27.0, 27.0, 27.0, 37.03703703703704, 28.718171296296298, 15.84201388888889], "isController": false}, {"data": ["oes-73", 1, 0, 0.0, 67.0, 67, 67, 67.0, 67.0, 67.0, 14.925373134328359, 11.354361007462686, 6.325792910447761], "isController": false}, {"data": ["oes-74", 1, 0, 0.0, 40.0, 40, 40, 40.0, 40.0, 40.0, 25.0, 19.384765625, 10.64453125], "isController": false}, {"data": ["oes-72", 1, 0, 0.0, 448.0, 448, 448, 448.0, 448.0, 448.0, 2.232142857142857, 5.4931640625, 0.9438650948660714], "isController": false}, {"data": ["oes-70", 1, 0, 0.0, 302.0, 302, 302, 302.0, 302.0, 302.0, 3.3112582781456954, 2.7389021109271523, 1.4454418460264902], "isController": false}, {"data": ["oes-142", 1, 0, 0.0, 127.0, 127, 127, 127.0, 127.0, 127.0, 7.874015748031496, 6.497600885826771, 3.4218134842519685], "isController": false}, {"data": ["oes-138", 1, 0, 0.0, 26.0, 26, 26, 26.0, 26.0, 26.0, 38.46153846153847, 29.071514423076923, 15.812800480769232], "isController": false}, {"data": ["oes-136", 1, 0, 0.0, 30.0, 30, 30, 30.0, 30.0, 30.0, 33.333333333333336, 69.95442708333334, 14.2578125], "isController": false}, {"data": ["oes-137", 1, 0, 0.0, 22.0, 22, 22, 22.0, 22.0, 22.0, 45.45454545454545, 37.59765625, 18.332741477272727], "isController": false}, {"data": ["oes-134", 1, 1, 100.0, 243.0, 243, 243, 243.0, 243.0, 243.0, 4.11522633744856, 4.300090020576132, 1.7320923353909465], "isController": false}, {"data": ["oes-135", 1, 0, 0.0, 1046.0, 1046, 1046, 1046.0, 1046.0, 1046.0, 0.9560229445506692, 0.8906698135755258, 0.39398601816443596], "isController": false}, {"data": ["oes-132", 1, 0, 0.0, 30.0, 30, 30, 30.0, 30.0, 30.0, 33.333333333333336, 49.90234375, 13.76953125], "isController": false}, {"data": ["oes-133", 1, 1, 100.0, 14.0, 14, 14, 14.0, 14.0, 14.0, 71.42857142857143, 74.42801339285714, 29.575892857142858], "isController": false}, {"data": ["oes-79", 1, 0, 0.0, 27.0, 27, 27, 27.0, 27.0, 27.0, 37.03703703703704, 28.718171296296298, 15.87818287037037], "isController": false}, {"data": ["oes-57-0", 1, 0, 0.0, 242.0, 242, 242, 242.0, 242.0, 242.0, 4.132231404958678, 3.0991735537190084, 2.078221849173554], "isController": false}, {"data": ["oes-57-1", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 142.85714285714286, 102.95758928571428, 73.38169642857143], "isController": false}, {"data": ["oes-77", 1, 0, 0.0, 28.0, 28, 28, 28.0, 28.0, 28.0, 35.714285714285715, 27.69252232142857, 15.311104910714285], "isController": false}, {"data": ["oes-57-2", 1, 1, 100.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1000.0, 3063.4765625, 0.0], "isController": false}, {"data": ["oes-78", 1, 0, 0.0, 21.0, 21, 21, 21.0, 21.0, 21.0, 47.61904761904761, 36.923363095238095, 20.36830357142857], "isController": false}]}, function(index, item){
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
