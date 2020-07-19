import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IMenu, MenuService } from './menu.service';
import {
  NotificationService,
  NotificationType,
} from './services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public Menu: IMenu[];
  public IsAppBusy = false;
  public AppBusyMessage: string = 'Loading';
  title = 'DockerUI';

  constructor(
    private menuService: MenuService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.notificationService.onAlert().subscribe((notify) => {
      if (notify.type == NotificationType.Error) {
        this.ShowErrorToast(notify.message);
      } else if (notify.type == NotificationType.Warning) {
        this.ShowWarningToast(notify.message);
      } else {
        this.ShowSuccessToast(notify.message);
      }

      this.cdr.detectChanges();
    });

    this.notificationService.AppBusyTracker().subscribe((result) => {
      this.IsAppBusy = result;
      this.cdr.detectChanges();
    });
    this.Menu = this.menuService.getMenu();
  }

  private ShowSuccessToast(message: string) {
    Swal.fire({
      title: message,
      position: 'top-end',
      timer: 4000,
      timerProgressBar: true,
      toast: true,
      icon: 'success',
    });
  }

  private ShowWarningToast(message: string) {
    Swal.fire({
      title: message,
      position: 'top-end',
      timer: 4000,
      timerProgressBar: true,
      toast: true,
      icon: 'warning',
    });
  }

  private ShowErrorToast(message: string) {
    Swal.fire({
      title: message,
      position: 'top-end',
      timer: 4000,
      timerProgressBar: true,
      toast: true,
      icon: 'error',
    });
  }
}
