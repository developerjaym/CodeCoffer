import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StyleService } from '../style.service';
import { ToastService } from '../toast.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-style-editor',
  templateUrl: './style-editor.component.html',
  styleUrls: ['./style-editor.component.css']
})
export class StyleEditorComponent implements OnInit, OnDestroy {

  style: string;
  subscriptions: Subscription[] = [];

  constructor(private router: Router, private styleService: StyleService, private toastService: ToastService) { }

  ngOnInit() {
    this.subscriptions.push(this.styleService.getStyleObject()
      .pipe(
        map(styleObject => JSON.stringify(styleObject, null, 2))
      )
      .subscribe(previousStyle => this.style = previousStyle));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  back(): void {
    this.router.navigate(['']); 
  }

  save(): void {
    this.styleService.saveStyleObject(JSON.parse(this.style));
  }

  revert(): void {
    this.style = JSON.stringify(this.styleService.revert(), null, 2);
    this.save();
  }
}
