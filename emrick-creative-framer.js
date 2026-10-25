const root=document.documentElement;
let pointerFrame=null;

const themeSwitch=document.querySelector(".theme-switch");
const langSwitch=document.querySelector(".lang-switch");
const translations={
  "Aller au contenu":"Skip to content",
  "Projets":"Projects",
  "Méthode":"Method",
  "Parcours":"Journey",
  "Disponible · 2026":"Available · 2026",
  "Clair":"Light",
  "Basé à Abidjan Disponible pour de nouveaux défis":"Based in Abidjan Open to new challenges",
  "Du besoin métier":"From business need",
  "au produit":"to the",
  "livré.":"delivered product.",
  "Je travaille là où les équipes métier, les utilisateurs et la technologie doivent enfin parler la même langue.":"I work where business teams, users and technology must finally speak the same language.",
  "Voir les projets":"View projects",
  "Écrire un message":"Get in touch",
  "cahier des charges consolidé":"consolidated requirements document",
  "prototype métier interactif":"interactive business prototype",
  "un même système logistique à rendre clair":"one logistics system to make clear",
  "Atelier → CDC → Prototype → COPIL":"Workshop → requirements → prototype → steering committee",
  "10 pays":"10 countries",
  "Portée":"Scope",
  "SI logistique régional, interfacé à l’ERP IRIUM.":"Regional logistics information system connected to the IRIUM ERP.",
  "Bénin, Togo, Sénégal… visibilité opérationnelle multi-pays.":"Benin, Togo, Senegal… multi-country operational visibility.",
  "Cadrage":"Scoping",
  "73 exigences":"73 requirements",
  "Réparties sur 9 modules, dans un plan projet Excel à 10 onglets.":"Structured across 9 modules in a 10-tab Excel project plan.",
  "Gouvernance":"Governance",
  "35 besoins":"35 needs",
  "Consolidés auprès de 5 directions, puis transformés en CDC V2/V3.":"Consolidated across 5 departments, then turned into V2/V3 requirements.",
  "01 · Projets récents":"01 · Recent projects",
  "Des besoins devenus produits.":"Needs turned into products.",
  "Chaque projet part d’un usage concret, devient un système compréhensible et va jusqu’à une expérience réellement accessible.":"Each project starts with a real use case, becomes an understandable system and ends as an accessible experience.",
  "Réservation · SaaS":"Booking · SaaS",
  "De TrouveMonCréneau à Slotly":"From TrouveMonCréneau to Slotly",
  "Un système multi-boutiques pour réserver, organiser l’activité et piloter les rendez-vous.":"A multi-location system to book, organise operations and manage appointments.",
  "Veille · média digital":"Intelligence · digital media",
  "Lire les signaux du continent":"Reading the continent's signals",
  "Une veille transformée en expérience éditoriale claire, vivante et immédiatement exploitable.":"Market intelligence turned into a clear, lively and immediately actionable editorial experience.",
  "Learning · produit bilingue":"Learning · bilingual product",
  "Apprendre sans se perdre":"Learn without getting lost",
  "Une expérience quotidienne bilingue faite de micro-leçons, découvertes, quiz et progression personnelle.":"A bilingual daily experience built around micro-lessons, discoveries, quizzes and personal progress.",
  "Visiter ↗":"Visit ↗",
  "02 · Méthode":"02 · Method",
  "Comprendre. Structurer. Faire avancer.":"Understand. Structure. Move forward.",
  "Trois responsabilités pour conduire un besoin complexe jusqu’à un produit clair, utilisable et livrable.":"Three responsibilities to turn a complex need into a clear, usable and deliverable product.",
  "Comprendre":"Understand",
  "Entrer dans le métier, observer les processus, écouter les utilisateurs et identifier les contraintes qui se cachent derrière la demande initiale.":"Step into the business, observe processes, listen to users and uncover the constraints behind the initial request.",
  "Structurer":"Structure",
  "Transformer le flou en besoins explicites, décisions, priorités, parcours, responsabilités et trajectoire de livraison.":"Turn ambiguity into explicit needs, decisions, priorities, journeys, ownership and a delivery path.",
  "Faire avancer":"Move forward",
  "Aligner les personnes, arbitrer, rendre les décisions visibles et accompagner les équipes jusqu’à un produit réellement utilisable.":"Align people, make trade-offs visible and support teams all the way to a genuinely usable product.",
  "03 · Vision":"03 · Vision",
  "La polyvalence n’est pas le message. C’est le moyen.":"Versatility is not the message. It is the means.",
  "Mon expérience en UX, produit, design et développement me permet de comprendre plusieurs côtés d’un même problème — sans perdre de vue ma responsabilité principale : faire aboutir le projet.":"My experience across UX, product, design and development lets me understand several sides of the same problem without losing sight of my main responsibility: getting the project delivered.",
  "Cette culture transverse m’aide à traduire les attentes métier, challenger les parcours, dialoguer avec les équipes techniques et rendre les arbitrages compréhensibles pour les décideurs.":"This cross-functional culture helps me translate business expectations, challenge journeys, work with technical teams and make trade-offs clear to decision-makers.",
  "04 · Expériences choisies":"04 · Selected experience",
  "La promesse, mise à l’épreuve du terrain.":"The promise, proven in the field.",
  "Des missions où comprendre les métiers, structurer les décisions et coordonner les acteurs a permis de rendre des systèmes complexes plus clairs.":"Assignments where understanding the business, structuring decisions and coordinating stakeholders made complex systems clearer.",
  "Pilotage de bout en bout : besoins métier, cahiers des charges, prototypes, dashboards exécutifs, COPIL et cohérence multi-modules.":"End-to-end delivery: business needs, requirements, prototypes, executive dashboards, steering committees and multi-module consistency.",
  "Campagnes promotionnelles et pédagogiques : direction artistique, accroches, visuels illustrés et appels à l’action.":"Promotional and educational campaigns: art direction, messaging, illustrated assets and calls to action.",
  "Moderniser les danses royales béninoises sans perdre l’ancrage historique.":"Modernising Benin's royal dances without losing their historical roots.",
  "Produire des assets cohérents pour nourrir la présence digitale et print.":"Creating consistent assets for digital and print presence.",
  "Tests UX, analyse des frictions, rapports détaillés et design system.":"UX testing, friction analysis, detailed reports and design systems.",
  "Interfaces web rapides, lisibles et adaptées à toutes les tailles d’écran.":"Fast, readable web interfaces adapted to every screen size.",
  "05 · Parcours":"05 · Journey",
  "Un parcours construit pour faire le lien.":"A journey built to connect the dots.",
  "Chaque étape a renforcé ma capacité à dialoguer avec les métiers, les utilisateurs, les créatifs et les équipes techniques.":"Every step strengthened my ability to work with business teams, users, creatives and technical teams.",
  "Août 2025 — présent":"Aug. 2025 — present",
  "Mai 2025 — déc. 2025":"May 2025 — Dec. 2025",
  "Mars 2023 — fév. 2025":"Mar. 2023 — Feb. 2025",
  "Jan. 2022 — déc. 2023":"Jan. 2022 — Dec. 2023",
  "Juil. — nov. 2021":"Jul. — Nov. 2021",
  "Chef de Projet Digital & UX/UI Designer : e-Track, SOFTLOGIS V3.0, ERP IRIUM, COPIL, dashboards exécutifs.":"Digital Project Manager & UX/UI Designer: e-Track, SOFTLOGIS V3.0, IRIUM ERP, steering committees and executive dashboards.",
  "Designer créatif consultant pour Zepargn : campagnes promotionnelles, pédagogiques et commerciales.":"Creative design consultant for Zepargn: promotional, educational and commercial campaigns.",
  "Directeur artistique consultant : CDCRB, Africaine Vie Bénin, The Busy Bee School.":"Consulting art director: CDCRB, Africaine Vie Benin and The Busy Bee School.",
  "Product Designer pour Le Petit Nokoué : audits UX, tests, rapports et design system.":"Product Designer for Le Petit Nokoué: UX audits, testing, reports and design system.",
  "Premières intégrations frontend : HTML, CSS, JavaScript, responsive et fidélité visuelle.":"Early frontend work: HTML, CSS, JavaScript, responsive design and visual accuracy.",
  "06 · Laboratoire":"06 · Lab",
  "Projets personnels":"Personal projects",
  "Le terrain où les idées deviennent des interfaces.":"Where ideas become interfaces.",
  "Des terrains d’essai autour de l’audit, de l’apprentissage, de l’organisation, de la mobilité et des usages quotidiens.":"Experiments around auditing, learning, organisation, mobility and everyday use.",
  "Ouvrir le projet ↗":"Open project ↗",
  "Une idée d’outil pour analyser, clarifier et challenger la présentation d’un portfolio.":"A tool concept for analysing, clarifying and challenging how a portfolio is presented.",
  "Un projet autour de l’apprentissage du code par progression, interaction et narration.":"A project for learning code through progression, interaction and storytelling.",
  "Habitat · communauté":"Housing · community",
  "Un concept d’application autour du cohousing, de la vie partagée et de la coordination.":"An app concept for cohousing, shared living and coordination.",
  "Organisation · OS":"Organisation · OS",
  "Un système pensé pour structurer la semaine, les priorités et les routines de travail.":"A system designed to structure the week, priorities and work routines.",
  "Économie circulaire":"Circular economy",
  "Une piste produit autour de la revalorisation et de la seconde vie des équipements.":"A product concept for reuse and extending the life of equipment.",
  "Mobilité · économie":"Mobility · savings",
  "Un projet orienté usage quotidien, optimisation et décision rapide.":"A project focused on everyday use, optimisation and faster decisions.",
  "Une exploration d’assistance, de méthode et de structure pour chefs de projet.":"An exploration of assistance, methods and structure for project managers.",
  "Système personnel":"Personal system",
  "Une expérimentation autour d’un univers personnel, d’outils et de logique d’interface.":"An experiment around a personal universe, tools and interface logic.",
  "Un format CV plus interactif, pensé comme une expérience plutôt qu’une simple page.":"A more interactive CV designed as an experience rather than a static page.",
  "Soft skills · jeu":"Soft skills · game",
  "Un projet pour faire pratiquer les compétences comportementales par l’interaction.":"A project for practising behavioural skills through interaction.",
  "07 · Apprendre encore":"07 · Keep learning",
  "Certifications, outils et curiosité structurée.":"Certifications, tools and structured curiosity.",
  "Des acquis complémentaires en gestion de projet, product management, IA, marketing digital, design web et outils créatifs.":"Complementary skills in project and product management, AI, digital marketing, web design and creative tools.",
  "Gestion & IA":"Management & AI",
  "Responsable marketing, digital advertising, Google Ads Search et fondamentaux du digital.":"Marketing management, digital advertising, Google Ads Search and digital fundamentals.",
  "Projet à cadrer ?":"A project to scope?",
  "contact direct":"direct contact",
  "Un besoin métier complexe à transformer en produit clair et livrable ?":"A complex business need to turn into a clear, deliverable product?",
  "Réserver un créneau":"Book a call",
  "Assistant stratégique d’Emrick":"Emrick's strategic assistant",
  "Fermer le chatbot":"Close chatbot",
  "Je suis Nia. Ce module aide les visiteurs à comprendre rapidement le profil d’Emrick, ses projets, sa méthode de pilotage, son approche design et les sujets liés au produit, à l’UX ou au project management.":"I’m Nia. I help visitors quickly understand Emrick's profile, projects, delivery method, design approach and topics related to product, UX and project management.",
  "Pitch en 20 secondes":"20-second pitch",
  "Pourquoi le recruter ?":"Why hire him?",
  "Quel projet prouve son niveau ?":"Which project best proves his level?",
  "C’est quoi le golden ratio ?":"What is the golden ratio?",
  "Poser une question à Nia…":"Ask Nia a question…",
  "Envoyer":"Send"
};

