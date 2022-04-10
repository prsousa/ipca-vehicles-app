import { Module } from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';
import { PositionsModule } from './positions/positions.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    VehiclesModule,
    PositionsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/vehicles'),
  ],
})
export class AppModule {}
