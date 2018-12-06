import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  displayString: string = '';
  constructor(private storage: StorageService, private router: Router) { }


  back(): void {
    this.router.navigate(['']);
  }

}