const cleanText=value=>String(value||"").replace(/\s+/g," ").trim();
const translatableNodes=[...document.querySelectorAll("body *")].filter(element=>{
  if(element.children.length)return false;
  const french=cleanText(element.textContent);
  if(!translations[french])return false;
  element.dataset.frText=french;
  element.dataset.enText=translations[french];
  return true;
});
const helloAvailability=document.querySelector(".hello-card p");
if(helloAvailability){
  helloAvailability.dataset.frHtml="Basé à Abidjan<br>Disponible pour de nouveaux défis";
  helloAvailability.dataset.enHtml="Based in Abidjan<br>Open to new challenges";
}

let currentLanguage=localStorage.getItem("emrick-language")==="en"?"en":"fr";
let currentTheme=localStorage.getItem("emrick-theme")==="light"?"light":"dark";

function updateDisplayControls(){
  const light=currentTheme==="light";
  const english=currentLanguage==="en";
  document.body.classList.toggle("light-mode",light);
  document.documentElement.lang=currentLanguage;
  if(themeSwitch){
    themeSwitch.setAttribute("aria-pressed",String(light));
    themeSwitch.setAttribute("aria-label",english?(light?"Switch to dark theme":"Switch to light theme"):(light?"Activer le thème sombre":"Activer le thème clair"));
    const label=themeSwitch.querySelector("b");
    if(label)label.textContent=english?(light?"Light":"Dark"):(light?"Clair":"Sombre");
  }
  if(langSwitch){
    langSwitch.textContent=english?"FR":"EN";
    langSwitch.setAttribute("aria-pressed",String(english));
    langSwitch.setAttribute("aria-label",english?"Afficher le site en français":"Afficher le site en anglais");
  }
}

