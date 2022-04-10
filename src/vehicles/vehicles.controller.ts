import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PaginationParamsDto } from 'src/utils/pagination/pagination-params.dto';
import { DistanceFilterParamsDto } from './dto/distance-filter-params.dto';
import { ParseObjectIdPipe } from 'src/utils/parse-object-id.pipe';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  findAll(
    @Query() { page, perPage }: PaginationParamsDto,
    @Query() { latitude, longitude, maxDistance }: DistanceFilterParamsDto,
  ) {
    return this.vehiclesService.findAll(
      page,
      perPage,
      latitude,
      longitude,
      maxDistance,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    const vehicle = await this.vehiclesService.findOne(id);
    if (!vehicle) throw new NotFoundException();

    return vehicle;
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.vehiclesService.remove(+id);
  }
}
