class FilterFacet {
  constructor (name) {
    this.rootEl = () => cy.contains('div[class^="fieldFilterEntity"]', name)
  }

  select () { return this.rootEl().find('div[class*="__conditions-selector"]') }
  option (optionName) { return this.rootEl().find('div[class*="__condition-"]').contains(optionName) }
  selectedOption () { return this.rootEl().find('div[class^="inputConditional"][class*="__active"]') }
  input () { return this.rootEl().find('div[class*="input-"] input') }
  keyInput () { return this.rootEl().find('input[placeholder="Key"]') }
  valueInput () { return this.rootEl().find('input[placeholder="Value"]') }
  autoCompleteOption (optionName) { return this.rootEl().find('li[class^="autocompleteOption"]').contains(optionName) }
  keyAdded () { return this.rootEl().find('div[class^="attribute__key"]') }
  valueAdded () { return this.rootEl().find('div[class^="attribute__value"]') }
  keyValueConfirmBtn () { return this.rootEl().find('div[class*="attributeEditor__check-icon"]') }
  simpleInputAdded () { return this.rootEl().find('div[class*="__selected-item-"]') }
}

export default FilterFacet
