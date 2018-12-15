import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SnippetService } from '../snippet.service';
import { map } from 'rxjs/operators';
import { CopyService } from '../copy.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  exportedJson: string;

  constructor(private copyService: CopyService, private service: SnippetService, private router: Router, private activatedRoute: ActivatedRoute) { }

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
  }

  back(): void {
    this.router.navigate(['']);
  }

  copy(): void {
    this.copyService.copy(this.exportedJson);
    this.back();
  }
}
