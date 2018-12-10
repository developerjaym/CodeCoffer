export class Snippet {
  id: string;
  timestamp: number;
  title: string;
  tags: string;
  code: string;
  notes: string;
  showing: boolean;

  constructor(
    id: number = 0,
    title: string = 'title',
    tags: string = 'tags',
    code: string = '',
    notes: string = 'notes',
    timestamp: number = Date.now()
  ) {
    this.id = String(id ? id : Math.floor(Math.random() * 1000000000) + 1);
    this.timestamp = timestamp;
    this.title = title;
    this.tags = tags;
    this.code = code;
    this.notes = notes;
    this.showing = true; //for search result
  }
}
