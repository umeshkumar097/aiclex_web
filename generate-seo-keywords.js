const fs = require('fs');
const path = require('path');

const keywordMappings = [
  { baseId: 15, keywords: ["whatsapp business api provider", "whatsapp api provider india", "official whatsapp api", "whatsapp cloud api", "whatsapp api integration", "whatsapp business solution provider", "whatsapp api pricing", "whatsapp api for business", "whatsapp api company", "best whatsapp api provider", "affordable whatsapp api provider", "best whatsapp api provider in india"] },
  { baseId: 16, keywords: ["whatsapp automation company", "whatsapp automation service", "whatsapp automation software", "whatsapp automation platform", "whatsapp marketing software", "whatsapp marketing company", "whatsapp campaign software", "whatsapp broadcast software", "bulk whatsapp marketing", "whatsapp crm", "whatsapp lead generation", "whatsapp sales automation", "whatsapp business automation", "whatsapp automation india", "whatsapp automation for real estate", "whatsapp automation for builders", "whatsapp automation for schools", "whatsapp automation for colleges", "whatsapp automation for universities", "whatsapp automation for hospitals", "whatsapp automation for clinics", "whatsapp automation for travel agencies", "whatsapp automation for gyms", "whatsapp automation for ecommerce", "best whatsapp marketing software", "best whatsapp marketing software for business", "enterprise whatsapp automation platform"] },
  { baseId: 10, keywords: ["ai voice agent", "ai voice agents", "ai calling agent", "ai calling software", "ai call center software", "ai telecalling software", "ai customer support ai", "ai receptionist", "ai voice bot", "ai sales agent", "ai outbound calling", "ai lead qualification agent", "ai appointment booking agent", "ai voice assistant for business", "conversational ai voice bot", "ai voice agent for real estate", "ai voice agent for education", "ai voice agent for healthcare", "ai voice agent for travel", "ai voice agent for ecommerce", "best ai voice agent company"] },
  { baseId: 17, keywords: ["ai automation company", "ai automation services", "business process automation", "workflow automation", "enterprise automation", "ai workflow automation", "business automation services", "ai integration company", "automation consulting", "ai business automation", "best ai automation company"] },
  { baseId: 18, keywords: ["crm development company", "custom crm software", "sales crm software", "lead management crm", "customer management software", "education crm", "healthcare crm", "crm development services", "best crm software for real estate"] },
  { baseId: 14, keywords: ["real estate crm software", "builder crm software", "property crm", "property management crm", "real estate sales crm", "real estate lead management", "builder lead management", "township management software", "real estate automation", "real estate marketing automation", "property dealer crm", "best real estate crm software"] },
  { baseId: 19, keywords: ["lead generation company", "lead generation services", "b2b lead generation", "b2b leads provider", "business leads database", "verified leads database", "decision maker database", "company database india", "business contact database", "marketing leads", "real estate leads", "school leads", "education leads", "best lead generation company in india"] },
  { baseId: 20, keywords: ["saas development company", "saas application development", "custom software development", "web application development", "mobile app development", "enterprise software development", "startup software development", "saas product development"] },
  { baseId: 21, keywords: ["ai chatbot development", "ai chatbot company", "chatbot for business", "customer support chatbot", "website chatbot", "whatsapp ai chatbot", "lead generation chatbot", "sales chatbot", "chatgpt chatbot integration", "best whatsapp chatbot company"] },
  { baseId: 12, keywords: ["whatspilot vs wati", "whatspilot vs interakt", "whatspilot vs aisensy", "whatspilot vs zoko", "whatspilot vs gallabox", "whatspilot alternatives"] }
];

function titleCase(str) {
  return str.split(' ').map(word => {
    if(word === 'ai' || word === 'api' || word === 'crm' || word === 'b2b') return word.toUpperCase();
    if(word === 'whatsapp') return 'WhatsApp';
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function run() {
  const servicesFilePath = path.join(__dirname, 'lib/servicesData.ts');
  let content = fs.readFileSync(servicesFilePath, 'utf-8');

  let newEntries = [];
  let currentId = 22;

  for (const group of keywordMappings) {
    const regex = new RegExp('\\{\\s*id:\\s*' + group.baseId + ',[\\s\\S]*?color:\\s*"[^"]*"\\s*\\}', 'g');
    const match = content.match(regex);
    if (!match) {
        console.log("Could not find base ID", group.baseId);
        continue;
    }
    const baseObjectString = match[0];

    for (const kw of group.keywords) {
      const newTitle = titleCase(kw);
      const newSlug = slugify(kw);
      
      let newObjectStr = baseObjectString
        .replace(/id:\s*\d+,/, 'id: ' + (currentId++) + ',')
        .replace(/title:\s*".*?",/, 'title: "' + newTitle + '",')
        .replace(/slug:\s*".*?",/, 'slug: "' + newSlug + '",\n    isSeoOnly: true,');

      newEntries.push(newObjectStr);
    }
  }

  // Remove trailing bracket and semicolon
  content = content.replace(/\n\];\s*$/, '');
  
  if (!content.endsWith(',')) {
      content += ',';
  }
  
  content += '\n  ' + newEntries.join(',\n  ') + '\n];\n';

  if (!content.includes('isSeoOnly?: boolean;')) {
      content = content.replace('color: string;', 'color: string;\n  isSeoOnly?: boolean;');
  }

  fs.writeFileSync(servicesFilePath, content);
  console.log("Successfully appended " + newEntries.length + " SEO services!");
}

run();
