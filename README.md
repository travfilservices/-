# 🇵🇭 Travfil Travel Services - Website

A modern, responsive website for **Travfil Travel Services**, a Philippine-based travel agency specializing in educational tours, group outings, tourist transport, ticketing, and group packages.

## ✅ What is included

* Sticky desktop and mobile navigation
* Hero section with Travfil background and logo
* Orange **Why Choose Us** circle button with dropdown
* Company profile tabs with keyboard-accessible tab switching
* Fixed services carousel with:

  * automatic seamless scrolling
  * fade effect on the left and right edges
  * hidden scrollbar for a cleaner layout
  * hover-to-pause behavior on service cards only
* Featured package cards with image/video banners
* Playable package video buttons
* Package inquiry buttons that pre-fill the contact form
* Contact form validation before sending to FormSubmit
* Responsive layouts for desktop, tablet, and mobile
* Asset folder with all referenced images and videos

## 📁 Project structure

```text
travfil-website/
├── index.html
├── style.css
├── script.js
├── README.md
├── GITHUB\_SETUP.md
├── .gitignore
└── assets/
    ├── Main\_BG.png
    ├── Travfil\_Logo.jpg
    ├── enchanted-kingdom.webp
    ├── zoobic-safari-poster.jpg
    ├── zoobic-safari.mp4
    ├── ocean-adventure-poster.jpg
    ├── ocean-adventure.mp4
    ├── pradera-poster.jpg
    └── pradera.mp4
```

## 🚀 Quick start

Open `index.html` directly in a browser, or run a local server from the project folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## 🔍 Testing checklist

Before publishing, test these actions:

1. Open and close the mobile hamburger menu.
2. Click each navigation link and confirm it scrolls to the correct section.
3. Click the orange **Why Choose Us** circle and confirm the dropdown opens and closes.
4. Switch all Company Profile tabs.
5. Confirm the services carousel auto-scrolls continuously.
6. Hover over a service card and confirm the carousel pauses, then resumes after the cursor leaves the card.
7. Confirm the carousel has faded left and right edges and no visible bottom scrollbar.
8. Play each package video and confirm only one video plays at a time.
9. Click every **Book This Package** button and confirm the contact form is pre-filled.
10. Submit the contact form empty and confirm the validation message appears.
11. Fill a valid inquiry and confirm it submits to FormSubmit.

## 🎨 Brand colors

```css
:root {
  --navy:   #1B2A5E;
  --orange: #F47C20;
  --teal:   #2E8B7A;
}
```

## 🌐 Deployment

You can deploy this as a static website on GitHub Pages, Netlify, Vercel, or any standard web host. Make sure `index.html`, `style.css`, `script.js`, and the full `assets/` folder stay together in the same structure.

## 📞 Current contact form

The form posts to FormSubmit using this address:

```text
travfilmarketing@yahoo.com
```

To change the recipient, edit the `action` value on the contact form in `index.html`.

Created and maintained by: Alvin Rustia



## 🏦 Payment Method

The website now shows Bank / Wire Transfer only:

```text
BDO — Travfil Travel Services
Account No.: 002720319879
```

Other payment methods such as GCash, Maya / PayMaya, and Credit / Debit Card have been removed from the website.
