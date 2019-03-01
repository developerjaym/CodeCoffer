import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SupportedLanguage } from '../../models/supported-language';
import { RoutingService } from '../../services/routing.service';

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

  constructor(private routingService: RoutingService) { }

  ngOnInit() {
    this.supportedLanguages.forEach(
      supportedLanguage => supportedLanguage.url += this.routingService.getHomeRoute()
    );
  }

}
