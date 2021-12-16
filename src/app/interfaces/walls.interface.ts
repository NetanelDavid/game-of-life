import { Status } from "../enums/status.enum";
import { BaseParameter } from "./baseParameter.interface";

export interface Walls extends BaseParameter{
    wallsStatus: Status;
}