const root=document.documentElement;
let pointerFrame=null;

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
  if(q.includes("localisation")||q.includes("ville")||q.includes("abidjan")||q.includes("cotonou")||q.includes("ou est")){
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
