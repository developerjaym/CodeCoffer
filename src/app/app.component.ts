import { Component, OnInit } from '@angular/core';
import { SnippetService } from './snippet.service';
import { Router, NavigationEnd } from '@angular/router';
import { SupportedLanguage } from './supported-language';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CodeCoffer';
  supportedLanguages: SupportedLanguage[] = [
    {
      url: environment.url + "/#/",
      name: "English"
    },
    {
      url: environment.url + "/zh/#/",
      name: "中文"
    }
  ];

  constructor(private router: Router, private service: SnippetService) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
  }

  doUnload(): void {
    this.service.saveSnippets();
  }
}
