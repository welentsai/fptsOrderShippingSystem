export type ProductCode = WidgetCode | GizmoCode
type OrderQuantity = UnitQuantity | KilogramQuantity

type WidgetCode = String // string starting with "W" then 4 digits
type GizmoCode = String
type UnitQuantity = Number
type KilogramQuantity = Number

export type OrderId = string
export type CustomerInfo = string
export type Address = string
export type BillingAmount = number

export type ValidatedOrderLine = {}
export type PricedOrderLine = {}

export type UnvalidatedAddress = string
export type CheckedAddress = string

export type EmailAddress = string
export type HtmlString = string
export type OrderAcknowledgment = {
  EmailAddress: EmailAddress
  Letter: HtmlString
}

export type SendResult = 'Sent' | 'NotSent'
