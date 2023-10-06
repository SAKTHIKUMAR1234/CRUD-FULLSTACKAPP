import axios from "axios";

export const getAllUser = async () => {

    try {
        const res = await axios
            .get("http://localhost:5000/auth/user/getAll", {
                withCredentials: true
            })
            .then((response) => {
                if (response.status === 401) {
                    return false;
                }
                else if (response.status === 200) {
                    return response.data;
                }
            });
        // console.log(res);
        return res;
    } catch (error) {
        //console.log(error);
        return false;
    }

}