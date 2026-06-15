// One-off scraper: extracts BAUS leaflet titles + PDF URLs per category
// Usage: node scripts/scrapeBausLeaflets.js > data/bausLeaflets.json

const categories = [
  { id: 3, slug: 'bladder_procedures', name: 'Bladder' },
  { id: 4, slug: 'fertility_infertility_procedures', name: 'Fertility & Infertility' },
  { id: 5, slug: 'kidney_adrenal_procedures', name: 'Kidney & Adrenal' },
  { id: 6, slug: 'miscellaneous_procedures', name: 'Miscellaneous' },
  { id: 7, slug: 'penis_procedures', name: 'Penis' },
  { id: 8, slug: 'prostate_procedures', name: 'Prostate' },
  { id: 9, slug: 'retroperitoneum_procedures', name: 'Retroperitoneum' },
  { id: 10, slug: 'stone_procedures', name: 'Stones' },
  { id: 11, slug: 'testis_scrotal_procedures', name: 'Testis & Scrotum' },
  { id: 12, slug: 'transplantation_dialysis_procedures', name: 'Transplant & Dialysis' },
  { id: 13, slug: 'ureter_procedures', name: 'Ureter' },
  { id: 14, slug: 'urethra_procedures', name: 'Urethra' },
];

const BASE = 'https://www.baus.org.uk';

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&ndash;/g, '–')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

async function scrapeCategory(cat) {
  const url = `${BASE}/patients/information_leaflets/category/${cat.id}/${cat.slug}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();

  const leaflets = [];
  // Each leaflet block: title anchor then PDF anchor
  // Title: <a href="/patients/information_leaflets/{id}/{slug}">Title text</a>
  // PDF:   <a href="../../../../_userfiles/...pdf" ...>PDF</a>
  const blockRe =
    /<a class="leaflet_category_link"[^>]*href="\/patients\/information_leaflets\/\d+\/[^"]+"><strong>([^<]+)<\/strong><\/a>[\s\S]*?<a class="pdf" href="((?:\.\.\/)+_userfiles[^"]+\.pdf)"/gi;

  let m;
  while ((m = blockRe.exec(html)) !== null) {
    const title = decodeEntities(m[1]);
    if (!title || title === 'Webpage' || title === 'PDF') continue;
    const pdfPath = m[2].replace(/^(\.\.\/)+/, '/');
    leaflets.push({
      title,
      category: cat.name,
      pdfUrl: BASE + pdfPath,
    });
  }
  return leaflets;
}

(async () => {
  const all = [];
  for (const cat of categories) {
    const items = await scrapeCategory(cat);
    console.error(`${cat.name}: ${items.length} leaflets`);
    all.push(...items);
  }
  // De-dupe by title+category
  const seen = new Set();
  const deduped = all.filter((l) => {
    const k = l.category + '|' + l.title;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  console.error(`TOTAL: ${deduped.length} leaflets`);
  console.log(JSON.stringify(deduped, null, 2));
})();
