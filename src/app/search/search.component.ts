import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public SearchTerm: string = "";
  public Images: [] = [];
  public IsBusy = false;
  public SelectedImages: any[] = [];

  constructor(private imageService: ImageService, private nofitication: NotificationService) { }

  ngOnInit(): void {
  }

  public Search(): void {
    if (!this.SearchTerm || this.SearchTerm.length === 0) {
      this.nofitication.warn("Please enter search term!");
      return;
    }
    this.IsBusy = true;
    this.imageService.SearchImage(this.SearchTerm)
      .subscribe(result => {
        if (result.success) {
          this.Images = result.data;
        }

        this.IsBusy = false;
      }, err => {
        this.IsBusy = false;
      })
  }
}
