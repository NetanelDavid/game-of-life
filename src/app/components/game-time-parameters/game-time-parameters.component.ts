import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Status } from 'src/app/enums/status.enum';
import { Control } from 'src/app/interfaces/control.interface';
import { GameTimeParameters } from 'src/app/interfaces/parameters.interfaces';
import { Policy } from 'src/app/interfaces/policy.interface';
import { Speed } from 'src/app/interfaces/speed.interface';
import { Walls } from 'src/app/interfaces/walls.interface';

@Component({
  selector: 'app-game-time-parameters',
  templateUrl: './game-time-parameters.component.html',
  styleUrls: ['./game-time-parameters.component.scss']
})
export class GameTimeParametersComponent implements OnInit, OnChanges {

  @Input() active: boolean;
  @Output() gameTimeParametersEvent: EventEmitter<GameTimeParameters> = new EventEmitter<GameTimeParameters>();
  @Output() startOrStopEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  speedControl: Control<Speed> = {
    control: new FormControl(),
    options: [
      {
        name: "very slow",
        ms: 2000
      }, {
        name: "slow",
        ms: 1000
      }, {
        name: "normal",
        ms: 500
      }, {
        name: "fast",
        ms: 200
      }, {
        name: "very fast",
        ms: 0
      }
    ],
    indexDefault: 2
  }

  wallsControl: Control<Walls> = {
    control: new FormControl(),
    options: [
      {
        name: 'not active',
        wallsStatus: Status.disabled
      }, {
        name: 'active',
        wallsStatus: Status.live
      }
    ],
    indexDefault: 0
  }

  policyControl: Control<Policy> = {
    control: new FormControl(),
    options: [
      {
        name: "conway",
        checkByNeighbors: (oldStatus: Status, livingNeighbors: number) => {
          switch (livingNeighbors) {
            case 2:
              return oldStatus;
            case 3:
              return Status.live;
            default:
              return Status.dead
          }
        }
      }, {
        name: 'hyper active',
        checkByNeighbors: (oldStatus: Status, livingNeighbors: number) => {
          if (livingNeighbors <= 1 && livingNeighbors >= 6) {
            return Status.dead;
          }
          return livingNeighbors == 3 ? Status.live : oldStatus;
        }
      }, {
        name: "spontaneous",
        checkByNeighbors: (oldStatus: Status, livingNeighbors: number) => {
          if (livingNeighbors == 3) {
            return Status.live;
          }
          if (oldStatus == Status.live) {
            return livingNeighbors == 2 ? Status.live : Status.dead;
          }
          return Math.random() <= 0.005 ? Status.live : Status.dead;
        }
      }

    ],
    indexDefault: 0
  }

  form = new FormGroup({
    speed: this.speedControl.control,
    walls: this.wallsControl.control,
    policy: this.policyControl.control
  })

  constructor() {
    const defaultOfUser = JSON.parse(localStorage.getItem('game-time-parameters'))
    if (defaultOfUser) {
      this.speedControl.control.setValue(this.speedControl.options.find((s) => s.name == defaultOfUser.speed));
      this.wallsControl.control.setValue(this.wallsControl.options.find((w) => w.name == defaultOfUser.walls));
      this.policyControl.control.setValue(this.policyControl.options.find(p => p.name == defaultOfUser.policy));
      return
    }
    this.speedControl.control.setValue(this.speedControl.options[this.speedControl.indexDefault]);
    this.wallsControl.control.setValue(this.wallsControl.options[this.wallsControl.indexDefault]);
    this.policyControl.control.setValue(this.policyControl.options[this.policyControl.indexDefault]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.active) {
      this.active = changes.active.currentValue;
    }
  }

  ngOnInit(): void {
    this.sendForm();
  }

  sendForm() {
    localStorage.setItem('game-time-parameters',
    JSON.stringify({
      speed: this.speedControl.control.value.name,
      walls: this.wallsControl.control.value.name,
      policy: this.policyControl.control.value.name
    })
  )
    this.gameTimeParametersEvent.emit(this.form.value);
  }

  startOrStop() {
    this.startOrStopEvent.emit(!this.active);
  }

}
