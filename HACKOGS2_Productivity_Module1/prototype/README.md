# TenderAI: Automated RFP Responder

**Single-line summary:** A RAG-powered pipeline that automatically drafts responses to RFP (Request for Proposal) questionnaires using a company's historical knowledge base.

## Setup and Execution Instructions

1. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
2. **Environment Variables:**
   Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
3. **Prepare Data:**
   - Place past successful proposals and company documentation in `data/knowledge_base/` (.txt or .pdf).
   - Place the incoming RFP questions in `data/sample_rfp.csv` (should have a 'Question' column).
4. **Run the Workflow:**
   ```bash
   python core_workflow.py
   ```
   The output will be generated in `data/completed_rfp.csv`.

## Known Limitations / Non-Functional Parts
- **Table/Image Extraction:** The current document processor only handles raw text; complex tables in historical PDFs are ignored.
- **Human-in-the-Loop UI:** There is no frontend to review and edit answers before final export. The prototype runs purely as a backend batch process.
- **Authentication/Security:** Multi-tenant data segregation is not implemented in this prototype. All documents in the knowledge base are accessible to the RAG pipeline.

## Demo
- **Live Demo / Video Recording:** [Placeholder Link: https://youtube.com/your-demo-link]

## Directory Tree Context
```
HACKOGS2_Productivity_Module1/
├── prototype/
│   ├── README.md
│   ├── core_workflow.py
│   ├── requirements.txt
│   ├── data/
│   │   ├── sample_rfp.csv
│   │   └── knowledge_base/
│   └── src/
│       ├── document_processor.py
│       ├── rag_engine.py
│       └── output_generator.py
├── Build-Log.md
└── Build-Summary.md
```
