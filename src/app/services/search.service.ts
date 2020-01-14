import { Injectable } from '@angular/core';
import { Snippet } from '../models/snippet';
import { SearchParameters } from '../models/searchParameters';
import { SortService } from './sort.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { SnippetService } from './snippet.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject: BehaviorSubject<SearchParameters>;

  constructor(private snippetService: SnippetService, private sortService: SortService) {
    this.searchSubject = new BehaviorSubject<SearchParameters>(new SearchParameters());
  }

  getSearchParameters(): Observable<SearchParameters> {
    return this.searchSubject.asObservable().pipe(distinctUntilChanged());
  }

  search(searchParams: SearchParameters, saveSearch: boolean = true): void {
    if (saveSearch) {
      this.searchSubject.next(searchParams);
    }
    const snippets = this.snippetService.getAllSnippets();
    const query = searchParams.query.trim();
    const searchResultsMap: Map<Snippet, number> = new Map<Snippet, number>();
    const terms: string[] = query
      .toLocaleUpperCase()
      .split(',')
      .map(str => str.trim());
    terms
      .filter(term => term.length)
      .forEach(term =>
        snippets.forEach(snippet => {
          let score = searchResultsMap.has(snippet) ? searchResultsMap.get(snippet) : 0;
          if (searchParams.title && snippet.title.toLocaleUpperCase().includes(term)) {
            score++;
          }
          if (searchParams.tags && this.isInTags(term, snippet)) {
            score++;
          }
          if (searchParams.code && this.isInCode(term, snippet)) {
            score++;
          }
          if (searchParams.notes && this.isInNotes(term, snippet)) {
            score++;
          }
          searchResultsMap.set(snippet, score);
        })
      );

    snippets.forEach(snippet => {
      const hasPositiveSearchScore = searchResultsMap.has(snippet) && searchResultsMap.get(snippet) > 0;
      snippet.showing = hasPositiveSearchScore || query.length === 0;
    });
    if (query.length > 0) {
      snippets.sort((a, b) =>
        a.showing && b.showing ? searchResultsMap.get(b) - searchResultsMap.get(a) : +b.showing - +a.showing
      );
    } else {
      this.sortService.sortSnippets(snippets);
    }
    this.snippetService.onSearchComplete(snippets);
  }

  private isInCode(term: string, snippet: Snippet): boolean {
    return snippet.supplements.map(supplement => supplement.code.toLocaleUpperCase()).some(code => code.includes(term));
  }

  private isInNotes(term: string, snippet: Snippet): boolean {
    return snippet.supplements
      .map(supplement => supplement.notes.toLocaleUpperCase())
      .some(notes => notes.includes(term));
  }

  private isInTags(term: string, snippet: Snippet): boolean {
    return this.getTags(snippet.tags.toLocaleUpperCase()).some(tag => tag === term);
  }

  private getTags(tags: string): Array<string> {
    return tags.split(',').map(s => s.trim());
  }
}
