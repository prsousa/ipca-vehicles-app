import { IsNumber, Min, IsOptional, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationParamsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(50)
  perPage: number = 15;
}
