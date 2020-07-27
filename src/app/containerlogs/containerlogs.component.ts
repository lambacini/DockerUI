import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerService } from '../services/container.service';
import { timer } from 'rxjs/internal/observable/timer';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-containerlogs',
  templateUrl: './containerlogs.component.html',
  styleUrls: ['./containerlogs.component.css'],
})
export class ContainerlogsComponent implements OnInit, OnDestroy {
  Logs: string;
  source = timer(100, 4000);
  stopEvent: Subscription;
  AutoRefresh: boolean = false;
  Log : string;

  private containerid = '';

  constructor(
    private route: ActivatedRoute,
    private containerService: ContainerService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnDestroy(): void {
    this.stopEvent.unsubscribe();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.containerid = params.id;
      this.ReadLogs();
      this.stopEvent = this.source
        .subscribe((val) => {
          if (this.AutoRefresh) {
            this.ReadLogs();
          }
        });
    });
  }

  private ReadLogs() {
    this.containerService.GetLogs(this.containerid).subscribe((result) => {
      if (result.success) {
        this.Logs = result.data;
        this.Log = this.Logs[0];
        this.cdr.detectChanges();
      }
    });
  }

  trackByFn(index, line) {
    console.log(index);
    console.log(line);
    return index;
  }

  ChangeAutoRefresh(event) {
    this.AutoRefresh = !this.AutoRefresh;
  }
}
