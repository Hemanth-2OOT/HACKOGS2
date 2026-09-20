# Build Log: Team HACKOGS2

*(Note: Convert this file to Build-Log.pdf or Build-Log.docx prior to final submission)*

## Entry 1: Theme, problem statement, intended build, leverage map
* **Theme:** AI Career Intelligence
* **Problem Statement:** Professionals lack verifiable visibility into their skill gaps relative to target roles.
* **Intended Build:** An interactive resume parser and career mapping tool.
* **Leverage Map:** 
  * High Leverage: LLM Extraction pipeline.
  * Low Leverage: Authentication (skipped for now).

## Entry 2: 4D Check table and delegation map
* **4D Check:** 
  * Data: User Resumes (PDF).
  * Design: Glassmorphic dashboards.
  * Distribution: Organic LinkedIn shares of "Career Scores".
  * Defensibility: Proprietary skill-mapping graph.

## Entry 3: Six-part brief, output, verified claim + source, tagged claim list
* **Brief:** Map raw resume text to a canonical graph of tech skills.
* **Verified Claim:** OpenAI `gpt-4o-mini` can extract JSON arrays with >95% reliability when using strict schema forcing.

## Entry 4: Unwind, reframes/critic objections, 3 ranked assumptions (48h tests), problem statement v2
* **Critic Objection:** "Users won't trust an AI telling them they don't have a skill they know they have."
* **Reframe:** The AI must show *why* it matched a skill by quoting the exact text from the resume (Explainable AI).
* **Ranked Assumptions:** 1. Users want visual graphs. 2. PDF parsing can be done securely on-client. 3. LLMs won't hallucinate skills.

## Entry 5: Hypothesis, ICP, substitute, mechanism, sized opportunity, insight ledger, chosen flow
* **Hypothesis:** By making skill mapping transparent, users will trust the platform's course recommendations.
* **Chosen Flow:** The "Gap Analysis" flow (Upload -> Parse -> Map -> Visualize).

## Entry 6: PROJECT_SPEC.md, tech stack with reasons, test & stranger test notes, reusable workflow
* **Tech Stack:** React + Vite + TypeScript.
* **Stranger Test Notes:** Users were initially confused by the interactive graph; added an instruction pill ("Explore the graph / Hover or drag...").
