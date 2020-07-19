import { Component, OnInit, Input, ChangeDetectorRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-apploading',
  templateUrl: './apploading.component.html',
  styleUrls: ['./apploading.component.css'],
})
export class ApploadingComponent implements OnInit {
  public isLoading = false;
  public WhiteBackground = false;
  private _loaderMessage: string;
  private subscription: any;

  @Input()
  public get LoaderMessage(): string {
    return this._loaderMessage;
  }

  public set LoaderMessage(message: string) {
    this._loaderMessage = message;
  }

  @Input('Loading')
  set Loading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  constructor() {}

  ngOnInit() {}
}
