//function getData(){
//    var xhttp = new XMLHttpRequest();
//    xhttp.onreadystatechange = function(){
//        if(this.readyState==4 && this.status==200){
//          document.getElementById("database").innerHTML = this.responseText;
//           console.log("WASIL")
//        }
//    };
//    xhttp.open("GET", "get_data.py", true);
//    xhttp.send();
//    //console.log(strr)
//}

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
                    $("#database").val(data);
            });

            //$.getJSON({
            //    url: "/retrieveData",
            //    data: { entry2_id: val, entry1_id: entry1 },
            //    success: function(data){
            //        $("#div1").html(data);
            //    }
            //});
        });
    });

