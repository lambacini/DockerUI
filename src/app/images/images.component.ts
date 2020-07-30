import { Component, OnInit } from '@angular/core';
import { AppContext } from '../appContext';
import { ContainerService } from '../services/container.service';
import swal from 'sweetalert2';
import { NotificationService } from '../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../services/image.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { ClrLoadingState, ClrLoading } from '@clr/angular';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent implements OnInit {
  public LoadButtonState: ClrLoadingState = ClrLoadingState.DEFAULT;
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
    this.LoadButtonState = ClrLoadingState.LOADING;

    this.IsBusy = true;
    this.imageService.Get().subscribe(
      (result) => {
        this.LoadButtonState = ClrLoadingState.SUCCESS;
        if (result.success) {
          this.Images = result.data;
        }
        this.IsBusy = false;
      },
      (err) => {
        this.LoadButtonState = ClrLoadingState.ERROR;
        this.IsBusy = false;
        this.notification.warn('Api service not available !');
      }
    );
  }

  RemoveImage(force: boolean = false): void {
    this.Confirm('Selected Images will be deleted !', 'are you sure ?').then(
      (answer) => {
        if (answer) {
          this.IsBusy = true;

          var ops = forkJoin(
            ...this.SelectedItems.map((image) =>
              this.imageService.RemoveImage(image.id, force)
            )
          );

          ops.subscribe(
            (result) => {
              result.forEach((item) => {
                console.log(item);
                this.notification.success(item.message);
              });
              this.IsBusy = false;
              this.LoadImages();
            },
            (err) => {
              if (err.error) {
                this.notification.error(err.error.Message);
              }
              this.IsBusy = false;
            }
          );
        }
      }
    );
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
