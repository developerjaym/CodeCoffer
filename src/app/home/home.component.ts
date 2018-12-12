import { Component, OnInit } from '@angular/core';
import { HotKeyService } from '../hot-key.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private hotKeyService: HotKeyService) { }

  ngOnInit() {
  }

  keyUp(event: KeyboardEvent) {
    this.hotKeyService.push(event);
  }

}
