export class SearchParameters {
  title: boolean;
  tags: boolean;
  code: boolean;
  notes: boolean;

  constructor(title: boolean = false, tags: boolean = true, code: boolean = false, notes: boolean = false) {
    this.title = title;
    this.tags = tags;
    this.code = code;
    this.notes = notes;
  }
}
