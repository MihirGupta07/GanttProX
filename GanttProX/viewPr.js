google.charts.load('current', {'packages':['gantt']});
var para = new URLSearchParams(window.location.search)
var docId = para.get("docId");
console.log(docId);
var projId= 'fdgijVZfpafverk7GRqC';




let arr = [];

function add()
{
      let taskName = document.getElementById("taskName").value;
      console.log(taskName);

      let startDate = document.getElementById("startDate").value;
      startDate = Date.parse(startDate);
      startDate = new Date(startDate);
      console.log(startDate );

      let endDate = document.getElementById("endDate").value;
      endDate = Date.parse(endDate);
      endDate = new Date(endDate);
      console.log(endDate);

      let duration = startDate.getTime() - endDate.getTime();
      duration = duration / (1000 * 3600 * 24);
      console.log(duration);

      var inputs = [taskName , taskName, startDate, endDate, duration, 0 , null];

      arr.push(inputs);
      console.log(arr);
}

function drawChart()
{
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Task ID');
      data.addColumn('string', 'Task Name');
      data.addColumn('date', 'Start Date');
      data.addColumn('date', 'End Date');
      data.addColumn('number', 'Duration');
      data.addColumn('number', 'Percent Complete');
      data.addColumn('string', 'Dependencies');


      console.log(arr);

      for(var i=0;i<arr.length;i++)
        data.addRows([arr[i]]);

      var options = {
        height: 400,
        gantt: {
          trackHeight: 30
        }
      };

      var chart = new google.visualization.Gantt(document.getElementById('chart_div'));

      chart.draw(data, options);
    }
