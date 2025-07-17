import addContext from 'mochawesome/addContext'
import './commands/api'

const titleToFileName = (title) =>
  title.replace(/[:/]/g, '')

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    let parent = runnable.parent
    let filename = ''
    while (parent && parent.title) {
      filename = `${titleToFileName(
        parent.title
      )} -- ${filename}`
      parent = parent.parent
    }
    filename += `${titleToFileName(
      test.title
    )} (failed).png`
    addContext(
      { test },
      `../cypress/screenshots/${Cypress.spec.name}/${filename}`
    )
  }
})
