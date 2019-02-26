import { Injectable } from '@angular/core';
import { Snippet } from '../models/snippet';
import { StorageService } from './storage.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ToastService } from './toast.service';
import { Toast } from '../models/toast.enum';
import { SortService } from './sort.service';
import { UndoService } from './undo.service';
import { UndoMessage } from '../models/undo-message';

@Injectable()
export class SnippetService {
  private snippets: Snippet[];
  
  private snippetsSubject: BehaviorSubject<Snippet[]>;
  private pinnedSnippetsSubject: BehaviorSubject<Snippet[]>;
  
  private timerId: any;
  private readonly SAVE_INTERVAL = 200000;
  private readonly DEFAULT_PAGE_SIZE = 12;

  constructor(private undoService: UndoService, private sortService: SortService, private storage: StorageService, private toastService: ToastService) {
    this.snippets = this.storage.getSnippets().map(snippet => Snippet.createValidSnippet(snippet));
    this.sortService.sortSnippets(this.snippets);
    this.snippetsSubject = new BehaviorSubject<Snippet[]>(this.sliceSnippets());
    this.pinnedSnippetsSubject = new BehaviorSubject<Snippet[]>(this.determinePinnedSnippets());
    
    this.timerId = setInterval(() => this.saveSnippets(), this.SAVE_INTERVAL);
    this.undoService.pull().pipe(
      filter(message => message.type === "snippet"),
      tap(message => this.undoDelete(message.snippet))
    ).subscribe(success => this.toastService.push(Toast.SNIPPET_RESTORED));
  }
  

  getPinnedSnippets(): Observable<Snippet[]> {
    return this.pinnedSnippetsSubject.asObservable();
  }

  /**
   * Snippet titles change, so this method can make sure everything is up to date.
   */
  refreshPinnedSnippets(): void {
    this.pinnedSnippetsSubject.next(this.determinePinnedSnippets());
  }

  pinSnippet(id: string): void {
    this.getSnippetById(id).pinned = true;
    this.refreshPinnedSnippets();
  }

  unpinSnippet(id: string): void {
    this.getSnippetById(id).pinned = false;
    this.refreshPinnedSnippets();
  }

  onSnippetSelected(id: string): void {
    window.scrollTo(0, 0);
    const selectedSnippet: Snippet = this.getSnippetById(id);
    selectedSnippet.showing = true;
    const visibleSnippets: Snippet[] = this.snippetsSubject.value.filter(snippet => snippet.id !== id);
    visibleSnippets.unshift(selectedSnippet);
    this.snippetsSubject.next(visibleSnippets);
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
    const snippetsToDisplay = this.snippetsSubject.value;
    snippetsToDisplay.unshift(snippet);
    this.snippetsSubject.next(snippetsToDisplay);
    this.toastService.push(Toast.SNIPPET_ADDED);
    this.refreshPinnedSnippets();
  }

  deleteSnippet(snippetId: string): void {
    this.snippets
    .filter(snippet => snippet.id === snippetId)
    .map(snippet => {
      return {
      type: "snippet",
      snippet: snippet
    }})
    .forEach((message: UndoMessage) => this.undoService.push(message));
    this.storage.removeSnippet(snippetId);
    this.snippets = this.snippets.filter(snippet => snippet.id !== snippetId);
    this.snippetsSubject.next(this.sliceSnippets());
    this.toastService.push(Toast.SNIPPET_DELETED);
    this.refreshPinnedSnippets();
  }

  onSearchComplete(snippets: Snippet[]) {
    this.snippets = snippets;
    this.snippetsSubject.next(this.sliceSnippets());
    this.toastService.push(Toast.SEARCH_COMPLETED);
  }

  saveSnippets(): void {
    this.storage.saveSnippets(this.snippets, () => this.toastService.push(Toast.SAVE_SUCCEEDED),
      () => this.toastService.push(Toast.SAVE_FAILED));
  }

  import(imported: Snippet | Array<Snippet>): void {
    const importedSnippetArray: Snippet[] = imported instanceof Array ? imported : [imported];
    importedSnippetArray.sort((snippetA, snippetB) => snippetB.timestamp - snippetA.timestamp);
    importedSnippetArray.forEach((snippet, index) => {
      snippet.id = this.createId();
      snippet.showing = true;
      snippet.timestamp = Date.now() + (importedSnippetArray.length - index);
    });
    this.snippets.unshift(...importedSnippetArray);
    this.saveSnippets();
    this.snippetsSubject.next(this.sliceSnippets());
    this.refreshPinnedSnippets();
    this.toastService.push(Toast.IMPORT_SUCCEEDED);
  }

  clear(): void {
    clearInterval(this.timerId);
  }

  hasMoreSnippets(index: number): boolean {
    return this.snippets.filter(snippet => snippet.showing).length > index;
  }

  private undoDelete(snippet: Snippet): void {
      this.addSnippet(snippet);
  }

  private sliceSnippets(): Snippet[] {
    return this.snippets.slice(0, this.DEFAULT_PAGE_SIZE).filter(snippet => snippet.showing);
  }

  private createId(): string {
    return String(Math.floor(Math.random() * 1000000000) + 1);
  }

  private determinePinnedSnippets(): Snippet[] {
    return this.snippets.filter(snippet => snippet.pinned)
  }
}
