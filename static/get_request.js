function processData(data){
    //console.log(data['2021-10-25 09:25:00']['close']);
    var close = new Array();
    var open = new Array();
    var high = new Array();
    var low = new Array();
    var timeStamp = new Array();

    var time = new Array();
    var date = new Array();

    for (var x in data) {
        close.push(data[x]['close']);
        open.push(data[x]['open']);
        high.push(data[x]['high']);
        low.push(data[x]['low']);
        timeStamp.push(String(x));
     }

     // split timeStampe between date and time.
     for(var ts in timeStamp){
        date.push(timeStamp[ts].split(" ")[0]);
        time.push(timeStamp[ts].split(" ")[1]);
     }

     return {
         close:close, 
         open:open, 
         high:high, 
         low:low,
         date:date,
         time:time
        };
}

var server = "http://127.0.0.1:5000";
$(function() {
$("#IBMData").click(function() {

    var appdir = "/retrieveData"
    var send_msg = "Clicked";
    console.log(send_msg);
    $('#message_1').html(send_msg);

    $.ajax({
        type : "POST",
        url : server+appdir
        }).done(function(data) {
            console.log(data);

            var values = processData(data);
            var close = values.close;
            var open = values.open;
            var high = values.high;
            var low = values.low;
            var timeStamp = values.timeStamp;
            var date = values.date;
            var time = values.time;

            // This will call in the function plotStocks to plot the stock price.
            plotStocks(close, open, high, low, date, time);

            console.log(close);
            $("#database").val(data);

    });
    
});
});

