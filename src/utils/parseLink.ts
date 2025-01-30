export interface TextPart {
  type: 'text';
  text: string;
}

export interface LinkPart {
  type: 'link';
  text: string;
  url: string;
}
export type Part = TextPart | LinkPart;

export const parseLinkInText = (warning: string): Part[] => {
  const regex = /\((.*?)\)(https?:\/\/[^\s]+)/g;

  const parts: Part[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(warning)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        text: warning.substring(lastIndex, match.index),
      });
    }

    parts.push({
      type: 'link',
      text: match[1],
      url: match[2],
    });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < warning.length) {
    parts.push({
      type: 'text',
      text: warning.substring(lastIndex),
    });
  }

  return parts;
};
