import { Component, OnInit } from '@angular/core';
import { AppContext } from '../appContext';
import { ContainerService } from '../services/container.service';

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
    private containerService: ContainerService
  ) { }

  ngOnInit(): void {
    this.LoadContainers();
  }

  LoadContainers(): void {
    this.IsBusy = true;
    this.containerService.Get().subscribe((result) => {
      if (result.success) {
        this.Containers = result.data;
      }

      this.IsBusy = false;
    });
  }

  StartContainer(containerid: string): void {
    this.IsBusy = true;
    this.containerService
      .StartContainer(containerid)
      .subscribe(result => {
        if (result.success) {
          this.LoadContainers();
        }

        this.IsBusy = false;
      });
  }

  StopContainer(containerid: string): void {
    this.IsBusy = true;
    this.containerService
      .StopContainer(containerid)
      .subscribe(result => {
        if (result.success) {
          this.LoadContainers();
        }

        this.IsBusy = false;
      });
  }

  RemoveContainer(containerid: string): void {
    this.containerService
      .RemoveContainer(containerid)
      .subscribe(result => {
        if (result.success) {
          this.LoadContainers();
        }
      });
  }

  GetUri(port: any) {
    if (port.ip == '0.0.0.0') return 'http://127.0.0.1:' + port.publicPort;
    else return 'http://' + port.ip + ':' + port.publicPort;
  }

  GetImageUir(imageName: string) {
    return '/Images/' + imageName;
  }
}
