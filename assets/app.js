(() => {
  'use strict';
  const page = document.body.dataset.page || 'index.html';
  document.querySelectorAll(`[data-nav="${page}"]`).forEach(link => {
    link.setAttribute('aria-current', 'page');
  });
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const menuBtn = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-nav');
  if (menuBtn && mobileMenu) {
    const setMenu = open => {
      mobileMenu.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      menuBtn.querySelector('svg').innerHTML = open
        ? '<path d="M5 5 19 19M19 5 5 19"/>'
        : '<path d="M4 7h16M4 12h16M4 17h16"/>';
    };
    menuBtn.addEventListener('click', () => setMenu(mobileMenu.hidden));
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', () => { if (innerWidth > 1030) setMenu(false); });
  }
  const cfgPromise = new Promise(resolve => {
    const s = document.createElement('script');
    s.src = 'assets/config.js';
    s.onload = resolve;
    s.onerror = resolve;
    document.head.appendChild(s);
  });
  const showStatus = (node, kind, message) => {
    node.className = `form-status show ${kind}`;
    node.textContent = message;
    node.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  document.querySelectorAll('form.interactive-form').forEach(form => {
    const status = form.querySelector('.form-status');
    const submitButton = form.querySelector('[type=submit]');
    const fields = Array.from(form.querySelectorAll('[required]'));
    form.querySelectorAll('input,select,textarea').forEach(field => {
      field.addEventListener('input', () => field.removeAttribute('aria-invalid'));
      field.addEventListener('change', () => field.removeAttribute('aria-invalid'));
    });
    form.addEventListener('submit', async event => {
      event.preventDefault();
      let firstInvalid = null;
      for (const field of fields) {
        if (!field.checkValidity()) {
          field.setAttribute('aria-invalid', 'true');
          firstInvalid ||= field;
        }
      }
      if (firstInvalid) {
        showStatus(status,'error','Please complete the required fields correctly and accept the contact consent before continuing.');
        firstInvalid.focus();
        return;
      }
      await cfgPromise;
      const type = form.dataset.form;
      const endpoint = type === 'care'
        ? window.ZOE_FORM_CONFIG?.careEndpoint
        : window.ZOE_FORM_CONFIG?.careersEndpoint;
      if (!endpoint) {
        showStatus(status,'warning','Preview only — your information has not been sent or saved. The website owner must connect a secure form service before accepting requests.');
        return;
      }
      if (!/^https:\/\//i.test(endpoint)) {
        showStatus(status,'error','Form delivery is not configured securely. An HTTPS endpoint is required.');
        return;
      }
      const payload = Object.fromEntries(new FormData(form).entries());
      payload.form_type = type;
      submitButton.disabled = true;
      const original = submitButton.innerHTML;
      submitButton.textContent = 'Sending…';
      try {
        const response = await fetch(endpoint, {
          method: 'POST', headers: {'Content-Type':'application/json'},
          body: JSON.stringify(payload), mode: 'cors', credentials: 'omit'
        });
        if (!response.ok) throw new Error('The request could not be accepted.');
        form.reset();
        showStatus(status,'success','Thank you. Your inquiry has been submitted. Please keep a copy of any confirmation sent by the organization.');
      } catch(e) {
        showStatus(status,'error','We could not submit your form. Please try again later or use the agency contact details once they are published.');
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = original;
      }
    });
  });
})();