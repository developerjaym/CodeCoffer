import { Supplement } from './supplement';

export class Snippet {
  id: string;
  timestamp: number;
  title: string;
  tags: string;
  code: string;
  notes: string;
  showing: boolean;
  pinned: boolean;
  supplements: Supplement[];
  index: string;
  constructor(
    id: number = 0,
    title: string = '',
    tags: string = '',
    code: string = '',
    notes: string = '',
    timestamp: number = Date.now(),
    index: string = '',
    supplements: Supplement[] = []
  ) {
    this.id = String(id ? id : Math.floor(Math.random() * 1000000000) + 1);
    this.timestamp = timestamp;
    this.title = title;
    this.tags = tags;
    this.code = code;
    this.notes = notes;
    this.showing = true; //for search result
    this.pinned = false;
    this.supplements = supplements;
    this.index = index;
  }

  static createValidSnippet(snippet: Snippet): Snippet {
    snippet.id = snippet.id || String(Math.floor(Math.random() * 1000000000) + 1);
    snippet.timestamp = snippet.timestamp || Date.now();
    snippet.title = snippet.title || '';
    snippet.tags = snippet.tags || '';
    snippet.code = snippet.code || '';
    snippet.notes = snippet.notes || '';
    snippet.showing = (snippet.showing === true || snippet.showing === false) ? snippet.showing : false;
    snippet.pinned = (snippet.pinned === true || snippet.pinned === false) ? snippet.pinned : false;
    snippet.supplements = snippet.supplements || [];
    snippet.index = snippet.index || '';


    return snippet;
  }

  static createValidSnippets(snippets: Snippet[]): Snippet[] {
    return snippets.map(snippet => this.createValidSnippet(snippet));
  }
}
