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

var notes_data ={};
notes_data.notes = data;
var data=notes_data
console.log('data')
console.log(data)
var note_data='{{#each notes}}<div class=title-template>{{title}}</div><div class=note-template>{{note}}</div>{{/each}}';
var tpt=Handlebars.compile(note_data)
console.log(tpt)
var note_dt=tpt(data)
console.log('test')
console.log(note_dt)
document.getElementById("notes").innerHTML=note_dt;

})
}).catch((error)=>{
    console.log(error)
})

})

//var note_data='<ol> {{#each notes}}<li>{{title}}</li><li>{{note}}</li>{{/each}}</ol>';
//var note_data=document.getElementById("notes").innerHTML;
//console.log('test2'+note_data)
//var tpt=Handlebars.compile(note_data)
// var quote_data=tpt(
    {
    notes:[
    {"title":"titlevalue",
     "note":"note value"
},
    {"title":"titlevalue",
    "note":"note value"
},
    {"title":"titlevalue",
    "note":"note value"
}
    ]     
}
//)
// console.log('temp1'+quote_data)
// document.getElementById("notes").innerHTML+=quote_data;