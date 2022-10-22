import axios from "axios";
const   UploadImages=  async (file)=>{
    const FormData = require('form-data');
    let  imageObj;
    const formData = new FormData();
        formData.append('file', file);
      formData.append('upload_preset', 'KC_PRESENT');
      formData.append('folder','Postive-reframing');
      const config = {
        method: 'post',
        url: 'https://api.cloudinary.com/v1_1/dhw5h8j3v/image/upload',
        headers: formData.getHeaders ? formData.getHeaders():{ 'Content-Type': 'multipart/form-data' },
        data : formData
      };
     await axios(config)
      .then((response) => response.data).then((data)=>{
        console.log(data)
         imageObj={
          src:data.secure_url,
          caption: 'This is a caption',
          name:data.original_filename
          
        }
        console.log(imageObj)
        
      })
      .catch(error=>{
       console.log("Error occured>>",error)
       return null
      })
    
      return imageObj;
}
export default UploadImages;

