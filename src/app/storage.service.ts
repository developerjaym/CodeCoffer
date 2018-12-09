import { Injectable } from '@angular/core';
import { Snippet } from './snippet';
@Injectable()
export class StorageService {
  private readonly SNIPPET_KEY: string = 'snippets';
  constructor() { }

  getSnippets(): Snippet[] {
    if (this.contains(this.SNIPPET_KEY)) {
      return this.get(this.SNIPPET_KEY);
    }
    return this.set(this.SNIPPET_KEY, []);
  }

  addSnippet(snippet: Snippet): void {
    const snippets = this.getSnippets();
    if (!snippets.includes(snippet)) {
      snippets.unshift(snippet);
    }
    this.set(this.SNIPPET_KEY, snippets);
  }

  removeSnippet(id: string): Snippet[] {
    const snippets = this.getSnippets();
    return this.set(this.SNIPPET_KEY, snippets.filter(snippet => snippet.id !== id));
  }

  saveSnippets(snippets: Snippet[]): void {
    this.set(this.SNIPPET_KEY, snippets);
  }

  private contains(key: string): boolean {
    return !!localStorage.getItem(key);
  }

  private get(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  private set(key: string, value: any): any {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }
}
