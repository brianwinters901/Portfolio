import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ResumeAnalyzer from "@/components/ResumeAnalyzer";

export const metadata: Metadata = {
  title: "AI Resume Analyzer | Brian Winters",
  description: "AI Resume Analyzer — Get instant feedback on your resume for any job title.",
};

export default function ResumeAnalyzerPage() {
  return (
    <>
      <Navbar activePath="resume-analyzer" />

      <header className="analyzer-hero">
        <div className="container">
          <h1>AI Resume Analyzer</h1>
          <p>
            Paste your resume and enter a target job title to receive an instant analysis with
            actionable feedback — no API key required.
          </p>
        </div>
      </header>

      <ResumeAnalyzer />
      <Footer />
    </>
  );
}
