import { Injectable } from '@nestjs/common';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { Position } from './entities/position.entity';

@Injectable()
export class PositionsService {
  positions: { [index: number]: Position } = {}; // simmulates a DB
  autoIncrement: number = 0; // simmulates a DB

  constructor(private readonly vehiclesService: VehiclesService) {}

  create(vehicle: Vehicle, createPositionDto: CreatePositionDto) {
    const position: Position = {
      id: ++this.autoIncrement,
      vehicleId: vehicle.id,
      ...createPositionDto,
      createdAt: new Date(),
    };

    this.positions[position.id] = position;
    this.vehiclesService.setLastPosition(vehicle.id, position);

    return position;
  }

  findAll() {
    return `This action returns all positions`;
  }
}