function applyLanguage(language){
  currentLanguage=language;
  translatableNodes.forEach(element=>{
    element.textContent=language==="en"?element.dataset.enText:element.dataset.frText;
  });
  if(helloAvailability)helloAvailability.innerHTML=language==="en"?helloAvailability.dataset.enHtml:helloAvailability.dataset.frHtml;
  localStorage.setItem("emrick-language",language);
  updateDisplayControls();
}

themeSwitch?.addEventListener("click",()=>{
  currentTheme=currentTheme==="light"?"dark":"light";
  localStorage.setItem("emrick-theme",currentTheme);
  updateDisplayControls();
});

langSwitch?.addEventListener("click",()=>applyLanguage(currentLanguage==="fr"?"en":"fr"));
applyLanguage(currentLanguage);

function alignHashTarget(){
  if(!location.hash)return;
  const target=document.querySelector(location.hash);
  if(!target)return;
  requestAnimationFrame(()=>target.scrollIntoView({block:"start"}));
}

addEventListener("load",()=>{
  if(document.fonts?.ready){
    document.fonts.ready.then(alignHashTarget);
    return;
  }
  alignHashTarget();
},{once:true});

addEventListener("pointermove",event=>{
  if(pointerFrame)return;
  pointerFrame=requestAnimationFrame(()=>{
    root.style.setProperty("--mx",`${event.clientX}px`);
    root.style.setProperty("--my",`${event.clientY}px`);
    pointerFrame=null;
  });
},{passive:true});

