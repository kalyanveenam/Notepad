console.log(' notes app script')
const input_title= document.getElementById('title-note')
const input_note= document.getElementById('note')
var btn_submit=document.getElementById('submit-note')
const btn_getNotes=document.getElementById('getnotes')
const div_notes=document.getElementById('data-notes')


btn_submit.addEventListener('click',function(e){
    const title=input_title.value;
    const data=input_note.value;
    const note={
        "title": title,
        "note": data
    }
    fetch('/notes', {
        method: 'post',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
        body: JSON.stringify(note)
      }).then(function(response) {
        div_notes.innerHTML='<h3>Note is added sucessfully</h3>'
 
        //window.alert('Note is Added successfully')
       //  window.location="/notespage"
       if(response){
        return response.json();
        console.log(response.json());
       }
           
       

      })
        
})
btn_getNotes.addEventListener('click',function(e){
fetch('/notes',{
    method: 'get',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },


}).then(function(data){
data.json().then((data)=>{
console.log(data)
})
}).catch((error)=>{
    console.log(error)
})

})

