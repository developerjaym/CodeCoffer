import { Component } from '@angular/core';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  displayString: string = '';
  constructor(private routingService: RoutingService) { }


  back(): void {
    this.routingService.goHome();
  }

}
