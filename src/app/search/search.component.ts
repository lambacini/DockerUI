import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { NotificationService } from '../services/notification.service';
import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  public PullButtonState: ClrLoadingState = ClrLoadingState.DEFAULT;
  public SearchTerm: string = '';
  public Images: [] = [];
  public IsBusy = false;
  public SelectedImages: any[] = [];

  constructor(
    private imageService: ImageService,
    private nofitication: NotificationService
  ) {}

  ngOnInit(): void {}

  public Search(): void {
    if (!this.SearchTerm || this.SearchTerm.length === 0) {
      this.nofitication.warn('Please enter search term!');
      return;
    }
    this.IsBusy = true;
    this.imageService.SearchImage(this.SearchTerm).subscribe(
      (result) => {
        if (result.success) {
          this.Images = result.data;
        }

        this.IsBusy = false;
      },
      (err) => {
        this.IsBusy = false;
      }
    );
  }

  public PullImage() {
    if (!this.SelectedImages || this.SelectedImages.length === 0) {
      this.nofitication.warn('Please select image!');
      return;
    }

    this.PullButtonState = ClrLoadingState.LOADING;

    this.IsBusy = true;

    this.imageService
      .PullImage(this.SelectedImages[0].name, 'latest')
      .subscribe(
        (result) => {
          this.PullButtonState = ClrLoadingState.SUCCESS;
          this.nofitication.info(result.message);
          this.IsBusy = false;
        },
        (err) => {
          this.PullButtonState = ClrLoadingState.ERROR;
          this.IsBusy = false;
        }
      );
  }
}
