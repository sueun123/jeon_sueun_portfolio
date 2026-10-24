const aboutSection = document.querySelector('#about');
const projectsSection = document.querySelector('#projects');
const objectsSection = document.querySelector('#objects');
const navLinks = document.querySelectorAll('.site-nav a');
const introScreen = document.querySelector('#portfolio-intro');
const portfolioSite = document.querySelector('.page-shell');
const stampEntry = document.querySelector('.stamp-entry');

// Keep the entire existing site out of the rendered page until the stamp is activated.
if (introScreen && portfolioSite && stampEntry) {
  const returnSource = new URLSearchParams(location.search).get('from');
  const returningToProjects = ['matcha', 'natural-beauty'].includes(returnSource) && location.hash.toLowerCase() === '#projects';
  if (returningToProjects) {
    introScreen.hidden = true;
    introScreen.style.display = 'none';
    portfolioSite.hidden = false;
    history.replaceState(null, '', '#projects');
    window.requestAnimationFrame(() => {
      projectsSection?.scrollIntoView();
      updateCurrentSection();
    });
  } else {
    const introStamp = introScreen.querySelector('.intro-stamp');
    window.setTimeout(() => {
      if (introScreen.hidden || introScreen.classList.contains('is-leaving')) return;
      introScreen.classList.add('is-ready');
      introStamp?.classList.add('is-attention');
    }, 2000);

    stampEntry.addEventListener('click', () => {
      if (stampEntry.disabled) return;
      stampEntry.disabled = true;
      introScreen.classList.add('is-leaving');
      window.setTimeout(() => {
        introScreen.hidden = true;
        portfolioSite.hidden = false;
        portfolioSite.classList.add('is-entering');
        history.replaceState(null, '', '#home');
        updateCurrentSection();
      }, 650);
    }, { once: true });
  }
}

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

const naturalBeautyPage = document.querySelector('.project-natural-beauty');
const naturalImageView = document.querySelector('#natural-image-view');
if (naturalBeautyPage && naturalImageView) {
  const detailImage = naturalImageView.querySelector('.natural-image-view-content');
  const backButton = naturalImageView.querySelector('.natural-image-back');
  let returnScrollY = 0;
  let previousOverflow = '';
  let returnFocus = null;
  let detailIsOpen = false;

  const closeNaturalDetail = () => {
    if (!detailIsOpen) return;
    detailIsOpen = false;
    naturalImageView.hidden = true;
    document.body.style.overflow = previousOverflow;
    window.scrollTo(0, returnScrollY);
    returnFocus?.focus({ preventScroll: true });
  };

  naturalBeautyPage.querySelectorAll('.natural-board-hotspot').forEach((hotspot) => {
    hotspot.addEventListener('click', () => {
      returnScrollY = window.scrollY;
      previousOverflow = document.body.style.overflow;
      returnFocus = hotspot;
      detailImage.src = hotspot.dataset.detailSrc;
      detailImage.alt = `${hotspot.getAttribute('aria-label').replace(' 상세 이미지 보기', '')} 상세 이미지`;
      naturalImageView.hidden = false;
      naturalImageView.scrollTop = 0;
      document.body.style.overflow = 'hidden';
      detailIsOpen = true;
      history.pushState({ naturalBeautyDetail: true }, '', '#natural-detail');
      backButton.focus({ preventScroll: true });
    });
  });

  backButton.addEventListener('click', () => {
    if (history.state?.naturalBeautyDetail) history.back();
    else closeNaturalDetail();
  });
  window.addEventListener('popstate', closeNaturalDetail);
}
