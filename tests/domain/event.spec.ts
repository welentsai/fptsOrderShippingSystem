import { assert, describe, expect, it } from 'vitest'
import { randomUUID } from 'crypto'
import { createEvent, OrderPlaced } from '../../src/domain/event'

describe('events tests', () => {
  it('order placed test', () => {
    // Arrange
    const orderPlacedEvent: OrderPlaced = createEvent({
      event_name: 'OrderPlaced',
      resource_id: randomUUID(),
      version: 1,
      data: {
        email: 'weletsai@gmail.com',
        address: '123 Main Street',
      },
    })
    // Act

    // Assert
    console.log(orderPlacedEvent)
  })
})
