//---
// command(state, payload) => [events];
// define commands which will produce the events under certain invariants.
// These command handlers should hold business invariants.
// As you can see, these functions are pure and therefore can easily be tested.
// ---

import { randomUUID } from 'crypto'
import {
  createEvent,
  Events,
  OrderCancelled,
  OrderFullfilled,
  OrderPlaced,
  PaymentCancelled,
  PaymentPaid,
  PaymentRequested,
} from './event'

/**
 * Helper factory function to create command handlers in more typesafe way
 * The TState is the data we need for our invariant to hold to create the event(s)
 */
function createCommandFn<TState, TInput>(
  handler: (state: TState, input: TInput) => Array<Events>,
) {
  return handler
}

// we introduce some state
export enum OrderStatus {
  waiting,
  cancelled,
  fullfilled,
}

type Order = {
  status: OrderStatus
  version: number
  id: string
}

export const place_order = createCommandFn(
  (state: { id: string }, input: OrderPlaced['data']) => {
    // do some invariant checking here if necessary
    return [
      createEvent({
        event_name: 'OrderPlaced',
        data: input,
        resource_id: state.id,
        version: 1,
      }),
    ]
  },
)

const cancel_order = createCommandFn(
  (state: Order, input: OrderCancelled['data']) => {
    // cancel the order only if waiting
    if (state.status === OrderStatus.waiting) {
      return [
        createEvent({
          resource_id: state.id,
          version: state.version,
          event_name: 'OrderCancelled',
          data: input,
        }),
      ]
    }

    // we also can throw here, however when we just ignore this command and wont create new events
    return []
  },
)

const fulfill_order = createCommandFn(
  (state: Order, input: OrderFullfilled['data']) => {
    // cancel the order only if waiting
    if (state.status === OrderStatus.waiting) {
      return [
        createEvent({
          resource_id: state.id,
          version: state.version,
          event_name: 'OrderFullfilled',
          data: input,
        }),
      ]
    }

    throw new Error('order is already fullfilled or cancelled')
  },
)

type Payment = {
  id: string
  version: number
  status: PaymentStatus
}

export enum PaymentStatus {
  paid,
  pending,
  cancelled,
}

const request_payment = createCommandFn(
  (state: { id: string }, input: PaymentRequested['data']) => {
    return [
      createEvent({
        resource_id: state.id,
        version: 1,
        event_name: 'PaymentRequested',
        data: input,
      }),
    ]
  },
)

const pay_payment = createCommandFn(
  (state: Payment, input: PaymentPaid['data']) => {
    if (state.status !== PaymentStatus.pending) {
      throw new Error('payment is already processed')
    }

    return [
      createEvent({
        resource_id: state.id,
        version: state.version,
        event_name: 'PaymentPaid',
        data: input,
      }),
    ]
  },
)

const cancel_payment = createCommandFn(
  (state: Payment, input: PaymentCancelled['data']) => {
    if (state.status !== PaymentStatus.pending) {
      throw new Error('payment is already processed')
    }

    return [
      createEvent({
        resource_id: state.id,
        version: state.version,
        event_name: 'PaymentCancelled',
        data: input,
      }),
    ]
  },
)

// Compose commands to workflow

export const createOrderAndPayment = createCommandFn(
  (_, input: OrderPlaced['data'] & PaymentRequested['data']) => {
    const order_id = randomUUID()
    const createdOrder = place_order(
      { id: order_id },
      { address: input.address, email: input.email },
    )

    const requestedPayment = request_payment(
      { id: randomUUID() },
      { amount: input.amount, order_id: order_id },
    )

    return [...createdOrder, ...requestedPayment]
  },
)
