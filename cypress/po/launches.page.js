import { sideBar } from './components/common.component.js'
import FilterFacet from './components/filterFacet.component.js'

const regularFacetNames = ['Launch name']
const simpleFacetNames = ['Owner']
const keyValueFacetNames = ['Attribute']

class LaunchesPage {
  constructor () {
    this.url = '/launches'
  }

  waitLoading () {
    cy.get('[class^="launchFiltersToolbar__all-latest-switcher-"]').should('be.visible')
    cy.url().should('contain', this.url)
  }

  open () {
    cy.visit(this.url)
  }

  openViaSideBar () {
    return sideBar.launchesBtn().click()
  }

  goToFiltersPage () {
    return sideBar.filtersBtn().click()
  }

  fillFacet (name, values) {
    const facet = new FilterFacet(name)
    if (regularFacetNames.includes(name)) {
      facet.select().click()
      facet.option(values[0]).click()
      facet.input().type(values[1])
    }
    if (simpleFacetNames.includes(name)) {
      facet.input().type(values[0])
      facet.autoCompleteOption(values[0]).click()
    }
    if (keyValueFacetNames.includes(name)) {
      facet.select().click()
      facet.option(values[0]).click()
      facet.keyInput().type(values[1])
      facet.autoCompleteOption(values[1]).click()
      facet.valueInput().type(values[2])
      facet.autoCompleteOption(values[2]).click()
      facet.keyValueConfirmBtn().click()
    }
  }

  checkFacet (name, values) {
    const facet = new FilterFacet(name)
    if (regularFacetNames.includes(name)) {
      facet.selectedOption().should('have.text', values[0])
      facet.input().should('have.value', values[1])
    }
    if (simpleFacetNames.includes(name)) {
      facet.simpleInputAdded().contains(values[0])
    }
    if (keyValueFacetNames.includes(name)) {
      facet.selectedOption().should('have.text', values[0])
      facet.keyAdded().contains(values[1])
      facet.valueAdded().contains(values[2])
    }
  }

  addFacet (name) {
    cy.contains('div[class^="entitiesSelector"]', 'More').click()
    cy.contains('div[class*="__entity-item-"]', name).click()
  }

  saveFilter (filterName, filterDescription) {
    cy.get('button[title="Save"]').click()
    cy.get('input[placeholder="Enter filter name"]').type(`{selectAll}${filterName}`)
    cy.get('pre[role="presentation"]').click()
    cy.get('pre[role="presentation"]').type(filterDescription)
    cy.get('div[class^=modalFooter] button').contains('Add').click()
  }

  editOpenedFilterData (updatedName, updatedDescription) {
    cy.get('button[title="Edit"]').click()
    cy.get('input[placeholder="Enter filter name"]').type(`{selectAll}${updatedName}`)
    cy.get('pre[role="presentation"]').click()
    cy.get('pre[role="presentation"]').type(`{ctrl+a}${updatedDescription}`)
    cy.get('div[class^=modalFooter] button').contains('Update').click()
  }

  cloneOpenedFilter (updatedName, updatedDescription) {
    cy.get('button[title="Clone"]').click()
    cy.get('button[title="Save"]').click()
    cy.get('input[placeholder="Enter filter name"]').type(`{selectAll}${updatedName}`)
    cy.get('pre[role="presentation"]').click()
    cy.get('pre[role="presentation"]').type(`{ctrl+a}${updatedDescription}`)
    cy.get('div[class^=modalFooter] button').contains('Add').click()
  }
}

const launchesPage = new LaunchesPage()

export default launchesPage
