import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HotKey } from './hot-key.enum';

@Injectable({
  providedIn: 'root'
})
export class HotKeyService {

  private hotKeySubject: Subject<HotKey>;

  constructor() {
    this.hotKeySubject = new Subject<HotKey>();
  }

  push(keyEvent: KeyboardEvent): void {
    let hotKey: HotKey;
    if(keyEvent.ctrlKey && keyEvent.key === 'z') {
      this.hotKeySubject.next(HotKey.UNDO);
    }
    else if (keyEvent.altKey && keyEvent.ctrlKey) {
      switch (keyEvent.key) {
        case "s": // save
          hotKey = HotKey.SAVE;
          break;
        case "f": // find
          hotKey = HotKey.SEARCH
          break;
        case "i": // import
          hotKey = HotKey.IMPORT
          break;
        case "e": // export
          hotKey = HotKey.EXPORT
          break;
        case "n": // new
          hotKey = HotKey.CREATE_NEW_SNIPPET
          break;
        case "v": // view more
          hotKey = HotKey.VIEW_REMAINING_SNIPPETS
          break;
        case "z": // undo a delete
          hotKey = HotKey.UNDO
          break;
        default:
          return;
      }
      this.hotKeySubject.next(hotKey);
    }
  }

  pull(): Observable<HotKey> {
    return this.hotKeySubject.asObservable();
  }
}
