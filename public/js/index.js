console.log('client side scripting starts here')
const submit_button=document.getElementById('submit')
const uname_button=document.getElementById('uname')
const age_button=document.getElementById('age')


submit_button.addEventListener('click',function(e) {
console.log('clicked')

const username=uname_button.value;
const password=age_button.value;
console.log('username'+username)
console.log('password'+password)
 const user = {
    name: username,
    Age: password
  
};

fetch('/users', {
    method: 'post',
    headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
    body: JSON.stringify(user)
  }).then(function(response) {
   
     window.alert('User is created successfully')
     window.location="/notespage"
    return response.json();
  
  })

})

