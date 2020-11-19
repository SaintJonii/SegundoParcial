import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  userLogued;
  listMsg = [];

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    this.userLogued = user.user;

    const doc1 = this.afs.collection('chat',
      ref => ref.orderBy('date', 'asc')
    );

    console.log(doc1);

    doc1.valueChanges()
      .subscribe(data => {
        console.log(data);
        this.listMsg = data;
      });

  }

  sendMsg(e: string) {

    this.afs.collection('chat').add({
      user: this.userLogued,
      msg: e,
      date: new Date()
    })
    console.log(e);
  }

}
