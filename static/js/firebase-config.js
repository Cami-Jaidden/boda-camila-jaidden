// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

// 🔥 Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB876LWKHVGtLwzHVGBZMRZsX4lIfOfmcw",
  authDomain: "boda-2597c.firebaseapp.com",
  databaseURL: "https://boda-2597c-default-rtdb.firebaseio.com",
  projectId: "boda-2597c",
  storageBucket: "boda-2597c.appspot.com", // ✅ Corrección aquí
  messagingSenderId: "1058534233068",
  appId: "1:1058534233068:web:1018a4fb12ffe6177be6c9",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

