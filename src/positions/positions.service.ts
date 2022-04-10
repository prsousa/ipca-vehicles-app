import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Vehicle } from 'src/vehicles/schemas/vehicle.schema';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { Position } from './schemas/position.schema';

@Injectable()
export class PositionsService {
  constructor(
    @InjectModel(Position.name)
    private positionModel: Model<Position>,
    private readonly vehiclesService: VehiclesService,
  ) {}

  async create(vehicle: Vehicle, createPositionDto: CreatePositionDto) {
    const position: Position = await this.positionModel.create({
      vehicle,
      location: {
        type: 'Point',
        coordinates: [createPositionDto.longitude, createPositionDto.latitude],
      },
    });

    await position.save();
    await this.vehiclesService.setLastPosition(vehicle.id, position);

    return position;
  }

  async findAll(vehicle: Vehicle, page: number, perPage: number) {
    const query = this.positionModel.find({ vehicle: vehicle._id });
    const results = await query
      .clone()
      .sort({ _id: 1 })
      .skip((page - 1) * perPage)
      .limit(perPage);
    const count = await query.clone().count();

    return {
      results,
      count,
    };
  }
}
