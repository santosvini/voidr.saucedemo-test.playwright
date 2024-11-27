const { expect } = require('@playwright/test');

  class LoginPage {
    constructor(page) {
      this.page = page;
  }
  
  async navigate() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/Swag Labs/);
  }
  
  async login(standard, pass) {
    await this.page.getByPlaceholder('Username').fill(standard)
    await this.page.getByPlaceholder('Password').fill(pass)
    await this.page.getByRole('button', { value: 'Login' }).click();
  }

  async loginError(erroruser, errorpass) {
    await this.page.getByPlaceholder('Username').fill(erroruser)
    await this.page.getByPlaceholder('Password').fill(errorpass)
    await this.page.getByRole('button', { value: 'Login' }).click();
  }

  async loginLocked(locked, pass) {
    await this.page.getByPlaceholder('Username').fill(locked)
    await this.page.getByPlaceholder('Password').fill(pass)
    await this.page.getByRole('button', { value: 'Login' }).click();
  }

  async withoutUser(pass) {
    await this.page.getByPlaceholder('Password').fill(pass)
    await this.page.getByRole('button', { value: 'Login' }).click();
  }

  async withoutPass(user) {
    await this.page.getByPlaceholder('Username').fill(user)
    await this.page.getByRole('button', { value: 'Login' }).click();
  }

  async message(message) {
    await this.page.getByText(message);
  }
}

module.exports = LoginPage;