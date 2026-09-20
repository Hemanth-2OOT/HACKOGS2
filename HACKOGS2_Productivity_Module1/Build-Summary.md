# Build-Summary: TenderAI by HACKOGS2

### 1. Theme
**Productivity / B2B SaaS / Developer Tools**

### 2. Problem Statement (V2 + Evolution Line)
*Original:* Sales teams waste time answering repetitive RFPs.
*Evolution Line:* We realized the problem isn't just the time spent writing, but the lack of trust in automated answers and the difficulty of searching fragmented company knowledge.
*V2 Statement:* B2B Sales and Security teams waste hours drafting responses to tabular RFPs because they must manually search across fragmented, unstructured company documents. They need a system that drafts high-accuracy, traceable answers while explicitly flagging low-confidence responses for human review.

### 3. What You Built (Flow + Deliberate Omissions)
**Core Flow:**
We built a local RAG (Retrieval-Augmented Generation) batch-processing pipeline. The system takes a folder of company documents (the knowledge base) and a CSV containing blank RFP questions. It embeds the knowledge, runs semantic search for each question, synthesizes an answer using an LLM, and outputs a completed CSV with drafted answers.

**Deliberate Omissions:**
- **Human-in-the-Loop UI:** We omitted a web interface for reviewing answers to focus purely on the backend RAG accuracy.
- **Complex Document Parsing:** We omitted OCR and complex table-parsing from PDFs, sticking to raw text extraction for prototype speed.
- **Persistent Cloud Database:** We used a local in-memory vector store (FAISS) instead of a hosted solution like Pinecone to reduce setup friction.

### 4. Tech Stack
- **Data Layer:** Pandas (for easy CSV ingestion and export).
- **Logic / Orchestration Layer:** LangChain (to orchestrate chunking, embedding generation, and prompt chaining efficiently).
- **AI / Model Layer:** OpenAI API (GPT models for synthesis, `text-embedding-3-small` for fast, cheap embeddings).
- **Storage Layer:** FAISS (Facebook AI Similarity Search) for lightweight, local vector storage without cloud dependencies.
*Technical Reasoning:* This stack prioritizes speed of iteration and prototype stability over enterprise scalability, which is ideal for a hackathon environment.

### 5. Evidence Position
- **Proven Facts:** RAG architectures successfully mitigate hallucination by grounding responses in retrieved context `[VERIFIED EVIDENCE]`. Processing tabular data automatically via APIs saves computational and human time compared to manual entry `[VERIFIED EVIDENCE]`.
- **Untested Assumptions:** We assume that users will trust the AI's drafts enough to utilize them `[UNTESTED ASSUMPTION]`. We assume that standardizing all incoming RFPs into CSV formats before processing won't be a prohibitive bottleneck for users `[UNTESTED ASSUMPTION]`.

### 6. What to Build Next
**Next Flow:** An interactive Web UI (using Streamlit or Next.js) where users can view the AI's drafted answer side-by-side with the highlighted source document paragraph, allowing them to click "Approve", "Edit", or "Regenerate".
**Condition Required to Justify Building It:** We must first prove via user testing that our backend RAG pipeline can achieve at least an 80% acceptable accuracy rate on historical RFPs. If the baseline accuracy is too low, a UI will not save the product.
