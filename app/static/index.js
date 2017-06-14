Chart.defaults.global.responsive = true;

var timeFormat = 'YYYY/MM/DD HH:mm';

function newDate(date) {
    return moment(date).toDate();
}

var chartData;
var chartDataHumidity;
var chartDataTemperature;
var myChart;
var humidityChart;
var temperatureChart;

$(document).ready(function(){
    $.getJSON($SCRIPT_ROOT + '/_get_data', {
        startDate: moment().add(-6, 'days').format('YYYY-MM-DDTHH:mm'),
        endDate: moment().format('YYYY-MM-DDTHH:mm')
        }, function (result) {
        chartData = {
            labels: result.timestamps,
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
                    pointRadius: 0,
                    pointHitRadius: 10,
                    data: result.temperatures,
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
                    pointRadius: 0,
                    pointHitRadius: 10,
                    data: result.humidities,
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
                    }],
                    yAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }]
                }
            }
        });
    });

    $.getJSON($SCRIPT_ROOT + '/_get_humidityMinMax', {
        startDate: moment().add(-30, 'days').format('YYYY-MM-DDTHH:mm'),
        endDate: moment().format('YYYY-MM-DDTHH:mm')
        }, function (result) {
        chartDataHumidity = {
            labels: result.timestamps,
            datasets: [
                {
                    label: 'Min Humidity',
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
                    data: result.minHums,
                    spanGaps: false
                },
                {
                    label: 'Max Humidity',
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
                    data: result.maxHums,
                    spanGaps: false
                }],
        }

        ctx = document.getElementById("humidityChart").getContext("2d");
        // create the chart using the chart canvas
        humidityChart = new Chart(ctx, {
            type: 'line',
            data: chartDataHumidity,
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
                    }],
                    yAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }]
                }
            }
        });
    });

        $.getJSON($SCRIPT_ROOT + '/_get_temperaturesMinMax', {
        startDate: moment().add(-30, 'days').format('YYYY-MM-DDTHH:mm'),
        endDate: moment().format('YYYY-MM-DDTHH:mm')
        }, function (result) {
        chartDataTemperature = {
            labels: result.timestamps,
            datasets: [
                {
                    label: 'Min Temperature',
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
                    data: result.minTemps,
                    spanGaps: false
                },
                {
                    label: 'Max Temperature',
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
                    data: result.maxTemps,
                    spanGaps: false
                }],
        }

        ctx = document.getElementById("temperatureChart").getContext("2d");
        // create the chart using the chart canvas
        temperatureChart = new Chart(ctx, {
            type: 'line',
            data: chartDataTemperature,
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
                    }],
                    yAxes: [{
                        ticks: {
                            suggestedMin: 0
                        }
                    }]
                }
            }
        });
    });
});

$(function () {
    var start = moment().add(-6, 'days');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    function cbHumidity(start, end) {
        $('#reportrangeHumidity span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    function cbTemperatures(start, end) {
        $('#reportrangeTemperature span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
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
    cbHumidity(moment().add(-30, 'days'), moment());
    cbTemperatures(moment().add(-30, 'days'), moment());

    $('#reportrange').on('apply.daterangepicker', function (ev, picker) {
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

    $('#reportrangeHumidity').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
            'Last 7 Days': [moment().add(-6, 'days'), moment()],
            'Last 30 Days': [moment().add(-29, 'days'), moment()],
            'Last 60 Month': [moment().add(-60, 'days'), moment()]
        }
    }, cbHumidity);

    $('#reportrangeHumidity').on('apply.daterangepicker', function (ev, picker) {
        var start = picker.startDate.format('YYYY-MM-DDTHH:mm');
        var end = picker.endDate.format('YYYY-MM-DDTHH:mm');
        $.getJSON($SCRIPT_ROOT + '/_get_humidityMinMax', {
            startDate: start,
            endDate: end
        }, function (data) {
            chartDataHumidity.labels = data.timestamps;
            chartDataHumidity.datasets[0].data = data.maxHums;
            chartDataHumidity.datasets[1].data = data.minHums;
            ctx = document.getElementById("humidityChart").getContext("2d");
            if (typeof humidityChart != undefined)
                humidityChart.destroy();
            humidityChart = new Chart(ctx, {
                type: 'line',
                data: chartDataHumidity,
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

        $('#reportrangeTemperature').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
            'Last 7 Days': [moment().add(-6, 'days'), moment()],
            'Last 30 Days': [moment().add(-29, 'days'), moment()],
            'Last 60 Month': [moment().add(-60, 'days'), moment()]
        }
    }, cbTemperatures);

    $('#reportrangeTemperature').on('apply.daterangepicker', function (ev, picker) {
        var start = picker.startDate.format('YYYY-MM-DDTHH:mm');
        var end = picker.endDate.format('YYYY-MM-DDTHH:mm');
        $.getJSON($SCRIPT_ROOT + '/_get_temperaturesMinMax', {
            startDate: start,
            endDate: end
        }, function (data) {
            chartDataTemperature.labels = data.timestamps;
            chartDataTemperature.datasets[0].data = data.maxTemps;
            chartDataTemperature.datasets[1].data = data.minTemps;
            ctx = document.getElementById("temperatureChart").getContext("2d");
            if (typeof temperatureChart != undefined)
                temperatureChart.destroy();
            temperatureChart = new Chart(ctx, {
                type: 'line',
                data: chartDataTemperature,
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