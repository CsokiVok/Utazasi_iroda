import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateTravelDto{
  @IsNotEmpty()
  @IsString()
  utazasiCel:string;

  @MinLength(30)
  @IsString()
  leiras:string;

  @IsString()
  kep:string;

  @IsNumber()
  ar:number
}
