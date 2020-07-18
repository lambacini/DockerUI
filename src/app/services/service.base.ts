import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/apiResponse';
import { AppContext } from '../appContext';

export abstract class ServiceBase<T> {
  public ApiSegment: string;

  constructor(public context: AppContext, public http: HttpClient) {}

  Get(): Observable<ApiResponse<T>> {
    return this.http.get(this.context.ApiUrl(this.ApiSegment)).pipe((result) => {
      return result as Observable<ApiResponse<T>>;
    });
  }
}
