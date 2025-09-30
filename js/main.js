const state = { data: null };

function fixPath(p) {
  if (!p) return p;
  // Remove a leading slash so GitHub Pages subpaths work (e.g., /portfolio)
  if (p.startsWith('/')) return p.slice(1);
  return p;
}

function setThemeFromPref() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const useDark = saved ? saved === 'dark' : prefersDark;
  document.documentElement.classList.toggle('dark', useDark);
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
}

function renderBasics(d) {
  document.getElementById('summary').textContent = d.summary;
  document.getElementById('aboutText').textContent = d.about || d.summary;
  document.getElementById('location').textContent = d.location || '';
  document.getElementById('year').textContent = new Date().getFullYear();
  const resume = document.getElementById('resumeLink');
  if (d.resume_url && d.resume_url.trim() !== '') {
    resume.classList.remove('hidden');
    resume.href = fixPath(d.resume_url);
    // If it's a local PDF path, hint download
    if (d.resume_url.endsWith('.pdf')) {
      resume.setAttribute('download', 'Intikhab-Khursheed-Resume.pdf');
    }
  } else {
    resume.classList.add('hidden');
    resume.href = '#';
    resume.setAttribute('aria-disabled', 'true');
  }
  const email = document.getElementById('emailLink');
  if (d.email) email.href = `mailto:${d.email}`;
  if (d.headshot) document.getElementById('headshot').src = fixPath(d.headshot);
}

function renderSkills(d) {
  const grid = document.getElementById('skillsGrid');
  grid.innerHTML = '';
  (d.skills || []).forEach(cat => {
    const card = el('div', 'skill-card');
    card.append(el('h3', null, cat.category));
    const ul = el('ul');
    cat.items.forEach(s => ul.append(el('li', null, s)));
    card.append(ul);
    grid.append(card);
  });
}

function renderProjects(d) {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';
  (d.projects || []).forEach(p => {
    const card = el('article', 'card');
    card.append(el('h3', null, p.title));
    card.append(el('p', 'meta', p.description));
    if (p.features?.length) {
      const ul = el('ul');
      p.features.forEach(f => ul.append(el('li', null, f)));
      card.append(ul);
    }
    const tags = el('div', 'tags');
    p.tech.forEach(t => tags.append(el('span', 'tag', t)));
    card.append(tags);
    const actions = el('div', 'actions');
    if (p.live) {
      const a = el('a', 'btn primary', 'Live'); a.href = p.live; a.target = '_blank'; actions.append(a);
    }
    if (p.repo) {
      const a = el('a', 'btn', 'Repo'); a.href = p.repo; a.target = '_blank'; actions.append(a);
    }
    card.append(actions);
    grid.append(card);
  });
}

function renderExperience(d) {
  const list = document.getElementById('experienceList');
  list.innerHTML = '';
  (d.experience || []).forEach(r => {
    const role = el('div', 'role');
    role.append(el('h3', null, `${r.title} – ${r.company}`));
    role.append(el('div', 'where', `${r.location} • ${r.dates}`));
    const ul = el('ul');
    (r.bullets || []).forEach(b => ul.append(el('li', null, b)));
    role.append(ul);
    list.append(role);
  });
}

function renderEducation(d) {
  const ul = document.getElementById('educationList');
  ul.innerHTML = '';
  (d.education || []).forEach(e => {
    const li = el('li', 'edu-item');
    li.append(el('strong', null, e.title));
    li.append(el('div', 'where', `${e.school} • ${e.dates}`));
    ul.append(li);
  });
}

function renderSocials(d) {
  const s = document.getElementById('socialLinks');
  s.innerHTML = '';
  (d.socials || []).forEach(link => {
    const a = el('a', null, link.label);
    a.href = link.url; a.target = '_blank';
    s.append(a);
  });
}

async function init() {
  setThemeFromPref();
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  const res = await fetch(`data/site.json?ts=${Date.now()}`);
  const data = await res.json();
  state.data = data;
  renderBasics(data);
  renderSkills(data);
  renderProjects(data);
  renderExperience(data);
  renderEducation(data);
  renderSocials(data);
}

init();
