import { ServiceBase } from './service.base';
import { Injectable, Inject } from '@angular/core';
import { AppContext } from '../appContext';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class ContainerService extends ServiceBase<any> {
  constructor(public context: AppContext, public http: HttpClient) {
    super(context, http);
    this.ApiSegment = 'api/Docker';
  }

  RemoveContainer(containerid: string): Observable<ApiResponse<any>> {
    return this.http
      .delete(this.context.ApiUrl(this.ApiSegment)+"/Remove?containerid="+containerid)
      .pipe((result) => {
        return result as Observable<ApiResponse<any>>;
      });
  }

  RenameContainer(containerid: string, newname: string): Observable<ApiResponse<any>> {
    return this.http
      .post(this.context.ApiUrl(this.ApiSegment) + "/Rename?containerid=" + containerid + "&newname=" + newname, {})
      .pipe((result) => {
        return result as Observable<ApiResponse<any>>;
      });
  }

  StartContainer(containerid: string): Observable<ApiResponse<any>> {
    return this.http
      .post(this.context.ApiUrl(this.ApiSegment) + "/Start?containerid=" + containerid, {})
      .pipe((result) => {
        return result as Observable<ApiResponse<any>>;
      });
  }

  StopContainer(containerid: string): Observable<ApiResponse<any>> {
    return this.http
      .post(this.context.ApiUrl(this.ApiSegment) + "/Stop?containerid=" + containerid, {})
      .pipe((result) => {
        return result as Observable<ApiResponse<any>>;
      });
  }
}
