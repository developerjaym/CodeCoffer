import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SvgService {
  private svgMap: Map<string, string>;
  constructor(private httpClient: HttpClient) { 
    this.svgMap = new Map();
  }

  getSvgByName(svg: string): Observable<string> {
    if(this.svgMap.has(svg)) {
      return of(this.svgMap.get(svg));
    }
    return this.httpClient.get(`assets/${svg}.svg`, {
      responseType: 'text'
    }).pipe(
      tap(xml => this.svgMap.set(svg, xml))
    );
  }
}
