/*const loginForm = document.getElementById("#loginForm")


loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    db.collection("user_db").get().then((docc)=>{
        docc.docc.forEach(element => {
            if(element.data().email == email)
            alert('Yep');
            
        });
    });
})
*/

function signInFn() {
    let email = document.getElementById("rectangle_3_1").value;
    let pass =  document.getElementById("rectangle_4_1").value;
    let ar1 = [];
    let ar2 = [];

    
    db.collection("user_db").get().then((docc)=>{
        docc.forEach(element => {
            if(element.data().email == email)
            {
                if(pass==element.data().password)
                {
                    ar1.push('something');
                    alert("Login successful");
                var para = new URLSearchParams();
                para.append("docId", element.id);
                window.location.href = "employee_home.html?" + para.toString();
                
        
                }
                else
                alert("Invalid Password");
                //alert('Yep');
            }
            
        }
       )
        
        
    

    }).then((docc)=>{if (ar1.length==0) {
        alert("invalid login");
        
    }})
    
}

function signUpFn() {
    let n = document.getElementById('rectangle_3_ek1_1').value;
    let e = document.getElementById('rectangle_4_ek1_1').value;
    let p = document.getElementById('rectangle_5_ek1_1').value;
    let ar1 = [];

    db.collection("user_db").get().then((docc)=>{
        docc.forEach(element => {
            if(element.data().email == e)
            {
               
            ar1.push(e);
            
            }
            
        });
        if(ar1.length==0)
        {
            db.collection("user_db").add({
                name: n,
                email: e,
                password: p
            }).then((docc)=>{
            alert('Sign Up Successful');
            
            window.location.href = 'index.html';})
        }
        else
        {
            alert(ar1.length + 'User Already exits');
        }
})
}   
