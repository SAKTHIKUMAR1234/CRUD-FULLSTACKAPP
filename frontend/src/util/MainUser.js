import axios from "axios"


export const isExist=async (email)=>{
    
    try {
       const response= await axios.get(`http://localhost:5000/admin/services/find/${email}`);
       if(response.data.length===0){
        return false;
       }
       else{
        return true;
       }
    } catch (error) {
        return true;
    }

}

export const createMainUser= async (data)=>{
    try {
        const response = await axios.post('http://localhost:5000/admin/services/createAdmin',data);
        if(response.status==500){
            throw new Error(result);
        }
        else{
            return response;
        }
    } catch (error) {
        return error;
    }
}

export const validateMainUser=async (data)=>{
   
    try {
        const response = await axios.post('http://localhost:5000/admin/services/authenticate',data,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        });
        if(response.status==500){
            throw new Error(result);
        }
        else{
            return response;
        }
    } catch (error) {
        return error;
    }

}

export const logoutMainUser = async () =>{
    try {
        const response = await axios.get('http://localhost:5000/admin/services/logout',{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        });

        if(response.status===200){
            return true;
        }
        else{
            return false;
        }
    } catch (error) {
        return error;
    }
}

export const regenerateURL = async (email) =>{
    try {
        const responce = await axios.get(`http://localhost:5000/admin/services/regenerateurl/${email}`,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        })
        if(responce.status===200){
            return true;
        }
        else{
            return false;
        }
    } catch (error) {
        
    }
}

