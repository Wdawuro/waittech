// Basic interactivity: mobile menu, theme toggle, search modal, newsletter + contact placeholders
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const nav = document.getElementById('main-nav');
  const searchToggle = document.getElementById('search-toggle');
  const searchModal = document.getElementById('search-modal');
  const searchClose = document.getElementById('search-close');

  // Persist theme (dark by default)
  const storedTheme = localStorage.getItem('wait-theme');
  if(storedTheme) body.className = storedTheme;

  themeToggle?.addEventListener('click', () => {
    if(body.classList.contains('theme-dark')) {
      body.classList.remove('theme-dark');
      body.classList.add('theme-light');
      localStorage.setItem('wait-theme','theme-light');
    } else {
      body.classList.remove('theme-light');
      body.classList.add('theme-dark');
      localStorage.setItem('wait-theme','theme-dark');
    }
  });

  // Mobile nav
  mobileToggle?.addEventListener('click', () => {
    if(nav.style.display === 'block'){ nav.style.display = ''; }
    else { nav.style.display = 'block'; }
  });

  // Search modal
  searchToggle?.addEventListener('click', () => {
    if(searchModal) { searchModal.setAttribute('aria-hidden','false'); }
  });
  searchClose?.addEventListener('click', () => {
    if(searchModal) { searchModal.setAttribute('aria-hidden','true'); }
  });

  // Newsletter submit (placeholder)
  const newsletter = document.getElementById('newsletter-form');
  newsletter?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    if(!email || !email.includes('@')) { alert('Please enter a valid email'); return; }
    // TODO: send to backend / API or third-party mailing list
    alert('Thanks! We received your subscription request.');
    newsletter.reset();
  });

  // Live chat toggles
  const chatBtn = document.getElementById('chat-btn');
  const chatWidget = document.getElementById('chat-widget');
  const chatClose = document.querySelector('.chat-close');
  chatBtn?.addEventListener('click', () => {
    if(chatWidget) { chatWidget.classList.toggle('hidden'); chatWidget.setAttribute('aria-hidden', chatWidget.classList.contains('hidden')); }
  });
  chatClose?.addEventListener('click', () => {
    if(chatWidget) chatWidget.classList.add('hidden');
  });

  // Simple site search (client-side demo)
  const siteSearch = document.getElementById('site-search');
  const results = document.getElementById('search-results');
  const index = [
    {title:'AI Solutions', url:'services.html#ai-solutions', excerpt:'Custom ML, NLP, and vision.'},
    {title:'SmartAutomation Case Study', url:'projects.html#smartautomation', excerpt:'Retail personalization results.'},
    {title:'SmartAutomation v1.2', url:'blog.html#release-v1-2', excerpt:'New workflow templates.'}
  ];
  siteSearch?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    results.innerHTML = '';
    if(q.length < 2) return;
    const matches = index.filter(i => (i.title + ' ' + i.excerpt).toLowerCase().includes(q));
    if(matches.length === 0) { results.innerHTML = '<p class="muted">No results</p>'; return; }
    matches.forEach(m => {
      const el = document.createElement('div');
      el.className = 'result-item';
      el.innerHTML = `<a href="${m.url}"><strong>${m.title}</strong></a><p class="muted">${m.excerpt}</p>`;
      results.appendChild(el);
    });
  });
});