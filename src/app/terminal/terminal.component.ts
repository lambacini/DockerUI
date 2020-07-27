import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Terminal } from 'xterm';
import { NgTerminal } from 'ng-terminal';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css'],
})
export class TerminalComponent implements OnInit {
  @ViewChild('term', { static: true }) child: NgTerminal;
  terminal: Terminal;
  constructor() {}

  ngOnInit(): void {}

  Connect() {
    this.child.write("root@bcdfa172ae07:~#");
    this.child.keyEventInput.subscribe((e) => {
      console.log('keyboard event:' + e.domEvent.keyCode + ', ' + e.key);

      const ev = e.domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.keyCode === 13) {
        this.child.write('\r\n$ ');
      } else if (ev.keyCode === 8) {
        // Do not delete the prompt
        if (this.child.underlying.buffer.active.cursorX > 2) {
          this.child.write('\b \b');
        }
      } else if (printable) {
        this.child.write(e.key);
      }
    });
  }
}
