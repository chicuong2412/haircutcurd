// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { getToken } from "firebase/messaging";
import { getMessaging, onMessage, } from "firebase/messaging";
import $ from "jquery"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKoGBh_pz1_FpoHEhcRvIe8M1G9At7JZg",
  authDomain: "notification-79828.firebaseapp.com",
  projectId: "notification-79828",
  storageBucket: "notification-79828.firebasestorage.app",
  messagingSenderId: "823858377975",
  appId: "1:823858377975:web:beaec11ee10cb8f6ad0ff2",
  measurementId: "G-XD5T62HQW1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);
export const messaging = getMessaging(app);
export default app;

export const requestForToken = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: "BJtIgducXbuDaJa_jknvvSOMjTXcRByrEMzm1BuZb6cZoAVvwI-ywr1cZn5s8h3qcFtaR4h-XoG-QKqXFRYZToQ" });
    if (token) {
      console.log("FCM Token:", token);
      $.ajax({
        url: `http://localhost:3120/identity/notification`,
        type: "POST",
        dataType: 'json',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("JWT")}`,
        },
        data: JSON.stringify(
          { token: token }
        ),
        contentType: 'application/json',
        secure: true,
        async: true,
        success: function (data) {

        },
        error: function (data) {

        }
      })
    } else {
      console.log("No FCM token available.");
    }
  } catch (error) {
    console.error("FCM token error:", error);
  }
};

// Listen for foreground messages



