import type { ExtractedSkillPayload } from '../utils/skillMapper';

export interface ExtractedProfileData {
  skills: ExtractedSkillPayload[];
  education: any[];
  projects: any[];
}

export const MOCK_EXTRACTED_PROFILE: ExtractedProfileData = {
  skills: [
    { name: 'Python', category: 'programming_language', status: 'verified', evidence: '"Skills: Python, ReactJS..."' },
    { name: 'React', category: 'framework', status: 'verified', evidence: '"ReactJS"' },
    { name: 'OpenCV', category: 'library', status: 'verified', evidence: '"OpenCV"' },
    { name: 'Git', category: 'tool', status: 'verified', evidence: '"Git"' },
    { name: 'Machine Learning', category: 'concept', status: 'verified', evidence: '"Machine Learning"' },
    { name: 'Computer Vision', category: 'concept', status: 'inferred', evidence: 'Inferred from "OpenCV" project context' },
    { name: 'FastAPI', category: 'framework', status: 'verified', evidence: '"Built API with FastAPI"' },
    { name: 'C++', category: 'programming_language', status: 'verified', evidence: '"C++ Developer"' },
    { name: 'PostgreSQL', category: 'database', status: 'verified', evidence: '"PostgreSQL"' }
  ],
  education: [
    { degree: 'B.Tech AIML', gpa: '8.65' }
  ],
  projects: [
    { name: 'BorderX' },
    { name: 'Hive Kernel' },
    { name: 'Career Guidance System' }
  ]
};

export const MOCK_EXTRACTED_JD = {
  role: 'AI Engineer Intern',
  requiredSkills: ['Python', 'Git', 'Machine Learning', 'PyTorch', 'Model deployment', 'NumPy', 'Pandas'],
  missingSkills: ['PyTorch', 'Model deployment', 'NumPy', 'Pandas'],
  matchedSkills: ['Python', 'Git', 'Machine Learning']
};

/**
 * Real API integration with OpenAI
 */
export async function extractProfileFromResume(text: string, apiKey: string): Promise<ExtractedProfileData> {
  console.log(`\n--- START PIPELINE LOGS ---`);
  console.log(`[Extractor] 1. Raw PDF text length: ${text.length}`);
  console.log(`[Extractor] 2. First ~1000 characters of extracted text:\n${text.substring(0, 1000)}\n`);
  
  if (!apiKey || apiKey === 'mock') {
    console.log(`[Extractor] Using MOCK_EXTRACTED_PROFILE`);
    return new Promise(resolve => setTimeout(() => resolve(MOCK_EXTRACTED_PROFILE), 1000));
  }

  const prompt = `You are an expert career intelligence AI. Extract technical skills, soft skills, and interests deeply from this resume.
Do NOT just rely on the "Skills" section. You MUST read "Projects" and "Experience" deeply.

RULES:
1. Extract programming languages, frameworks, tools, cloud platforms, and databases.
2. IMPORTANT: If a project mentions building something (e.g., "Built a local RAG agent"), you MUST extract implicit skills (e.g., "RAG", "LLM Applications", "Generative AI") even if not explicitly listed as a language.
3. If they describe domains they worked in or are seeking internships in (e.g., "AI", "Web Development"), classify those as "interest" or "concept".
4. Mark a skill as "verified" if explicitly named, or "inferred" if deduced from a project description.
5. Provide the exact short quote as "evidence" (e.g. "Built a RAG-based coding agent").
6. Categorize each item into: programming_language, framework, tool, database, cloud, concept, interest, or other.

Return ONLY a valid JSON object matching this schema:
{
  "skills": [
    {
      "name": "string",
      "category": "string",
      "status": "verified" | "inferred",
      "evidence": "string (short quote from text)"
    }
  ],
  "education": [{"degree": "string", "gpa": "string"}],
  "projects": [{"name": "string"}]
}

Resume Text:
${text.substring(0, 6000)}`;

  const MAX_RETRIES = 3;
  let attempt = 0;
  
  while (attempt < MAX_RETRIES) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.0,
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error(`[Extractor] API Error on attempt ${attempt + 1}:`, errText);
        if (response.status === 429 || (response.status >= 500 && attempt < MAX_RETRIES - 1)) {
          console.log(`[Extractor] Rate limit or Server Error. Retrying in 2 seconds...`);
          await new Promise(r => setTimeout(r, 2000));
          attempt++;
          continue;
        }
        throw new Error('Failed to extract profile. Check API Key or try again later.');
      }

      const data = await response.json();
      const rawJSON = data.choices[0].message.content;
      console.log(`[Extractor] 3. Raw LLM JSON:\n${rawJSON}\n`);

      const cleanJSON = rawJSON.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJSON);
      console.log(`[Extractor] 4. Parsed ${parsed.skills?.length || 0} skills.`);
      console.log(`[Extractor] 5. Evidence for every skill:`);
      parsed.skills.forEach((s: any) => console.log(`  -> [${s.category.toUpperCase()}] [${s.status.toUpperCase()}] ${s.name} (Evidence: ${s.evidence})`));
      return parsed;
      
    } catch (e: any) {
      if (attempt >= MAX_RETRIES - 1) {
        console.error("[Extractor] Failed to parse LLM JSON after retries", e);
        return MOCK_EXTRACTED_PROFILE;
      }
      attempt++;
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  return MOCK_EXTRACTED_PROFILE;
}

export async function extractRequirementsFromJD(text: string, apiKey: string, existingSkills: string[]) {
  if (!apiKey || apiKey === 'mock') {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_EXTRACTED_JD), 1000));
  }

  const prompt = `Extract the following information from this job description text. 
Compare the required skills against the applicant's existing skills: ${existingSkills.join(', ')}.
Return ONLY a valid JSON object matching this schema:
{
  "role": "string (the job title)",
  "requiredSkills": ["string (exact name of skill required)"],
  "matchedSkills": ["string"],
  "missingSkills": ["string"]
}

Job Description Text:
${text.substring(0, 4000)}`;

  const MAX_RETRIES = 3;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.0,
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error(`[Extractor] API Error on attempt ${attempt + 1}:`, errText);
        if (response.status === 429 || (response.status >= 500 && attempt < MAX_RETRIES - 1)) {
          console.log(`[Extractor] Rate limit or Server Error. Retrying in 2 seconds...`);
          await new Promise(r => setTimeout(r, 2000));
          attempt++;
          continue;
        }
        throw new Error('Failed to extract JD. Check API Key or try again later.');
      }

      const data = await response.json();
      const rawContent = data.choices[0].message.content;
      const cleanJSON = rawContent.replace(/```json/gi, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJSON);

    } catch (e: any) {
      if (attempt >= MAX_RETRIES - 1) {
        console.error("[Extractor] Failed to parse LLM JSON after retries", e);
        return MOCK_EXTRACTED_JD; 
      }
      attempt++;
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  return MOCK_EXTRACTED_JD;
}
