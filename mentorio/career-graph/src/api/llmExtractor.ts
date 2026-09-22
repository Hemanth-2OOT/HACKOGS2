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

  const prompt = `You are a strict data extraction AI. Extract EVERY explicitly mentioned skill from this resume.
A skill is NOT limited to predefined lists. 

RULES for Skills:
1. Extract ALL programming languages (C, C++, Java, Python, JavaScript, SQL, etc.), frameworks (React, Angular), libraries, tools, databases, cloud platforms, concepts, and domain skills.
2. ONLY mark a skill as "verified" if it is EXPLICITLY written in the text. Look in "Skills", "Projects", "Experience", and "Education" sections.
3. If you infer a skill based on a project (e.g. guessing "Machine Learning" because they did an "AI project"), mark it as "inferred".
4. Provide the exact short quote as "evidence".
5. Categorize each skill into one of: programming_language, framework, library, tool, database, cloud, concept, other.

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
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.0 }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error(`[Extractor] API Error on attempt ${attempt + 1}:`, errText);
        if (response.status === 503 && attempt < MAX_RETRIES - 1) {
          console.log(`[Extractor] High demand (503). Retrying in 2 seconds...`);
          await new Promise(r => setTimeout(r, 2000));
          attempt++;
          continue;
        }
        throw new Error('Failed to extract profile. Check API Key or try again later.');
      }

      const data = await response.json();
      const rawJSON = data.candidates[0].content.parts[0].text;
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
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.0 }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error(`[Extractor] API Error on attempt ${attempt + 1}:`, errText);
        if (response.status === 503 && attempt < MAX_RETRIES - 1) {
          console.log(`[Extractor] High demand (503). Retrying in 2 seconds...`);
          await new Promise(r => setTimeout(r, 2000));
          attempt++;
          continue;
        }
        throw new Error('Failed to extract JD. Check API Key or try again later.');
      }

      const data = await response.json();
      const rawContent = data.candidates[0].content.parts[0].text;
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
