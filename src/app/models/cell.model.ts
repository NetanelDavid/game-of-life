import { Policy } from "src/app/interfaces/policy.interface";
import { Status } from "../enums/status.enum";
import { Walls } from "../interfaces/walls.interface";

export class Cell {

    public status: Status;

    private y: number;
    private x: number;
    private livingNeighbors: number;
    private neighborsCache: Cell[];

    constructor(y: number, x: number) {
        this.y = y;
        this.x = x;
    }

    public updateLivingNeighbors(table: Cell[][], walls: Walls): void {
        if (this.status == Status.disabled) {
            return;
        }
        const filter = (cell: Cell) => {
            return cell.status == Status.live || (walls.wallsStatus == Status.live && cell.status == Status.disabled);
        }
        this.livingNeighbors = this.getNeighbors(table).filter(filter).length;
    }

    public updateStatus(policy: Policy): boolean {
        if (this.status == Status.disabled) {
            return false;
        }
        const oldStatus = this.status;
        this.status = policy.checkByNeighbors(this.status, this.livingNeighbors);
        return this.status != oldStatus;
    }

    public changeStatusByUser(active: boolean) {
        switch (this.status) {
            case Status.disabled:
                this.status = active ? Status.disabled : Status.dead;
                break;
            case Status.dead:
                this.status = Status.live;
                break;
            case Status.live:
                this.status = active ? Status.dead : Status.disabled;
                break;
        }
    }

    private getNeighbors(table: Cell[][]): Cell[] {

        if (this.neighborsCache) {
            return this.neighborsCache;
        }

        this.neighborsCache = [];
        for (let y: number, offsetY = -1; offsetY <= 1; offsetY++) {

            y = this.y + offsetY;
            if (y < 0 || y >= table.length) {
                continue;
            }
            for (let x: number, offsetX = -1; offsetX <= 1; offsetX++) {

                x = this.x + offsetX;
                if ((!offsetX && !offsetY) || x < 0 || x >= table.length) {
                    continue;
                }
                this.neighborsCache.push(table[y][x]);
            }
        }
        return this.neighborsCache;
    }
}