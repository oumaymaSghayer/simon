import { Component, OnInit  } from '@angular/core';
import { sleep } from 'src/app/models/constants';
import {GameStateService} from './../../services/game-state.service';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  count : number;
  simon : string[];
  active:any={
    red :false,
    yellow:false,
    blue:false,
    green:false,
  };
  lost : boolean= false;
  constructor(private game : GameStateService) { }

  ngOnInit(): void {
    this.game.state.subscribe(state=>{
      this.simon=state.simon; 
      console.log(state);
      if(this.count !== state.count ){
        this.count=state.count;
        this.teasePlayer(this.simon);
      }
      
    });
    this.game.generateSimon();
    

  }
  async playerGuess(e:string){
    if(!this.game.playerGuess(e)) {
      this.lost=true;
      await sleep(500);
      this.restart();
      await sleep(500);
      this.lost=false;
      
    }

  }
  async teasePlayer(simon:string[]){
    await sleep(500);
      for(let i=0;i<this.simon.length ; i++){
          this.active[simon[i]]=true;
          await sleep(500);
          this.active[simon[i]]=false;
          await sleep(500);
      }
  }
  restart(){
    this.game.restartSimon();
    this.game.state.subscribe(state=>{
      this.simon=state.simon; 
     // console.log(state);
      if(this.count !== state.count ){
        this.count=state.count;
        this.teasePlayer(this.simon);
      }
      
    });
    this.game.generateSimon();
    
  }
}
