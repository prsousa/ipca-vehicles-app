import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Vehicle } from 'src/vehicles/schemas/vehicle.schema';

class Location {
  @Prop({ enum: ['Point'] })
  type: string;

  @Prop()
  coordinates: [number, number];
}

@Schema({ timestamps: true })
export class Position extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  vehicle: Vehicle;

  @Prop()
  location: Location;
}

export const PositionSchema = SchemaFactory.createForClass(Position);
PositionSchema.index({ vehicle: 1 });
