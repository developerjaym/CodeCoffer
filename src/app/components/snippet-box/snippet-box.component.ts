import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Snippet } from '../../models/snippet';
import { SnippetService } from '../../services/snippet.service';
import { Router } from '@angular/router';
import { CopyService } from '../../services/copy.service';
import { UndoService } from '../../services/undo.service';
import { Supplement } from '../../models/supplement';
import { UndoMessage } from '../../models/undo-message';
import { filter, tap } from 'rxjs/operators';
import { ToastService } from '../../services/toast.service';
import { Toast } from '../../models/toast.enum';
import { Subscription } from 'rxjs';
import { RoutingService } from '../../services/routing.service';
@Component({
  selector: 'app-snippet-box',
  templateUrl: './snippet-box.component.html',
  styleUrls: ['./snippet-box.component.css']
})
export class SnippetBoxComponent implements OnInit, OnDestroy {

  @Input() snippet: Snippet;

  @Input() disabled = false;

  private subscriptions: Subscription[];

  constructor(private copyService: CopyService,
    private snippetService: SnippetService,
    private undoService: UndoService,
    private toastService: ToastService,
    private routingService: RoutingService) {
    this.subscriptions = [];
  }

  ngOnInit() {
    this.snippet.supplements = this.snippet.supplements || [];
    this.subscriptions.push(
      this.undoService.pull().pipe(
        filter(message => message.type === "supplement"),
        filter(message => message.snippet.id === this.snippet.id),
        tap(message => this.addSupplement(message.supplementIndex, message.supplement)),
        tap(message => this.snippetService.onSnippetSelected(this.snippet.id))
      ).subscribe(success => this.toastService.push(Toast.SNIPPET_RESTORED))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  delete() {
    this.snippetService.deleteSnippet(this.snippet.id);
  }

  copy() {
    this.copyService.copy(this.snippet.code);
  }

  export() {
    this.routingService.goToExport(this.snippet.id);
  }

  pin() {
    this.snippetService.pinSnippet(this.snippet.id);
  }

  unpin() {
    this.snippetService.unpinSnippet(this.snippet.id);
  }

  addSupplement(index: number, supplement: Supplement = new Supplement()) {
    this.snippet.supplements.splice(index + 1, 0, supplement);
  }

  unsupplement(index: number) {
    this.snippet.supplements.splice(index, 1) //offset 1 because the first index of allSnippets is the main code/notes pair
      .map(supplement => {
        const undoMessage = new UndoMessage();
        undoMessage.type = "supplement";
        undoMessage.snippet = this.snippet;
        undoMessage.supplement = supplement;
        undoMessage.supplementIndex = index;
        return undoMessage;
      })
      .forEach((undoMessage: UndoMessage) => this.undoService.push(undoMessage));
  }

  clone() {

  }
}
