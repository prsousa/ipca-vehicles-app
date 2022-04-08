import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { VehiclesModule } from 'src/vehicles/vehicles.module';

@Module({
  controllers: [PositionsController],
  providers: [PositionsService],
  imports: [VehiclesModule],
})
export class PositionsModule {}
