import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-dialog',
  templateUrl: './demo-dialog.component.html',
  styleUrls: ['./demo-dialog.component.scss']
})
export class DemoDialogComponent implements OnInit {
  result = 'This is the result';
  constructor() { }

  ngOnInit() {
  }

}
