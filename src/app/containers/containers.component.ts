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

  StartContainer(containerid: string): void {
    this.notification.ShowLoading();
    this.containerService.StartContainer(containerid).subscribe((result) => {
      if (result.success) {
        this.LoadContainers();
      }

      this.notification.HideLoading();
    });
  }

  StopContainer(containerid: string): void {
    this.notification.ShowLoading();
    this.containerService.StopContainer(containerid).subscribe((result) => {
      if (result.success) {
        this.LoadContainers();
      }
      this.notification.HideLoading();
    });
  }

  RemoveContainer(containerid: string): void {
    this.containerService.RemoveContainer(containerid).subscribe((result) => {
      if (result.success) {
        this.LoadContainers();
      }
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
