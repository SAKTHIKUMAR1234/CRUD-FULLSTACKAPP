import axios from "axios"


export const isNotExist=async (email)=>{
    
    try {
       const response= await axios.get(`http://localhost:5000/auth/user/find/${email}`,{
        withCredentials:true
       });
       if(response.status===401){
            return new Error(response);
       }
       if(response.data.length===0){
        return true;
       }
       else{
        return false;
       }
    } catch (error) {
        console.log(error);
    }

}

