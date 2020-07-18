import { Component, OnInit } from '@angular/core';
import { IMenu, MenuService } from './menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public Menu: IMenu[];
  title = 'DockerUI';

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.Menu = this.menuService.getMenu();
  }
}
