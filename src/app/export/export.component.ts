import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { SnippetService } from '../snippet.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  exportedJson: string;

  constructor(private service: SnippetService, private router: Router) { }

  ngOnInit() {
    this.exportedJson = JSON.stringify(this.service.getAllSnippets());
  }

  back(): void {
    this.router.navigate(['']);
  }

}
