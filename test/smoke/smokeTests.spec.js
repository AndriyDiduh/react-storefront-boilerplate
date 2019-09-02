/**
 * This is the default smoke test run by Moovweb Control Center when
 * your project is linked to a GitHub repository with the Auto-Deploy option checked.
 *
 * We rely on elements with `data-th` attributes to guide the selenium test script through the
 * shopping flow.
 *
 * The hostname of the app to be tested is specified in the required environment variable `RSF_URL`.
 */

const { createBrowser, createPage, clickElement } = require('react-storefront-puppeteer')

const startURL = process.env.RSF_URL
const headless = process.env.RSF_HEADLESS || 'true'
const ignoreHTTPSErrors = process.env.RSF_IGNORE_HTTPS_ERRORS === 'true'

if (!startURL) {
  console.error(
    'You must set the RSF_URL environment variable to the URL of the app you want to test.'
  )
  console.error('Example: export RSF_URL="https://myapp.moovweb.cloud"')
  process.exit(1)
}

describe('smoke tests', () => {
  jest.setTimeout(30000)

  let browser
  let page

  beforeAll(async () => {
    browser = await createBrowser({ headless, ignoreHTTPSErrors })
    page = await createPage(browser)
  })

  afterAll(async () => {
    await browser.close()
  })

  it('Navigate to landing page', async () => {
    await page.goto(startURL)
  })

  it('Navigate to category', async () => {
    await clickElement(page, '[data-th="nav"]')
  })

  it('Navigate to subcategory', async function() {
    await clickElement(page, '[data-page="Category"] [data-th="subcategory-link"]')
  })

  it('Navigate to product', async function() {
    await clickElement(page, '[data-page="Subcategory"] [data-th="product-link"]')
  })

  it('Add product to cart ', async function() {
    await clickElement(page, '[data-page="Product"] [data-th="add-to-cart"]')
  })

  it('Navigate to cart', async function() {
    await clickElement(page, '[data-th="cart-link"]')
  })

  it('Verify product in cart', async function() {
    await page.waitForSelector('[data-page="Cart"] [data-th=product-link]')
  })

  it('Navigate to checkout', async function() {
    await clickElement(page, '[data-th="checkout-link"]')
  })
})
