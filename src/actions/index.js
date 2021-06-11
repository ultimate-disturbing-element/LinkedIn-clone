import { auth, provider,storage } from "../firbase";
import { SET_USER,SET_LOADING_STATUS,GET_ARTICLES} from "./actionType";
import db from '../firbase';

export const SetUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const setLoading = (status) => ({
    type:SET_LOADING_STATUS,
    status:status,
});

export const getArticles = (payload) => ({
    type:GET_ARTICLES,
    payload:payload,
})

export function SignInAPI() {
  return (dispatch) => {
    auth
      .signInWithPopup(provider)
      .then((payload) => {
        dispatch(SetUser(payload.user));
      })
      .catch((error) => alert(error.message));
  };
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(SetUser(user));
      }
    });
  };
}

export function signOutAPI() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(SetUser(null));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
}

export function postArticleAPI(payload) {
  return (dispatch) => {
      dispatch(setLoading(true));

    if (payload.image != "") {
      const upload = storage
        .ref(`images/${payload.image.name}`)
        .put(payload.image);
      upload.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`progress: ${progress}%`);
        if(snapshot.state === 'RUNNING'){
            console.log(`progress: ${progress}%`)
        }
      },error => console.log(error.code),
      async () =>{
          const downloadURL=await upload.snapshot.ref.getDownloadURL();
          db.collection('articles').add({
              actor:{
              description:payload.user.email,
              title:payload.user.displayName,
              date:payload.timestamp,
              image:payload.user.photoURL,
          },
              video: payload.video,
              sharedImg: downloadURL,
              comments:0,
              description: payload.description

        });
        dispatch(setLoading(false));
      });
    } else if(payload.video){
        db.collection('articles').add({
            actor:{
                description:payload.user.email,
                title:payload.user.displayName,
                date:payload.timestamp,
                image:payload.user.photoURL,
            },
              video: payload.video,
              sharedImg: " ",
              comments:0,
              description: payload.description
        });
        dispatch(setLoading(false));
    }
  };
}


export function getArticlesAPI(){
    return (dispatch) => {
        let payload;

        db.collection('articles').orderBy("actor.date","desc").onSnapshot((snapshot)=>{
            payload=snapshot.docs.map((doc)=>
            doc.data()
            );
            dispatch(getArticles(payload));
        })
    }
}