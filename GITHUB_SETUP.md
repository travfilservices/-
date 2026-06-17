# 📦 How to Upload the Travfil Website to GitHub

## 1. Create a GitHub repository

1. Go to GitHub and sign in.
2. Click the **+** icon, then choose **New repository**.
3. Name it `travfil-website` or any name you prefer.
4. Add a description, such as: `Travfil Travel Services website`.
5. Choose Public or Private.
6. Click **Create repository**.

## 2. Use this folder structure

```text
travfil-website/
├── index.html
├── style.css
├── script.js
├── README.md
├── GITHUB_SETUP.md
├── .gitignore
└── assets/
    ├── Main_BG.png
    ├── Travfil_Logo.jpg
    ├── enchanted-kingdom.webp
    ├── zoobic-safari-poster.jpg
    ├── zoobic-safari.mp4
    ├── ocean-adventure-poster.jpg
    ├── ocean-adventure.mp4
    ├── pradera-poster.jpg
    ├── pradera.mp4
    └── bdo_travfil.png
```

The `assets/` folder is required because the website references images and videos from that folder.

## 3. Upload with Git command line

Open a terminal inside the project folder and run:

```bash
git init
git add .
git commit -m "Initial commit - Travfil website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/travfil-website.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## 4. Enable GitHub Pages

1. Open your GitHub repository.
2. Go to **Settings**.
3. Open **Pages**.
4. Under source, choose **Deploy from a branch**.
5. Select branch: `main`.
6. Select folder: `/ (root)`.
7. Click **Save**.

Your website will be available at:

```text
https://YOUR_USERNAME.github.io/travfil-website
```

## 5. Final testing after upload

After GitHub Pages finishes deploying, test:

- Navigation links
- Mobile hamburger menu
- Why Choose Us dropdown
- Services carousel continuous auto-scroll
- Services carousel pauses only when hovering over service cards
- Services carousel left/right fade effect and hidden scrollbar
- Company Profile tabs
- Package video play buttons
- Book This Package buttons
- Contact form validation
- Images and videos loading from the `assets/` folder

## Troubleshooting

### Images or videos do not load

Check that the `assets/` folder was uploaded and that file names match exactly. GitHub Pages is case-sensitive.

### Carousel does not move

Make sure `script.js` is uploaded in the root folder. The carousel is designed to keep moving continuously and pause only when hovering over service cards.

### Contact form does not submit

The current form uses FormSubmit and posts to `travfilmarketing@yahoo.com`. The first submission may require email confirmation from FormSubmit.


## Payment setup

The website is configured for Bank / Wire Transfer only through BDO:

```text
BDO — Travfil Travel Services
Account No.: 002720319879
```

Make sure `assets/bdo_travfil.png` is uploaded with the rest of the assets.
