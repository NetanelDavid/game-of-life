import { BaseParameter } from "./baseParameter.interface";

export interface Shape extends BaseParameter {
    checkIsDisabledBySizeAndCoordinates: (size:number,y: number, x: number) => boolean;
}