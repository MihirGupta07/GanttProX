var para = new URLSearchParams(window.location.search)
var docId = para.get("docId");
console.log(docId);
const lis = document.querySelector('#myList');
let i = 0;
projArray=[];

db.collection("Projects").where("managedBy","==",docId).get().then((docc)=>{
docc.forEach(element => {
    projArray.push(element.id);
    projName = element.data().projectName;
    projId = element.id;
    let li = document.createElement("tr");
    let dv1 = document.createElement("div");
    dv1.id = 'project_1';
    let dv2 = document.createElement("input")
    dv2.id = element.id;
    dv2.type = 'text';
    dv2.className = 'project_1_ek1';
    dv2.placeholder="Project Name"
    dv2.value = projName;
    dv2.textContent = projName;
    
    dv1.appendChild(dv2);

    /*let i1 = document.createElement("img");
    i1.src = "skins/rectangle_10_ek2.png";
    i1.id="rectangle_10_ek2";
    dv1.appendChild(i1);*/


 
    let b1 = document.createElement("button")
    b1.type='button';
    b1.id = 'edit_team';
    b1.setAttribute("onClick","editTeam(this.name)");

    b1.name = projId;
    b1.textContent='Edit Team';
   
    dv1.appendChild(b1);

    
    let b2 = document.createElement("button")
    b2.type='button';
    b2.setAttribute("onClick","manageProj(this.name)");
    b2.id = 'manage_project';
    b2.name = projId;
    b2.textContent='Manage Project';
    
    dv1.appendChild(b2);
    
    let b3 = document.createElement("button")
    b3.type='button';
    b3.name = projId;
    b3.setAttribute("onClick","viewProg(this.name)");
    b3.textContent='View Progress';
    b3.id = 'view_progress_ek2';
    
    dv1.appendChild(b3);


    li.appendChild(dv1);
    lis.appendChild(li);

    
})
});





function getnewFn() {
    db.collection("Projects").add({
        managedBy: '',
        projectName: '',
        team: []
    }).then((ref)=>{
            let projjId=ref.id;
            projArray.push(projjId);
            console.log(projjId);
    
    
    ++i;
    let li = document.createElement("tr");
    let dv1 = document.createElement("div");
    dv1.id = 'project_1';
    let dv2 = document.createElement("input");
    dv2.id = projjId;
    dv2.type = 'text';
    dv2.className = 'project_1_ek1';
    dv2.placeholder="Project Name"
    dv1.appendChild(dv2);


 
    let b1 = document.createElement("button")
    b1.type='button';
    b1.id = 'edit_team';
    b1.setAttribute("onClick","editTeam(this.name)");
    b1.name = projjId;
    b1.textContent='Edit Team';
   
    dv1.appendChild(b1);

    
    let b2 = document.createElement("button")
    b2.type='button';
    b2.setAttribute("onClick","manageProj(this.name)");
    b2.id = 'manage_project';
    b2.name = projjId;
    b2.textContent='Manage Project';
    
    dv1.appendChild(b2);
    
    let b3 = document.createElement("button")
    b3.type='button';
    b3.name = projjId;
    b3.setAttribute("onClick","viewProg(this.name)");
    b3.textContent='View Progress';
    b3.id = 'view_progress_ek2';
    
    dv1.appendChild(b3);


    li.appendChild(dv1);
    lis.appendChild(li);
})

    
}
function submit() {
    for (let i = 0; i < projArray.length; i++) {
        console.log(projArray[i]);
        db.collection("Projects").doc(projArray[i]).update({

            projectName: document.getElementById(projArray[i]).value,
            managedBy: docId
        }).then(()=> {console.log(i)});
        
    }   
}

function editTeam(projId) {
    submit();
    setTimeout(() => {
        var para = new URLSearchParams();
   
    para.append("docId", docId);
    para.append("projId",projId);
    window.location.href = "edit_team.html?" + para.toString();
console.log('id'+projId)  
    }, 1000);
        
    }

function manageProj(projId) {
    submit();
    setTimeout(() => {
         var para = new URLSearchParams();
    para.append("docId", docId);
    para.append("projId",projId);
    window.location.href = "manage_project.html?" + para.toString();
    }, 1000);
        
  
   
}
    


function viewProg(projId) {
    submit();
    setTimeout(() => {
        var para = new URLSearchParams();
    para.append("docId",docId);
    para.append("projId",projId);
    window.location.href = "view_progress.html?" + para.toString();
    }, 1000);
 }
function EmpHome() {
    var para = new URLSearchParams();
    para.append("docId", docId);
    window.location.href = "employee_home.html?" + para.toString();
}

