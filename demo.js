let form = document.querySelector('form');

function getdatas(){
let get_request = new XMLHttpRequest();

get_request.open("get",'https://mimic-server-api.vercel.app/users');

get_request.onload = ()=>{create_user(get_request.response)}

get_request.send()
}

getdatas()

function create_user(response){
    
    let users = JSON.parse(response),
        tbody = document.querySelector('tbody');
        tbody.innerHTML='';

    users.forEach(ele => {
        let row = `<tr>
             <td>${ele.id}</td>
             <td>${ele.name}</td>
             <td>${ele.email}</td>
             <td>${ele.username}</td>
            </tr>`  
            
            tbody.innerHTML+=row;
    }); 
}

function popup(){
    form.classList.toggle('setting')
}

let names = document.querySelector('#name'),
    email = document.querySelector('#email'),
    username = document.querySelector('#username'),
    adduser = document.querySelector('#submi_button');

adduser.addEventListener('click',(event)=>{

    event.preventDefault()
    let emailcheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value);
    if(email.value.trim()==='') return error_msg('red','Email field does not empty');
    if(!emailcheck) return error_msg('red','Invalid email');    
    if(names.value.trim()==='')return error_msg('red','Please enter name'); 
    if(username.value.trim()==='')return error_msg('red', 'Please enter user name');

    let send_request = new XMLHttpRequest();
    send_request.open('POST','https://mimic-server-api.vercel.app/users');
    send_request.setRequestHeader('Content-Type','application/json');

    let data = JSON.stringify(
        {
            'name' : names.value,
            'email' : email.value,
            'username' : username.value
        }  
    )
    
    send_request.send(data);
    send_request.onload = ()=>{
        getdatas();
        error_msg('green','User add successfully');
    }
    form.reset();    
})

function error_msg(clas,cont){
    let error = document.querySelector('.error_msg');

    error.classList.add(clas);
    error.textContent=cont;
    setTimeout(() => {
        error.classList.remove(clas)
        error.textContent='';
    }, 3000);
}