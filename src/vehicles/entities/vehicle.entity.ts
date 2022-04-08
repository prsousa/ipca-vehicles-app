import { Position } from 'src/positions/entities/position.entity';

export class Vehicle {
  id: number;
  brand: string;
  model: string;
  plate: string;
  maxAutonomyKilometres: number;
  color: string;
  lastPosition?: Position;
}
