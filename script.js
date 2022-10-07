

let formwrapper = document.getElementById("registrationForm");

formwrapper.addEventListener("submit", function(event){
    event.preventDefault();
    let errors = {};
    let form = event.target;

////////////////////////////////////////////////////////////////////////
    let userName = document.getElementById("userName").value;
    if(userName == ""){
        errors.userName = "UserName can not be empty";
    }
    if(userName.length < 4){
        errors.userName = "userName must contain more than 3 characters";
    }

    let save = document.getElementById("save");
    if(save.checked){
        let fNameValue = document.getElementById("userName").value;
        Cookies.set("userFirstName", fNameValue);
    }else{
        Cookies.remove("userFirstName");
    }
///////////////////////////////////////////////////////////////////////////

    let password1 = document.getElementById("password1").value;
    let password2 = document.getElementById("password2").value;
    if(password1 == ""){
        errors.password1 = "You must enter password";
    }
    if(password1 != password2){
        errors.password2 = "Passwords do not match";
    }
    
    



    let agree = document.getElementById("agree").checked;
    if(!agree){
        errors.agree = "You must agree terms and conditions";
    }


    let age = false;
    form.querySelectorAll('[name="userAge"]').forEach((item) => {
        if(item.checked){
            age = true;
        }
    })
    if(!age){
        errors.userAge = "Please select your age";
    }  

    form.querySelectorAll(".error-text").forEach(element =>{
        element.innerText = " ";
    })


    for(let item in errors){
        let spanError = document.getElementById('error_' + item);

        if(spanError){
            spanError.textContent = errors[item];
        }
    }

    if(Object.keys(errors).length == 0){
        form.submit();
    }
});

// toggle icon
let toggleicon = document.getElementById("toggleicon");

toggleicon.addEventListener("click", function(){
    if(password1.type == "password"){
        password1.setAttribute("type", "text"); 
        password2.setAttribute("type", "text");
        toggleicon.classList.remove("fa-eye");
        toggleicon.classList.add("fa-eye-slash");
    }else{
        password1.setAttribute("type", "password");
        password2.setAttribute("type", "password");
        toggleicon.classList.remove("fa-eye-slash");
        toggleicon.classList.add("fa-eye");
    }
});

// email validation
document.getElementById("email").addEventListener("keydown", function(){
    let emailvalue = document.getElementById("email").value;
    let emailspan = document.getElementById("emailspan");

    let emailpattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(emailvalue.match(emailpattern)){
    emailspan.innerText = "Your email is valid";
    emailspan.style.color = "green";
    }else{
    emailspan.innerText = "Your email is not valid";
    emailspan.style.color = "red";
    }
});


// localstorage

let counterUser = localStorage.getItem("counter");
let newValue;

if(!counterUser){
    newValue = 1;
}else{
    newValue = parseInt(counterUser) + 1;
}
localStorage.setItem("counter", newValue);
document.getElementById("usercounter").textContent = localStorage.getItem("counter");


// cookies ///////////////////////////////////////////////////

let savedName = Cookies.get("userFirstName");
if(savedName){
    document.getElementById("userName").value = savedName;
    document.getElementById("save").checked = true;
}
//////////////////////////////////////////////////////////////
