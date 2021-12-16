import { FormControl } from "@angular/forms";
import { BaseParameter } from "./baseParameter.interface";

export interface Control<T extends BaseParameter> {
  control: FormControl;
  options: T[];
  indexDefault: number;
}