type ProductCode = WidgetCode | GizmoCode
type OrderQuantity = UnitQuantity | KilogramQuantity

type WidgetCode = String // string starting with "W" then 4 digits
type GizmoCode = String
type UnitQuantity = Number
type KilogramQuantity = Number

// ---
// Order life cycle
// ---
type UnvalidatedOrder = {
  UnvalidatedCustomerInfo: String
  UnvalidatedShippingAddress: String
  UnvalidatedBillingAddress: String
  UnvalidatedOrderLine: Array<String>
}
