import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Terminal } from 'xterm';
import { NgTerminal } from 'ng-terminal';
import { ExecSocketService } from '../services/ExecSocketService';
import { Subject } from 'rxjs';
import {
  ContainerExecResponse,
  ContainerExecRequest,
} from '../models/ContainerExecResponse';
import { map } from 'rxjs/operators';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css'],
})
export class TerminalComponent implements OnInit {
  myWebSocket: WebSocketSubject<any> = webSocket('wss://localhost:5001/wsExec');
  containerid: string;
  @ViewChild('term', { static: true }) child: NgTerminal;
  terminal: Terminal;
  public messages: Subject<ContainerExecResponse>;

  constructor(
    private route: ActivatedRoute,
    private socketService: ExecSocketService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.containerid = params.id;
    });

    var curr_line = '';

    this.child.keyEventInput.subscribe((e) => {
      const ev = e.domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.keyCode === 13) {
        const request = new ContainerExecRequest();
        request.ContainerID = this.containerid;
        request.Command = e.key;
        this.socketService.messages.next(request);
      } else if (ev.keyCode === 8) {
        // Do not delete the prompt
        if (this.child.underlying.buffer.active.cursorX > 2) {
          this.child.write('\b \b');
        }
      } else if (printable) {
        const request = new ContainerExecRequest();
        request.ContainerID = this.containerid;
        request.Command = e.key;
        this.socketService.messages.next(request);

        this.child.write(e.key);
      }
    });
  }

  Connect() {
    this.socketService.messages.subscribe((msg) => {
      console.log(msg);
    });

    const request = new ContainerExecRequest();
    request.ContainerID = this.containerid;
    request.Command = '/bin/bash';
    this.socketService.messages.next(request);
  }
}
