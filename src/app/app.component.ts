import { Component } from '@angular/core';
import { Status } from './enums/status.enum';
import { BuildTimeParameters, GameTimeParameters } from './interfaces/parameters.interfaces';
import { Cell } from './models/cell.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'game-of-life';
  sizeTablePx = 550;

  sizeCellPx: string;
  table: Cell[][];
  buildTimeParameters: BuildTimeParameters;
  gameTimeParameters: GameTimeParameters;
  active: boolean;
  interval: any;

  constructor(private messageServise: MessageService) { }

  applyBuildTimeParameters(parameters: BuildTimeParameters) {
    this.buildTimeParameters = parameters;
    this.stop();
    this.buildTable();
  }

  applyGameTimeParameters(parameters: GameTimeParameters) {
    if (!this.active || parameters.speed.name == this.gameTimeParameters.speed.name) {
      this.gameTimeParameters = parameters;
      return;
    }

    this.stop();
    this.gameTimeParameters = parameters;
    this.start();
  }

  buildTable() {
    const size = this.buildTimeParameters.size.sizeTable;

    this.sizeCellPx = this.sizeTablePx / size + 'px';
    this.table = [];
    for (let y = 0; y < size; y++) {

      this.table[y] = [];
      for (let cell: Cell, x = 0; x < size; x++) {

        cell = this.table[y][x] = new Cell(y, x);
        if (this.buildTimeParameters.shape.checkIsDisabledBySizeAndCoordinates(size, y, x)) {
          cell.status = Status.disabled;
          continue;
        }
        cell.status = Math.random() < this.buildTimeParameters.seed.seed ? Status.live : Status.dead;
      }
    }
  }

  start() {

    this.active = true;
    this.interval = setInterval(
      () => {
        for (let row of this.table) {
          for (let cell of row) {
            cell.updateLivingNeighbors(this.table, this.gameTimeParameters.walls);
          }
        }

        var changes: boolean;
        for (let row of this.table) {
          for (let cell of row) {
            changes = cell.updateStatus(this.gameTimeParameters.policy) || changes;
          }
        }
        if (!changes) {
          this.stableState();
        }
      }, this.gameTimeParameters.speed.ms)
  }

  stableState() {
    this.stop();
    this.messageServise.add({
      life : 1000,
      severity: 'info', summary: 'the game has reached a steady state',
      detail: 'the game has been restarted'
    });
    this.buildTable();
    this.start();
  }

  stop() {
    this.active = false;
    clearInterval(this.interval);
  }
}