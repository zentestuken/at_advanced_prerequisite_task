Cypress.Commands.add('apiRequest', (options) => {
  const apiBaseUrl = Cypress.config().apiBaseUrl
  const defaultHeaders = {
    Authorization: `Bearer ${Cypress.config('apiToken')}`,
  }

  const requestOptions = {
    ...options,
    url: options.url.startsWith('http')
      ? options.url
      : `${apiBaseUrl}${options.url}`,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }
  return cy.request(requestOptions)
})

Cypress.Commands.add('getAllFilters', () => {
  return cy.apiRequest({
    url: 'filter',
  }).then(res => res.body.content)
})

Cypress.Commands.add('createFilter', (conditions, name, description = '', sortingColumn = 'startTime', isAscending = false) => {
  cy.apiRequest({
    method: 'POST',
    url: 'filter',
    body: {
      conditions,
      description,
      name,
      orders: [
        {
          isAsc: isAscending,
          sortingColumn
        }
      ],
      type: 'launch'
    }
  }).as('response')
  return cy.get('@response').then(res => res.body)
})

Cypress.Commands.add('updateFilter', (id, conditions, name, description = '', sortingColumn = 'startTime', isAscending = false, { ignoreErrors = false } = {}) => {
  cy.apiRequest({
    method: 'PUT',
    url: 'filter',
    body: {
      elements: [{
        conditions,
        description,
        name,
        id,
        orders: [
          {
            isAsc: isAscending,
            sortingColumn
          }
        ],
        type: 'launch'
      }]
    },
    failOnStatusCode: !ignoreErrors
  }).as('response')
  return cy.get('@response').then(res => res.body)
})

Cypress.Commands.add('updateFilterById', (id, conditions, name, description = '', sortingColumn = 'startTime', isAscending = false) => {
  cy.apiRequest({
    method: 'PUT',
    url: `filter/${id}`,
    body: {
      conditions,
      description,
      name,
      id,
      orders: [
        {
          isAsc: isAscending,
          sortingColumn
        }
      ],
      type: 'launch'
    }
  }).as('response')
  return cy.get('@response').then(res => res.body)
})

Cypress.Commands.add('deleteFilter', id => {
  cy.apiRequest({
    method: 'DELETE',
    url: `filter/${id}`,
  }).as('response')
  return cy.get('@response').then(res => res.body)
})
