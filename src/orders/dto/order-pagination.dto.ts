import { PaginationDto } from "../../common";
import { OrderStatus, OrderStatusList } from "../enum/orders.enum";
import { IsEnum, IsOptional } from "class-validator";

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `Possible status ${ OrderStatusList }`
  })
  status?: OrderStatus
}