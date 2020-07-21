import { ServiceBase } from './service.base';
import { Injectable, Inject } from '@angular/core';
import { AppContext } from '../appContext';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class ImageService extends ServiceBase<any> {
  constructor(public context: AppContext, public http: HttpClient) {
    super(context, http);
    this.ApiSegment = 'api/Image';
  }
}
