var server = "http://127.0.0.1:5000";

function processData(data) {
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

$(function() {
$("#IBMData").click(function() {

    var appdir = "/retrieve_data"
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
            plotStocks(close, open, high, low, date, time, timeStamp);
            console.log(close);
            $("#database").val(data);
    });

});
});

// /* 1 day before*/
$(function(){
    $('#one_day').click(function(){
        var getOneDayDir = "/get_one_day";

        // request for data
        $.ajax({
            type:"POST",
            url:server+getOneDayDir
        }).done(function(data){
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
            plotStocks(close, open, high, low, date, time, timeStamp);
            console.log(close);
            $("#database").val(data);
        })
    });

});

//last month
$(function(){
    $('#last_month').click(function(){
        var getoneMonthData = "/get_one_month_data"

        $.ajax({
            type:"POST",
            url:server+getoneMonthData
        }).done(function(data){
            //console.log(data);

            var values = processData(data);
            var close = values.close;
            var open = values.open;
            var high = values.high;
            var low = values.low;
            var timeStamp = values.timeStamp;
            var date = values.date;
            var time = values.time;

            // This will call in the function plotStocks to plot the stock price.
            plotStocks(close, open, high, low, date, time, timeStamp);
            //console.log(close);
            //$("#database").val(data);
        })


    });
});

$(function(){
    $("#buttonSubmit").submit(function(e){
        console.log("clicked");
        //e.preventDefault();
        var form = $("dateString")[0];
        var data = new FormData(form);
        console.log(data);

        $("#buttonSubmit").prop("disabled", true);
        //var getDateFromCal = "/get_date_from_cal";

        //$.ajax({
        //    type:"POST",
        //    url: '',
        //    data: data,
        //    processData: false,
        //    contentType: false,
        //    cache: false,
        //    timeout: 800000,
        //    success : function()
        //    {
        //        console.log(data);
        //    }//,
            //complete:function(data){
                //form.reset();
            //    console.log("reset");
            //    console.log(data);
            //}
        //});
    });
});