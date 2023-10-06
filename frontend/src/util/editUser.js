import axios from "axios"


export const editUser = async (data) => {
    try {
        const res = await axios.post("http://localhost:5000/auth/user/update", data, {

            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        });
        if (res.status == 401) {
            return false;
        }
        else if (res.status == 200) {
            return true;
        }
        else {
            throw new Error(result);
        }
    } catch (error) {
        return error;
    }
}