
import React, { useState } from 'react';

const TechSpecs: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const masterPrompt = `# Role: Senior Backend Architect
# Task: Create a Production-Ready Backend for JC Kline Homes

I have a luxury serviced apartment frontend (React/Tailwind) for "JC Kline Homes" in Abuja. I need you to build a robust backend (Node.js/Express with PostgreSQL OR Python/FastAPI with SQLAlchemy) to support it.

## 1. Database Schema Requirements
Create a relational database schema including:
- **Apartments Table**: 
  - Fields: id (UUID), name (string), location (string), description (text), price_per_night (decimal), image_url (string), is_featured (boolean), amenities (array/jsonb).
- **Inquiries Table**: 
  - Fields: id (UUID), apartment_id (FK), full_name (string), email (string), phone_number (string), check_in (date), check_out (date), guests (int), additional_notes (text), status (enum: 'pending', 'confirmed', 'contacted', 'cancelled'), created_at (timestamp).
- **Admins Table**: 
  - Fields: id, username, password_hash, role.

## 2. API Endpoints
Generate the following RESTful endpoints:
- \`GET /api/apartments\`: Fetch all listings (support filtering by location and featured status).
- \`GET /api/apartments/:id\`: Fetch specific details for one unit.
- \`POST /api/inquiry\`: Accept booking requests. **Critical**: Implement server-side validation that mirrors the frontend (Check-in < Check-out, valid email/phone).
- \`POST /api/auth/login\`: Simple JWT-based authentication for an admin dashboard.
- \`GET /api/admin/inquiries\`: (Protected) To view all incoming leads.

## 3. Business Logic & Integrations
- **Email Notification**: Integrate a function using Nodemailer or SendGrid to send an automated "Inquiry Received" email to both the user and 'inquiries@jcklinehomes.com' whenever a new inquiry is POSTed.
- **WhatsApp Bridge**: Provide a utility function that generates a WhatsApp deep-link string for the admin to click and immediately start a chat with the lead based on their phone number and the apartment they requested.

## 4. Security
- Implement CORS (allowing the project root).
- Implement Rate Limiting on the \`/api/inquiry\` endpoint to prevent spam.
- Use Bcrypt for password hashing.

Please provide the SQL migration scripts, the Model definitions, and the main Controller logic.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(masterPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-16">
        <span className="text-[#c9a45c] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Documentation</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Technical Specifications</h1>
        <p className="text-gray-400 max-w-2xl leading-relaxed">
          Blueprint for Phase 2 development. This page details the architectural logic used in the frontend and provides the Master AI Prompt for backend generation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Logic Explanation */}
        <div className="lg:col-span-1 space-y-12">
          <section>
            <h3 className="text-[#c9a45c] font-serif text-2xl mb-6">Frontend Logic</h3>
            <ul className="space-y-6">
              <li className="group">
                <span className="block text-white font-bold text-sm uppercase tracking-wider mb-2">Contextual State Routing</span>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Apartment cards pass their unique identity through the React Router state, allowing the Inquiry page to pre-populate selections and reduce user friction.
                </p>
              </li>
              <li className="group">
                <span className="block text-white font-bold text-sm uppercase tracking-wider mb-2">Nigerian Format Validation</span>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Regex-based validation specifically tuned for 11-digit local numbers and +234 international formats used in Abuja.
                </p>
              </li>
              <li className="group">
                <span className="block text-white font-bold text-sm uppercase tracking-wider mb-2">Temporal Integrity</span>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Dynamic date logic enforces a minimum 1-night stay and prevents booking in the past, re-evaluating validity on every check-in change.
                </p>
              </li>
            </ul>
          </section>

          <section className="p-8 bg-[#141414] border border-white/5">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Aesthetic Deck</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#c9a45c]"></div>
                <span className="text-gray-400 text-xs font-mono">#c9a45c (Gold)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#0a0a0a]"></div>
                <span className="text-gray-400 text-xs font-mono">#0a0a0a (Onyx)</span>
              </div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-4">
                Fonts: Playfair Display & Inter
              </p>
            </div>
          </section>
        </div>

        {/* Master AI Prompt */}
        <div className="lg:col-span-2">
          <div className="bg-[#141414] border border-white/10 rounded-sm overflow-hidden flex flex-col h-full">
            <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex justify-between items-center">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Master Backend Prompt.md</span>
              <button 
                onClick={handleCopy}
                className={`px-4 py-1 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${
                  copied ? 'bg-green-500 text-white' : 'bg-[#c9a45c] text-black hover:bg-white'
                }`}
              >
                {copied ? 'Copied!' : 'Copy Prompt'}
              </button>
            </div>
            <div className="p-8 flex-grow">
              <pre className="text-gray-300 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words">
                {masterPrompt}
              </pre>
            </div>
            <div className="p-6 bg-white/5 border-t border-white/10 italic text-[11px] text-gray-500">
              Note: This prompt is optimized for Gemini 1.5 Pro and GPT-4o. Use it to generate the complete Database and API layer for JC Kline Homes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechSpecs;
