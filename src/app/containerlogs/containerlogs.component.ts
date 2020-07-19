import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerService } from '../services/container.service';

@Component({
  selector: 'app-containerlogs',
  templateUrl: './containerlogs.component.html',
  styleUrls: ['./containerlogs.component.css'],
})
export class ContainerlogsComponent implements OnInit {
  Logs: string;
  constructor(
    private route: ActivatedRoute,
    private containerService: ContainerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params.id);
      this.containerService.GetLogs(params.id).subscribe((result) => {
        if (result.success) {
          this.Logs = this.unicodeEscape(result.data);
        }
      });
    });
  }

  unicodeEscape(str) {
    return str.replace(/[\u00A0-\uffff]/gu, function (c) {
      return '\\u' + ('000' + c.charCodeAt().toString(16)).slice(-4);
    });
  }
}
