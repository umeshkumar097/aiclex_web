/**
 * Blog Utilities for Table of Contents (ToC) generation and HTML manipulation.
 */

export interface Heading {
  id: string;
  text: string;
  level: number;
}

/**
 * Extracts h2 and h3 headings from an HTML string.
 */
export function extractHeadings(html: string): Heading[] {
  if (!html) return [];
  
  // Regex to find h2 and h3 tags and their content
  const headingRegex = /<h([2-3])[^>]*>(.*?)<\/h\1>/gi;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const rawText = match[2].replace(/<[^>]*>/g, '').trim(); // Remove any nested HTML tags from heading text
    const text = rawText.replace(/&nbsp;/g, ' ');
    
    // Generate a simple ID based on the text
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    headings.push({ id, text, level });
  }

  return headings;
}

/**
 * Injects unique IDs into h2 and h3 tags in an HTML string.
 */
export function addHeadingIds(html: string): string {
  if (!html) return "";

  let counter = 0;
  return html.replace(/<h([2-3])([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, content) => {
    const rawText = content.replace(/<[^>]*>/g, '').trim();
    const text = rawText.replace(/&nbsp;/g, ' ');
    
    // Generate a simple ID based on the text
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // Check if ID already exists in attributes, if not add it
    if (!attrs.includes('id=')) {
      return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
    }
    
    return match;
  });
}
