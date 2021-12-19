import { BaseParameter } from "./baseParameter.interface";

export interface Shape extends BaseParameter {
    border: boolean;
    checkIsDisabledBySizeAndCoordinates: (size:number,y: number, x: number) => boolean;
}