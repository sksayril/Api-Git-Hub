"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I retrieve my purchased items?",
    answer: "Once your payment is successfully processed, you will receive an email with a secure download link. You can also access your purchased items anytime from your ProjectHub account dashboard under the 'Purchases' section.",
  },
  {
    question: "Are the templates customizable?",
    answer: "Yes, all templates are fully customizable. They include source files, complete layout assets, documentation, and editable UI elements. We build them using industry standards (like Next.js, Tailwind, Swift, etc.) so developers can easily make modifications.",
  },
  {
    question: "What kind of license do I get?",
    answer: "Every digital project comes with standard commercial licensing terms. You are permitted to use the item for single personal or commercial client work. Redistribution, reselling, or sub-licensing the source code is strictly prohibited.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Due to the non-tangible digital nature of the projects, we generally do not offer refunds once the files have been downloaded. However, if there is a technical defect or the file is corrupted, please reach out to our customer support within 14 days and we will gladly assist you.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 sm:px-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-12 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Frequently Asked Questions
        </h2>
      </div>

      {/* Accordions */}
      <div className="flex flex-col gap-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="glass-panel rounded-2xl border border-white/5 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer transition-colors hover:bg-white/5"
              >
                <span className="font-display font-semibold text-sm sm:text-base text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-zinc-400 transition-transform duration-300 ${
                    isOpen ? "transform rotate-180 text-brand-accent" : ""
                  }`}
                />
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-40 border-t border-white/5 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 text-sm text-zinc-400 leading-relaxed bg-[#0e1117]/20">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
