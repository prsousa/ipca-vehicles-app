import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Position } from 'src/positions/schemas/position.schema';

@Schema({ timestamps: true })
export class Vehicle extends Document {
  @Prop()
  brand: string;

  @Prop()
  plate: string;

  @Prop()
  maxAutonomyKilometres: number;

  @Prop()
  color: string;

  @Prop()
  lastPosition?: Position;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
VehicleSchema.index({ 'lastPosition.location': '2dsphere' });
