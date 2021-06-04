var para = new URLSearchParams(window.location.search)
var docId = para.get("docId");
var projId = para.get("projId");
console.log("doc: "+docId);
console.log("proj: "+projId);

const lis = document.querySelector('#myList');

var team=[];
db.collection("Projects").doc(projId).get().then((docc)=>{
    team = docc.data().team;
}).then(()=>{
    console.log(team);
    for (let i in team) {
            console.log(team[i]);
           db.collection("user_db").doc(team[i]).get().then((doccc)=>{
               namee = doccc.data().name;
               emaile = doccc.data().email;
               getnewFn(namee,emaile);
           })
            
        
    }



})
async function copyCode() {
    await navigator.clipboard.writeText(projId);
    alert("Team Code Copied")
  }
function getnewFn(name,mail) {
    
    let li = document.createElement("tr");
    let dv1 = document.createElement("div");
    dv1.id = 'someGrp';
    let dv2 = document.createElement("div")
    dv2.id = 'member_1_s_name';
   
    dv2.textContent=name;
   
    dv1.appendChild(dv2);


    let dv3 = document.createElement("div")
    dv3.id = "member_1_s_email_address";
   dv3.textContent=mail;

    dv1.appendChild(dv3);

    li.appendChild(dv1);
    lis.appendChild(li);

    
}


function yourProj() {
    var para = new URLSearchParams();
    para.append("docId", docId);
    window.location.href = "your_projects.html?" + para.toString();
    
}


