# Build Summary: Team HACKOGS2

## Theme
**AI Career Intelligence / Professional Development**

## Problem Statement
* **Initial version:** Resumes are hard to parse, and people don't know what jobs fit their skills.
* **Final version:** Mid-career professionals lack actionable, evidence-based visibility into their exact skill gaps. Existing platforms hallucinate matches or provide generic advice without tracing claims directly to raw resume evidence.

## What You Built
* **The Flow:** Upload Resume (PDF) &rarr; Client-side Parsing &rarr; Strict LLM Extraction (with Evidence) &rarr; Visual Career Gap Analysis Dashboard.
* **Capabilities:** 
  * Premium, responsive UI (glassmorphism, interactive D3 force graphs).
  * 100% native client-side PDF parsing using `pdfjs-dist`.
  * Explainable AI matching that strictly extracts quotes as "evidence" before scoring skills against a career knowledge graph.
* **Deliberate Exclusions:**
  * We excluded a heavy backend database (PostgreSQL/MongoDB) in favor of localized context to speed up iteration.
  * We excluded backend API proxying for the LLM to simplify the one-click run experience (keys are used client-side for this module).

## Tech Stack
* **Frontend:** React, TypeScript, Vite. (Chosen for speed, type safety, and fast HMR).
* **Styling:** Custom CSS with CSS Variables and Flexbox/Grid (Chosen to avoid heavy tailwind configurations and preserve absolute control over the premium glassmorphic theme).
* **Data Visualization:** Force Graph / Canvas rendering (Chosen to provide an immersive "career knowledge graph" experience).
* **AI Layer:** OpenAI API via direct client SDK (Chosen for best-in-class extraction accuracy when enforcing strict JSON schemas).

## Evidence Position
* **Proven Facts:** We can extract text natively in the browser without server roundtrips. LLMs can reliably format output into strict JSON if prompted correctly with evidence parameters.
* **Unverified Assumptions:** We assume users will be willing to upload their actual PDF resumes and that the interactive graph UI is intuitive enough without heavy onboarding tutorials.

## What You Would Build Next
* **Next Flow:** Dynamic Learning Roadmap Generation.
* **Conditions to Build:** Once we validate that users trust the Gap Analysis scores, the immediate next step is allowing them to click a missing skill (e.g., "PostgreSQL") and instantly generate a 4-week tailored curriculum via the LLM.
