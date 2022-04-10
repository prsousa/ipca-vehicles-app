import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './schemas/vehicle.schema';
import { Position } from 'src/positions/schemas/position.schema';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle.name)
    private vehicleModel: Model<Vehicle>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const createdVehicle = new this.vehicleModel(createVehicleDto);
    return createdVehicle.save();
  }

  async findAll(
    page: number,
    perPage: number,
    latitude?: number,
    longitude?: number,
    maxDistance?: number,
  ) {
    let findParams = {};
    if (!!latitude && !!longitude && !!maxDistance) {
      findParams = {
        'lastPosition.location': {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: maxDistance,
          },
        },
      };
    }

    const query = this.vehicleModel.find(findParams);

    const results = await query
      .clone()
      .skip((page - 1) * perPage)
      .limit(perPage);

    return {
      results,
      // TODO: lacks count
    };
  }

  async findOne(id: string): Promise<Vehicle> {
    return this.vehicleModel.findById(id);
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  setLastPosition(id: string, position: Position) {
    return this.vehicleModel.updateOne(
      { _id: id },
      { $set: { lastPosition: position } },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
