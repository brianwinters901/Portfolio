import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Calculator | Brian Winters",
  description: "A clean, keyboard-friendly calculator built with React and TypeScript.",
};

export default function CalculatorPage() {
  return (
    <>
      <Navbar activePath="calculator" />

      <header className="analyzer-hero">
        <div className="container">
          <h1>Calculator</h1>
          <p>
            A responsive calculator with basic arithmetic, percent, sign toggle, and full keyboard
            support.
          </p>
        </div>
      </header>

      <Calculator />
      <Footer />
    </>
  );
}
