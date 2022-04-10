import { IsPositive, Length, Matches, Max } from 'class-validator';

export class CreateVehicleDto {
  @Length(1, 20)
  brand: string;

  @Matches(/^[A-Z0-9]{2}-[A-Z0-9]{2}-[A-Z0-9]{2}$/i)
  plate: string;

  @IsPositive()
  @Max(1000)
  maxAutonomyKilometres: number;

  @Length(1, 20)
  color: string;
}
