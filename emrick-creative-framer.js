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
