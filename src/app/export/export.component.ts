import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnippetService } from '../snippet.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  exportedJson: string;

  constructor(private service: SnippetService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
    .pipe(
      map(params => params['snippetId'])
    )
    .subscribe(
      snippetId => {
        if (snippetId) {
          this.exportedJson = JSON.stringify(this.service.getSnippetById(snippetId));
        }
        else {
          this.exportedJson = JSON.stringify(this.service.getAllSnippets());
        }
      }
    )
    // this.exportedJson = JSON.stringify(this.service.getAllSnippets());
  }

  back(): void {
    this.router.navigate(['']);
  }

}
