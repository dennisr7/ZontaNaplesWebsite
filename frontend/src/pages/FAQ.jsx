// src/pages/FAQ.jsx
import { useState } from "react";

export default function FAQ() {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqItems = [
    {
      question: "What is Zonta International?",
      answer: "Zonta International is a global organization of professionals empowering women worldwide through service and advocacy. With over 28,000 members in 61 countries, we work to advance the status of women politically, economically, and professionally."
    },
    {
      question: "What is the mission of Zonta?",
      answer: "Zonta International is a leading global organization of individuals working together to build a better world for women and girls. We envision a world in which women's rights are recognized as human rights and every woman is able to achieve her full potential."
    },
    {
      question: "Who can join Zonta Club of Naples?",
      answer: "We welcome professionals and community leaders from all fields who are committed to advancing the status of women. Membership is open to individuals who support our mission and are willing to participate in our service and advocacy activities."
    },
    {
      question: "How often does the club meet?",
      answer: "The Zonta Club of Naples typically meets monthly. Our meetings include business discussions, program presentations, and opportunities for networking and collaboration. We also host special events and service projects throughout the year."
    },
    {
      question: "What are the membership dues?",
      answer: "New members pay a one-time fee of $170 for the first year. After that, the annual membership renewal is $148 per year."
    },
    {
      question: "What kind of service projects does the club undertake?",
      answer: "Our service projects focus on education, health, safety, and economic empowerment for women and girls. Recent projects include scholarship programs, support for domestic violence shelters, educational workshops, and advocacy for women's rights legislation."
    },
    {
      question: "How can I get involved if I'm not ready to become a member?",
      answer: "We welcome volunteers and guests at our events and service projects! You can attend a meeting as a guest, participate in our service activities, or support our fundraising events. Contact our membership chair to learn about upcoming opportunities."
    },
    {
      question: "What is the time commitment for members?",
      answer: "Members are encouraged to attend monthly meetings and participate in at least one committee or service project. The time commitment varies but typically ranges from 5-10 hours per month, depending on your level of involvement."
    },
    {
      question: "Does Zonta offer scholarships?",
      answer: "Yes! Zonta International and our local club offer several scholarship programs for women pursuing education in various fields. These include the Young Women in Public Affairs Award, Jane M. Klausman Women in Business Scholarship, and local scholarships for Naples-area students."
    },
    {
      question: "How does Zonta advocate for women's rights?",
      answer: "We advocate at local, national, and international levels through awareness campaigns, partnerships with policymakers, support for gender equality legislation, and participation in UN initiatives. Our advocacy focuses on ending gender-based violence, promoting education, and ensuring economic equality."
    },
    {
      question: "Can I make a donation without becoming a member?",
      answer: "Absolutely! We welcome donations from individuals and organizations who support our mission. Donations help fund our service projects, scholarship programs, and advocacy efforts. Visit our donation page to contribute."
    }
  ];

  return (
    <main className="relative min-h-screen pt-32 px-6 flex flex-col items-center text-center overflow-hidden">
      {/* Gradient background matching other pages */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/80 via-yellow-700/70 to-red-900/90" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Zonta Logo at top */}
        <img
          src="/src/assets/zonta-full-logo.png"
          alt="Zonta Club Full Logo"
          className="mx-auto mb-8 w-48 opacity-90"
        />

        {/* Title with Montserrat font */}
        <h1 className="text-4xl font-bold mb-4 text-white font-[Montserrat]">Frequently Asked Questions</h1>
        <p className="text-lg mb-12 text-white/90">
          Find answers to common questions about Zonta Club of Naples and our work in the community.
        </p>

        {/* FAQ Section */}
        <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full text-left p-6 bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
                >
                  <span className="text-lg font-semibold text-gray-800 pr-4">{item.question}</span>
                  <svg
                    className={`w-6 h-6 text-yellow-600 transform transition-transform duration-200 ${
                      openItems.includes(index) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openItems.includes(index) && (
                  <div className="p-6 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Help Section */}
          <div className="mt-12 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Still have questions?</h3>
            <p className="text-gray-700 mb-4">
              We're here to help! Contact our membership team for more information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Contact Us
              </a>
              <a
                href="/membership"
                className="inline-block bg-white hover:bg-gray-100 text-yellow-600 border border-yellow-600 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Join Our Club
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}