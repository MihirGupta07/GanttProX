google.charts.load('current', {'packages':['gantt']});
var para = new URLSearchParams(window.location.search)
var docId = para.get("docId");
var projId = para.get("projId");
console.log(docId);
console.log(projId);

let arr = [];
db.collection("Tasks").where('projectId','==',projId).get().then((docc)=>{
    docc.forEach(element => {
        console.log(element.data());
        taskNames = element.data().taskName;
        startDates = element.data().startDate.toDate(); 
        console.log(startDates);

        
        console.log(typeof(startDates));
        endDates = element.data().endDate.toDate(); 

        durations = element.data().duration;
        durations = durations * -1;
        taskIds = element.data().assigedTo;
        /*let endDate = startDates;
        endDate.setDate(endDate.getDate()-durations);
        console.log(endDate)*/
        var inputs = [taskNames , taskNames, startDates, endDates, durations,0 , null];
        arr.push(inputs);

})
}).then(()=>{
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
    align: 'left',
    
    
    width: 877,
    height: 720,
    gantt: {'title': 'Gantt Chart',
      trackHeight: 50
    }
  };

  var chart = new google.visualization.Gantt(document.getElementById('chartgohere'));
  
    chart.draw(data, options);
  
  })


  function proceed()
    {
       
            var para = new URLSearchParams();
            para.append("docId", docId);
            window.location.href = "your_projects.html?" + para.toString();
       

    }
