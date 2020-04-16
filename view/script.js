const title = document.getElementById('task').value
const description= document.getElementById('description').value
const due= document.getElementById('due').value
const priority = document.querySelector('input[name="Priority"]:checked').value;

const taskid=document.getElementById('id1').value
const udue= document.getElementById('udate').value
const upriority= document.querySelector('input[name="UPriority"]:checked').value;
const udone= document.querySelector('input[name="Utask"]:checked').value;
//button id------>
let submit= document.getElementById('submit')
let update= document.getElementById('update')
let ddate_assen= document.getElementById('date_assen')
let ddate_desen= document.getElementById('date_desen')
let prior=  document.getElementById('priority')
let task_done=  document.getElementById('taskdone')
let uSubmit=document.getElementById('udata')
let cancel=document.getElementById('cancel')

const AddNote='Add Note'

getTodos();
submit.onclick = function(){
    if(title===''){
        alert('must fill title')
        return
    }
    console.log(title,due,description,priority)
    addNewTodoUrlEncoded()
    return
}

update.onclick = function(){
    console.log("hii I am update")
    return
}
ddate_assen.onclick = function(){
    console.log('hii date assen ')
    return
    
}
ddate_desen.onclick = function(){
    console.log('hii date desen ')
    return
}
prior.onclick = function(){
    console.log('hii high priority ')
    return
}
task_done.onclick = function(){
    console.log('hii tasks')
    return
    
}
update.onclick = function(){
    document.getElementById("myForm").style.display = "block";
    return
    
}
uSubmit.onclick= function(){
    updateTodoUrlEncoded()
    console.log('hii tasks update')
    console.log(taskid,udue)
    return
}
cancel.onclick = function(){
    document.getElementById("myForm").style.display = "none";
    console.log('hii cancel')
    return
    
}
async function getTodos() {
    const resp = await fetch('/todos', { method: 'GET' })
    const todos = await resp.json()
    console.log(todos)
    for(x in todos){
        document.getElementById("col1").innerHTML += todos[x].id+ "<br>",
        document.getElementById("col2").innerHTML += todos[x].title+ "<br>",
        document.getElementById("col3").innerHTML += todos[x].description 
        + "<br>",
        document.getElementById("col4").innerHTML += todos[x].due
         + "<br>";
        document.getElementById("col5").innerHTML += todos[x].priority
        + "<br>";
        document.getElementById("col6").innerHTML += todos[x].done
        + "<br>";
        document.getElementById("col7").innerHTML += "<button style='width:10; height:10;'>"+AddNote+"</button>"+"<br>";
    }
    return todos
}
async function addNewTodoUrlEncoded() {
          const resp = await fetch('/todos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `title=${title}&description=${description}&priority=${priority}&due=${due}`
          })
  }
  async function updateTodoUrlEncoded() {
      let id= taskid
    const resp = await fetch(`/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `done=${udone}&due=${udue}&priority=${upriority}`
    })
}