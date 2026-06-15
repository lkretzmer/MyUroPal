import Constants from 'expo-constants';

export type GuidelineSource = 'EAU' | 'NICE' | 'AUA' | 'GIRFT';

export type Citation = {
  title: string;
  url: string;
};

export type SearchResult = {
  answer: string;
  citations: Citation[];
};

const sourceDomains: Record<GuidelineSource, string> = {
  EAU: 'uroweb.org',
  NICE: 'nice.org.uk',
  AUA: 'auanet.org',
  GIRFT: 'gettingitrightfirsttime.co.uk',
};

const sourceNames: Record<GuidelineSource, string> = {
  EAU: 'EAU (European Association of Urology) guidelines at uroweb.org',
  NICE: 'NICE (National Institute for Health and Care Excellence) guidance at nice.org.uk',
  AUA: 'AUA (American Urological Association) guidelines at auanet.org',
  GIRFT: 'GIRFT (Getting It Right First Time) reports at gettingitrightfirsttime.co.uk',
};

const sourceUrls: Record<GuidelineSource, string> = {
  EAU: 'https://uroweb.org/guidelines/',
  NICE: 'https://www.nice.org.uk/guidance',
  AUA: 'https://www.auanet.org/guidelines',
  GIRFT: 'https://gettingitrightfirsttime.co.uk/programmes/urology',
};

// Get the Cloudflare Worker URL from app config
function getWorkerUrl(): string {
  const url = Constants.expoConfig?.extra?.workerUrl || Constants.manifest?.extra?.workerUrl;
  if (!url) {
    throw new Error('Worker URL not configured in app.json');
  }
  return url;
}

export async function searchGuidelines(
  query: string,
  sources: GuidelineSource[]
): Promise<SearchResult> {
  if (sources.length === 0) {
    throw new Error('Select at least one guideline source.');
  }

  const allowedDomains = sources.map((s) => sourceDomains[s]);
  const sourceList = sources.map((s) => sourceNames[s]).join('; ');

  const systemPrompt = `You are a clinical guideline reference assistant for urologists.
Answer the question using your knowledge of these guideline sources: ${sourceList}.
Rules:
- Provide concise, factual answers based on guideline recommendations
- Quote recommendation grades/levels of evidence where applicable
- When citing information, clearly indicate which guideline (EAU/NICE/AUA/GIRFT) the information comes from
- Use inline citations like "(EAU)", "(NICE)", "(AUA)", or "(GIRFT)" after specific claims
- If the information is not available in the guidelines, state this clearly
- Structure your answer to show which guidelines say what, especially when sources provide different perspectives`;

  const res = await fetch(getWorkerUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: 'user', parts: [{ text: query }] }],
    }),
  });

  console.log('API Response status:', res.status);

  if (!res.ok) {
    const body = await res.text();
    console.error('API Error body:', body);
    throw new Error(`Search failed (${res.status}): ${body.slice(0, 200)}`);
  }

  const data = await res.json();
  console.log('API Response data:', JSON.stringify(data, null, 2));

  const candidate = data?.candidates?.[0];
  const answer: string =
    candidate?.content?.parts?.map((p: { text?: string }) => p.text ?? '').join('') ?? '';

  console.log('Extracted answer:', answer);

  // Generate citations based on selected sources
  const citations: Citation[] = sources.map((s) => ({
    title: sourceNames[s],
    url: sourceUrls[s],
  }));

  // Return the answer with citations
  if (!answer || answer.trim().length === 0) {
    return {
      answer: 'No answer found. Try rephrasing your question.',
      citations: [],
    };
  }

  return { answer: answer.trim(), citations };
}
