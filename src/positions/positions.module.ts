import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Position, PositionSchema } from './schemas/position.schema';

@Module({
  controllers: [PositionsController],
  providers: [PositionsService],
  imports: [
    VehiclesModule,
    MongooseModule.forFeature([
      { name: Position.name, schema: PositionSchema },
    ]),
  ],
})
export class PositionsModule {}
