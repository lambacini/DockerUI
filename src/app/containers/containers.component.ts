import { Component, OnInit } from '@angular/core';
import { AppContext } from '../appContext';
import { ContainerService } from '../services/container.service';
import swal from 'sweetalert2';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css'],
})
export class ContainersComponent implements OnInit {
  public Containers: any[] = [];
  public SelectedItems: any[] = [];
  public SelectedItem: any;
  public IsBusy: boolean = false;

  constructor(
    private context: AppContext,
    private containerService: ContainerService,
    private notification: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  LoadContainers(): void {
    this.IsBusy = true;
    this.containerService.Get().subscribe(
      (result) => {
        if (result.success) {
          this.Containers = result.data;
        }
        this.IsBusy = false;
      },
      (err) => {
        this.IsBusy = false;
        this.notification.warn('Api service not available !');
      }
    );
  }

  ReStartContainer(): void {
    this.notification.ShowLoading();

    var ops = forkJoin(
      ...this.SelectedItems.map((container) =>
        this.containerService.StopContainer(container.id)
      )
    );

    ops.subscribe((result) => {
      var ops2 = forkJoin(
        ...this.SelectedItems.map((container) =>
          this.containerService.StartContainer(container.id)
        )
      );

      ops2.subscribe((resultStart) => {
        this.notification.success('Success');
        this.notification.HideLoading();
        this.LoadContainers();
      });
    });
  }

  StartContainer(): void {
    this.IsBusy = true;
    var ops = forkJoin(
      ...this.SelectedItems.map((container) =>
        this.containerService.StartContainer(container.id)
      )
    );

    ops.subscribe((result) => {
      result.forEach((item) => {
        this.notification.success(item.message);
      });
      this.IsBusy = true;
      this.LoadContainers();
    });
  }

  StopContainer(): void {
    this.IsBusy = true;

    var ops = forkJoin(
      ...this.SelectedItems.map((container) =>
        this.containerService.StopContainer(container.id)
      )
    );

    ops.subscribe((result) => {
      result.forEach((item) => {
        this.notification.success(item.message);
      });
      this.LoadContainers();
      this.IsBusy = true;
    });
  }

  RemoveContainer(): void {
    this.Confirm(
      'Selected containers will be deleted !',
      'are you sure ?'
    ).then((answer) => {
      if (answer) {
        this.IsBusy = true;

        var ops = forkJoin(
          ...this.SelectedItems.map((container) =>
            this.containerService.RemoveContainer(container.id)
          )
        );

        ops.subscribe((result) => {
          result.forEach((item) => {
            this.notification.success(item.message);
          });
          this.IsBusy = false;
          this.LoadContainers();
        });
      }
    });
  }

  KillContainer(): void {
    this.Confirm('Selected containers will be killed !', 'are you sure ?').then(
      (answer) => {
        if (answer) {
          this.IsBusy = true;

          var ops = forkJoin(
            ...this.SelectedItems.map((container) =>
              this.containerService.KillContainer(container.id)
            )
          );

          ops.subscribe((result) => {
            result.forEach((item) => {
              this.notification.success(item.message);
            });
            this.IsBusy = false;
            this.LoadContainers();
          });
        }
      }
    );
  }

  ShowLogs(containerid: string): void {
    this.router.navigate(['/Containers/', containerid]);
  }

  GetUri(port: any) {
    if (port.ip == '0.0.0.0') return 'http://127.0.0.1:' + port.publicPort;
    else return 'http://' + port.ip + ':' + port.publicPort;
  }

  GetImageUir(imageName: string) {
    return '/Images/' + imageName;
  }

  IsButtonEnabled(button: string) {
    if (this.SelectedItems.length === 0) return false;

    switch (button) {
      case 'start': {
        var runningCount = this.SelectedItems.filter((p) => {
          return p.state == 'running';
        }).length;
        return runningCount === 0;
        break;
      }
      case 'stop':
      case 'restart':
      case 'kill': {
        var runningCount = this.SelectedItems.filter((p) => {
          return p.state == 'exited';
        }).length;
        return runningCount === 0;
        break;
      }
    }
  }

  private Confirm(
    message: string,
    caption: string = 'Güncelle'
  ): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      swal.fire({
        title: caption,
        icon: 'warning',
        text: message,
        showCloseButton: false,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          return new Promise(async (res) => {
            res(true);
            resolve(true);
          });
        },
      });
    });
  }
}
