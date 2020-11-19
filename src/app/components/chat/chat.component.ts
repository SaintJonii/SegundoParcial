import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  msj: string;

  @Output() sendMsg = new EventEmitter<String>();
  @Input() nombreUser: String;
  @Input() listMsg: [];

  constructor() { }

  ngOnInit(): void {
  }

  send() {

    this.sendMsg.emit(this.msj);
  }

}
