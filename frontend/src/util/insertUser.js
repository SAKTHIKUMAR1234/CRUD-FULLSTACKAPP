import axios from "axios"


export const insertUser=async (details)=>{
    try {
        const res=await axios.post("http://localhost:5000/auth/user/add",details,{
                headers:{
                    "Content-Type": "multipart/form-data"
                },
                withCredentials:true,
        });
        if (res.status == 401) {
            return false;
        }
        else if(res.status==200){
            return true;
        }
        else {
            throw new Error(result);
        }
    } catch (error) {
        console.log(error)
        return error;
    }
}