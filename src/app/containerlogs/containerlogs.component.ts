import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerService } from '../services/container.service';
import { timer } from 'rxjs/internal/observable/timer';

@Component({
  selector: 'app-containerlogs',
  templateUrl: './containerlogs.component.html',
  styleUrls: ['./containerlogs.component.css'],
})
export class ContainerlogsComponent implements OnInit {
  Logs: string;
  source = timer(100, 4000);

  private containerid = '';

  constructor(
    private route: ActivatedRoute,
    private containerService: ContainerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.containerid = params.id;
      this.ReadLogs();
      // this.source.subscribe((val) => {

      // });
    });
  }

  private ReadLogs() {
    this.containerService.GetLogs(this.containerid).subscribe((result) => {
      if (result.success) {
        this.Logs = result.data;
        this.cdr.detectChanges();
      }
    });
  }
  trackByFn(index, line) {
    console.log(index);
    console.log(line);
    return index;
  }
}
