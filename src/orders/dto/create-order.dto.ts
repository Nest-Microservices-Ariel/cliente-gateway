import { IsPositive, IsNumber, IsEnum, IsOptional, IsBoolean } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/orders.enum";

export class CreateOrderDto {
  @IsPositive()
  @IsNumber()
  totalAmount: number;

  @IsPositive()
  @IsNumber()
  totalItem: number;

  @IsEnum(OrderStatusList, {
    message: `Possible status values are ${ OrderStatusList }`
  })
  status: OrderStatus = OrderStatus.PENDING;

  @IsOptional()
  @IsBoolean()
  paid?: boolean = false;
}
