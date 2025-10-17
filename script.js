
const meuLink = document.getElementById('nd');
meuLink.style.textDecoration = 'none';

document.getElementById('year').textContent = new Date().getFullYear();

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
});


function announce(text) {
    try {
        const s = new SpeechSynthesisUtterance(text);
        s.lang = 'pt-BR';
        s.rate = 1.0; 
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(s);
    } catch (e) { console.warn('TTS não suportado', e) }
}


const modal = document.getElementById('placeModal');
function openPlaceDetails(name) {
    document.getElementById('placeTitle').textContent = name;
    document.getElementById('placeDesc').textContent = 'Opções para: ' + name;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    announce('Ponto selecionado: ' + name);
}
function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); }
function showName() { const name = document.getElementById('placeTitle').textContent; announce('Nome: ' + name); }
function drawRoute() { announce('Traçando rota para ' + document.getElementById('placeTitle').textContent); closeModal(); }


function startVoiceInput() {

    announce('Aguardando comando de voz...');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
    if (!SpeechRecognition) {
        setTimeout(() => announce('Reconhecimento de voz não suportado neste navegador.'), 800);
        return;
    }
    const rec = new SpeechRecognition();
    rec.lang = 'pt-BR';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => {
        const txt = e.results[0][0].transcript;
        announce('Você disse: ' + txt);

        if (/rota|ir|direç/ig.test(txt)) {
            announce('Preparando rota');
        }
    }
    rec.onerror = (err) => { announce('Erro no reconhecimento de voz'); console.warn(err) };
    rec.start();
}

modal.addEventListener('click', (e) => { if (e.target === modal) closeModal() });

window.addEventListener('keydown', (e) => {
    if (e.key === 'm') openPlaceDetails('Padaria Central');
    if (e.key === 'Escape') closeModal();
});

document.documentElement.style.setProperty('--brand', '#d9362e');

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
        ev.preventDefault();
        const id = a.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    })
})
    function falar() {
      const texto = "Você está próximo à rua das flores, siga em frente por 20 metros.";
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = "pt-BR";

      const voices = speechSynthesis.getVoices();
      const vozMasculina = voices.find(voz => 
        voz.lang.startsWith("pt") && voz.name.toLowerCase().includes("male")
      ) || voices.find(voz => voz.lang.startsWith("pt"));

      if (vozMasculina) utterance.voice = vozMasculina;
      
      speechSynthesis.cancel(); 
      speechSynthesis.speak(utterance);
    }

    if (typeof speechSynthesis !== "undefined" && speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => {};
    }