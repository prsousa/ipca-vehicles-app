import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
