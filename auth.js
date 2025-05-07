   // Firebase Configuration (Replace with your config)
//    const firebaseConfig = {
//     apiKey: "AIzaSyC01AN45WBfxtvNce-gNdhQQRBYiG4IIHE",
//     authDomain: "class-auth-29ba5.firebaseapp.com",
//     projectId: "class-auth-29ba5",
//     storageBucket: "class-auth-29ba5.firebasestorage.app",
//     messagingSenderId: "1095989109315",
//     appId: "1:1095989109315:web:c75eea453803d6c6b02af6"
// };
const firebaseConfig = {
    apiKey: "AIzaSyDY7yNSCOGV81w4dObPsSqpQ0hQAVzwb7s",
    authDomain: "chatbot-b7bbd.firebaseapp.com",
    projectId: "chatbot-b7bbd",
    storageBucket: "chatbot-b7bbd.firebasestorage.app",
    messagingSenderId: "51321279848",
    appId: "1:51321279848:web:2839465b870707ad9df2dd",
    measurementId: "G-CNVXE9J32P"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Modal Functions
const modal = document.getElementById('authModal');

function showLogin() {
    modal.style.display = 'flex';
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('signupForm').classList.remove('active');
}

function showSignup() {
    modal.style.display = 'flex';
    document.getElementById('signupForm').classList.add('active');
    document.getElementById('loginForm').classList.remove('active');
}

function closeModal() {
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(e) {
    if(e.target == modal) closeModal();
}

// Login Handler
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
console.log(e.target.email)
    auth.signInWithEmailAndPassword(email, password)
        .catch(error => alert(error.message));
});

// Signup Handler
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "welcome.html";
        })
        .catch(error => alert(error.message));
});

// Auth State Listener
auth.onAuthStateChanged(user => {
    if(user) {
        window.location.href = "welcome.html";
    }
}); 