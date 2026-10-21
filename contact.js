const form = document.querySelector('#contact-form');
const feedback = document.querySelector('#form-feedback');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const message = String(data.get('message') || '').trim();
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

  feedback.textContent = '메일 앱에서 내용을 확인하고 보내주세요.';
  window.location.href = `mailto:love_9336@naver.com?subject=${subject}&body=${body}`;
});
