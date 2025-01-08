import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  inMemoryPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
export const BASE_URL = "https://accounts.spotify.com/api/token";
const CLIENT_ID = "cc4c47d7b9e44cf6a3030dde3ffeba1c";
const CLIENT_SECRET = "0f685ecf082f4ccd8eb4f221c74de910";
// const REDIRECT_URI = "http://localhost:3000";
// const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
// const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
// const RESPONSE_TYPE = "token";

//Spotify API
export const authParamSpotify = {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body:
    "grant_type=client_credentials&client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET,
};

export const fetchSpotifyToken = async () => {
  try {
    const response = await fetch(BASE_URL, authParamSpotify);
    if (!response.ok) {
      throw new Error(`Failed to fetch Spotify token: ${response.statusText}`);
    }
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching Spotify token:", error);
    throw error;
  }
};

//Google Authentication API
export const authGoogle = () => {
  const auth = getAuth();
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          //console.log(user);
          //App.setCurrentUser(user);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          //const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.error(error);
        });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  //persistance
  //   return {
  //     handleGoogleLogin,
  //     currentUser,
  //   };
};
