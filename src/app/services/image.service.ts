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
  
  SearchImage(searchTerm:string){
    return this.http
    .get(
      this.context.ApiUrl(this.ApiSegment) +
          '/Search?name=' +
          searchTerm
    ).pipe((result)=>{
      return result as Observable<ApiResponse<any>>;
    })
  }

  RemoveImage(imageName: string, force: boolean): Observable<ApiResponse<any>> {
    return this.http
      .post(
        this.context.ApiUrl(this.ApiSegment) +
          '/Remove?name=' +
          imageName +
          '&force=' +
          force,
        {}
      )
      .pipe((result) => {
        return result as Observable<ApiResponse<any>>;
      });
  }
}
