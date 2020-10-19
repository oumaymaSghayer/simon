import { Component, OnInit , Input, EventEmitter , Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() color : string;
  @Output() guess :EventEmitter<string> =new EventEmitter<string>();
  @Input() active:boolean =false;
  @Input() disable : boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  onClick(){
  //  console.log(`${this.color} clicked`);
    this.guess.emit(this.color);  }
}