document.querySelectorAll(".magnet,.work-card,.skill-note,.proof-ticket,.memory-project,.cert-wall article").forEach(card=>{
  card.addEventListener("pointermove",event=>{
    if(matchMedia("(pointer: coarse)").matches)return;
    const rect=card.getBoundingClientRect();
    const x=(event.clientX-rect.left)/rect.width-.5;
    const y=(event.clientY-rect.top)/rect.height-.5;
    if(card.classList.contains("magnet")){
      card.style.setProperty("--wiggle",`translate(${x*8}px,${y*7}px) rotate(${x*2}deg)`);
      return;
    }
    card.style.transform=`translate(${x*8}px,${y*7}px) rotate(${x*1.6}deg)`;
  });
  card.addEventListener("pointerleave",()=>{
    if(card.classList.contains("magnet")){
      card.style.setProperty("--wiggle","translate(0, 0) rotate(0deg)");
      return;
    }
    card.style.transform="";
  });
});

const moving=document.querySelectorAll(".photo-card,.stamp-card,.audio-card,.proof-ticket,.memory-project");
let scrollFrame=null;
addEventListener("scroll",()=>{
  if(scrollFrame)return;
  scrollFrame=requestAnimationFrame(()=>{
    const y=scrollY;
    moving.forEach((item,index)=>{
      item.style.translate=`0 ${Math.sin(y*.006+index)*8}px`;
    });
    scrollFrame=null;
  });
},{passive:true});

const miniChat=document.querySelector(".mini-chat");
const chatToggle=document.querySelector(".chat-toggle");
const chatPanel=document.querySelector("#chat-panel");
const chatClose=document.querySelector(".chat-close");
const chatMessages=document.querySelector("#chat-messages");
const chatForm=document.querySelector("#chat-form");
const chatInput=document.querySelector("#chat-input");
const LLM_ENDPOINT="https://gabriel-portfolio-chat.dahissihogabriel.workers.dev";
const chatHistory=[];
const profileIntentWords=["gabriel","emrick","il ","lui","son ","ses ","profil","portfolio","cv","experience","parcours","competence","expertise"];
const defaultSuggestions=["Pitch en 20 secondes","Pourquoi le recruter ?","Quel projet prouve son niveau ?","Comment le contacter ?"];
let suggestionsRendered=false;
const conversationState={
  summary:"",
  currentTopic:"",
  lastIntent:"",
  turns:0
};
const profileLocationWords=["emrick","gabriel","il","lui","son","profil","base","basé","localisation","habite","situe","travaille","parcours"];

function isAboutProfile(q){
  return profileIntentWords.some(word=>q.includes(word));
}

function normalizeQuestion(text){
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\w\s+@.]/g," ").replace(/\s+/g," ").trim();
}

