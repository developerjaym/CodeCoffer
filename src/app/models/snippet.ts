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
    index: string = '1'
  ) {
    this.id = String(id ? id : Math.floor(Math.random() * 1000000000) + 1);
    this.timestamp = timestamp;
    this.title = title;
    this.tags = tags;
    this.code = code;
    this.notes = notes;
    this.showing = true; //for search result
    this.pinned = false;
    this.supplements = [];
    this.index = index;
  }
}
