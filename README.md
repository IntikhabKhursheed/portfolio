# Portfolio Site

A fast, responsive, static portfolio for Intikhab Khursheed.

## Structure
- `index.html` – page layout and sections
- `css/style.css` – styles with light/dark theme
- `js/main.js` – populates the page from `data/site.json`
- `data/site.json` – your editable content (name, bio, skills, projects, etc.)
- `assets/` – favicon and images

## Edit your content
Update everything in `data/site.json`. Key fields:
- `resume_url`: paste a public link to your PDF resume
- `socials`: LinkedIn/GitHub/etc. URLs
- `projects`: add more entries with `title`, `description`, `features[]`, `tech[]`, `live`, `repo`
- `headshot`: path to your photo (default: `/assets/images/headshot.jpg`)

## Preview locally
Open `index.html` in your browser or use a local server:
- VS Code Live Server, or
- `python3 -m http.server 5500` and visit http://localhost:5500

## Deploy
- Netlify: drag-and-drop the folder or connect a repo
- Vercel: `vercel` from the folder or import from GitHub
- GitHub Pages: push to a repo and enable Pages

## Notes
- Images: Put your headshot at `assets/images/headshot.jpg`
- SEO: Basic meta tags are present. You can expand as needed.