function inferIntent(q){
  if(q.includes("contact")||q.includes("email")||q.includes("telephone")||q.includes("rdv"))return "contact";
  if(q.includes("recruter")||q.includes("embaucher")||q.includes("valeur")||q.includes("pourquoi lui"))return "évaluation recrutement";
  if(q.includes("projet")||q.includes("portfolio")||q.includes("jalo")||q.includes("skillsmaster")||q.includes("pulse")||q.includes("lens"))return "analyse de projet";
  if(q.includes("ux")||q.includes("ui")||q.includes("design")||q.includes("branding")||q.includes("golden")||q.includes("ratio"))return "conseil design";
  if(q.includes("gestion")||q.includes("project")||q.includes("workflow")||q.includes("methode")||q.includes("organisation"))return "conseil project management";
  if(q.includes("cv")||q.includes("parcours")||q.includes("experience")||q.includes("certification"))return "lecture du parcours";
  return "question générale";
}

function inferTopic(q,question){
  const knownTopics=[
    ["africa digital pulse","Africa Digital Pulse"],
    ["portfolio lens","PortfolioLens"],
    ["l odyssee","L’Odyssée du Code"],
    ["odyssee","L’Odyssée du Code"],
    ["skillsmaster","Skillsmaster"],
    ["jalo","Jalo Logistics"],
    ["habi","Habi"],
    ["workweek","WorkweekOS"],
    ["reval","ReVal Africa"],
    ["plein malin","Le Plein Malin"],
    ["gabrielos","Gabrielos"],
    ["gaming cv","Gaming CV"],
    ["golden ratio","golden ratio"],
    ["nombre d or","golden ratio"],
    ["ux","UX/UI design"],
    ["ui","UX/UI design"],
    ["branding","branding"],
    ["gestion de projet","gestion de projet"],
    ["project management","gestion de projet"],
    ["workflow","workflows"],
    ["certification","certifications"],
    ["parcours","parcours d’Emrick"],
    ["contact","contact"]
  ];
  const found=knownTopics.find(([needle])=>q.includes(needle));
  if(found)return found[1];
  if(q.includes("ça")||q.includes("cela")||q.includes("ce projet")||q.includes("lui")||q.includes("developpe")||q.includes("développe")||q.includes("et ensuite")||q.includes("pourquoi")){
    return conversationState.currentTopic || "sujet précédent";
  }
  return question.length>60 ? `${question.slice(0,57)}…` : question;
}

function updateConversationState(question,answer){
  const q=normalizeQuestion(question);
  const topic=inferTopic(q,question);
  const intent=inferIntent(q);
  conversationState.turns+=1;
  conversationState.currentTopic=topic || conversationState.currentTopic;
  conversationState.lastIntent=intent;
  conversationState.summary=`Conversation en cours : le visiteur explore ${conversationState.currentTopic || "le profil d’Emrick"} avec une intention de ${conversationState.lastIntent}. Dernière réponse : ${String(answer||"").replace(/\s+/g," ").slice(0,240)}`;
}

