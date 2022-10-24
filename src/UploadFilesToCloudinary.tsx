import { IonBackButton, IonCol, IonIcon, IonImg, IonItem } from "@ionic/react";
import axios from "axios";
import { FormEventHandler } from "react";

const   UploadImagesCompnent:React.FC<{
  setOtherFields:()=>void;
  setMessage:(arg0: string)=>void;
  tweet: any;
  photos: any;
  addTweet:(tweet: any)=>void;
  settweetBtnText:(text:string)=>void;
  tweetBtnText:string
  LeftPart:any
}> = props  => {

  const uplaodImage=async()=>{
    console.log("Helooooooooooooooooo")
    if(props.photos.length==0){
     props. addTweet(props.tweet)
    }

  props.settweetBtnText("waiting..")

    const FormData = require('form-data');
    props.setMessage("Uploading image...")
    
    let  imageObj: { name: any; src?: any; caption?: string; };

    for (const photo in props.photos) {
      if (Object.hasOwnProperty.call(props.photos, photo)) {
        const file = props.photos[photo];
       const formData = new FormData();
        formData.append('file',file);
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
  
       props.setMessage("Uploaded image: "+imageObj.name)
       props.settweetBtnText("Tweet")
    
        props.tweet.images.push(imageObj);
  
        if(props.tweet.images.length==props.photos.length){
         props. addTweet(tweet);
        }
      })
      .catch(error=>{
       console.log("Error occured>>",error)
       props.setMessage("Error occured !")
      
       return null
      })
      }
    }
  
}

const submitTweet=(e:any)=>{
  e.preventDefault();
  props.setOtherFields();
                  console.log("Photos number>>",props.photos.length)
                  if(props.photos.length==0){
                    props.addTweet(props.tweet)
                  }
                  uplaodImage();

}


return(   
  <>
    <form
          encType="multipart/form-data"
          onSubmit={(e)=>submitTweet(e)}
          className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
          >
          <props.LeftPart/>
          </form>
  </>
         
        
       
  
)
}
export default UploadImagesCompnent;

function tweet(tweet: any) {
  throw new Error("Function not implemented.");
}

