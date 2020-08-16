import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-infocard',
  templateUrl: './infocard.component.html',
  styleUrls: ['./infocard.component.css'],
})
export class InfocardComponent implements OnInit {
  @Input() public IconName = 'container';
  @Input() public Count = '0';
  @Input() public Info = 'Container';
  constructor() {}

  ngOnInit(): void {}
}
