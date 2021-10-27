var chart = document.getElementById("myChart").getContext('2d');

// global properties
Chart.defaults.global.defaultFontFamily = 'Lato';
//Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';

const labels = Array.from(Array(10).keys()) ;

function plotStocks(close, open, high, low, date, time){

    // get the unique date fromt he array of dates.
    const unique_date = [...new Set(date)];
    
    var stockPriceChart = new Chart(chart, {
        type:'line',
        data:{
        labels: time,
        datasets: [{
            label:"close",
            tension: 0,
            data: close,//.slice(0, 10),
            //backgroundColor:"white",
            borderWidth: 2,
            borderColor:'lightblue',
            hoverBorderWidth:3,
            hoverBorderColor:'black',
            pointRadius: 0
        },
        {
            label:"open",
            tension: 0,
            data: open,
            //backgroundColor:"white",
            borderWidth: 2,
            borderColor:'red',
            hoverBorderWidth:3,
            hoverBorderColor:'red',
            pointRadius: 0
        },
        {
            label:"high",
            tension: 0,
            data: high,
            //backgroundColor:"white",
            borderWidth: 2,
            borderColor:'green',
            hoverBorderWidth:3,
            hoverBorderColor:'green',
            pointRadius: 0
        },
        {
            label:"low",
            tension: 0,
            data: low,
            //backgroundColor:"white",
            borderWidth: 2,
            borderColor:'yellow',
            hoverBorderWidth:3,
            hoverBorderColor:'yellow',
            pointRadius: 0
        }
    ]
        },
        options:{
            responsive: true,
            maintainAspectRatio: false,
            title:{
                display:true,
                text:"Stock Price of IBM, dated: " + unique_date,
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

