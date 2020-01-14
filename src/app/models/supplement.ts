import { Language } from './language.enum';

export class Supplement {
  name: string;
  language: Language;
  code: string;
  notes: string;

  constructor(name: string = '', language: Language = Language.TEXT, code: string = '', notes: string = '') {
    this.name = name;
    this.language = language;
    this.code = code;
    this.notes = notes;
  }
}
