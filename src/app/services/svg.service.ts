import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SvgService {
  private svgMap: Map<string, Observable<string>>;
  constructor(private httpClient: HttpClient) {
    this.svgMap = new Map();
  }

  getSvgByName(svg: string): Observable<string> {
    if (this.svgMap.has(svg)) {
      return this.svgMap.get(svg);
    }
    const subject: Subject<string> = new ReplaySubject<string>();
    this.httpClient
      .get(`assets/${svg}.svg`, {
        responseType: 'text'
      })
      .pipe(tap(xml => subject.next(xml)))
      .subscribe();
    return this.svgMap.set(svg, subject.asObservable()).get(svg);
  }
}
