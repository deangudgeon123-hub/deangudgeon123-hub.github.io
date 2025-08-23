const projects = [
  { title: "MedBot — Health Assistant Prototype",
    desc: "Chatbot demo built on RunPod for safe Q&A and triage-style guidance while users wait for appointments.",
    stack: "RunPod · LLM API · JavaScript", image: "assets/medbot-thumb.jpg", link: "#" },
  { title: "Email Triage Automation",
    desc: "n8n workflow that classifies incoming emails, tags them, and drafts suggested replies to speed up responses.",
    stack: "n8n · LLM · Gmail API (or IMAP)", image: "assets/email-thumb.jpg", link: "#" },
  { title: "SamarAI — NHS Innovation Support",
    desc: "Mental-health journaling tool supported by the NHS innovation system (NIHR & RSS).",
    stack: "Python · LLM · Product Design", image: "assets/samarai-thumb.jpg", link: "#" }
];
function renderProjects(){
  const grid = document.getElementById('project-grid');
  grid.innerHTML = projects.map(p => `
    <article class="card project-card">
      <img src="${p.image}" alt="${p.title} preview">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="stack">${p.stack}</div>
      ${p.link && p.link !== "#" ? `<a class="more" href="${p.link}" target="_blank" rel="noopener">View</a>` : ""}
    </article>`).join("");
}
document.addEventListener('DOMContentLoaded', renderProjects);