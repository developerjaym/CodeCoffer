import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SupportedLanguage } from '../../models/supported-language';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent implements OnInit {

  supportedLanguages: SupportedLanguage[] = [
    {
      url: environment.url + "en/#/",
      name: "English"
    },
    {
      url: environment.url + "zh/#/",
      name: "中文"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
