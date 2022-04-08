import { Injectable } from '@nestjs/common';
import { Position } from 'src/positions/entities/position.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  vehicles: { [index: number]: Vehicle } = {}; // simmulates a DB
  autoIncrement: number = 0; // simmulates a DB

  create(createVehicleDto: CreateVehicleDto): Vehicle {
    this.autoIncrement++;
    this.vehicles[this.autoIncrement] = {
      id: this.autoIncrement,
      ...createVehicleDto,
      lastPosition: null,
    };

    return this.vehicles[this.autoIncrement];
  }

  findAll() {
    return Object.values(this.vehicles);
  }

  findOne(id: number) {
    return this.vehicles[id];
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  setLastPosition(id: number, position: Position) {
    this.vehicles[id].lastPosition = position;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
