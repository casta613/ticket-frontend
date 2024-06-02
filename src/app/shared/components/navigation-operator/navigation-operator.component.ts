import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-operator',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationOperatorComponent {
  public active: boolean = false; //esta bandera es para desplegar menu

  constructor() {}
  ngOnInit(): void {}

  setActive() : void {
      this.active = !this.active
  }
}
