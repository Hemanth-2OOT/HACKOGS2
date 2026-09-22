# CareerAI Co-pilot (HACKOGS2 Prototype)

## The "One Flow" Description
This prototype demonstrates the **AI Career Gap Analysis** flow.
1. The user lands on the premium gradient homepage and selects **"Upload My Resume (PDF)"**.
2. A client-side PDF parser extracts raw text from the resume document natively in the browser.
3. The OpenAI LLM processes the raw text to extract exactly mapped and structured technical skills, with specific verifiable evidence sentences backing up each extracted claim.
4. The system routes the user to a detailed **Gap Analysis Dashboard**, visually comparing their extracted profile against targeted career paths.
5. The UI shows transparent match scores, unmapped skill fallbacks, and specific matching evidence.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create your `.env` file (copy `.env.example` to `.env`) and add your OpenAI API key for the LLM extraction features:
   ```bash
   VITE_OPENAI_API_KEY="sk-proj-YOUR_KEY"
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Hosted Link / Demo
*(Insert link to hosted Vercel/Netlify demo or Loom video here)*

## Non-Functional Caveats
* **Client-Side Keys:** To keep this prototype simple and easily executable without a heavy backend, the OpenAI API key is utilized directly on the client side via Vite environment variables. In a production environment, this would be routed securely through a backend proxy.
* **Mock Graph:** The core knowledge graph nodes are hardcoded for this demo, meaning only specific job titles (e.g., Software Engineer, Data Scientist) currently yield optimal pathing results.
