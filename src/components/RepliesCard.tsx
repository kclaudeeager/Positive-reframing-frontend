import {
  createAnimation,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonLoading,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { send } from "ionicons/icons";

import "./RepliesCard.css";
import { MentionsInput, Mention } from "react-mentions";
import { createTweet } from "../backendIntractions/TweetServices";
import { getMessege } from "./Tweet";

const RepliesCard: React.FC<{
  tweet: {
    mentions: Array<string>;
    message: string;
    attachements: any;
    hashtags: Array<string>;
    timeLeft: string;
    likes:Array<any>;
    count: number;
    displayReplies: boolean;
    replies: any;
    retweets: number;
    _id: string;
    tweet_id: string;
    shareNumber: number;
    updated_at: string;
    created_at: string;
    classification: { prediction: any; Probability: any; };
  };
  addReplies: () => void;
}> = (props) => {
  const [reply, setReply] = useState<any>();
  const [users, setUsers] = useState<any>([]);
  const [tagNames, setTagNames] = useState<any>([{}]);
  const [message, setMessage] = useState();
  const emailRegex = /(([^\s@]+@[^\s@]+\.[^\s@]+))$/;
  const myInput = useRef<any>();
  const [photos, setPhotos] = useState<any>([]);
  const [token, setToken] = useState<any>();
  const [reframedText,setReframedText]=useState<any>("") 
  const [showLoading, setShowLoading] = useState(true);
  const [reframedReply,setReframedReply]=useState<any>(null)
  const [nonReframedReply,setNonReframedReply]=useState<any>(null)
const denyref=useRef<any>(null)
const allowRef=useRef<any>(null)
const axios = require('axios');
  useEffect(() => {
    const token: string = localStorage.getItem("token") || "";
    if(token===""){
      window.location.assign("/home")
    }
    setToken(token);
    getActors();
  }, []);
  const makeId = (length: number) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charatersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.random() * charatersLength);
    }
    return result;
  };
  
  const addReply = (e: any) => {
    e.preventDefault();
    console.log("Just clicked");
    console.log("Repy", reply);
    let newReply = {
      tweet_id: "",
      mentions: [],
      message: "",
      attachements: [],
      hashtags: [],
      timeLeft: "",
      likes:[],
      count: 0,
      displayReplies: false,
      replies: [],
      retweets: 0,
      shareNumber: 0,
      updated_at: "",
      created_at: "",
      classification: { prediction: '', Probability: 0 }
    };
    if (reply?.length) {
      let newContent = reply;
      newContent = newContent.split("m@@@__").join('<a href="/user/');
      newContent = newContent.split("^^^__").join(`">`);
      newContent = newContent.split("m@@@^^^").join("</a>");
      newContent = newContent.split("t$$$__").join('<a href="/tag/');
      newContent = newContent.split("~~~__").join(`">#`);
      newContent = newContent.split("t$$$~~~").join("</a>");
      console.log(newContent);
      const hashtagList: any = [];
      const mentionList: any = [];

      if (newContent.match(/#[a-z0-9_]+/gi)) {
        newContent
          .match(/#[a-z0-9_]+/gi)
          .forEach((hashtag: string, index: any) => {
            hashtag = hashtag.substring(1);
            hashtagList.push(hashtag);
          });
        newReply.hashtags = hashtagList;
      }
      if (newContent.match(/@[a-z0-9_]+/gi)) {
        newContent
          .match(/@[a-z0-9_]+/gi)
          .forEach((mention: string, index: any) => {
            mention = mention.substring(1);
            console.log("mention: ", mention);
            mentionList.push(mention);
          });
        newReply.mentions = mentionList;
      }
      const tweep = {
        tweepName: "Bonnie",
        tweepPhoto:
          "https://images.unsplash.com/photo-1611432579699-484f7990b127?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      };
      // newReply.tweep=tweep;
      let body = newContent.trim();
      newReply.message=body
      newReply.tweet_id = props.tweet._id;
      setNonReframedReply({...newReply})
      //Here I will save the repy
      const currentLocation = window.location;
      console.log(currentLocation);
      setReframedText(newReply.message)


      const predictUrl='http://127.0.0.1:8000/api/predict-replies?reply='+newReply.message
      console.log("predictUrl::",predictUrl)
      const configPredict = {
        method: 'get',
        url: predictUrl,
        headers: { 
          'Content-Type': 'application/json'
        }
      };
      axios(configPredict)
      .then((response:any)=> 
        response=response.data
      
      ).then((response: any)=>{
        console.log("prediction response",response)
        newReply.classification= {
          "prediction": response.prediction,
          "Probability": response.Probability
        };
        console.log(newReply)
     
        if( newReply.classification.prediction==="Negative" && props.tweet.hashtags.includes("stressed")){
          console.log("I have found to be negative")
          setIsOpen(true)
          setShowLoading(true)
         const data = JSON.stringify([
          newReply.message
            ]);
           
      const config = {
      method: 'post',
     url: 'http://127.0.0.1:8000/api/reframe',
     headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response: { data: any; }) {
    const myTextArr=response.data.reframed_texts
    console.log(myTextArr[0])
    setShowLoading(false);
    setReframedText(myTextArr[0])
    newReply.message=myTextArr[0]
    setReframedReply(newReply)
  })
  .catch(function (error: any) {
    console.log(error);
    setShowLoading(false);
  });
        }
        else{
          createTweet(
            token,
            newReply,
            "http://127.0.0.1:8000/api/replies/",
            window.location.href
          ).then((replies) => {
            console.log(props.tweet);
            modal.current?.dismiss();
            setIsOpen(false);
            props.addReplies();
          });
          props.tweet.replies.push(reframedReply)
        
          props.tweet.count+=1;
          console.log("that was positive")
        }
      })
      .catch(function (error: any) {
        console.log(error);
      });
    
 
   }
  };
  const allow=()=>{
    modal.current?.dismiss();
    setIsOpen(false);
    const predictUrl='http://127.0.0.1:8000/api/predict-replies?reply='+reframedReply.message
    console.log("predictUrl::",predictUrl)
    const configPredict = {
      method: 'get',
      url: predictUrl,
      headers: { 
        'Content-Type': 'application/json'
      }
    };
    axios(configPredict)
    .then((response:any)=> 
      response=response.data
    
    ).then((response: any)=>{
      console.log("prediction response",response)
      reframedReply.classification= {
        "prediction": response.prediction,
        "Probability": response.Probability
      };
    createTweet(
      token,
      reframedReply,
      "http://127.0.0.1:8000/api/replies/",
      window.location.href
    ).then((replies) => {
      console.log(props.tweet);
      modal.current?.dismiss();
      setIsOpen(false);
      props.addReplies();
    });
    props.tweet.replies.push(reframedReply)
  
    props.tweet.count+=1;
  })
  }
  const deny=()=>{
    modal.current?.dismiss();
    setIsOpen(false);
    createTweet(
      token,
      nonReframedReply,
      "http://127.0.0.1:8000/api/replies/",
      window.location.href
    ).then((replies) => {
      console.log(props.tweet);
      modal.current?.dismiss();
      setIsOpen(false);
      props.addReplies();
    });
    props.tweet.replies.push(reframedReply)
  
    props.tweet.count+=1;
  }
  const addContent = (inputValue: any) => {
    console.log(" changed");

    if (inputValue.length <= 350) {
      setReply(inputValue);
    }
  };
  async function getActors() {
    const usersArr = [];
    for (var i = 0; i < 10; i++) {
      usersArr.push({
        id: i + 1,
        display: "@Kwizera" + i,
      });
    }
    setUsers(usersArr);
    var hashtags = [{}];
    for (var i = 0; i < 10; i++) {
      hashtags.push({
        id: i + 1,
        display: "#stressed" + i,
      });
    }
    setTagNames(hashtags);
  }
  const uploadPhoto = (
    fileChamgeEvent: React.ChangeEvent<HTMLInputElement>
  ) => {
    const photos = fileChamgeEvent.currentTarget.files;
    setPhotos(photos);
  };
  const modal = useRef<HTMLIonModalElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
 
  const enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = createAnimation()
      .addElement(root?.querySelector("ion-backdrop")!)
      .fromTo("opacity", "0.01", "var(--backdrop-opacity)");

    const wrapperAnimation = createAnimation()
      .addElement(root?.querySelector(".modal-wrapper")!)
      .keyframes([
        { offset: 0, opacity: "0", transform: "scale(0)" },
        { offset: 1, opacity: "0.99", transform: "scale(1)" },
      ]);

    return createAnimation()
      .addElement(baseEl)
      .easing("ease-out")
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  const leaveAnimation = (baseEl: HTMLElement) => {
    return enterAnimation(baseEl).direction("reverse");
  };
  return (
    <>
      <IonModal
        id="example-modal"
        ref={modal}
        enterAnimation={enterAnimation}
        leaveAnimation={leaveAnimation}
        isOpen={isOpen}
        backdropDismiss={false}
        className='absolute mt-14 lg:mt-auto bg-transparent text-justify outline-none  lg:h-auto'
      >
             <IonLoading
                  isOpen={showLoading}
                  onDidDismiss={() => setShowLoading(false)}
                  message={'reframing...'}
                  duration={3000}
                  cssClass="custom-loading"
                spinner={'circles'}
                
                />
        <IonContent>
          <IonToolbar>
            <IonTitle
              color="secondary"
              className="w-60 container lg:px-30 px-4 py-8 mx-auto items-center"
            >
              allow reframed text
            </IonTitle>
                 
            <IonButtons slot="start">
              <IonButton id="deny" onClick={deny} color="danger">
                deny
              </IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton id="allow" onClick={allow} color="success">
                allow
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonCard>
            <IonCardContent className=" w-60 container lg:px-30 px-4 py-8 mx-auto items-center">
            {getMessege(reframedText)}
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonModal>
      <form onSubmit={addReply}>
        <IonRow>
          <IonItem>
            {/* <IonInput type="text" value={reply} onIonChange={e=>{
                    if(e.detail.value===undefined) return;
                    addContent(e.detail.value!)
                }}></IonInput> */}
            <div className="description outline-none w-44 md:max-lg:flex lg:w-48  text-black sm:text-center">
              <MentionsInput
                className="mentions  text-black bg-white"
                inputRef={myInput}
                spellCheck="false"
                placeholder="your comment"
                value={reply}
                onChange={(event) => addContent(event.target.value)}
              >
                <Mention
                  trigger="@"
                  data={users}
                  markup="m@@@____id__^^^____display__m@@@^^^"
                  style={{
                    backgroundColor: "#daf4fa",
                  }}
                  appendSpaceOnAdd={true}
                />
                <Mention
                  trigger="#"
                  markup="h$$$____id__~~~____display__h$$$~~~"
                  data={(search: string) => [
                    { id: search, display: "" + search },
                  ]}
                  onAdd={useCallback((...args: any) => {
                    console.log(...args);
                  }, [])}
                  appendSpaceOnAdd={true}
                />

                <Mention
                  trigger={emailRegex}
                  data={(search: string) => [{ id: search, display: search }]}
                  onAdd={useCallback((...args: any) => {
                    console.log(...args);
                  }, [])}
                  style={{ backgroundColor: "#d1c4e9" }}
                />
              </MentionsInput>
            </div>
          </IonItem>
          <button style={{ all: "unset" }} type="submit">
            <IonIcon className="" color="primary" icon={send}></IonIcon>
          </button>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonLabel>Add attachement</IonLabel>
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg, image/HEIC"
              multiple
              name="file"
              onChange={(ev) => uploadPhoto(ev)}
            />
          </IonCol>
          <IonCol>
            <IonLabel>{message}</IonLabel>
          </IonCol>
        </IonRow>
      </form>
    </>
  );
};

export default RepliesCard;
