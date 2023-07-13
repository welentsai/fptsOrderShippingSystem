import {
  Address,
  BillingAmount,
  CustomerInfo,
  OrderId,
  PricedOrderLine,
  ValidatedOrderLine,
} from './type'

export type UnvalidatedOrder = {
  UnvalidatedCustomerInfo: String
  UnvalidatedShippingAddress: String
  UnvalidatedBillingAddress: String
  UnvalidatedOrderLine: Array<String>
}

export type ValidatedOrder = {
  orderId: OrderId
  customerInfo: CustomerInfo
  shippingAddress: Address
  billingAddress: Address
  orderLines: Array<ValidatedOrderLine>
}

export type PricedOrder = {
  orderId: OrderId
  customerInfo: CustomerInfo
  shippingAddress: Address
  billingAddress: Address
  orderLines: Array<PricedOrderLine>
  amountToBill: BillingAmount
}

type Order = UnvalidatedOrder | ValidatedOrder | PricedOrder

type Command<TData> = {
  data: TData
  timeStamp: number
  userId: string
}

type PlaceOrder = Command<UnvalidatedOrder>
type ChangeOrder = Command<UnvalidatedOrder>
type CancelOrder = Command<UnvalidatedOrder>

// We just need to add a new “routing” or “dispatching” input stage at the edge of the bounded context
type OrderTakingCommand = PlaceOrder | ChangeOrder | CancelOrder
