const projects = [
  { title: "MedBot — Health Assistant Prototype",
    desc: "Chatbot demo built on RunPod for safe Q&A and triage-style guidance while users wait for appointments.",
    stack: "RunPod · LLM API · JavaScript", image: "assets/medbot-thumb.jpg", link: "medbot.html" },
  { title: "Email Triage Automation",
    desc: "n8n workflow that classifies incoming emails, tags them, and drafts suggested replies to speed up responses.",
    stack: "n8n · LLM · Gmail API (or IMAP)", image: "assets/email-thumb.jpg", link: "services.html#email-triage" },
  { title: "SamarAI — NHS Innovation Support",
    desc: "Mental-health journaling tool supported by the NHS innovation system (NIHR & RSS).",
    stack: "Python · LLM · Product Design", image: "assets/samarai-thumb.jpg", link: "samarai.html" }
];
function renderProjects(){
  const grid = document.getElementById('project-grid');
  grid.innerHTML = projects.map(p => `
    <a class="card project-card card-link" href="${p.link}">
      <img src="${p.image}" alt="${p.title} preview">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="stack">${p.stack}</div>
    </a>`).join("");
}
document.addEventListener('DOMContentLoaded', renderProjects);
