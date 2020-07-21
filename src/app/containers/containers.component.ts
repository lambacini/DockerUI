import { Component, OnInit } from '@angular/core';
import { AppContext } from '../appContext';
import { ContainerService } from '../services/container.service';
import swal from 'sweetalert2';
import { NotificationService } from '../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css'],
})
export class ContainersComponent implements OnInit {
  public Containers: any[];
  public SelectedItems: any[];
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

  ReStartContainer(containerid: string): void {
    this.notification.ShowLoading();
    this.containerService.StopContainer(containerid).subscribe((result) => {
      if (result.success) {
        this.containerService
          .StartContainer(containerid)
          .subscribe((result2) => {
            this.notification.success('Success');
          });
      } else {
        this.notification.warn('Container ReStart Failed');
        this.notification.warn(result.message);
      }

      this.notification.HideLoading();
    });
  }

  StartContainer(containerid: string): void {
    this.notification.ShowLoading();
    this.containerService.StartContainer(containerid).subscribe((result) => {
      if (result.success) {
        this.notification.success('Container Start Success');
        this.LoadContainers();
      } else {
        this.notification.warn('Container Start Failed');
        this.notification.warn(result.message);
      }

      this.notification.HideLoading();
    });
  }

  StopContainer(containerid: string): void {
    this.notification.ShowLoading();
    this.containerService.StopContainer(containerid).subscribe((result) => {
      if (result.success) {
        this.notification.success('Container Stop Success');
        this.LoadContainers();
      }
      this.notification.HideLoading();
    });
  }

  RemoveContainer(containerid: string): void {
    this.notification.ShowLoading();

    this.containerService.RemoveContainer(containerid).subscribe((result) => {
      if (result.success) {
        this.notification.success('Container Remove Success');
        this.LoadContainers();
      }

      this.notification.HideLoading();
    });
  }

  KillContainer(containerid: string): void {
    this.notification.ShowLoading();

    this.containerService.KillContainer(containerid).subscribe((result) => {
      if (result.success) {
        this.notification.success('Container Kill Success');
        this.LoadContainers();
      }

      this.notification.HideLoading();
    });
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
}
