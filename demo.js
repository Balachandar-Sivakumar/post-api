let form = document.querySelector('form');
let editbtn = document.querySelectorAll('.edit_button'),idn=0;
let names = document.querySelector('#name'),
    email = document.querySelector('#email'),
    username = document.querySelector('#username'),
    adduser = document.querySelector('#submi_button');

function getdatas(){
let get_request = new XMLHttpRequest();

get_request.open("get",'https://mimic-server-api.vercel.app/users/');

get_request.onload = ()=>{create_user(get_request.response)}

get_request.send()


}

getdatas()

function create_user(response){
    
    let users = JSON.parse(response),
        tbody = document.querySelector('tbody');
        tbody.innerHTML='';

    users.forEach(ele => {
        let row = document.createElement("tr"),
             id = document.createElement("td"),
             name =document.createElement("td"),
             Email = document.createElement("td"),
             Username = document.createElement("td"),
            edittd =document.createElement("td"),
            deltd = document.createElement("td"),
             edit =document.createElement("button"),
             dele =document.createElement("button");

             id.textContent=ele.id,
             name.textContent=ele.name,
             Email.textContent=ele.email,
             Username.textContent=ele.username,
             edit.textContent='Edit',
             dele.textContent='Delete';

            edittd.append(edit);
            deltd.append(dele);

             row.append(id,name,Email,Username,edittd,deltd);

             tbody.appendChild(row);

             edit.addEventListener('click',()=>{
                adduser.textContent="Edit";
                form.classList.add('setting');
                idn=id.textContent; 
                names.value=name.textContent;
                email.value=Email.textContent;
                username.value=Username.textContent; 
             })

             dele.addEventListener('click',()=>{
                idn=id.textContent;
                delete_database(idn);
               
             })


  
        })  
}

function popup(){
    form.classList.toggle('setting')
}



adduser.addEventListener('click',(event)=>{
  
    event.preventDefault();
  
    if(adduser.textContent=='Edit') return datasbase('PUT',idn);
    
    datasbase('POST');
        
})

function datasbase(method,id){
    let emailcheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value);
    if(email.value.trim()==='') return error_msg('red','Email field does not empty');
    if(!emailcheck) return error_msg('red','Invalid email');    
    if(names.value.trim()==='')return error_msg('red','Please enter name'); 
    if(username.value.trim()==='')return error_msg('red', 'Please enter user name');

    let send_request = new XMLHttpRequest();
    send_request.open(method,`https://mimic-server-api.vercel.app/users${!id ? '/' : `/${id}`}`);
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
        if(id) return error_msg('green','User editted success fully');
        error_msg('green','User add successfully');
    }
    form.reset();
    adduser.textContent='Submit';
    idn=0;
}

let errors = document.querySelector('.error_msg');

function error_msg(clas,cont){

    errors.classList.add(clas);
    errors.textContent=cont;
    setTimeout(() => {
        errors.classList.remove(clas)
        errors.textContent='';
    }, 3000);
}

function delete_database(sum){
    let delete_request = new XMLHttpRequest();
    delete_request.open('DELETE',`https://mimic-server-api.vercel.app/users/${sum}`);

    delete_request.onload=()=>{
        getdatas();
        error_msg('red',"User deleted successfully");idn=0;
    }

    delete_request.send()
}







