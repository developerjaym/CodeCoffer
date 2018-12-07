import { Injectable } from '@angular/core';
import { Snippet } from './snippet';

@Injectable()
export class ParseService {

  constructor() { }

  parse(xmlString: string): Snippet[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    let snippets: Snippet[] = [];
    for (let i = 0; i < xmlDoc.getElementsByTagName("snippet").length; i++) {
      const snippetElement = xmlDoc.getElementsByTagName("snippet")[i];
      const snippet = new Snippet();
      snippet.active = true;
      snippet.showing = true;
      snippet.code = snippetElement.getElementsByTagName("code")[0].textContent;
      snippet.notes = snippetElement.getElementsByTagName("notes")[0].textContent;
      snippet.title = snippetElement.getElementsByTagName("title")[0].textContent;
      snippet.id = Date.parse(snippetElement.getElementsByTagName("timestamp")[0].textContent);
      const tags = [];

      for (let t = 0; t < snippetElement.getElementsByTagName("tag").length; t++) {
        const tagElement = snippetElement.getElementsByTagName("tag")[t];
        tags.push(tagElement.textContent);
      }

      snippet.tags = tags.join(', ');

      snippets.push(snippet);
    }

    return snippets;
  }
}
