import { Injectable } from '@angular/core';
import { ChatMessage } from './chat-message';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Snippet } from './snippet';

@Injectable({
  providedIn: 'root'
})
export class RemoteImportService {

  private textToImport: string;
  constructor(private http: HttpClient) { }

  displayImport(snippetsToImport: Snippet | Snippet[]): void {
    this.textToImport = JSON.stringify(snippetsToImport, null, 2);
  }

  getTextToImport(): string {
    const text = this.textToImport || '';
    this.textToImport = '';
    return text;
  }

  exportToServer(text: string): Observable<string> {
    const path = environment.url + this.determineLanguage() + "/#/import";
    return this.http.post<ChatMessage>(environment.serverUrl + "conversations/create", this.createMessage(text))
      .pipe(
        map(message => path + "/" + message.conversationId)
      );
  }

  private createMessage(text: string): ChatMessage {
    return {
      message: {
        content: JSON.parse(text)
      }
    }
  }

  private determineLanguage(): string {
    const languageCode = window.location.pathname.split("/").reverse()[1] || "en"; 
    return languageCode;
  }
}
