import { Status } from "../enums/status.enum";
import { BaseParameter } from "./baseParameter.interface";

export interface Policy extends BaseParameter {
    checkByNeighbors(oldStatus: Status, livingNeighbors: number): Status;
}