import { assert, describe, expect, it } from 'vitest'
import { randomUUID } from 'crypto'
import { createEvent, Events, OrderPlaced } from '../../src/domain/event'
import { createOrderAndPayment, place_order } from '../../src/domain/command'

describe('commands test', () => {
  it('place order command test', () => {
    // Arrange
    const state = {
      id: '123',
    }
    const orderPlaceData = {
      email: 'email',
      address: 'address',
    }

    const orderPlacedEvent: Array<Events> = place_order(state, orderPlaceData)
    // Act

    // Assert
    console.log(orderPlacedEvent)
    expect(orderPlacedEvent[0].event_name).toBe('OrderPlaced')
    expect(orderPlacedEvent[0]).toStrictEqual({
      event_name: 'OrderPlaced',
      data: { email: 'email', address: 'address' },
      resource_id: '123',
      version: 2,
    })
  })

  it('createOrderAndPayment command test', () => {
    // Arrange
    const order = {
      email: 'email',
      address: 'address',
      order_id: randomUUID(),
      amount: 20,
    }
    const events: Array<Events> = createOrderAndPayment('', order)

    // Act
    // Assert
    console.log(events)
  })
})
