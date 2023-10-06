export const downloadImage = (file) =>{


    try {
        const url = `http://localhost:5000/auth/user/stream/${file}`;
        const link = document.createElement('a');
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
  
}