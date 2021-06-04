var para = new URLSearchParams(window.location.search)
var docId = para.get("docId");
var projId = para.get("projId");
console.log("doc: "+docId);
console.log("proj: "+projId);
let tasks =[]
let team = []
db.collection("Projects").doc(projId).get().then((pp)=>{

    let teamm = pp.data().team;
    for(let i=0; i<teamm.length; i++)
    {
        db.collection("user_db").doc(teamm[i]).get().then((usr)=>{
            console.log(usr.data().name);
            team.push(usr.data().name);
        })

    }
}).then(()=>{




db.collection("Tasks").where('projectId','==',projId).get().then((element) =>{
    element.forEach(docc => {

        let tid = docc.id;
let tname = docc.data().taskName;
let duration = docc.data().duration;
let start_date = docc.data().startDate.toDate().toISOString().split('T')[0];    

let asto = docc.data().assigedTo;
let status = docc.data().status;

let f = 0;

setTimeout(() => {
    var assto="";
db.collection("user_db").doc(asto).get().then((usrr)=>{
    assto = usrr.data().name;
     
}).then(()=>{


    console.log(tname,duration,assto,status,start_date);
    getnewFn(tname,duration,start_date,assto,status,tid,team);
    tasks.push(tid);
})
}, 1000);


})
    
})

})

const lis = document.querySelector('#myList');
    let i = 0;
    function getnewFn(tname,duration,start_date,assto,status,tid,team) {
        console.log(assto);
        let li = document.createElement("tr");
        let dv1 = document.createElement("div");
        dv1.id = 'someGrp';
        let dv2 = document.createElement("input")
        dv2.id = 'processes1';
        dv2.type="text"
        dv2.placeholder="Process Name"
        dv2.value = tname;
        dv2.name = tid +'1';
        dv1.appendChild(dv2);

         let dv3 = document.createElement("input")
        dv3.id = 'duration1';
        dv3.type="text"
        dv3.placeholder="Duration"
        dv3.value = duration;
        dv3.name = tid +'2';
        dv1.appendChild(dv3); 
        
        let dv4 = document.createElement("input")
        dv4.id = 'start_date1';
        dv4.type="date"
        dv4.value = start_date;
        dv4.placeholder="Start Date"
        dv4.name = tid + '3';
        dv1.appendChild(dv4);

        let drop1 = document.createElement("select")
        drop1. name = tid +'4';
        drop1.id = 'assigned_to1'
        let op = document.createElement("option")
        op.value=assto;
        op.textContent=assto;

        drop1.appendChild(op);

            for(let i = 0; i <team.length; i++)
            {
                if(team[i] != assto){
            let op1 = document.createElement("option")
            op1.value=team[i];
            op1.textContent=team[i];
            drop1.appendChild(op1);
    }}
             dv1.appendChild(drop1);
       
            let drop = document.createElement("select")
            drop.id = 'status1'
            drop.name = tid +'5';
               
                let opp = document.createElement("option")
                opp.value=status;
                opp.textContent=status;
                drop.appendChild(opp);

            if(status!="In Progress")
            {
                let op2 = document.createElement("option")
                op2.value="In Progress"
                op2.textContent="In Progress"
                drop.appendChild(op2);
            }
            if(status!="Completed")
            {
                let op3 = document.createElement("option")
                op3.value="completed"
                op3.textContent="Completed"
                drop.appendChild(op3);
            }
        dv1.appendChild(drop);
        
        li.appendChild(dv1);
        lis.appendChild(li);

        
    }

    function newTask() {
        db.collection("Tasks").add({
            assigedTo:"",
            duration:0,
            startDate:new Date(),
            projectId: projId,
            endDate:new Date(),
            status: '',
            taskName:''
        }).then((refff) =>{
            tasks.push(refff.id);
            let taskId = refff.id;

        
        let li = document.createElement("tr");
        let dv1 = document.createElement("div");
        dv1.id = 'someGrp';
        let dv2 = document.createElement("input")
        dv2.id = 'processes1';
        dv2.type="text"
        dv2.placeholder="Process Name"
        
        dv2.name= taskId + '1';
        dv1.appendChild(dv2); 


         let dv3 = document.createElement("input")
        dv3.id = 'duration1';
        dv3.type="text"
        dv3.placeholder="Duration"
        
        dv3.name = taskId+'2';
        dv1.appendChild(dv3); 

         let dv4 = document.createElement("input")
        dv4.id = 'start_date1';
        dv4.type="date"
        
        dv4.placeholder="Start Date"
        dv4.name = taskId+'3';
        dv1.appendChild(dv4);

        let drop1 = document.createElement("select")
        drop1.id = 'assigned_to1'
        drop1.name = taskId+'4';
        let op = document.createElement("option")
           op.value ="";
        op.textContent="Assigned to";
        drop1.appendChild(op);
            for(let i = 0; i <team.length; i++)
            {
            let op1 = document.createElement("option")
           op1.value = team[i];
            op1.textContent=team[i];
            drop1.appendChild(op1);
    }
             dv1.appendChild(drop1);
       
            let drop = document.createElement("select")
            drop.id = 'status1'
            drop.name = taskId+'5';
               
                let op2 = document.createElement("option")
                op2.value="inProgress";
                op2.textContent='In Progress';
                drop.appendChild(op2);
                let op3 = document.createElement("option")
                op3.value="completed"
                op3.textContent="Completed"
                drop.appendChild(op3);
           
        dv1.appendChild(drop);
        
        li.appendChild(dv1);
        lis.appendChild(li);
    })

        
    }


    function update() {

        console.log("tasks:" +  tasks)
        for(let i = 0; i <tasks.length; i++)
        {
            let id1 = tasks[i] + "3"
            let startDatee = document.getElementsByName(id1)[0].value;
            let durn =  parseInt(document.getElementsByName(tasks[i]+'2')[0].value)
            let endDatee = document.getElementsByName(id1)[0].value;
            console.log(startDatee);
            endDatee = Date.parse(endDatee);
            endDatee = new Date(endDatee);
            startDatee = Date.parse(startDatee);
            startDatee = new Date(startDatee);
            endDatee.setDate(startDatee.getDate() + durn)
         

            startDatee = firebase.firestore.Timestamp.fromDate(startDatee);
            console.log(startDatee );


            asto = document.getElementsByName(tasks[i]+'4')[0].value;
            db.collection("user_db").where("name","==",asto).get().then((el)=>{
              el.forEach(elem => {
                  asto = elem.id;
              }); 
            
            
            }).then(()=>{  
            db.collection("Tasks").doc(tasks[i]).update({
                assigedTo: asto,
                duration:(document.getElementsByName(tasks[i]+'2')[0].value),
                startDate: startDatee,
                projectId: projId,
                endDate:endDatee,
                status: document.getElementsByName(tasks[i]+'5')[0].value,
                taskName:document.getElementsByName(tasks[i]+'1')[0].value                
            }).then(()=> {console.log("asto: " + asto,"duration" + (document.getElementsByName(tasks[i]+'2')[0].value),"start: "+ startDatee,"projId: "+ projId, "status: " + document.getElementsByName(tasks[i]+'5')[0].value, "taskName: "+ document.getElementsByName(tasks[i]+'1')[0].value  )});
        })
        }
        
    }

    function proceed()
    {
        update();

        setTimeout(() => {
            var para = new URLSearchParams();
            para.append("docId", docId);
            window.location.href = "your_projects.html?" + para.toString();
        }, 1000);

    }