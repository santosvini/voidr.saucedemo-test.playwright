const { expect } = require('@playwright/test');

class ProductPage {
  constructor(page) {
    this.page = page;
  }

  async addProduct() {
    await this.page.locator('[data-test="item-4-img-link"]').isVisible();
    await this.page.locator('[data-test="item-4-title-link"]');
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await this.page.locator('[data-test="shopping-cart-link"]').click();
    await this.page.locator('[data-test="item-4-title-link"]').isVisible();
  }

  async removeProduct() {
    await this.page.locator('[data-test="item-2-img-link"]').isVisible();
    await this.page.locator('[data-test="item-2-title-link"]');
    await this.page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await this.page.locator('[data-test="shopping-cart-link"]').click();
    await this.page.locator('[data-test="item-2-title-link"]').isVisible();
    await this.page.getByText('Remove').click();
    await this.page.locator('[data-test="cart-list"]').isVisible();
  }

  async checkoutCart(firstName, lastName, zipCode) {
    await this.page.getByText('Checkout').click();
    await this.page.getByPlaceholder('First Name').fill(firstName);
    await this.page.getByPlaceholder('Last Name').fill(lastName);
    await this.page.getByPlaceholder('Zip/Postal Code').fill(zipCode);
    await this.page.locator('#continue').click();
    await this.page.locator('[data-test="complete-header"]').getByText('Thank You for your order!').isVisible();
    await this.page.getByText('Finish').click();
  }

  async checkoutCartNoName(errorFirstName, lastName, zipCode) {
    await this.page.getByText('Checkout').click();
    await this.page.getByPlaceholder('First Name').fill('');
    await this.page.getByText(errorFirstName).isVisible();
    await this.page.getByPlaceholder('Last Name').fill(lastName);
    await this.page.getByPlaceholder('Zip/Postal Code').fill(zipCode);
    await this.page.locator('#continue').click();
  }

  async checkoutCartNoLastName(firstName, errorLastName, zipCode) {
    await this.page.getByText('Checkout').click();
    await this.page.getByPlaceholder('First Name').fill(firstName);
    await this.page.getByPlaceholder('Last Name').fill('');
    await this.page.getByText(errorLastName).isVisible();
    await this.page.getByPlaceholder('Zip/Postal Code').fill(zipCode);
    await this.page.locator('#continue').click();
  }

  async checkoutCartNoZipCode(firstName, lastName, errorZipCode) {
    await this.page.getByText('Checkout').click();
    await this.page.getByPlaceholder('First Name').fill(firstName);
    await this.page.getByPlaceholder('Last Name').fill(lastName);
    await this.page.getByPlaceholder('Zip/Postal Code').fill('');
    await this.page.getByText(errorZipCode).isVisible();
    await this.page.locator('#continue').click();
  }

}

module.exports = ProductPage;