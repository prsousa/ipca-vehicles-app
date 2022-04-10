import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Position } from 'src/positions/entities/position.entity';
import { Vehicle } from './entities/vehicle.entity';
import { Vehicle as VehicleSchema } from './schemas/vehicle.schema';

@Injectable()
export class VehiclesService {
  vehicles: { [index: number]: Vehicle } = {}; // simmulates a DB
  autoIncrement: number = 0; // simmulates a DB

  constructor(
    @InjectModel(Vehicle.name)
    private vehicleModel: Model<VehicleSchema>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<VehicleSchema> {
    const createdVehicle = new this.vehicleModel(createVehicleDto);
    return createdVehicle.save();
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
