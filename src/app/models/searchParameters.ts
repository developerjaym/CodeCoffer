export class SearchParameters {
  query: string;
  title: boolean;
  tags: boolean;
  code: boolean;
  notes: boolean;

  constructor(query: string = '', title: boolean = false, tags: boolean = true, code: boolean = false, notes: boolean = false) {
    this.query = query;
    this.title = title;
    this.tags = tags;
    this.code = code;
    this.notes = notes;
  }
}
