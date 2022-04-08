import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { PaginationParamsDto } from 'src/utils/pagination/pagination-params.dto';

@Controller('vehicles/:vehicle/positions')
export class PositionsController {
  constructor(
    private readonly positionsService: PositionsService,
    private readonly vehiclesService: VehiclesService,
  ) {}

  @Post()
  create(
    @Param('vehicle', ParseIntPipe) vehicleId,
    @Body() createPositionDto: CreatePositionDto,
  ) {
    const vehicle: Vehicle = this.vehiclesService.findOne(vehicleId);
    if (!vehicle) throw new NotFoundException();

    return this.positionsService.create(vehicle, createPositionDto);
  }

  @Get()
  findAll(
    @Param('vehicle', ParseIntPipe) vehicleId,
    @Query() { page, perPage }: PaginationParamsDto,
  ) {
    const vehicle: Vehicle = this.vehiclesService.findOne(vehicleId);
    if (!vehicle) throw new NotFoundException();

    return this.positionsService.findAll(vehicle, page, perPage);
  }
}
