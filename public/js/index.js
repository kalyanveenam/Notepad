console.log("client side scripting starts here");
const submit_button = document.getElementById("submit");
const uname_button = document.getElementById("uname");
const age_button = document.getElementById("age");


function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

submit_button.addEventListener("click", getuser);

function getuser() {
  console.log("clicked");

  const username = uname_button.value;
  const password = age_button.value;
  console.log("username" + username);
  console.log("password" + password);
  const user = {
    email: username,
    password: password,
  };
  let options = {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      mode: "no-cors",
    },
    body: JSON.stringify(user),
  };

  fetch("/users/login", options)
    .then((response) => response.json())
    .then((data) => {
      setCookie('token',data.token,2)

    console.log(data.token)
    window.location='/notespage'
    })
    .catch((error) => {
      console.log("Error:", error);
    });

}

