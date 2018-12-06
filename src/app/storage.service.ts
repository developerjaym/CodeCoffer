import { Injectable } from '@angular/core';
import { Snippet } from './snippet';
@Injectable()
export class StorageService {

  constructor() { }

  contains(key: string): boolean {
    return !!localStorage.getItem(key);
  }

  get(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  set(key: string, value: any): any {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  getUniqueID(): string {
    if(this.contains('id')) {
      return this.get('id');
    }
    return this.set('id', this.makeId(12));
  }

  getSnippets(): Snippet[] {
    if(this.contains('snippets')) {
      return this.get('snippets');
    }
    return this.set('snippets', []);
  }

  addSnippet(snippet: Snippet): void {
    const snippets = this.getSnippets();
    if(!snippets.includes(snippet)) {
      snippets.push(snippet);
    }
    this.set('snippets', snippets);
  }

  removeSnippet(id: number): Snippet[] {
    const snippets = this.getSnippets();
    return this.set('snippets', snippets.filter(snippet => snippet.id !== id));
  }

  saveSnippets(snippets: Snippet[]): void {
    console.log(JSON.stringify(snippets));
    this.set('snippets', snippets);
  }

  setName(newName: string): string {
    return this.set('name', newName);
  }

  private makeId(length: number = 12): string {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
