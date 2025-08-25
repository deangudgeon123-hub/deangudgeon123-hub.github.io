// project data and rendering without images
const projects=[
  {
    title:"MedBot — Health Assistant Prototype",
    desc:"Chatbot demo built on RunPod for safe Q&A and triage-style guidance while users wait for appointments.",
    stack:["RunPod","LLM API","JavaScript"],
    link:"medbot.html"
  },
  {
    title:"Email Triage Automation",
    desc:"n8n workflow that classifies incoming emails, tags them, and drafts suggested replies to speed up responses.",
    stack:["n8n","LLM","Gmail API"],
    link:"email-triage.html"
  },
  {
    title:"SamarAI — NHS Innovation Support",
    desc:"Mental-health journaling tool supported by the NHS innovation system (NIHR & RSS).",
    stack:["Python","LLM","Product Design"],
    link:"samarai.html"
  }
];
function renderProjects(){
  const grid=document.getElementById('project-grid');
  if(!grid) return;
  grid.innerHTML=projects.map(p=>`
      <a class="card project-card card-link" href="${p.link}">
        <div class="project-thumb placeholder-thumb">Preview coming soon</div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div>${p.stack.map(s=>`<span class="chip">${s}</span>`).join('')}</div>
      </a>
  `).join('');
}
document.addEventListener('DOMContentLoaded',renderProjects);
