// Firebase Configuration

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJhLRdgiQfrJtf0Z1MoZoL1Y4ZZ31cQ6E",
  authDomain: "livequizplatform.firebaseapp.com",
  projectId: "livequizplatform",
  storageBucket: "livequizplatform.firebasestorage.app",
  messagingSenderId: "450357229188",
  appId: "1:450357229188:web:87864df5740327283874d1",
  measurementId: "G-XF4SHJTRK6"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Authentication

const auth = getAuth(app);

// Firestore Database

const db = getFirestore(app);

// Export

export { auth, db };