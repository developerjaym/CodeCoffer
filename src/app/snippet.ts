export class Snippet {
  id: number;
  title: string;
  tags: string;
  code: string;
  notes: string;
  active: boolean;
  showing: boolean;

  constructor(
    id: number = 0,
    title: string = 'title',
    tags: string = 'javascript',
    code: string = '()=>{}',
    notes: string = 'notes'
  ) {
    // this.id = id ? id : Math.floor(Math.random() * 1000000000) + 1;
    this.id = Date.now();
    this.title = title;
    this.tags = tags;
    this.code = code;
    this.notes = notes;
    this.active = true; //for non-deleted snippets
    this.showing = true; //for search result
  }
}
