function setDanger(config) {
    config.circleColor = "#d9534f";
    config.textColor = "#d9534f";
    config.waveTextColor = "#d9534f";
    config.waveColor = "#fde4e2";
}

function setWarning(config) {
    config.circleColor = "#f0ad4e";
    config.textColor = "#f0ad4e";
    config.waveTextColor = "#f0ad4e";
    config.waveColor = "#fff0dc";
}

function setSuccess(config) {
    config.circleColor = "#337ab7";
    config.textColor = "#337ab7";
    config.waveTextColor = "#337ab7";
    config.waveColor = "#9cd1ff";
}

function formatNumber(number) {
    return ((number > 0) ? '+' : '') + $.number(number, 1);
}

$(document).ready(function () {

    var stats = {};

    $.getJSON({
        url: "https://frozen-spire-64625.herokuapp.com/csv",
        success: function (stats) {

            $('.container-main').css("display", "block");
            $('.container-loading').css("display", "none");
            $('.date-updated').text('LAST UPDATED: ' + stats.date.toUpperCase());

            stats.items.forEach(function (item) {

                var damconfig = liquidFillGaugeDefaultSettings();
                damconfig.waveAnimateTime = 1500;
                if (item.perc >= 80) {
                    setSuccess(damconfig);
                } else if (item.perc >= 65) {
                    setWarning(damconfig);
                } else {
                    setDanger(damconfig);
                }
                var diff = item.perc - item.perc_last_week;

                switch (item.name) {
                    case "BERG RIVER":
                        $('.diff1').text(formatNumber(diff) + "%").addClass(diff < 0 ? 'text-danger' : 'text-success');
                        var dam1 = loadLiquidFillGauge("dam1", item.perc, damconfig);
                        break;
                    case "STEENBRAS LOWER":
                        $('.diff2').text(formatNumber(diff) + "%").addClass(diff < 0 ? 'text-danger' : 'text-success');
                        var dam2 = loadLiquidFillGauge("dam2", item.perc, damconfig);
                        break;
                    case "STEENBRAS UPPER":
                        $('.diff3').text(formatNumber(diff) + "%").addClass(diff < 0 ? 'text-danger' : 'text-success');
                        var dam3 = loadLiquidFillGauge("dam3", item.perc, damconfig);
                        break;
                    case "THEEWATERSKLOOF":
                        $('.diff4').text(formatNumber(diff) + "%").addClass(diff < 0 ? 'text-danger' : 'text-success');
                        var dam4 = loadLiquidFillGauge("dam4", item.perc, damconfig);
                        break;
                    case "VO�LVLEI":
                        $('.diff5').text(formatNumber(diff) + "%").addClass(diff < 0 ? 'text-danger' : 'text-success');
                        var dam5 = loadLiquidFillGauge("dam5", item.perc, damconfig);
                        break;
                    case "WEMMERSHOEK":
                        $('.diff6').text(formatNumber(diff) + "%").addClass(diff < 0 ? 'text-danger' : 'text-success');
                        var dam6 = loadLiquidFillGauge("dam6", item.perc, damconfig);
                        break;
                }

            });

        },
        error: function (httpReq, status, exception) {
            console.log("Oh dear, an error occurred.");
        }
    });

});