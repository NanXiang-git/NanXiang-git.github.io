'use strict';
document.documentElement.classList.add('js');
const button = document.querySelector('.hamburger');
const menu = document.querySelector('.nav-menu');
const links = [...document.querySelectorAll('.nav-link')];
function closeMenu() { menu.classList.remove('active'); button.setAttribute('aria-expanded', 'false'); }
button.addEventListener('click', () => { const open = button.getAttribute('aria-expanded') !== 'true'; menu.classList.toggle('active', open); button.setAttribute('aria-expanded', String(open)); });
links.forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if(e.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') { closeMenu(); button.focus(); } });
const targets = links.map(link => document.querySelector(link.hash));
let scheduled = false;
function updateNavigation() {
  let active = targets[0];
  const offset = document.querySelector('.navbar').getBoundingClientRect().height + 60;
  targets.forEach(section => { if(section.getBoundingClientRect().top <= offset) active = section; });
  links.forEach(link => { const current = link.hash === '#' + active.id; link.classList.toggle('active', current); if(current) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); });
  scheduled = false;
}
window.addEventListener('scroll', () => { if(!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); } }, {passive:true});
window.addEventListener('resize', () => { if(window.innerWidth > 900) closeMenu(); updateNavigation(); });
updateNavigation();
