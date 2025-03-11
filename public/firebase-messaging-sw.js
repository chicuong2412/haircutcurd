// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyCKoGBh_pz1_FpoHEhcRvIe8M1G9At7JZg",
    authDomain: "notification-79828.firebaseapp.com",
    projectId: "notification-79828",
    storageBucket: "notification-79828.firebasestorage.app",
    messagingSenderId: "823858377975",
    appId: "1:823858377975:web:beaec11ee10cb8f6ad0ff2",
    measurementId: "G-XD5T62HQW1"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: payload.notification.body,
        // icon: '/firebase-logo.png',
        // icon: '/firebase-logo.png',
    };

    //   self.registration.showNotification(notificationTitle, notificationOptions);
});