function answerQuestion(question){
  const q=normalizeQuestion(question);
  if(!q)return {source:"local",text:"Posez une question directe : profil, projets, recrutement, UX/UI, gestion de projet ou contact. Nia répond de façon courte, claire et utile."};
  if(q.includes("pina colada")||q.includes("pinacolada")||q.includes("piña colada")){
    return {source:"local",text:"Voici une recette simple de piña colada pour 1 verre.\n\n**Ingrédients**\n- 60 ml de rhum blanc\n- 90 ml de jus d’ananas\n- 30 ml de crème de coco\n- Une poignée de glaçons\n- Optionnel : tranche d’ananas ou cerise pour décorer\n\n**Préparation**\n- Mettez le rhum, le jus d’ananas, la crème de coco et les glaçons dans un blender.\n- Mixez jusqu’à obtenir une texture lisse et légèrement mousseuse.\n- Versez dans un grand verre, puis ajoutez la décoration si besoin.\n\nVersion sans alcool : retirer le rhum et ajouter un peu plus de jus d’ananas ou de lait de coco. Simple, tropical, efficace."};
  }
  if(q.includes("golden ratio")||q.includes("ratio d or")||q.includes("nombre d or")||q.includes("section doree")||q.includes("proportion doree")){
    return {source:"local",text:"**Le golden ratio, ou nombre d’or, vaut environ 1,618.**\n\nC’est une proportion qui aide à créer un rapport équilibré entre deux tailles : par exemple un grand bloc et un bloc plus petit.\n\n- En design, il peut guider la taille des titres, des colonnes, des images ou des marges.\n- Il ne remplace pas le jugement : il sert surtout de repère pour composer avec harmonie.\n- Dans le travail d’Emrick, l’idée se retrouve dans la hiérarchie visuelle, les grands contrastes de taille, les espaces négatifs et la façon de guider le regard.\n\nEn clair : Emrick ne l’utilise pas comme une formule magique, mais comme une logique de proportion pour rendre une interface plus lisible et plus agréable."};
  }
  if(q.includes("pitch")||q.includes("20 secondes")||q.includes("resume")||q.includes("resumer")||q.includes("presente")||q.includes("profil")){
    return {source:"local",text:"Pitch rapide : Emrick est un IT Project Manager hybride — assez structuré pour piloter, assez designer pour rendre les choses utilisables, assez créatif pour donner une direction. Sa force : transformer du flou en système clair, livrable et compréhensible."};
  }
  if(q.includes("recruter")||q.includes("embaucher")||q.includes("choisir")||q.includes("pourquoi lui")||q.includes("valeur")){
    return {source:"local",text:"Pourquoi le recruter : parce qu’il ne reste pas coincé dans une seule case. Il peut cadrer un besoin, parler métier, organiser un workflow, challenger une interface et garder le projet orienté résultat. C’est rare chez les profils purement design ou purement gestion."};
  }
  if(q.includes("niveau")||q.includes("preuve")||q.includes("meilleur projet")||q.includes("projet prouve")||q.includes("projet fort")){
    return {source:"local",text:"Le projet le plus démonstratif dépend de l’angle d’évaluation :\n\n- **Jalo Logistics** montre le pilotage, la transformation digitale et la compréhension métier.\n- **PortfolioLens** montre une approche produit orientée diagnostic et décision.\n- **Africa Digital Pulse** montre la capacité à transformer une veille dense en expérience claire.\n- **Skillsmaster** montre le goût pour l’apprentissage interactif.\n\nLa force d’Emrick se lit dans cette combinaison : cadrage, design, livraison."};
  }
  if(q.includes("bonjour")||q.includes("salut")||q.includes("hello")||q.includes("hey")){
    return {source:"local",text:"Salut — je suis Nia. Je peux aider à lire rapidement son pitch, ses projets les plus solides, ses arguments de recrutement ou ses coordonnées."};
  }
  if(q.includes("disponible")||q.includes("availability")||q.includes("recrute")||q.includes("mission")||q.includes("freelance")){
    return {source:"local",text:"Oui. Emrick est basé à Abidjan et ouvert à des opportunités où il peut structurer, piloter et améliorer des produits ou systèmes digitaux. Le bon terrain pour lui : projet ambitieux, besoin flou, équipe à aligner, résultat à livrer."};
  }
  if((q.includes("negroni")||q.includes("cocktail")||q.includes("bar")||q.includes("restaurant")||q.includes("boire"))&&(q.includes("abidjan")||q.includes("cotonou"))){
    return {source:"llm",text:"Demande générale contextualisée."};
  }
  if(q.includes("contact")||q.includes("email")||q.includes("mail")||q.includes("telephone")||q.includes("appel")||q.includes("rdv")||q.includes("creneau")){
    return {source:"local",text:"Contact direct : dahissihogabriel@gmail.com. Téléphone : +225 05 96 48 93 43. GitHub : https://github.com/rico-cms. Le plus simple : utiliser le bouton de réservation du site pour cadrer un échange proprement."};
  }
  if((q.includes("lequel")||q.includes("quel projet")||q.includes("projet"))&&(q.includes("ux")||q.includes("ui")||q.includes("produit")||q.includes("product"))&&isAboutProfile(q)){
    return {source:"local",text:"Pour l’UX/UI, regarde surtout **PortfolioLens**, **Habi**, **Le Petit Nokoué** dans son parcours, et **L’Odyssée du Code** pour l’interaction. Ce sont les projets qui montrent le mieux sa capacité à clarifier une expérience, pas seulement à l’habiller."};
  }
  if(q.includes("portfolio")||q.includes("africa digital pulse")||q.includes("portfolio lens")||q.includes("odyssee")||q.includes("habi")||q.includes("workweek")||q.includes("projet")){
    return {source:"local",text:"Les projets personnels mis en avant sont : Africa Digital Pulse, PortfolioLens, L’Odyssée du Code, Habi, WorkweekOS, ReVal Africa, Le Plein Malin, ACE for Project Managers, Gabrielos, Gaming CV et Skillsmaster. Ils servent à montrer différents terrains : veille, audit, apprentissage, organisation, finance, mobilité et expérimentation produit."};
  }
  if(q.includes("competence")||q.includes("expertise")||((q.includes("ux")||q.includes("ui")||q.includes("design")||q.includes("branding")||q.includes("strategie"))&&isAboutProfile(q))){
    return {source:"local",text:"Ses compétences fortes :\n\n- cadrer et piloter un projet ;\n- transformer un besoin flou en expérience utilisable ;\n- structurer des workflows et des priorités ;\n- donner une direction visuelle cohérente ;\n- faire dialoguer métier, design et exécution.\n\nLe point intéressant, c’est la combinaison des cinq."};
  }
  if((q.includes("outil")||q.includes("tools")||q.includes("figma")||q.includes("jira")||q.includes("notion")||q.includes("github")||q.includes("adobe"))&&isAboutProfile(q)){
    return {source:"local",text:"Outils : Jira, Notion, Figma, Trello, HubSpot, GitHub, VS Code, Adobe Suite, Google Ads et IA générative. Mais le vrai sujet n’est pas l’outil : c’est sa capacité à créer un système de travail compréhensible."};
  }
  if(q.includes("parcours")||q.includes("experience")||q.includes("cv")||q.includes("jalo")||q.includes("saekum")||q.includes("trellix")){
    return {source:"local",text:"Parcours : Jalo Logistics pour le project management et la transformation digitale ; Sœkum / CQFF pour la direction artistique ; Trellix.io pour le product design ; Lyz Digital pour les bases frontend. C’est ce mélange qui construit son profil hybride."};
  }
  if(q.includes("certification")||q.includes("certificat")||q.includes("diplome")||q.includes("formation")){
    return {source:"local",text:"Il a des certifications en IA, project/product management, agile, marketing digital, design web, Git/GitHub et Adobe Photoshop. Ça raconte surtout une chose : il apprend en continu pour renforcer son terrain d’action."};
  }
  if((q.includes("localisation")||q.includes("ville")||q.includes("abidjan")||q.includes("cotonou")||q.includes("ou est"))&&profileLocationWords.some(word=>q.includes(word))){
    return {source:"local",text:"Emrick est basé à Abidjan, avec une trajectoire entre Abidjan et Cotonou. Son terrain naturel : projets digitaux et créatifs en Afrique de l’Ouest."};
  }
  if(q.includes("gestion de projet")||q.includes("project management")||q.includes("workflow")||q.includes("methode")||q.includes("organisation")){
    return {source:"local",text:"Sa méthode : clarifier le problème, rendre les responsabilités visibles, créer un rythme de décision, puis livrer. Il ne s’agit pas juste de suivre des tâches : il s’agit de rendre le projet pilotable."};
  }
  if(q.includes("branding")||q.includes("marque")||q.includes("identite")||q.includes("direction creative")){
    return {source:"local",text:"En branding, son approche est utile avant d’être décorative : cohérence, reconnaissance, usage réel sur les supports, et une direction qui sert le positionnement."};
  }
  if(q.includes("faiblesse")||q.includes("limite")||q.includes("risque")){
    return {source:"local",text:"Lecture honnête : son profil est hybride, donc il faut lui donner des sujets où cette transversalité est utile. Sur un poste ultra-spécialisé et isolé, ce serait moins pertinent que sur un rôle qui demande coordination, produit et sens du design."};
  }
  return {source:"llm",text:"Je n’ai pas de réponse locale précise."};
}

