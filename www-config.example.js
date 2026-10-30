// Configuração da app. Copia este ficheiro para www-config.js e preenche.
// 1) Firebase (online, ranking, defesas, transferir progresso e estatísticas). Deixa null para jogar só com bots e sem estatísticas.
window.BONKOS_FIREBASE = null; /* exemplo:
window.BONKOS_FIREBASE = {
  apiKey: "AIza...", authDomain: "bonkos-xxxx.firebaseapp.com", projectId: "bonkos-xxxx",
  storageBucket: "bonkos-xxxx.appspot.com", messagingSenderId: "123", appId: "1:123:web:abc",
  measurementId: "G-XXXXXXX"   // estatísticas (Google Analytics); aparece se ligares o Analytics no projeto
}; */
window.BONKOS_FIREBASE_SDK = 'vendor/firebase/';
// 2) AdMob: enquanto live=false são usados anúncios de teste da Google (obrigatório durante o desenvolvimento).
window.BONKOS_ADMOB = { live: false, rewarded: 'ca-app-pub-3940256099942544/5224354917' };
