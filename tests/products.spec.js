// @ts-nocheck
const { test, expect } = require('@playwright/test');
const { login, infoNameCheckout } = require('./helper');
const LoginPage = require('../pages/login.page');
const ProductPage = require('../pages/product.page');

let loginPage = LoginPage
let productPage = ProductPage

test.describe('Products Tests', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page)
    await loginPage.navigate()
  });

  test(' Ordenação de produtos por preço menor para o maior', async ({ page }) => {
    await loginPage.login(login.standard, login.pass)
    await page.getByRole('heading', { name: 'Swag Lab' }).isVisible();
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  })

  test('Adicionando um produto no carrinho', async ({ page }) => {
    await loginPage.login(login.standard, login.pass)
    await productPage.addProduct()
  })

  test('Remmovendo um produto do carrinho', async ({ page }) => {
    await loginPage.login(login.standard, login.pass)
    await productPage.removeProduct()
  })

  test('Realizando a compra de um produto com checkout', async ({ page }) => {
    await loginPage.login(login.standard, login.pass)
    await productPage.addProduct()
    await productPage.checkoutCart(infoNameCheckout.firstName, infoNameCheckout.lastName, infoNameCheckout.zipCode)
  })

  test('Não deve realizar o checkout da compra do produto sem o nome', async ({ page }) => {
    await loginPage.login(login.standard, login.pass)
    await productPage.addProduct()
    await productPage.checkoutCartNoName(infoNameCheckout.errorFirstName ,infoNameCheckout.lastName, infoNameCheckout.zipCode)
  })

  test('Não deve realizar o checkout da compra do produto sem o sobrenome ', async ({ page }) => {
    await loginPage.login(login.standard, login.pass)
    await productPage.addProduct()
    await productPage.checkoutCartNoLastName(infoNameCheckout.firstName, infoNameCheckout.errorLastName, infoNameCheckout.zipCode)
  })

  test('Não deve realizar o checkout da compra do produto sem o cep ', async ({ page }) => {
    await loginPage.login(login.standard, login.pass)
    await productPage.addProduct()
    await productPage.checkoutCartNoZipCode(infoNameCheckout.firstName, infoNameCheckout.lastName, infoNameCheckout.errorZipCode)
  })
})