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

    var data = {"OkPercent": 7.6923076923076925, "KoPercent": 92.3076923076923};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.016129032258064516, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "\/login-1"], "isController": false}, {"data": [0.0, 500, 1500, "\/oes\/dashboard\/dynamicMenu-4"], "isController": false}, {"data": [0.0, 500, 1500, "\/oes\/accountsConfig\/nameCheck\/jmeterte-20"], "isController": false}, {"data": [0.0, 500, 1500, "\/oes\/accountsConfig\/getAccounts-12"], "isController": false}, {"data": [0.0, 500, 1500, "\/oes\/appOnboarding\/applicationList-6"], "isController": false}, {"data": [0.0, 500, 1500, "\/login-1-2"], "isController": false}, {"data": [0.0, 500, 1500, "login"], "isController": true}, {"data": [0.5, 500, 1500, "\/login-1-1"], "isController": false}, {"data": [0.0, 500, 1500, "\/login-1-0"], "isController": false}, {"data": [0.0, 500, 1500, "\/oes\/policy\/endpointType-10"], "isController": false}, {"data": [0.0, 500, 1500, "app-loading"], "isController": true}, {"data": [0.0, 500, 1500, "\/oes\/accountsConfig\/saveAccount-23"], "isController": false}, {"data": [0.0, 500, 1500, "\/oes\/audit\/pipelineconfig-8"], "isController": false}, {"data": [0.0, 500, 1500, "\/oes\/accountsConfig\/nameCheck\/jmeter-18"], "isController": false}, {"data": [0.0, 500, 1500, "\/oes\/accountsConfig\/nameCheck\/jmet-16"], "isController": false}, {"data": [0.0, 500, 1500, "\/oes\/accountsConfig\/nameCheck\/jme-15"], "isController": false}, {"data": [0.0, 500, 1500, "\/oes\/audit\/pipelinescount-7"], "isController": false}, {"data": [0.0, 500, 1500, "load-datasource"], "isController": true}, {"data": [0.0, 500, 1500, "\/oes\/accountsConfig\/getAccounts-24"], "isController": false}, {"data": [0.0, 500, 1500, "\/oes\/accountsConfig\/getAccounts-25"], "isController": false}, {"data": [0.0, 500, 1500, "\/oes\/dashboard\/applications-5"], "isController": false}, {"data": [0.0, 500, 1500, "save-datasource"], "isController": true}, {"data": [0.0, 500, 1500, "\/oes\/policy\/list-9"], "isController": false}, {"data": [0.0, 500, 1500, "\/oes\/accountsConfig\/nameCheck\/jmete-17"], "isController": false}, {"data": [0.0, 500, 1500, "create-datasource"], "isController": true}, {"data": [0.0, 500, 1500, "\/auth\/user-3"], "isController": false}, {"data": [0.0, 500, 1500, "\/oes\/accountsConfig\/nameCheck\/jm-14"], "isController": false}, {"data": [0.0, 500, 1500, "\/oes\/accountsConfig\/nameCheck\/j-13"], "isController": false}, {"data": [0.0, 500, 1500, "\/oes\/accountsConfig\/nameCheck\/jmetert-19"], "isController": false}, {"data": [0.0, 500, 1500, "\/oes\/accountsConfig\/nameCheck\/jmetertes-21"], "isController": false}, {"data": [0.0, 500, 1500, "\/oes\/accountsConfig\/nameCheck\/jmetertest-22"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 26, 24, 92.3076923076923, 727.8461538461539, 3, 3556, 1469.300000000001, 3190.9499999999985, 3556.0, 1.6826300802485115, 1.1702065266632151, 0.6939332287082578], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["\/login-1", 1, 1, 100.0, 3556.0, 3556, 3556, 3556.0, 3556.0, 3556.0, 0.281214848143982, 1.312976747047244, 0.30126239102924635], "isController": false}, {"data": ["\/oes\/dashboard\/dynamicMenu-4", 1, 1, 100.0, 514.0, 514, 514, 514.0, 514.0, 514.0, 1.9455252918287937, 0.7732703064202334, 0.7295719844357976], "isController": false}, {"data": ["\/oes\/accountsConfig\/nameCheck\/jmeterte-20", 1, 1, 100.0, 549.0, 549, 549, 549.0, 549.0, 549.0, 1.8214936247723132, 0.7239725637522768, 0.7132997495446265], "isController": false}, {"data": ["\/oes\/accountsConfig\/getAccounts-12", 1, 1, 100.0, 548.0, 548, 548, 548.0, 548.0, 548.0, 1.8248175182481752, 0.725293681569343, 0.702127052919708], "isController": false}, {"data": ["\/oes\/appOnboarding\/applicationList-6", 1, 1, 100.0, 574.0, 574, 574, 574.0, 574.0, 574.0, 1.7421602787456445, 0.6924406576655053, 0.6669207317073171], "isController": false}, {"data": ["\/login-1-2", 1, 1, 100.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 333.3333333333333, 1021.1588541666666, 0.0], "isController": false}, {"data": ["login", 1, 1, 100.0, 3556.0, 3556, 3556, 3556.0, 3556.0, 3556.0, 0.281214848143982, 1.312976747047244, 0.30126239102924635], "isController": true}, {"data": ["\/login-1-1", 1, 0, 0.0, 1022.0, 1022, 1022, 1022.0, 1022.0, 1022.0, 0.9784735812133072, 0.7644324853228963, 0.5265028742661448], "isController": false}, {"data": ["\/login-1-0", 1, 0, 0.0, 2513.0, 2513, 2513, 2513.0, 2513.0, 2513.0, 0.3979307600477517, 0.32798199363310787, 0.21217792479108635], "isController": false}, {"data": ["\/oes\/policy\/endpointType-10", 1, 1, 100.0, 512.0, 512, 512, 512.0, 512.0, 512.0, 1.953125, 0.7762908935546875, 0.728607177734375], "isController": false}, {"data": ["app-loading", 1, 1, 100.0, 4308.0, 4308, 4308, 4308.0, 4308.0, 4308.0, 0.23212627669452182, 0.7380890204271123, 0.695245400998143], "isController": true}, {"data": ["\/oes\/accountsConfig\/saveAccount-23", 1, 1, 100.0, 527.0, 527, 527, 527.0, 527.0, 527.0, 1.8975332068311195, 0.7541953273244781, 1.0228889943074004], "isController": false}, {"data": ["\/oes\/audit\/pipelineconfig-8", 1, 1, 100.0, 536.0, 536, 536, 536.0, 536.0, 536.0, 1.8656716417910448, 0.7415315998134328, 0.7269560401119403], "isController": false}, {"data": ["\/oes\/accountsConfig\/nameCheck\/jmeter-18", 1, 1, 100.0, 531.0, 531, 531, 531.0, 531.0, 531.0, 1.8832391713747645, 0.748514006591337, 0.7338012005649717], "isController": false}, {"data": ["\/oes\/accountsConfig\/nameCheck\/jmet-16", 1, 1, 100.0, 530.0, 530, 530, 530.0, 530.0, 530.0, 1.8867924528301887, 0.7499262971698113, 0.7315005896226414], "isController": false}, {"data": ["\/oes\/accountsConfig\/nameCheck\/jme-15", 1, 1, 100.0, 516.0, 516, 516, 516.0, 516.0, 516.0, 1.937984496124031, 0.7702731346899224, 0.7494549418604651], "isController": false}, {"data": ["\/oes\/audit\/pipelinescount-7", 1, 1, 100.0, 533.0, 533, 533, 533.0, 533.0, 533.0, 1.876172607879925, 0.7457053236397748, 0.7017325281425891], "isController": false}, {"data": ["load-datasource", 1, 1, 100.0, 528.0, 528, 528, 528.0, 528.0, 528.0, 1.893939393939394, 0.7527669270833333, 0.728722774621212], "isController": true}, {"data": ["\/oes\/accountsConfig\/getAccounts-24", 1, 1, 100.0, 519.0, 519, 519, 519.0, 519.0, 519.0, 1.9267822736030829, 0.7658206888246628, 0.7413595857418112], "isController": false}, {"data": ["\/oes\/accountsConfig\/getAccounts-25", 1, 1, 100.0, 528.0, 528, 528, 528.0, 528.0, 528.0, 1.893939393939394, 0.7527669270833333, 0.728722774621212], "isController": false}, {"data": ["\/oes\/dashboard\/applications-5", 1, 1, 100.0, 545.0, 545, 545, 545.0, 545.0, 545.0, 1.834862385321101, 0.729286123853211, 0.689865252293578], "isController": false}, {"data": ["save-datasource", 1, 1, 100.0, 1046.0, 1046, 1046, 1046.0, 1046.0, 1046.0, 0.9560229445506692, 0.759963551625239, 0.8832008843212237], "isController": true}, {"data": ["\/oes\/policy\/list-9", 1, 1, 100.0, 533.0, 533, 533, 533.0, 533.0, 533.0, 1.876172607879925, 0.7457053236397748, 0.6852427298311444], "isController": false}, {"data": ["\/oes\/accountsConfig\/nameCheck\/jmete-17", 1, 1, 100.0, 559.0, 559, 559, 559.0, 559.0, 559.0, 1.7889087656529516, 0.7110213550983899, 0.6952985241502683], "isController": false}, {"data": ["create-datasource", 1, 1, 100.0, 5948.0, 5948, 5948, 5948.0, 5948.0, 5948.0, 0.16812373907195696, 0.7350488084229992, 0.7189588412071284], "isController": true}, {"data": ["\/auth\/user-3", 1, 1, 100.0, 561.0, 561, 561, 561.0, 561.0, 561.0, 1.7825311942959001, 0.708486519607843, 0.640597147950089], "isController": false}, {"data": ["\/oes\/accountsConfig\/nameCheck\/jm-14", 1, 1, 100.0, 521.0, 521, 521, 521.0, 521.0, 521.0, 1.9193857965451055, 0.7628808781190018, 0.740388075815739], "isController": false}, {"data": ["\/oes\/accountsConfig\/nameCheck\/j-13", 1, 1, 100.0, 596.0, 596, 596, 596.0, 596.0, 596.0, 1.6778523489932886, 0.6668807676174497, 0.6455799077181208], "isController": false}, {"data": ["\/oes\/accountsConfig\/nameCheck\/jmetert-19", 1, 1, 100.0, 547.0, 547, 547, 547.0, 547.0, 547.0, 1.8281535648994516, 0.726619629798903, 0.7141224862888482], "isController": false}, {"data": ["\/oes\/accountsConfig\/nameCheck\/jmetertes-21", 1, 1, 100.0, 516.0, 516, 516, 516.0, 516.0, 516.0, 1.937984496124031, 0.7702731346899224, 0.7608103197674418], "isController": false}, {"data": ["\/oes\/accountsConfig\/nameCheck\/jmetertest-22", 1, 1, 100.0, 535.0, 535, 535, 535.0, 535.0, 535.0, 1.8691588785046729, 0.7429176401869159, 0.735616238317757], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400\/Bad Request", 22, 91.66666666666667, 84.61538461538461], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException\/Non HTTP response message: Connect to localhost:9000 [localhost\\\/127.0.0.1] failed: Connection refused (Connection refused)", 2, 8.333333333333334, 7.6923076923076925], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 26, 24, "400\/Bad Request", 22, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException\/Non HTTP response message: Connect to localhost:9000 [localhost\\\/127.0.0.1] failed: Connection refused (Connection refused)", 2, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["\/login-1", 1, 1, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException\/Non HTTP response message: Connect to localhost:9000 [localhost\\\/127.0.0.1] failed: Connection refused (Connection refused)", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["\/oes\/dashboard\/dynamicMenu-4", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["\/oes\/accountsConfig\/nameCheck\/jmeterte-20", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["\/oes\/accountsConfig\/getAccounts-12", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["\/oes\/appOnboarding\/applicationList-6", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["\/login-1-2", 1, 1, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException\/Non HTTP response message: Connect to localhost:9000 [localhost\\\/127.0.0.1] failed: Connection refused (Connection refused)", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["\/oes\/policy\/endpointType-10", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["\/oes\/accountsConfig\/saveAccount-23", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["\/oes\/audit\/pipelineconfig-8", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["\/oes\/accountsConfig\/nameCheck\/jmeter-18", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["\/oes\/accountsConfig\/nameCheck\/jmet-16", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["\/oes\/accountsConfig\/nameCheck\/jme-15", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["\/oes\/audit\/pipelinescount-7", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["\/oes\/accountsConfig\/getAccounts-24", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["\/oes\/accountsConfig\/getAccounts-25", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["\/oes\/dashboard\/applications-5", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["\/oes\/policy\/list-9", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["\/oes\/accountsConfig\/nameCheck\/jmete-17", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["\/auth\/user-3", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["\/oes\/accountsConfig\/nameCheck\/jm-14", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["\/oes\/accountsConfig\/nameCheck\/j-13", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["\/oes\/accountsConfig\/nameCheck\/jmetert-19", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["\/oes\/accountsConfig\/nameCheck\/jmetertes-21", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["\/oes\/accountsConfig\/nameCheck\/jmetertest-22", 1, 1, "400\/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
