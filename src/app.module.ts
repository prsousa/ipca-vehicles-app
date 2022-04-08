import { Module } from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';
import { PositionsModule } from './positions/positions.module';

@Module({
  imports: [VehiclesModule, PositionsModule],
})
export class AppModule {}