function nextSuggestions(question){
  const q=normalizeQuestion(question);
  if(q.includes("recruter")||q.includes("pitch")||q.includes("profil"))return ["Quel projet prouve son niveau ?","Ses compétences clés ?","Ses limites ?"];
  if(q.includes("projet")||q.includes("ux"))return ["Son approche UX ?","Projet live à voir ?","Comment le contacter ?"];
  if(q.includes("contact")||q.includes("disponible"))return ["Pitch en 20 secondes","Pourquoi le recruter ?","Ses outils ?"];
  return defaultSuggestions;
}

function renderSuggestions(items=defaultSuggestions){
  const container=document.querySelector(".chat-suggestions");
  if(!container)return;
  suggestionsRendered=true;
  container.replaceChildren(...items.map(item=>{
    const button=document.createElement("button");
    button.type="button";
    button.textContent=item;
    button.addEventListener("click",()=>askChat(button.textContent));
    return button;
  }));
}

function addMessage(text,type="bot"){
  const message=document.createElement("p");
  message.className=type;
  if(type.includes("bot"))message.innerHTML=formatBotAnswer(text);
  else message.textContent=text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop=chatMessages.scrollHeight;
  return message;
}

function escapeHtml(text){
  return String(text).replace(/[&<>"']/g,character=>({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    "\"":"&quot;",
    "'":"&#039;"
  })[character]);
}

