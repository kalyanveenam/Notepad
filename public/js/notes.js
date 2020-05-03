const input_title = document.getElementById("input-title");
const input_note = document.getElementById("input-body");
var btn_submit = document.getElementById("btn-addNote");
const btn_getNotes = document.getElementById("btn-getNote");
const div_notes = document.getElementById("div-msg");
const btn_delete = document.getElementById("btn-delNote");
const btn_refresh = document.getElementById("btn-refNote");
Handlebars.registerHelper("data", function (property) {
  return property;
});

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

let tokendata = getCookie('token');
console.log('token value-------->' + tokendata)


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
      Authorization:
        "Bearer "+tokendata,
    },
  })
    .then(function (data) {
      data.json().then((data) => {
        console.log(data);
        var notes_data = {};
        notes_data.notes = data;
        var data = notes_data;
        var note_data = document.getElementById("temp-getData").innerHTML;
        var template = Handlebars.compile(note_data);
        var note_dt = template(data);
        console.log(data);
        $(document).ready(function () {
          $(".view-details").on("click", function (e) {
            e.preventDefault();
            console.log("clicked");
          });
        });
        document.getElementById("div-dispNote").innerHTML = note_dt;
        const data_id = document.getElementById("div-dispNote").innerHTML;
        console.log(data_id);
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
function getIdOnClick(id) {
  console.log(id);
  document.getElementById("div-dummy").innerHTML = id;
}
document.getElementById("btn-delNote").addEventListener("click", function (e) {
  const get_id = document.getElementById("div-dummy").innerHTML;
  console.log("id:" + get_id);
  const data = {
    _id: get_id,
  };
  const url = "/notes/delete/" + get_id;
  console.log(url);
  fetch(url, {
    method: "delete",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  }).then((req, res) => {
    console.log("Note is deleted");
  });
});
btn_refresh.addEventListener("click", function (e) {
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
        console.log(data);
        $(document).ready(function () {
          $(".view-details").on("click", function (e) {
            e.preventDefault();
            console.log("clicked");
          });
        });
        document.getElementById("div-dispNote").innerHTML = note_dt;
        const data_id = document.getElementById("div-dispNote").innerHTML;
        console.log(data_id);
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
