import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <header className="hero">
        <div className="container">
          <div>
            <p className="hero-greeting">Hello, I&apos;m</p>
            <h1>Brian Winters</h1>
            <p className="hero-tagline">
              AI Enthusiast and aspiring Software Engineer focused on Agentic AI, Cloud Technologies,
              and Workflow Automation. Building practical AI applications, AWS-hosted projects, and
              open-source solutions while expanding expertise in modern software development.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">View Projects</a>
              <a href="#contact" className="btn btn-secondary">Get in Touch</a>
              <a
                href="https://github.com/brianwinters901"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/brian-winters-71b917413"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="hero-avatar" aria-hidden="true">BW</div>
        </div>
      </header>

      <section id="about">
        <div className="container">
          <h2 className="section-title">About</h2>
          <p className="section-subtitle">From operations and client relations to building with AI and code.</p>
          <div className="about-content">
            <p>
              I&apos;m transitioning from a background in operations, client relations, and business development
              into AI and software engineering. That path gave me a strong foundation in problem-solving,
              communication, and delivering results under pressure — skills I now apply to technical work.
            </p>
            <p>
              Today I&apos;m focused on agentic AI, cloud technologies, and workflow automation. I&apos;m building
              hands-on projects — from AI-powered tools to AWS-hosted applications — and contributing
              open-source work while deepening my skills in modern software development practices.
            </p>
            <p>
              I&apos;m actively learning, shipping projects, and looking to grow in roles where I can combine
              practical engineering with thoughtful automation and AI.
            </p>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="container">
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">Core competencies across leadership, operations, and technology.</p>
          <div className="skills-grid">
            <span className="skill-tag">Leadership</span>
            <span className="skill-tag">Customer Service</span>
            <span className="skill-tag">Team Management</span>
            <span className="skill-tag">Problem Solving</span>
            <span className="skill-tag">Communication</span>
            <span className="skill-tag">AI Tools</span>
            <span className="skill-tag">Cloud Computing</span>
            <span className="skill-tag">Business Operations</span>
          </div>
        </div>
      </section>

      <section id="experience">
        <div className="container">
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">Professional background and key contributions.</p>
          <div className="timeline">
            <div className="timeline-item">
              <h3>Renaissance Leasing</h3>
              <p className="role">Operations &amp; Client Relations</p>
              <ul>
                <li>Assisted customers with leasing solutions</li>
                <li>Built strong client relationships</li>
                <li>Managed daily operational tasks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Interactive tools and applications I&apos;ve built.</p>
          <div className="card-grid">
            <div className="card">
              <div className="card-icon">🤖</div>
              <h3>AI Resume Analyzer</h3>
              <p>
                Paste a resume and job description to get a match score, ATS keyword suggestions,
                strengths, weaknesses, and improved bullet points.
              </p>
              <Link href="/resume-analyzer" className="btn btn-primary">Open AI Resume Analyzer</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="certifications">
        <div className="container">
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">Ongoing professional development.</p>
          <div className="timeline-item">
            <h3>Technology &amp; AI Focus</h3>
            <p className="role">Currently pursuing technology and AI-focused professional development</p>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">Let&apos;s connect — I&apos;d love to hear from you.</p>
          <div className="contact-links">
            <a
              href="https://www.linkedin.com/in/brian-winters-71b917413"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/brianwinters901"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
