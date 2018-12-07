import { Injectable } from '@angular/core';
import { Snippet } from './snippet';
import { SearchParameters } from './searchParameters';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SnippetService {
  private snippets: Snippet[];

  private snippetsSubject: BehaviorSubject<Snippet[]>;
  private timerId: any;

  constructor(private storage: StorageService) {
    this.snippets = this.storage.getSnippets();
    this.sortSnippets();
    this.snippetsSubject = new BehaviorSubject<Snippet[]>(this.snippets);
    this.timerId = setInterval(() => this.saveSnippets(), 200000);
  }

  getSnippetList(): Observable<Snippet[]> {
    return this.snippetsSubject.asObservable();
  }

  addSnippet(snippet: Snippet): void {
    this.storage.addSnippet(snippet);
    this.snippets.push(snippet);
    this.sortSnippets();
    this.snippetsSubject.next(this.snippets);
  }

  deleteSnippet(snippetId: string): void {
    this.storage.removeSnippet(snippetId);
    this.snippets = this.snippets.filter(snippet => snippet.id !== snippetId);
    this.snippetsSubject.next(this.snippets);
  }

  search(term: string, searchParams: SearchParameters) {
    this.snippets.forEach(snippet => {
      if (snippet.active) {
        if (snippet.title.includes(term) && searchParams.title) {
          snippet.showing = true;
        } else if (this.getTags(snippet.tags).some(tag => tag === term) && searchParams.tags) {
          snippet.showing = true;
        } else if (snippet.code.includes(term) && searchParams.code) {
          snippet.showing = true;
        } else if (snippet.notes.includes(term) && searchParams.notes) {
          snippet.showing = true;
        } else {
          snippet.showing = false;
        }
        if(!term) {
          snippet.showing = true;
        }
      }
    });
    this.sortSnippets();
  }

  sortSnippets(): void {
    this.snippets.sort((a, b) => a.showing && b.showing ? b.timestamp - a.timestamp : +b.showing - +a.showing);
  }

  saveSnippets(): void {
      this.storage.saveSnippets(this.snippets);
  }

  import(snippets: Snippet[]): void {
    this.snippets.push(...snippets);
    this.sortSnippets();
    this.saveSnippets();
  }

  clear(): void {
    clearInterval(this.timerId);
  }

  private getTags(tags: string): Array<string> {
    return tags.split(',').map(s => s.trim());
  }
}
