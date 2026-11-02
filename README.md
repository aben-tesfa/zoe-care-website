# Zoe Care, LLC — Website Starter

A complete **static, responsive, multi-page website** based on the Zoe Care, LLC website development brief. Suitable for previewing locally or uploading to most static web hosts and cPanel hosting accounts.

## Pages

- `index.html` — Home, introduction, services, values, how it works
- `about.html` — About the agency and approach to care
- `services.html` — IHSS, personal care, homemaker, DD waiver service descriptions
- `who-we-serve.html` — Individuals, families, and support networks
- `service-areas.html` — Colorado service availability
- `careers.html` — Caregiver inquiries (form preview)
- `contact.html` — Contact / request care (form preview)
- `faq.html` — Frequently asked questions
- `resources.html` — Helpful introductory care resources
- `privacy.html` — **Draft only**, agency review required

## Preview

1. Unzip the website package.
2. Open `index.html` in Chrome or Edge. Navigate between pages with the menu.
3. Images are linked to Unsplash and require an internet connection. If offline, a soft illustrated fallback background appears.

For testing via local web server (optional): `python -m http.server 8000` in the website folder, then visit `http://localhost:8000`.

## Publish on cPanel

1. Log in to your hosting cPanel.
2. Open **File Manager** → **public_html**, or the selected domain's document root.
3. Upload and **extract** the contents of the ZIP file so `index.html` is directly in that document root (not inside an extra subfolder).
4. Verify your domain has an SSL certificate and loads as `https://`.
5. Test all pages at mobile and desktop sizes.

## Required before real launch

1. **Official logo:** replace `assets/zoe-care-logo.png` with the original high-resolution, approved agency logo. The current file was extracted from the supplied development brief and is suitable for the prototype only.
2. **Contact details:** provide the agency phone, email, main office address if intended for publication, and contact/office hours. These were *not* in the brief, so no contact information was invented.
3. **Service authorization:** confirm agency license type, PASA authorization, the exact programs it serves, approved services, and specific approved counties. The public text deliberately avoids asserting an unverified license or guaranteeing statewide coverage.
4. **Real photos:** replace demonstration images with approved agency photography and permission-cleared testimonials. The template does not invent reviews.
5. **Form processing:** the forms currently validate inputs but **do not transmit, store, or email** submissions. To enable, create a secure HTTPS API that accepts `POST` JSON and configure `careEndpoint` and `careersEndpoint` in `assets/config.js`. On the backend: validation, rate limiting, spam protection, monitoring, transport encryption, authentication, data retention, access control, and appropriate privacy/compliance controls are required. Avoid receiving protected health information in general inquiries. Use appropriate HIPAA-compliant services / BAAs where applicable. The form warnings must be updated only after a secure integration is tested.
6. **Privacy policy:** `privacy.html` is a draft, not legal advice. Replace with a reviewed, accurate privacy and cookies/data notice before launch. If you use analytics, implement the appropriate consent behavior.
7. **Scheduling:** optional appointment scheduling was not connected. The contact form can be used for consultation requests after production integration.
8. **SEO:** add your official domain canonical URLs, Google Business Profile, approved local service-area details, sitemap, robots.txt, social share image and verified contact business info as finalized.
9. **Accessibility:** test manually with keyboard, screen readers, and WCAG 2.2 AA checks before claiming compliance.

## Customization

- Colors and layout: `assets/styles.css`
- Form endpoint settings: `assets/config.js`
- Menu behavior / validation / submission: `assets/app.js`
- Text and sections: edit each HTML file
- Image and license sources: `assets/CREDITS.txt`

## Notes

- The site uses ordinary HTML/CSS/JavaScript (no npm install and no build step).
- Forms intentionally avoid requesting medical history, diagnoses, and government identity numbers.
- The form preview does not claim a request was submitted.

## Vercel deployment (public client preview)

This folder is deployment-ready as a static website and includes `vercel.json`.

### From the Vercel dashboard with a Git repository
1. Create a new GitHub repository and upload **the contents** of this folder (root should contain `index.html` and `vercel.json`).
2. In Vercel, select **Add New > Project**, connect GitHub, and import that repository.
3. Set **Framework Preset** to **Other**, **Build Command** to none/blank, and **Output Directory** to `.` if Vercel requests it.
4. Select **Deploy**. Vercel will provide a public `https://...vercel.app` preview link.
5. Test the ten pages and mobile navigation. Note: Forms are preview-only and **do not submit requests**.

### Alternative: Vercel CLI
In the unzipped folder on your computer, run `npx vercel login`, then `npx vercel --prod` and follow the prompts. No environment secrets are needed for this preview site.

For a client review, do not enable real submissions until data handling and service authorization have been reviewed.