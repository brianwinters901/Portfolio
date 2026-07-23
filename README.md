# Brian Winters Portfolio

Professional portfolio website with an interactive **AI Resume Analyzer** tool.

## About Me

Aspiring AI and Software Engineer with a growing portfolio of cloud and AI projects. Currently building applications using GitHub, AWS, and modern AI tools while expanding my skills in software development, automation, and cloud computing. Passionate about solving problems, continuous learning, and creating technology that delivers real-world value.

## Skills

- AI Tools
- Cloud Computing (AWS)
- GitHub
- Software Development
- Python
- Problem Solving
- Leadership
- Team Management
- Customer Service
- Communication

## Projects

### Portfolio Website

Personal portfolio website showcasing my projects, skills, and professional journey.

- Live Site: https://brianwinters901.github.io/brian-winters-portfolio/
- GitHub Repository: https://github.com/brianwinters901/brian-winters-portfolio

### AI Resume Analyzer

Paste a resume and target job title to get instant feedback — score, strengths, weaknesses, missing keywords, and improved bullet points. Uses mock analysis (no API key required).

### Calculator

Responsive calculator with basic arithmetic (+, −, ×, ÷), percent, sign toggle, and keyboard support.

Open `/calculator` locally or via the portfolio site.

## Experience

### Renaissance Leasing

- Assisted customers with leasing solutions
- Built strong client relationships
- Managed daily operational tasks

## Running Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. The calculator lives at `/calculator`.

For a static preview (same output as GitHub Pages):

```bash
npm run build:pages
npx serve out
```

## Publishing to GitHub Pages

Your site is already set up for static export. To publish updates:

1. Commit and push your changes to GitHub.
2. Run `npm run build:pages` — this builds the site and copies it into the `docs/` folder.
3. Commit and push the updated `docs/` folder.
4. In your repo on GitHub, go to **Settings → Pages** and set the source to **Deploy from a branch**, branch `main` (or `master`), folder **`/docs`**.

Live site: https://brianwinters901.github.io/brian-winters-portfolio/

After publishing, the calculator will be at:
https://brianwinters901.github.io/brian-winters-portfolio/calculator/

## Project Structure

```
Portfolio/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── calculator/page.tsx      # Calculator page
│   └── resume-analyzer/page.tsx # AI Resume Analyzer page
├── components/
│   ├── Calculator.tsx
│   ├── ResumeAnalyzer.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/
│   ├── calculator.ts            # Calculator logic
│   └── resume-analyzer.ts
├── scripts/export-to-docs.mjs   # Copies build output to docs/ for GitHub Pages
└── README.md
```

## Contact

- LinkedIn: https://www.linkedin.com/in/brian-winters-71b917413
- GitHub: https://github.com/brianwinters901
