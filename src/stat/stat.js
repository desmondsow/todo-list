import Chart from 'chart.js';
import moment from 'moment'

var dateToday = moment(Date.now())
var dateA = moment(Date.now()).startOf('week')
var dateB = moment(dateA).add(7, 'days')
var dateList = []
for(var m = dateA; m.isBefore(dateB); m.add(1, 'days'))
{
    dateList.push(m.format("dddd DD-MM-YYYY"))
}

var color = Chart.helpers.color;
 window.chartColors = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)'
    };

if(JSON.parse(localStorage.getItem('todoList')) === null)
{
    alert("Unable to sketch the graph without any data")
}
var listA = JSON.parse(localStorage.getItem('todoList'))
var listP = [0,0,0,0,0,0,0]
var listD = [0,0,0,0,0,0,0]
var listC = [0,0,0,0,0,0,0]

listA.map((item)=> 
{
    if((!item.completed &&!item.deleted))
    {
        let dateNow = moment(Date.now()).startOf('week')
        let i = 0
        for(var m = dateNow; m.isBefore(dateB); m.add(1, 'days'))
            {
                if(item.lastActionDate ===moment(m).format("DD-MM-YYYY") && !dateToday.isAfter(moment(item.lastActionDate, "DD-MM-YYYY").add(23,'hours').add(59, 'minutes').add(59, 'seconds')) )
                {
                    listP[i]++
                }
                else if(item.lastActionDate ===moment(m).format("DD-MM-YYYY") && dateToday.isAfter(moment(item.lastActionDate, "DD-MM-YYYY").add(23,'hours').add(59, 'minutes').add(59, 'seconds')))
                {
                        listD[i]++
                }
                i++
            }
    }
    else
    {
        let dateNow = moment(Date.now()).startOf('week')
        let i = 0
        for(var m = dateNow; m.isBefore(dateB); m.add(1, 'days'))
            {
                if(item.lastActionDate ===moment(m).format("DD-MM-YYYY") )
                {
                    if(item.completed)
                    {
                        listC[i]++
                    }
                    else if(item.deleted)
                    {
                        listD[i]++
                    }
                }
                i++
            }
    }
} ) // return incompleted counts

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: dateList,
        datasets: [{
            label: 'Todos were created',
            data: listP,
            backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
			borderColor: window.chartColors.green,
            borderWidth: 1
        },
        {
            label: 'Completed Todos',
            data: listC,
           	backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
			borderColor: window.chartColors.blue,
            borderWidth: 1
        },
        {
            label: 'Dued/Deleted Todos',
            data: listD,
            backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
            borderColor: window.chartColors.red,
            borderWidth: 1
        }
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});