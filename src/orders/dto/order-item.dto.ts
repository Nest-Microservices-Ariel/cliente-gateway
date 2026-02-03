import { IsNumber, IsPositive } from "class-validator";

export class OrderItemsDto {
  @IsNumber()
  @IsPositive()
  productId: number;
  @IsPositive()
  @IsNumber()
  price: number;
  @IsPositive()
  @IsNumber()
  quantity: number;

}