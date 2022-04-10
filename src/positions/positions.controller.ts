import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { PaginationParamsDto } from 'src/utils/pagination/pagination-params.dto';
import { Vehicle } from 'src/vehicles/schemas/vehicle.schema';
import { ParseObjectIdPipe } from 'src/utils/parse-object-id.pipe';

@Controller('vehicles/:vehicle/positions')
export class PositionsController {
  constructor(
    private readonly positionsService: PositionsService,
    private readonly vehiclesService: VehiclesService,
  ) {}

  @Post()
  async create(
    @Param('vehicle', ParseObjectIdPipe) vehicleId: string,
    @Body() createPositionDto: CreatePositionDto,
  ) {
    const vehicle: Vehicle = await this.vehiclesService.findOne(vehicleId);
    if (!vehicle) throw new NotFoundException();

    return this.positionsService.create(vehicle, createPositionDto);
  }

  @Get()
  async findAll(
    @Param('vehicle', ParseObjectIdPipe) vehicleId: string,
    @Query() { page, perPage }: PaginationParamsDto,
  ) {
    const vehicle: Vehicle = await this.vehiclesService.findOne(vehicleId);
    if (!vehicle) throw new NotFoundException();

    return this.positionsService.findAll(vehicle, page, perPage);
  }
}
