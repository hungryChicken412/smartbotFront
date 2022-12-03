// redirect if cookie exists in local storage 


export const customHelpers = {
  checkAuth,
  fixAuth
  
}
function checkAuth(router, destination, authStatus = true) {  //authStatus = true means user is logged in
  var cookie = '';
  if (typeof window !== 'undefined') {
    cookie = localStorage.getItem('token');
  }
  var auth = false;
  
  if ((cookie == '' || cookie == 'undefined' ||  cookie == null)) {
    auth = false;
  } else {
    auth = true;
  }

  if (auth == authStatus && destination != null) {
    try{
      
      if (typeof window != 'undefined' && !auth){
        router.push(destination);
      }
      
    }
    catch(e){
        console.log(e);
    }
  }

  return [auth, cookie];

}

function fixAuth(value){
  try{localStorage.removeItem(value);}
  catch{console.log("fixAuth: error removing item");}

}




