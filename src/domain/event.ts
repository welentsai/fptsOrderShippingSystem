export type Events =
  | OrderPlaced
  | OrderCancelled
  | OrderFullfilled
  | PaymentRequested
  | PaymentPaid
  | PaymentCancelled

/**
 * Helper function to ensure we specificy correct name & data for the event
 * also increases the version of the event
 */
export function createEvent<T extends Events>(event: T): T {
  return {
    ...event,
    version: event.version + 1,
  }
}

type TEvent<TName extends String, TData extends Record<string, any>> = {
  // to what resource does this event apply
  resource_id: string
  // version of this event, needed for optimistic persistency
  version: number
  event_name: TName
  data: TData
}

export type OrderPlaced = TEvent<
  'OrderPlaced',
  {
    email: string
    address: string
  }
>

type OrderCancelled = TEvent<
  'OrderCancelled',
  {
    reason: string
  }
>

type OrderFullfilled = TEvent<'OrderFullfilled', {}>

type PaymentRequested = TEvent<
  'PaymentRequested',
  {
    order_id: string
    amount: number
  }
>

type PaymentPaid = TEvent<'PaymentPaid', {}>
type PaymentCancelled = TEvent<'PaymentCancelled', {}>
