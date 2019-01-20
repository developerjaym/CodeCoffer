import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ChatMessage } from '../models/chat-message';
import { RemoteImportService } from './remote-import.service';
import { ToastService } from './toast.service';
import { Toast } from '../models/toast.enum';

@Injectable({
  providedIn: 'root'
})
export class ImportGuardService {

  constructor(private http: HttpClient, private remoteImportService: RemoteImportService, private toastService: ToastService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const conversationId = route.params['conversationId'];
    return this.http.get<ChatMessage[]>(environment.serverUrl + "conversations/" + conversationId + "?startingIndex=" + 0)
    .pipe(
      map((messages) => messages[0]),
      tap((message) => this.remoteImportService.displayImport(message.message.content),
        () => this.toastService.push(Toast.IMPORT_FAILED)),
      map(() => true, () => false),
    );
  }
}
