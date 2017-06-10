Chart.defaults.global.responsive = true;

var timeFormat = 'YYYY/MM/DD HH:mm';

function newDate(date) {
    return moment(date).toDate();
}

var chartData;
var chartDataMinMax;
var myChart;
var minMaxChart;

function initChart(){
    chartData = {
        datasets: [
            {
                label: 'Temperatures',
                fill: true,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                spanGaps: false
            },
            {
                label: 'Humidity',
                fill: true,
                lineTension: 0.1,
                backgroundColor: "rgba(255,0,255,0.1)",
                borderColor: "rgba(255,0,255,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(255,0,255,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                spanGaps: false
            }],
    }

    chartDataMinMax = {
        datasets: [
            {
                label: 'minTemp',
                fill: true,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                spanGaps: false
            },
            {
                label: 'maxTemp',
                fill: true,
                lineTension: 0.1,
                backgroundColor: "rgba(255,0,255,0.1)",
                borderColor: "rgba(255,0,255,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(255,0,255,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                spanGaps: false
            }],
    }

    var ctx = document.getElementById("tempChart").getContext("2d");
    // create the chart using the chart canvas
    myChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        format: timeFormat,
                        tooltipFormat: 'll HH:mm:ss'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    }
                }]
            }
        }
    });

    ctx = document.getElementById("minMaxChart").getContext("2d");
    // create the chart using the chart canvas
    minMaxChart = new Chart(ctx, {
        type: 'line',
        data: chartDataMinMax,
        options: {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        format: timeFormat,
                        tooltipFormat: 'll HH:mm:ss'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    }
                }]
            }
        }
    });
}

$(function () {
    var start = moment().add(-29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    function cbMinMax(start, end) {
        $('#reportrangeMinMax span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().add(-1, 'days'), moment().add(-1, 'days')],
            'Last 7 Days': [moment().add(-6, 'days'), moment()],
            'Last 30 Days': [moment().add(-29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().add(-1, 'month').startOf('month'), moment().add(-1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);

    $('#reportrange').on('apply.daterangepicker', function (ev, picker) {
        console.log(picker.startDate.format('YYYY-MM-DDTHH:mm'));
        console.log(picker.endDate.format('YYYY-MM-DDTHH:mm'));
        var start = picker.startDate.format('YYYY-MM-DDTHH:mm');
        var end = picker.endDate.format('YYYY-MM-DDTHH:mm');
        $.getJSON($SCRIPT_ROOT + '/_get_data', {
            startDate: start,
            endDate: end
        }, function (data) {
            chartData.labels = data.timestamps;
            chartData.datasets[0].data = data.temperatures;
            chartData.datasets[1].data = data.humidities;
            ctx = document.getElementById("tempChart").getContext("2d");
            if (typeof myChart != undefined)
                myChart.destroy();
            myChart = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                format: timeFormat,
                                tooltipFormat: 'll HH:mm:ss'
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Date'
                            }
                        }]
                    }
                }
            });
        });
    });

    $('#reportrangeMinMax').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
            'Last 7 Days': [moment().add(-6, 'days'), moment()],
            'Last 30 Days': [moment().add(-29, 'days'), moment()],
            'Last 60 Month': [moment().add(-60, 'days'), moment()]
        }
    }, cb);

    cbMinMax(start, end);

    $('#reportrangeMinMax').on('apply.daterangepicker', function (ev, picker) {
        console.log(picker.startDate.format('YYYY-MM-DDTHH:mm'));
        console.log(picker.endDate.format('YYYY-MM-DDTHH:mm'));
        var start = picker.startDate.format('YYYY-MM-DDTHH:mm');
        var end = picker.endDate.format('YYYY-MM-DDTHH:mm');
        $.getJSON($SCRIPT_ROOT + '/_get_dataMinMax', {
            startDate: start,
            endDate: end
        }, function (data) {
            console.log(data.timestamps);
            chartDataMinMax.labels = data.timestamps;
            chartDataMinMax.datasets[0].data = data.temperatures;
            chartDataMinMax.datasets[1].data = data.humidities;
            ctx = document.getElementById("minMaxChart").getContext("2d");
            if (typeof minMaxChart != undefined)
                minMaxChart.destroy();
            minMaxChart = new Chart(ctx, {
                type: 'line',
                data: chartDataMinMax,
                options: {
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                format: timeFormat,
                                tooltipFormat: 'll HH:mm:ss'
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Date'
                            }
                        }]
                    }
                }
            });
        });
    });
});