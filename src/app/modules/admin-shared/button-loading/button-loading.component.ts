import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-loading',
  templateUrl: './button-loading.component.html',
  styleUrls: ['./button-loading.component.scss']
})
export class ButtonLoadingComponent implements OnInit {
  @Input() btnData;
  @Output() onSubmit = new EventEmitter();
  submitClick: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  btnclick() {
    this.onSubmit.emit('submit');
  }

}
