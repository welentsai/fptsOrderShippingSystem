import { OrderId, EmailAddress, Address, BillingAmount } from './type'
import { PricedOrder } from './command'

// Event
export type OrderAcknowledgmentSent = {
  OrderId: OrderId
  EmailAddress: EmailAddress
}

// Event
type OrderPlaced = PricedOrder

// Event
type BillableOrderPlaced = {
  OrderId: OrderId
  BillingAddress: Address
  AmountToBill: BillingAmount
}
