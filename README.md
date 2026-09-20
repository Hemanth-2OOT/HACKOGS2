# HACKOGS2 - The AI Builder Challenge

Welcome to the central repository for **Team HACKOGS2**. This repository contains the prototypes, documentation, and submission materials for the AI Builder Challenge.

## Repository Structure

* **`HACKOGS2_Mentorio_Module1/`**  
  The official Module 1 submission directory. It contains:
  * **`prototype/`**: The core React/Vite/TypeScript codebase for the AI Career Intelligence app (Resume parser, LLM extraction, Gap Analysis).
  * **`Build-Summary.md`**: Quick reference guide on the theme, problem statement, tech stack, and next steps.
  * **`Build-Log.md`**: The structured build log entries detailing the engineering and product decisions made during Module 1.

* **`mentorio_prototype/`**  
  The raw development workspace where the React prototype was initially built and iterated upon.

## Getting Started

To run the application locally, navigate into the prototype directory:

```bash
cd HACKOGS2_Mentorio_Module1/prototype
npm install
```

Make sure to create a `.env` file (based on `.env.example`) and add your OpenAI API Key before starting the development server:

```bash
npm run dev
```

## Theme & Core Flow
**AI Career Intelligence:** The application allows users to upload a PDF resume, strictly extracts their technical skills using OpenAI (with explicit evidence tracking), and maps them visually to a Career Knowledge Graph for actionable gap analysis.
