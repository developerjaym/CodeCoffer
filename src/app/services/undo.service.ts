import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { UndoMessage } from '../models/undo-message';
import { HotKeyService } from './hot-key.service';
import { filter } from 'rxjs/operators';
import { HotKey } from '../models/hot-key.enum';

@Injectable({
  providedIn: 'root'
})
export class UndoService {

  private undoSubject: Subject<UndoMessage>;
  private undoneActions: UndoMessage[];
  constructor(private hotKeyService: HotKeyService) { 
    this.undoneActions = [];
    this.undoSubject = new Subject<UndoMessage>();
    this.hotKeyService.pull().pipe(
      filter(hotKey => hotKey === HotKey.UNDO)
    ).subscribe(hotKey => this.pop());
  }

  /**
   * Observe all the undo messages.
   * Be careful about multiple observers reacting to the same message.
   * 
   * I also suggest you scroll to any element that was undeleted.
   */
  pull(): Observable<UndoMessage> {
    return this.undoSubject.asObservable();
  }  

  /**
   * If something needs to be undone, invoke this.
   */
  pop(): void {
    if(this.undoneActions.length) {
      this.undoSubject.next(this.undoneActions.shift());
    }
  }

  /**
   * For things to be undone if necessary
   * @param undoMessage An undoable action
   */
  push(undoMessage: UndoMessage): void {
    this.undoneActions.unshift(undoMessage);
  }
}
