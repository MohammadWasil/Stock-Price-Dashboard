var chart = document.getElementById("myChart").getContext('2d');

// global properties
Chart.defaults.global.defaultFontFamily = 'Lato';
//Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';

const labels = Array.from(Array(10).keys()) ;

function plotStocks(close, open, high, low, date, time, timeStamp){

    // get the unique date fromt he array of dates.
    const unique_date = [...new Set(date)];
    
    if(time[0] == undefined){
        console.log("put date");
        myLabel = date;
    }
    else{
        myLabel = time;
    }

    var stockPriceChart = new Chart(chart, {
        type:'line',
        data:{
        labels: myLabel,
        datasets: [{
            label:"close",
            tension: 0,
            data: close,//.slice(0, 10),
            backgroundColor:"black",
            borderWidth: 2,
            borderColor:'lightblue',
            hoverBorderWidth:3,
            hoverBorderColor:'black'
            //pointRadius: 0
        }
    ]
        },
        options:{
            responsive: true,
            maintainAspectRatio: false,
            title:{
                display:true,
                text:"Stock Price of IBM, dated: ",// + unique_date,
                fontSize:25
            },
         
            legend:{
                display:true,
                position:'top',
                labels:{
                    fontColor:'#777'
                }
            },
            layout:{
                padding:{
                    right:0,
                    left:0,
                    bottom:0,
                    top:0
                }
            },
            tooltips:{
                enabled:true
            }
        }
    });
}

