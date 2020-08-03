import { Injectable } from '@angular/core';
import { WebsocketService } from './WebSocketService';
import { ContainerExecResponse, ContainerExecRequest } from '../models/ContainerExecResponse';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const CHAT_URL = 'wss://localhost:5001/wsExec';

@Injectable({
  providedIn: 'root',
})
export class ExecSocketService {
  public messages: Subject<any>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<any>>(
      wsService.connect(CHAT_URL).pipe(
        map(
          (response: MessageEvent): any => {
            let data = JSON.parse(response.data);
            return {
              ContainerID: data.ContainerID,
              ExecID: data.ExecID,
              Message: data.Message,
              Success: data.Success,
            };
          }
        )
      )
    );
  }
}
