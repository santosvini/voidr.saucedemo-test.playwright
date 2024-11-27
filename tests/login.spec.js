// @ts-nocheck
const { test, expect } = require('@playwright/test');
const { login } = require('./helper');
const LoginPage = require('../pages/login.page');

let loginPage = LoginPage

test.describe('Login Testes', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate()
  });

  test('Login com credenciais válidas', async ({ page }) => {
    await loginPage.login(login.standard, login.pass)
    await page.getByRole('heading', { name: 'Swag Lab' }).isVisible();
  });

  test('Login com credenciais inválidas', async ({ page }) => {
   await loginPage.loginError(login.erroruser, login.errorpass)
   await loginPage.message(login.message)
  });

  test('Login com credenciais bloqueadas', async ({ page }) => {
    await loginPage.loginLocked(login.locked, login.pass)
    await loginPage.message(login.message_block)
  });

  test('Login com campo usuário vazio', async ({ page }) => {
    await loginPage.withoutUser(login.pass)
    await loginPage.message(login.message_user);
  });
  
  test('Login com campo senha vazio', async ({ page }) => {
    await loginPage.withoutPass(login.standard)
    await loginPage.message(login.message_pass);
  });
})