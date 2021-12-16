import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Control } from 'src/app/interfaces/control.interface';
import { BuildTimeParameters } from 'src/app/interfaces/parameters.interfaces';
import { Seed } from 'src/app/interfaces/seed.interface';
import { Shape } from 'src/app/interfaces/shape.interface';
import { Size } from 'src/app/interfaces/size.interface';

@Component({
  selector: 'app-build-time-parameters',
  templateUrl: './build-time-parameters.component.html',
  styleUrls: ['./build-time-parameters.component.scss']
})
export class BuildTimeParametersComponent implements OnInit {

  @Output() buildTimeParametersEvent: EventEmitter<BuildTimeParameters> = new EventEmitter<BuildTimeParameters>();

  sizeControl: Control<Size> = {
    control: new FormControl(),
    options: [
      {
        name: "6 x 6",
        sizeTable: 6,
      },{
        name: "8 x 8",
        sizeTable: 8,
      }, {
        name: "10 x 10",
        sizeTable: 10,
      }, {
        name: "15 x 15",
        sizeTable: 15,
      }, {
        name: "20 x 20",
        sizeTable: 20,
      }, {
        name: "30 x 30",
        sizeTable: 30,
      }, {
        name: "50 x 50",
        sizeTable: 50,
      }, {
        name: "75 x 75",
        sizeTable: 75,
      }, {
        name: "100 x 100",
        sizeTable: 100,
      }
    ],
    indexDefault: 2
  }

  shapeControl: Control<Shape> = {
    control: new FormControl(),
    options: [
      {
        name: "rectengular",
        checkIsDisabledBySizeAndCoordinates: (size: number, y: number, x: number) => {
          return false
        }
      }, {
        name: "cross",
        checkIsDisabledBySizeAndCoordinates: (size: number, y: number, x: number) => {
          const min = Math.round(size / 3);
          const max = Math.round(size / 3 * 2);
          return (y < min || y >= max) && (x < min || x >= max);
        }
      }, {
        name: "diamond",
        checkIsDisabledBySizeAndCoordinates: (size: number, y: number, x: number) => {
          size--;
          const smallMedium = Math.floor((size) / 2);
          const largeMedium = Math.ceil((size) / 2);
          if (y > largeMedium) {
            y = size - y;
          }
          const min = smallMedium - y;
          const max = largeMedium + y;
          return x < min || x > max;
        }
      }, {
        name: "circular",
        checkIsDisabledBySizeAndCoordinates: (size: number, y: number, x: number) => {
          const center = size / 2 - 0.5;
          const radius = size / 2;
          return Math.pow(x - center, 2) + Math.pow(y - center, 2) > Math.pow(radius, 2);
        }
      }, {
        name: "ring",
        checkIsDisabledBySizeAndCoordinates: (size: number, y: number, x: number) => {
          const center = size / 2 - 0.5;
          const largeRadius = size / 2;
          const smallRadius = largeRadius / 5 * 3;
          const distancesquared = Math.pow(x - center, 2) + Math.pow(y - center, 2);
          return distancesquared > Math.pow(largeRadius, 2) || distancesquared < Math.pow(smallRadius, 2);
        }
      }
    ],
    indexDefault: 0
  }

  seedControl: Control<Seed> = {
    control: new FormControl,
    options: [
      {
        name: "low",
        seed: 0.1
      }, {
        name: "medium",
        seed: 0.3
      }, {
        name: "large",
        seed: 0.5
      }
    ],
    indexDefault: 1
  }

  form = new FormGroup({
    size: this.sizeControl.control,
    shape: this.shapeControl.control,
    seed: this.seedControl.control
  })

  constructor() {
    this.sizeControl.control.setValue(this.sizeControl.options[this.sizeControl.indexDefault]);
    this.shapeControl.control.setValue(this.shapeControl.options[this.shapeControl.indexDefault]);
    this.seedControl.control.setValue(this.seedControl.options[this.seedControl.indexDefault]);
  }

  ngOnInit(): void {
    this.sendForm();
  }

  sendForm() {
    this.buildTimeParametersEvent.emit(this.form.value);
  }
}
