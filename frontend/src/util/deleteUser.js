import axios from "axios"


export const deleteUser=async (email)=>{

    
    try {
      const res= await axios.delete(`http://localhost:5000/auth/user/delete/${email}`,{
        withCredentials:true,
       });

       if(res.status===401){
        return false;
       }
       else if(res.status===200){
        return true;
       }
       else{
        throw new Error(res);
       }
    } catch (error) {
        console.log(error);
    }

}