function inlineFormat(text){
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")
    .replace(/`([^`]+)`/g,"<code>$1</code>");
}

function formatBotAnswer(text){
  const normalized=String(text||"").replace(/\r\n/g,"\n").trim();
  if(!normalized)return "";
  const lines=normalized.split("\n");
  const html=[];
  let list=[];
  const flushList=()=>{
    if(!list.length)return;
    html.push(`<ul>${list.map(item=>`<li>${inlineFormat(item)}</li>`).join("")}</ul>`);
    list=[];
  };
  for(const rawLine of lines){
    const line=rawLine.trim();
    if(!line){
      flushList();
      continue;
    }
    const heading=line.match(/^#{1,4}\s+(.+)/);
    if(heading){
      flushList();
      html.push(`<strong class="chat-heading">${inlineFormat(heading[1])}</strong>`);
      continue;
    }
    const bullet=line.match(/^[-*•]\s+(.+)/);
    if(bullet){
      list.push(bullet[1]);
      continue;
    }
    flushList();
    html.push(`<span>${inlineFormat(line)}</span>`);
  }
  flushList();
  return html.join("");
}

function completePossiblyTruncatedAnswer(answer){
  const text=String(answer||"").trim();
  if(!text)return "Je n’ai pas réussi à formuler une réponse utile.";
  if(text.length<80||/[.!?…)]$/.test(text))return text;
  return `${text}\n\nJe complète pour éviter une réponse coupée : il faut surtout retenir l’idée principale, puis l’appliquer étape par étape. Une reformulation courte, détaillée ou actionnable peut ensuite être demandée.`;
}

async function askLlm(question){
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),12000);
  const response=await fetch(LLM_ENDPOINT,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    signal:controller.signal,
    body:JSON.stringify({
      message:question,
      history:chatHistory.slice(-14),
      conversationState
    })
  }).finally(()=>clearTimeout(timeout));
  if(!response.ok)throw new Error(`LLM request failed: ${response.status}`);
  const data=await response.json();
  return completePossiblyTruncatedAnswer(data.answer);
}

async function askChat(question){
  if(!chatMessages)return;
  addMessage(question,"user");
  const answer=answerQuestion(question);
  if(answer.source==="local"){
    chatHistory.push({role:"user",content:question},{role:"assistant",content:answer.text});
    updateConversationState(question,answer.text);
    setTimeout(()=>{
      addMessage(answer.text,"bot");
      renderSuggestions(nextSuggestions(question));
    },180);
    return;
  }
  const typing=addMessage("Je réfléchis…","bot thinking");
  try{
    const llmAnswer=await askLlm(question);
    typing.className="bot";
    typing.innerHTML=formatBotAnswer(llmAnswer);
    chatHistory.push({role:"user",content:question},{role:"assistant",content:llmAnswer});
    updateConversationState(question,llmAnswer);
    renderSuggestions(nextSuggestions(question));
  }catch(error){
    console.warn("Nia LLM unavailable",error);
    typing.className="bot";
    typing.innerHTML=formatBotAnswer("Le LLM ne répond pas pour le moment. Je reste utile en local : pitch, arguments de recrutement, projets forts et coordonnées restent disponibles.");
    updateConversationState(question,"Réponse LLM indisponible, bascule vers les informations locales.");
    renderSuggestions(["Pitch en 20 secondes","Pourquoi le recruter ?","Comment le contacter ?"]);
  }
  if(chatHistory.length>18)chatHistory.splice(0,chatHistory.length-18);
}

if(miniChat&&chatToggle&&chatPanel&&chatClose&&chatForm&&chatInput){
  chatToggle.addEventListener("click",()=>{
    const opening=!miniChat.classList.contains("open");
    miniChat.classList.toggle("open",opening);
    chatToggle.setAttribute("aria-expanded",String(opening));
    chatPanel.setAttribute("aria-hidden",String(!opening));
    if(opening){
      if(!suggestionsRendered)renderSuggestions();
      setTimeout(()=>chatInput.focus(),120);
    }
  });

  chatClose.addEventListener("click",()=>{
    miniChat.classList.remove("open");
    chatToggle.setAttribute("aria-expanded","false");
    chatPanel.setAttribute("aria-hidden","true");
    chatToggle.focus();
  });

  chatForm.addEventListener("submit",event=>{
    event.preventDefault();
    const question=chatInput.value.trim();
    if(!question)return;
    chatInput.value="";
    askChat(question);
  });
}
