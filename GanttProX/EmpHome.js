var para = new URLSearchParams(window.location.search)
var docId = para.get("docId");
console.log(docId);
pnames=[]
ptasks=[]
tids=[]
db.collection("Tasks").where('assigedTo','==',docId).get().then((docc)=>{
    docc.forEach(element => {
       console.log(element.data());
       var projId = element.data().projectId;
       var tid = element.id;
      tids.push(tid);    
       var ptask = element.data().taskName;
       var stat = element.data().status;
        db.collection("Projects").doc(projId).get().then((docx)=>{
           console.log(docx.data());
            var pname = docx.data().projectName;
            console.log(pname);
            getnewFn(pname,ptask,tid,stat,projId);
        })
    })

})
    const lis = document.querySelector('#myList');
    let i = 0;
    function getnewFn(pname,ptask,tid,stat,projId) {
        let li = document.createElement("tr");
        let dv1 = document.createElement("div");
        dv1.id = 'group_2';
        let dv2 = document.createElement("div")
        dv2.id = 'rectangle_10';
        dv1.appendChild(dv2);
        let dv3 = document.createElement("div")
        dv3.id = 'project_name';
        dv3.textContent = pname;
        dv1.appendChild(dv3);
        let dv4 = document.createElement("div");
        dv4.id = 'task';
        dv4.textContent = ptask;
        dv1.appendChild(dv4);
        let dv5 = document.createElement("div")
        dv5.id="rectangle_11";
        dv1.appendChild(dv5);
        let dv6 = document.createElement("div")
        dv6.id='rectangle_17';
        dv1.appendChild(dv6);
        let dv7 = document.createElement("div")
        dv7.id = 'update_status'
            let drop = document.createElement("select")
            drop.name = tid;
            console.log("tid: "+tid);
            drop.id = 'status_drop'
                let op1 = document.createElement("option")
                op1.value="";
                op1.textContent='Update Status'
                let def = document.createElement("option")
                def.value = stat;
                def.textContent = stat;
                drop.appendChild(def);
                drop.appendChild(op1);
                if(stat!="In Progress"){
                let op2 = document.createElement("option")
                op2.value="inProgress";
                op2.textContent='In Progress';
                drop.appendChild(op2);
                }
                if(stat!="Completed"){
                let op3 = document.createElement("option")
                op3.value="completed"
                op3.textContent="Completed"
                drop.appendChild(op3);
            }
            dv7.appendChild(drop);
        dv1.appendChild(dv7);
       /*  let a1 = document.createElement('a');
        a1.href='view_progress.html';
        let dv8 = document.createElement('div');
        dv8.id='view_progress'
        dv8.textContent='View Progress';
        a1.appendChild(dv8);
        dv1.appendChild(a1); */

        let dv8 = document.createElement('div');
        dv8.id='view_progress'
        dv8.textContent='View Progress';
        dv8.name=projId;
        dv8.setAttribute("onClick","viewProg(this.name)");
        dv1.appendChild(dv8);
        li.appendChild(dv1);
        lis.appendChild(li);

        
    }
    function joinTeam() {
        var tcode = document.getElementById('rectangle_191').value;
       
        
        setTimeout(() => {
            db.collection("Projects").doc(tcode).get().then((doc)=>{
                if(doc.exists){
                     db.collection("Projects").doc(tcode).update({
            team: firebase.firestore.FieldValue.arrayUnion(docId)
        }).then(() =>alert('team joined successfully'))
                } else{
                alert('No such Team');
            }})
            
           
            
           },1000
       ) ;  
    }
    function yourProj() {

        update();
        setTimeout(() => {
            var para = new URLSearchParams();
            para.append("docId", docId);
            window.location.href = "your_projects.html?" + para.toString();
                 
        }, 1000);
        
    }
    function viewProg(projId) {
        update();
        setTimeout(() => {
            var para = new URLSearchParams();
        para.append("docId",docId);
        para.append("projId",projId);
        window.location.href = "view_progress.html?" + para.toString();
        }, 1000);
    }


    function update() {
        for (let i = 0; i < tids.length; i++) {
            
                console.log(tids[i]);
                var par=document.getElementsByName(tids[i])[0];
                var index=par.selectedIndex
                console.log();
                db.collection("Tasks").doc(tids[i]).update({
                    status: par.options[index].text
                }).then(()=> {
                    console.log(i);
                });
                
            
            
        }

        
    }