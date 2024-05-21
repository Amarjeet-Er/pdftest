import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, OnDestroy {
  myScriptElement: any;
  constructor() {
  }

  ngOnInit() {
    this.scriptfun()
  }

  ngOnDestroy(): void {
    this.scriptfun()
  }
  scriptfun() {
    this.myScriptElement = document.createElement("script") as HTMLScriptElement;
    this.myScriptElement.src = "../../assets/entryform.js";
    document.body.appendChild(this.myScriptElement);
  }

}
