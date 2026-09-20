# COMPREHENSIVE BUILD-LOG: Team HACKOGS2

## Entry 1: Foundation
**Theme:** Productivity / B2B SaaS
**Refined Problem Statement:** B2B Sales Engineers and Account Executives spend an average of 15-20 hours manually answering repetitive Request for Proposal (RFP) security and product questionnaires, delaying sales cycles and draining technical resources.
**Intended Build:** "TenderAI" – A RAG-powered backend service that ingests a company's historical RFP responses, security whitepapers, and product documentation to automatically draft high-confidence answers to new RFP questionnaires formatted in CSV or Excel.
**Leverage Map:**
- *Before:* High human effort (searching old documents, copy-pasting, formatting) = Low speed, High cost.
- *After:* Low human effort (uploading RFP, reviewing AI drafts) = High speed, Low cost, higher deal velocity.

---

## Entry 2: Execution Planning

### 4D Check Table
| Phase | Focus | Actions |
| :--- | :--- | :--- |
| **Discover** | Validate Problem | Interviewed a Sales Engineer; analyzed standard vendor questionnaires (SIG Lite). |
| **Design** | Architecture | Defined the flow: File Upload -> Text Chunking -> Vector DB (FAISS) -> LLM Synthesis -> CSV Export. |
| **Develop** | Prototyping | Build Python scripts using LangChain, OpenAI API, and Pandas. |
| **Deploy** | Demonstration | CLI-based batch processor that takes an input CSV and outputs a completed CSV. |

### Delegation Map
- **HACKOGS2 Member A:** RAG Pipeline development (LangChain, Vector DB).
- **HACKOGS2 Member B:** Data parsing (CSV I/O, Document chunking).
- **HACKOGS2 Member C:** Prompt Engineering, documentation, and demo recording.

---

## Entry 3: AI Brief & Claims

### 6-Part AI Brief
1. **Context:** You are an expert Sales Engineer tasked with responding to a prospective client's RFP.
2. **Task:** Answer the specific RFP question using ONLY the provided context from our company's knowledge base.
3. **Instructions:** Be concise, professional, and direct. If the answer is not in the context, state "Requires manual review."
4. **Input:** `Question:` {question} | `Context:` {retrieved_chunks}
5. **Constraints:** Do not hallucinate capabilities. Keep answers under 100 words.
6. **Expected Output:** A single paragraph addressing the question.

### Sample AI Output
*Input Question:* "Do you encrypt data at rest?"
*Output:* "Yes, all customer data at rest is encrypted using AES-256 encryption. Encryption keys are managed securely via AWS KMS, as outlined in our 2023 Security Whitepaper."

### Verified Claim with Source Link
- [VERIFIED EVIDENCE] Retrieval-Augmented Generation (RAG) significantly reduces hallucination in domain-specific tasks compared to zero-shot generation. (Source: Lewis et al., *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*, https://arxiv.org/abs/2005.11401)

### Tagged Claim List
1. B2B sales cycles are heavily delayed by manual compliance questionnaires. `[UNTESTED ASSUMPTION]`
2. RAG architectures can successfully ground LLMs in external knowledge bases. `[VERIFIED EVIDENCE]`
3. Users will trust an AI to accurately summarize security policies without hallucinating critical legal liabilities. `[UNTESTED ASSUMPTION]`
4. Most RFPs are delivered in CSV or Excel formats rather than complex Word docs. `[UNTESTED ASSUMPTION]`

---

## Entry 4: Unwind & Reframes

### Unwind Process & Critic Reframes
- *Objection:* Sales teams won't use this because if the AI gets a security question wrong, the company could face legal consequences.
- *Reframe:* We are not replacing the human. We are creating a "first draft" tool. The UI/Output must force human review by highlighting answers with low retrieval confidence scores.

### 3 Ranked Assumptions with 48-Hour Testing Plans
1. **Assumption:** Users will trust the AI's first draft enough to actually save time (vs. rewriting it anyway). `[UNTESTED ASSUMPTION]`
   *Test Plan (48h):* Provide a manually created "AI draft" to 3 Sales Engineers and time how long it takes them to review and approve vs. write from scratch.
2. **Assumption:** We can extract high-quality text from messy past PDFs. `[UNTESTED ASSUMPTION]`
   *Test Plan (48h):* Run 5 real company whitepapers through PyPDF2 and assess the chunking quality manually.
3. **Assumption:** Most RFPs are structured as simple tabular Q&A (CSV). `[UNTESTED ASSUMPTION]`
   *Test Plan (48h):* Survey 10 tech startups on the typical format of the security questionnaires they receive.

### Problem Statement V2
B2B Sales and Security teams waste hours drafting responses to tabular RFPs because they must manually search across fragmented, unstructured company documents. They need a system that drafts high-accuracy, traceable answers while explicitly flagging low-confidence responses for human review.

---

## Entry 5: Business & Mechanism

**Hypothesis:** If we provide a RAG-based tool that pre-fills RFP spreadsheets using a verified corporate knowledge base, sales teams will reduce their questionnaire completion time by 70%.
**Ideal Customer Profile (ICP):** Mid-market B2B SaaS companies (50-500 employees) without dedicated proposal writing teams.
**Substitute Solutions:** Loopio, RFPIO (Expensive, complex enterprise tools requiring heavy manual maintenance of question banks).
**Core Mechanism:** Semantic search retrieves the top 3 most relevant paragraphs from past documents; LLM synthesizes a direct answer to the RFP question based solely on those paragraphs.
**Sized Opportunity:**
- TAM: All B2B SaaS companies globally ($10B+ workflow automation market).
- SAM: Mid-market B2B SaaS dealing with enterprise compliance ($2B).
- SOM: Tech startups needing affordable, automated compliance response tools ($50M).
**Insight Ledger:** Realized during testing that returning the *source document name* alongside the AI answer increases user trust dramatically.
**Chosen Core Flow:** User runs script -> Script loads Knowledge Base -> Script reads incoming CSV -> Script writes AI answers and source citations to output CSV.

---

## Entry 6: Finalization

### PROJECT_SPEC.md (Embedded)
**Project:** TenderAI Prototype
**Goal:** Automate RFP answering via RAG.
**Scope:** CLI python script supporting `.txt` knowledge base and `.csv` RFP input.

### Tech Stack Justification
- **Python / Pandas:** Native handling of CSV data and rapid data manipulation.
- **LangChain:** Simplifies chunking, embedding generation, and LLM chaining.
- **OpenAI (gpt-3.5-turbo / gpt-4o-mini):** Fast, cheap, and highly capable of context-grounded synthesis.
- **FAISS (Local Vector DB):** In-memory, lightweight, requires no cloud setup for the prototype.

### Test & Stranger Test Observation Notes
- *Self-Test:* System successfully answered 4/5 questions correctly using a dummy security policy.
- *Stranger Test:* A developer friend ran the script. They noted that the lack of a progress bar made them think the script froze while generating embeddings. Action taken: Added print statements for lifecycle tracking.

### Reusable Workflow Template
1. [ ] Gather unstructured data into `/knowledge_base`.
2. [ ] Format questions into `sample_rfp.csv`.
3. [ ] Run RAG pipeline.
4. [ ] Review output CSV.
