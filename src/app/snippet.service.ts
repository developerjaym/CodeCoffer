import { Injectable } from '@angular/core';
import { Snippet } from './snippet';
import { SearchParameters } from './searchParameters';
import { StorageService } from './storage.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, tap, map } from 'rxjs/operators';
import { ToastService } from './toast.service';
import { Toast } from './toast.enum';
import { HotKeyService } from './hot-key.service';
import { HotKey } from './hot-key.enum';

@Injectable()
export class SnippetService {
  private snippets: Snippet[];
  private deletedSnippets: Snippet[];
  private snippetsSubject: BehaviorSubject<Snippet[]>;
  private searchSubject: BehaviorSubject<SearchParameters>;
  private timerId: any;
  private readonly SAVE_INTERVAL = 200000;
  private readonly DEFAULT_PAGE_SIZE = 12;

  constructor(private hotKeyService: HotKeyService, private storage: StorageService, private toastService: ToastService) {
    this.snippets = this.storage.getSnippets();
    this.deletedSnippets = [];
    this.sortSnippets();
    this.snippetsSubject = new BehaviorSubject<Snippet[]>(this.sliceSnippets());
    this.searchSubject = new BehaviorSubject<SearchParameters>(new SearchParameters());
    this.timerId = setInterval(() => this.saveSnippets(), this.SAVE_INTERVAL);
    this.hotKeyService.pull().pipe(
      filter(hotKey => hotKey === HotKey.UNDO),
      map(undoCommand => this.undoDelete()),
      filter(Boolean)

    ).subscribe(success => this.toastService.push(Toast.SNIPPET_RESTORED));
  }
  getSearchParameters(): Observable<SearchParameters> {
    return this.searchSubject.asObservable().pipe(distinctUntilChanged());
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

  getSnippetById(snippetId: string): Snippet {
    return this.snippets.find(snippet => snippet.id === snippetId);
  }

  addSnippet(snippet: Snippet): void {
    snippet.id = this.createId();
    this.storage.addSnippet(snippet);
    this.snippets.unshift(snippet);
    window.scrollTo(0, 0);
    this.snippetsSubject.next(this.sliceSnippets());
    this.toastService.push(Toast.SNIPPET_ADDED);
  }

  deleteSnippet(snippetId: string): void {
    this.deletedSnippets.unshift(...(this.snippets.filter(snippet => snippet.id === snippetId)));
    this.storage.removeSnippet(snippetId);
    this.snippets = this.snippets.filter(snippet => snippet.id !== snippetId);
    this.snippetsSubject.next(this.sliceSnippets());
    this.toastService.push(Toast.SNIPPET_DELETED);
  }

  search(searchParams: SearchParameters) {
    this.searchSubject.next(searchParams);
    const query = searchParams.query.trim();
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
    this.toastService.push(Toast.SEARCH_COMPLETED);
  }

  private sortSnippets(): void {
    this.snippets.sort((a, b) => a.showing && b.showing ? b.timestamp - a.timestamp : +b.showing - +a.showing);
  }

  saveSnippets(): void {
    this.storage.saveSnippets(this.snippets);
    this.toastService.push(Toast.SAVE_SUCCEEDED);
  }

  import(imported: Snippet | Array<Snippet>): void {
    const snippets: Snippet[] = imported instanceof Array ? imported : [imported];
    snippets.forEach(snippet => snippet.id = this.createId());
    this.snippets.push(...snippets);
    this.sortSnippets();
    this.saveSnippets();
    this.snippetsSubject.next(this.sliceSnippets());
    this.toastService.push(Toast.IMPORT_SUCCEEDED);
  }

  clear(): void {
    clearInterval(this.timerId);
  }

  hasMoreSnippets(index: number): boolean {
    return this.snippets.filter(snippet => snippet.showing).length > index;
  }

  undoDelete(): boolean {
    if(this.deletedSnippets.length > 0) {
      this.addSnippet(this.deletedSnippets.shift());
      return true;
    }
    return false;
  }

  private getTags(tags: string): Array<string> {
    return tags.split(',').map(s => s.trim());
  }

  private sliceSnippets(): Snippet[] {
    return this.snippets.slice(0, this.DEFAULT_PAGE_SIZE);
  }

  private createId(): string {
    return String(Math.floor(Math.random() * 1000000000) + 1);
  }
}
