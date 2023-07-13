import {
  PricedOrder,
  UnvalidatedOrder,
  ValidatedOrder,
} from '../domain/command'
import * as E from 'fp-ts/Either'
import { AddressValidationError, ValidationError } from '../domain/error'
import {
  CheckedAddress,
  HtmlString,
  OrderAcknowledgment,
  ProductCode,
  SendResult,
  UnvalidatedAddress,
  OrderId,
  EmailAddress,
} from '../domain/type'
import { OrderAcknowledgmentSent } from '../domain/event'

/**
 substep "ValidateOrder" =
 input: UnvalidatedOrder
 output: ValidatedOrder OR ValidationError
 dependencies: CheckProductCodeExists, CheckAddressExists
 */

type CheckProductCodeExists = (productCode: ProductCode) => boolean
type CheckAddressExists = (
  unvalidatedAddress: UnvalidatedAddress,
) => E.Either<AddressValidationError, CheckedAddress>

type validateOrder = (
  checkProductCodeExists: CheckProductCodeExists,
) => (
  checkAddressExists: CheckAddressExists,
) => (input: UnvalidatedOrder) => E.Either<ValidationError, ValidatedOrder>

/*
substep "PriceOrder" =
    input: ValidatedOrder
    output: PricedOrder
    dependencies: GetProductPrice
 */

type GetProductPrice = (productCode: ProductCode) => number

type priceOrder = (
  getProductPrice: GetProductPrice,
) => (input: ValidatedOrder) => PricedOrder

type CreateOrderAcknowledgmentLetter = (pricedOrder: PricedOrder) => HtmlString

type SendOrderAcknowledgment = (
  orderAcknowledgment: OrderAcknowledgment,
) => SendResult

// Workflow
type acknowledgeOrder = (
  createOrderAcknowledgmentLetter: CreateOrderAcknowledgmentLetter,
) => (
  sendOrderAcknowledgment: SendOrderAcknowledgment,
) => (input: PricedOrder) => OrderAcknowledgmentSent
