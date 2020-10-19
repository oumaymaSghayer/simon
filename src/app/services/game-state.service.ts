import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {START_COUNT , COLORS} from './../models/constants'
@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  simon: string[]=[];
  player: string[]=[];
  count :number;
  state= new Subject<any>();
  constructor() { 
    this.count=START_COUNT
  }
  private get randomColor():string {
    return COLORS[Math.floor(Math.random()*4)]
  }

  appendSimon(inc : boolean = false) : void{
    if(inc) {this.count++;}
    this.simon.push(this.randomColor);
  }
  generateSimon(): string[]{
    this.simon=[];
    for(let i =0 ; i<this.count; i++){
      this.appendSimon();
    }
    this.setState();
    return this.simon;
  }

  restartSimon() : string[]{
    this.count=START_COUNT;
    return this.generateSimon();
  }

playerGuess(val:string){
  this.player.push(val);
    if (!this.compareSimon()){
      this.player =[];
      return false;
      }

      this.setState();
      return true;
}

compareSimon():boolean{
  for(let i =0; i<this.player.length;i++){
    if(this.player[i]!==this.simon[i]) return false;
  }

  if(this.player.length === this.simon.length ){
    this.updateGame();
  }
  return true;
}
updateGame(){
  this.appendSimon(true);
  this.player =[];
}
setState(){
  this.state.next({
    player : this.player,
    simon :this.simon,
    count : this.count
  })
}
}
