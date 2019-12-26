import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {

  @Input('message')
  private message: string;

  constructor() { }

  ngOnInit() {
  }

}
