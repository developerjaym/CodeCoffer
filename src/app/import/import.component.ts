import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SnippetService } from '../snippet.service';
import { ParseService } from '../parse.service';
import { Snippet } from '../snippet';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent {

  importedJson: string = '';
  importedXml: string = '';

  constructor(private parser: ParseService, private service: SnippetService, private router: Router) { }

  save(): void {
    this.service.import(JSON.parse(this.importedJson));
    this.back();
  }

  saveXml(): void {
    this.service.import(this.parser.parse(this.importedXml));
    this.back();
  }

  back(): void {
    this.router.navigate(['']);
  }
}
