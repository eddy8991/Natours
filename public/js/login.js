import axios from "axios"

export const login = async (email, password) => {
  try{
    const res = await axios({
      method:'Post',
      url:'http://127.0.0.1:3000/api/v1/users/login',
      data:{
        email,
        password
      }
    })
    if(res.data.status === 'success'){
      alert('Successfully logged in')
      window.setTimeout(()=>{
        location.assign('/')
      }, 1500)
    }
  }catch(err){
    alert(err.response.data.message )
  }


}

export const logout = async () =>{
  try{
    const res = await axios ({
      method:'GET',
      url:'http://127.0.0.1:3000/api/v1/users/login',
    });
    if(res.data.status === 'success')location.reload(true)
  }catch(err){


  }
}
