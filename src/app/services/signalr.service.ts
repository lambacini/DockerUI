import { Injectable } from '@angular/core';
import * as SignalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection: SignalR.HubConnection;

  constructor() {}

  public StartConnection() {
    this.hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/dockerhub')
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection Success');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  public InvokeMethod(containerid) {
    this.hubConnection.invoke('SubscribeStats', containerid);
  }

  public SubscribeStats() {
    this.hubConnection.on('ContainerStats', (data) => {
      console.log(data);
    });
  }
}
