export interface VisualItem {
  key: string;
  count: number;
  items: string[];
}

export interface SnippetItem {
  prefix: string[];
  body: string[];
  description: string[];
}

export interface SnippetsItems {
  [key: string]: SnippetItem;
}
