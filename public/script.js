// Base de données locale de tes scripts et APIs
const apiList = [
    {
        name: "gpt",
        category: "ai",
        method: "GET",
        link: "/gpt?q=&image=",
        description: "IA avancée avec Vision Intelligente par Chris st. Analyse textes et images.",
        exampleUrl: "/api/proxy" // À adapter selon ton hébergement réel
    },
    {
        name: "chatgpt",
        category: "ai",
        method: "POST",
        link: "/chatgpt?q=",
        description: "Modèle linguistique conversationnel fluide.",
        exampleUrl: ""
    },
    {
        name: "youtube",
        category: "download",
        method: "GET",
        link: "/download/youtube?url=",
        description: "Téléchargeur de vidéos YouTube haute qualité.",
        exampleUrl: ""
    },
    {
        name: "tiktok",
        category: "download",
        method: "GET",
        link: "/download/tiktok?url=",
        description: "Récupération des vidéos TikTok sans filigrane.",
        exampleUrl: ""
    }
];

document.addEventListener("DOMContentLoaded", () => {
    renderApis('all');
    setupMusic();
    setupAdminFeatures();
    setupSecretButtons();
});

// Génération dynamique des listes d'APIs dans l'interface
function renderApis(categoryFilter) {
    const container = document.getElementById("api-container");
    container.innerHTML = "";

    const filtered = categoryFilter === 'all' ? apiList : apiList.filter(item => item.category === categoryFilter);

    filtered.forEach(api => {
        const card = document.createElement("div");
        card.className = "api-card animate-slide-up";
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h3>⚡ ${api.name.toUpperCase()}</h3>
                <span class="badge" style="background:var(--accent-color); color:#000; padding:2px 8px; border-radius:4px; font-size:12px; font-weight:bold;">${api.method}</span>
            </div>
            <p style="margin: 10px 0; color:#aaa; font-size:14px;">${api.description}</p>
            <code style="display:block; background:#111; padding:6px; border-radius:4px; font-size:12px; margin-bottom:10px; overflow-x:auto;">${api.link}</code>
            <div style="display:flex; gap:10px;">
                <button onclick="copyLink('${api.link}')" class="btn-secondary" style="padding:6px 12px; font-size:12px;"><i class="fas fa-copy"></i> Copier</button>
                <button onclick="selectForTest('${api.name}')" class="btn-primary" style="padding:6px 12px; font-size:12px;"><i class="fas fa-vial"></i> Tester</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterCategory(cat) {
    document.querySelectorAll(".cat-btn").forEach(btn => btn.classList.remove("active"));
    event.currentTarget.classList.add("active");
    renderApis(cat);
}

// Copier le lien dans le presse-papier
function copyLink(text) {
    navigator.clipboard.writeText(text);
    alert("Lien de l'API copié avec succès !");
}

// Envoyer l'API sélectionnée directement dans le terminal d'essai
function selectForTest(name) {
    const api = apiList.find(a => a.name === name);
    if(api) {
        document.getElementById("test-url").value = window.location.origin + api.link;
        document.getElementById("test-method").value = api.method;
        document.getElementById("test-response").innerText = `Prêt pour tester l'API: ${name}`;
    }
}

// Exécuter le test via notre Proxy Node.js
async function runApiTest() {
    const url = document.getElementById("test-url").value;
    const method = document.getElementById("test-method").value;
    const outputElement = document.getElementById("test-response");

    if(!url) return alert("Veuillez d'abord sélectionner ou entrer une URL.");

    outputElement.innerText = "⚡ Éclair de Minato en cours d'exécution... Connexion à l'API...";

    try {
        const response = await fetch('/api/proxy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, method })
        });
        const result = await response.json();
        outputElement.innerText = JSON.stringify(result.data || result, null, 2);
    } catch (error) {
        outputElement.innerText = "Erreur d'exécution : " + error.message;
    }
}

// Fonctionnalité Admin : Changement de fond d'écran par mot de passe
function setupAdminFeatures() {
    const bgBtn = document.getElementById("admin-bg-btn");
    bgBtn.addEventListener("click", () => {
        const password = prompt("Entrez le mot de passe d'administration :");
        if (password === "2$modombo") {
            const newBgUrl = prompt("Entrez l'URL de votre nouvelle image d'arrière-plan :");
            if(newBgUrl) {
                document.body.style.backgroundImage = `url('${newBgUrl}')`;
                alert("Arrière-plan mis à jour avec le style premium !");
            }
        } else {
            alert("Mot de passe incorrect. Accès refusé !");
        }
    });
}

// Gestion des options de contact cachées
function setupSecretButtons() {
    const trigger = document.getElementById("secret-trigger-btn");
    const container = document.getElementById("secret-links-container");
    trigger.addEventListener("click", () => {
        container.classList.toggle("hidden");
        container.scrollIntoView({ behavior: 'smooth' });
    });
}

function sendGmail() {
    const msg = document.getElementById("gmail-msg").value;
    if(!msg) return alert("Écris d'abord un message.");
    window.location.href = `mailto:chris.st.creator@gmail.com?subject=MinatoDashboard&body=${encodeURIComponent(msg)}`;
}

// Lecteur musical interactif
function setupMusic() {
    const audio = document.getElementById("bg-music");
    const musicBtn = document.getElementById("toggle-music");
    
    musicBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play().catch(e => console.log("L'interaction utilisateur est requise d'abord."));
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
            musicBtn.style.background = "var(--accent-color)";
        } else {
            audio.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
            musicBtn.style.background = "#333";
        }
    });
}

