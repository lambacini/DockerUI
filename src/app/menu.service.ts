import { Injectable } from '@angular/core';

export interface IMenu {
  Caption: String;
  Link?: String;
  Name: String;
  Type: String;
  Children?: IMenu[];
  IsOpen?: boolean;
  Icon?: string;
  PermissionCode?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  MENU: IMenu[] = [];
  constructor() { }

  getMenu(): IMenu[] {
    this.MENU = [];

    this.MENU.push({
      Caption: 'Home',
      Link: '/Home',
      Name: 'Home',
      Type: 'link',
      Icon: 'library'
    });

    this.MENU.push({
      Caption: 'Containers',
      Link: '/Containers',
      Name: 'Containers',
      Type: 'link',
      Icon: 'view-cards'
    });
    this.MENU.push({
      Caption: 'Volumes',
      Link: '/Volumes',
      Name: 'Volumes',
      Type: 'link',
      Icon: 'nvme'
    });

    return this.MENU;
  }
}
