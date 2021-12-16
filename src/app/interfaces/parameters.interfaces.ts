import { Policy } from "./policy.interface";
import { Seed } from "./seed.interface";
import { Shape } from "./shape.interface";
import { Size } from "./size.interface";
import { Speed } from "./speed.interface";
import { Walls } from "./walls.interface";

export interface BuildTimeParameters {
    size: Size;
    shape: Shape;
    seed: Seed;
}

export interface GameTimeParameters {
    speed: Speed;
    walls: Walls;
    policy: Policy;
}