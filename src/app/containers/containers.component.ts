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

  constructor(
    private context: AppContext,
    private containerService: ContainerService
  ) {}

  ngOnInit(): void {
    this.LoadContainers();
  }

  LoadContainers(): void {
    this.containerService.Get().subscribe((result) => {
      if (result.success) {
        this.Containers = result.data;
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
