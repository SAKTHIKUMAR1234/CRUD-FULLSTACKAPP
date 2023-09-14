// import axios from "axios"

// export const getImage = async (url) =>{
//     const response =await axios.get(url);
//     const blob = await response.blob();
//     const file = new File([blob],getFileName(url),response.headers.get('content-Type'));
//     return file;
// }


// const getFileName = (url) =>{
//     return ((url+"").split('/'))[0];
// }