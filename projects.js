// project data and rendering
const projects=[
  {
    title:"MedBot — Health Assistant Prototype",
    desc:"Chatbot demo built on RunPod for safe Q&A and triage-style guidance while users wait for appointments.",
    stack:["RunPod","LLM API","JavaScript"],
    image:"assets/medbot-thumb.jpg",
    alt:"MedBot interface preview",
    link:"medbot.html"
  },
  {
    title:"Email Triage Automation",
    desc:"n8n workflow that classifies incoming emails, tags them, and drafts suggested replies to speed up responses.",
    stack:["n8n","LLM","Gmail API"],
    image:"assets/email-thumb.jpg",
    alt:"Email triage workflow preview",
    link:"email-triage.html"
  },
  {
    title:"SamarAI — NHS Innovation Support",
    desc:"Mental-health journaling tool supported by the NHS innovation system (NIHR & RSS).",
    stack:["Python","LLM","Product Design"],
    image:"assets/samarai-thumb.jpg",
    alt:"SamarAI interface preview",
    link:"samarai.html"
  }
];
function renderProjects(){
  const grid=document.getElementById('project-grid');
  if(!grid) return;
  grid.innerHTML=projects.map(p=>{
    const thumb=p.image?
      `<img src="${p.image}" alt="${p.alt}" loading="lazy" decoding="async" onerror="this.remove();this.parentElement.classList.add('placeholder');this.parentElement.textContent='Preview coming soon';">`
      : 'Preview coming soon';
    return `
      <a class="card project-card card-link" href="${p.link}">
        <div class="project-thumb">${thumb}</div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div>${p.stack.map(s=>`<span class="chip">${s}</span>`).join('')}</div>
      </a>`;
  }).join('');
}
document.addEventListener('DOMContentLoaded',renderProjects);
