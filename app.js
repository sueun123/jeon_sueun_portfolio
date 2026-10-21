const aboutSection = document.querySelector('#about');
const projectsSection = document.querySelector('#projects');
const objectsSection = document.querySelector('#objects');
const navLinks = document.querySelectorAll('.site-nav a');

// Build two matching groups so the title strip loops without a visible jump.
document.querySelectorAll('.detail-marquee').forEach((marquee) => {
  const title = marquee.closest('.detail-shell')?.querySelector('.detail-intro h1')?.textContent?.trim();
  if (!title) return;
  const track = document.createElement('div');
  track.className = 'detail-marquee-track';
  for (let groupIndex = 0; groupIndex < 2; groupIndex += 1) {
    const group = document.createElement('div');
    group.className = 'detail-marquee-group';
    for (let repeat = 0; repeat < 3; repeat += 1) {
      const item = document.createElement('span');
      item.textContent = title;
      group.append(item);
    }
    track.append(group);
  }
  marquee.replaceChildren(track);
});

function updateCurrentSection() {
  if (!aboutSection || !projectsSection || !objectsSection) return;
  let current = 'home';
  if (aboutSection.getBoundingClientRect().top <= window.innerHeight * 0.5) current = 'about';
  if (projectsSection.getBoundingClientRect().top <= window.innerHeight * 0.5) current = 'projects';
  if (objectsSection.getBoundingClientRect().top <= window.innerHeight * 0.5) current = 'objects';
  document.body.dataset.currentSection = current;
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === `#${current}`) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

window.addEventListener('scroll', updateCurrentSection, { passive: true });
window.addEventListener('resize', updateCurrentSection);
updateCurrentSection();

document.querySelectorAll('.contact-card-close').forEach((button) => {
  button.addEventListener('click', () => button.closest('.contact-card').remove());
});

document.querySelectorAll('.share-page').forEach((button) => {
  button.addEventListener('click', async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.querySelector('meta[property="og:title"]')?.content || document.title,
          text: document.querySelector('meta[name="description"]')?.content || '',
          url: location.href,
        });
      } catch (_) {}
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(location.href);
        button.textContent = 'Copied';
        window.setTimeout(() => { button.textContent = 'Share'; }, 2000);
      } catch (_) {}
    }
  });
});
