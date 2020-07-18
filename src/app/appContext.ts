import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppContext {
  public ApiUrl(segment: string): string {
    return 'https://localhost:5001/' + segment;
  }
}
