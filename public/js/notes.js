const input_title = document.getElementById("input-title");
const input_note = document.getElementById("input-body");
var btn_submit = document.getElementById("btn-addNote");
const btn_getNotes = document.getElementById("btn-getNote");
const div_notes = document.getElementById("div-msg");
const btn_delete = document.getElementById("btn-delNote");




btn_submit.addEventListener("click", function (e) {
  const title = input_title.value;
  const data = input_note.value;
  const note = {
    title: title,
    note: data,
  };
  fetch("/notes", {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(note),
  }).then(function (response) {
    div_notes.innerHTML = "<h3>Note is added sucessfully</h3>";
    if (response) {
      return response.json();
    }
  });
});

btn_getNotes.addEventListener("click", function (e) {
  fetch("/notes", {
    method: "get",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then(function (data) {
      data.json().then((data) => {
        var notes_data = {};
        notes_data.notes = data;
        var data = notes_data;
        var note_data = document.getElementById("temp-getData").innerHTML;
        var template = Handlebars.compile(note_data);
        var note_dt = template(data);
        console.log(data)
        document.getElementById("div-dispNote").innerHTML = note_dt;
      const data_id=   document.getElementById("div-dispNote").innerHTML;
      console.log(data_id)
                 });
    })
    .catch((error) => {
      console.log(error);
    });
});
 


  document.getElementById("btn-delNote").addEventListener("click", function (e) {
      const data = {
        _id: "5e9da08ea8063d29b360a8bd",
      };

      fetch("/notes", {
        method: "delete",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      }).then((req, res) => {
        console.log("Note is deleted");
      });
    });
 document.getElementById("div-dispNote").addEventListener('click',function(){
     
console.log('clicked')
 });