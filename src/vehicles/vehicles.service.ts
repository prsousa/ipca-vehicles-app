import { Injectable } from '@nestjs/common';
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
    };

    return this.vehicles[this.autoIncrement];
  }

  findAll() {
    return Object.values(this.vehicles);
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
