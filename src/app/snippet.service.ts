import { Injectable } from '@angular/core';
import { Snippet } from './snippet';
import { SearchParameters } from './searchParameters';
import { StorageService } from './storage.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class SnippetService {
  private snippets: Snippet[];
  private snippetsSubject: BehaviorSubject<Snippet[]>;
  private timerId: any;
  private readonly SAVE_INTERVAL = 200000;
  private readonly DEFAULT_PAGE_SIZE = 12;

  constructor(private storage: StorageService) {
    this.snippets = this.storage.getSnippets();
    this.sortSnippets();
    this.snippetsSubject = new BehaviorSubject<Snippet[]>(this.sliceSnippets());
    this.timerId = setInterval(() => this.saveSnippets(), this.SAVE_INTERVAL);
  }

  /**
   * To get the currently visible snippets, subscribe to this.
   */
  getSnippetList(): Observable<Snippet[]> {
    return this.snippetsSubject.asObservable();
  }

  /**
   * To get all snippets, invoke this method.
   */
  getAllSnippets(): Snippet[] {
    return this.snippets;
  }

  loadRemainingSnippets(): void {
    this.snippetsSubject.next(this.snippets);
  }

  addSnippet(snippet: Snippet): void {
    this.storage.addSnippet(snippet);
    this.snippets.unshift(snippet);
    window.scrollTo(0, 0);
    this.snippetsSubject.next(this.sliceSnippets());
  }

  deleteSnippet(snippetId: string): void {
    this.storage.removeSnippet(snippetId);
    this.snippets = this.snippets.filter(snippet => snippet.id !== snippetId);
    this.snippetsSubject.next(this.sliceSnippets());
  }

  search(query: string, searchParams: SearchParameters) {
    query = query.trim();
    const searchResultsMap: Map<Snippet, number> = new Map<Snippet, number>();
    const terms: string[] = query.toLocaleUpperCase().split(',').map(str => str.trim());
    terms.forEach(term => 
    this.snippets.forEach(snippet => {
        let score = searchResultsMap.has(snippet) ? searchResultsMap.get(snippet) : 0;
        if (snippet.title.toLocaleUpperCase().includes(term) && searchParams.title) {
          score++;
        } if (this.getTags(snippet.tags.toLocaleUpperCase()).some(tag => tag === term) && searchParams.tags) {
          score++;
        } if (snippet.code.toLocaleUpperCase().includes(term) && searchParams.code) {
          score++;
        } if (snippet.notes.toLocaleUpperCase().includes(term) && searchParams.notes) {
          score++;
        } 
        searchResultsMap.set(snippet, score);
    }));

    this.snippets.forEach(snippet => {
      const hasPositiveSearchScore = searchResultsMap.has(snippet) && searchResultsMap.get(snippet) > 0;
      snippet.showing = hasPositiveSearchScore || query.length === 0;
    })
    if (query.length > 0) {
      this.snippets.sort((a, b) => a.showing && b.showing ? 
      searchResultsMap.get(b) - searchResultsMap.get(a) 
      : +b.showing - +a.showing);
    } else {
      this.sortSnippets();
    }
    this.snippetsSubject.next(this.sliceSnippets());
  }

  private sortSnippets(): void {
    this.snippets.sort((a, b) => a.showing && b.showing ? b.timestamp - a.timestamp : +b.showing - +a.showing);
  }

  saveSnippets(): void {
    this.storage.saveSnippets(this.snippets);
  }

  import(snippets: Snippet[]): void {
    this.snippets.push(...snippets);
    this.sortSnippets();
    this.saveSnippets();
    this.snippetsSubject.next(this.sliceSnippets());
  }

  clear(): void {
    clearInterval(this.timerId);
  }

  hasMoreSnippets(index: number): boolean {
    return this.snippets.filter(snippet => snippet.showing).length > index;
  }

  private getTags(tags: string): Array<string> {
    return tags.split(',').map(s => s.trim());
  }

  private sliceSnippets(): Snippet[] {
    return this.snippets.slice(0, this.DEFAULT_PAGE_SIZE);
  }
}
