import { Component, OnInit } from '@angular/core';
import { AppContext } from '../appContext';
import { ContainerService } from '../services/container.service';
import swal from 'sweetalert2';
import { NotificationService } from '../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.css'],
})
export class NetworksComponent implements OnInit {
  public Images: any[];
  public SelectedItems: any[] = [];
  public SelectedItem: any;
  public IsBusy: boolean = false;

  constructor(
    private context: AppContext,
    private imageService: ImageService,
    private notification: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  LoadImages(): void {
    this.IsBusy = true;
    this.imageService.Get().subscribe(
      (result) => {
        if (result.success) {
          this.Images = result.data;
        }
        this.IsBusy = false;
      },
      (err) => {
        this.IsBusy = false;
        this.notification.warn('Api service not available !');
      }
    );
  }

  selectionChanged(event) {
    console.log(event);
  }
}
