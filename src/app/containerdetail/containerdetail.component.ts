import { Component, OnInit } from '@angular/core';
import { SignalrService } from '../services/signalr.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-containerdetail',
  templateUrl: './containerdetail.component.html',
  styleUrls: ['./containerdetail.component.css'],
})
export class ContainerdetailComponent implements OnInit {
  containerid: string;
  constructor(
    private signalrService: SignalrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.containerid = params.id;
    });
  }

  public Start() {
    this.signalrService.StartConnection();
  }

  public Subscribe() {
    this.signalrService.SubscribeStats();
  }

  public Invoke() {
    this.signalrService.InvokeMethod(this.containerid);
  }
}
