import { Injectable } from '@angular/core';
import { Snippet } from '../models/snippet';
import { Supplement } from '../models/supplement';

@Injectable()
export class ParseService {
  constructor() {}

  parse(xmlString: string): Snippet[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const snippets: Snippet[] = [];
    for (let i = 0; i < xmlDoc.getElementsByTagName('snippet').length; i++) {
      const snippetElement = xmlDoc.getElementsByTagName('snippet')[i];
      const snippet = new Snippet();
      snippet.supplements = this.parseSupplementsFromXml(snippetElement.getElementsByTagName('supplement'));
      snippet.showing = true;
      snippet.title = snippetElement.getElementsByTagName('title')[0].textContent;
      snippet.timestamp = Date.parse(snippetElement.getElementsByTagName('timestamp')[0].textContent);
      snippet.id = snippetElement.getElementsByTagName('id')[0].textContent;
      const tags = [];

      for (let t = 0; t < snippetElement.getElementsByTagName('tag').length; t++) {
        const tagElement = snippetElement.getElementsByTagName('tag')[t];
        tags.push(tagElement.textContent);
      }

      snippet.tags = tags.join(', ');

      snippets.push(snippet);
    }

    return snippets;
  }

  parseSupplementsFromXml(supplementElements: HTMLCollectionOf<Element>): Supplement[] {
    let supplementArray = [];
    for (let index = 0; index < supplementElements.length; index++) {
      const supplement = new Supplement();
      supplement.code = supplementElements[index].getElementsByTagName('code')[0].textContent;
      supplement.notes = supplementElements[index].getElementsByTagName('note')[0].textContent;
      supplementArray.push(supplement);
    }
    return supplementArray;
  }
}
