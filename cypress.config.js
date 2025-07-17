import { defineConfig } from 'cypress'
import 'dotenv/config'

const envUrl = 'https://reportportal.epam.com'

export default defineConfig({
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents (on, config) {
      config.env = {
        ...process.env,
        ...config.env,
        loginUrl: envUrl
      }
      config.baseUrl = `${envUrl}/ui/${config.env.RP_PROJECTNAME}/`
      config.apiBaseUrl = `${envUrl}/api/v1/${config.env.RP_PROJECTNAME}/`
      config.username = config.env.RP_USERNAME
      config.password = config.env.RP_PASSWORD
      config.apiToken = config.env.RP_APITOKEN
      return config
    }
  },
  reporter: 'mochawesome',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Test Run Report',
    reportDir: 'reports/data',
    overwrite: false,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    html: false,
    json: true
  },
  defaultCommandTimeout: 10000,
})
