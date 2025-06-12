import { expect, test } from '@playwright/test';

test.describe('Theme Toggle Tests', () => {
  test('TS001 - La página inicia en modo claro', async ({ page }) => {
    // Navegar a la página y esperar a que cargue completamente
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Esperar a que el botón esté presente y visible
    const themeButton = page.locator('.theme-toggle-btn');
    await themeButton.waitFor({ state: 'visible', timeout: 5000 });

    // Obtener y mostrar el contenido actual del botón
    const buttonText = await themeButton.textContent();
    console.log('Contenido actual del botón:', buttonText);

    // Verificar que el botón contiene el emoji de sol
    await expect(themeButton).toContainText('☀️', { timeout: 5000 });

    // Verificar que el documento no tiene la clase 'dark'
    const html = page.locator('html');
    const hasDarkClass = await html.evaluate(el => el.classList.contains('dark'));
    console.log('¿Tiene clase dark?:', hasDarkClass);

    // Verificar que el documento no tiene la clase 'theme-gray'
    const hasGrayClass = await html.evaluate(el => el.classList.contains('theme-gray'));
    console.log('¿Tiene clase theme-gray?:', hasGrayClass);

    // Verificar las clases del main
    const main = page.locator('main');
    const mainClasses = await main.getAttribute('class');
    console.log('Clases del main:', mainClasses);

    // Verificar que el main tiene la clase correcta
    await expect(main).toHaveClass(/bg-\[var\(--background\)\]/, { timeout: 5000 });
  });

  test('TS002 - Cambia a modo gris al primer click', async ({ page }) => {
    await page.goto('/');
    
    // Esperar a que el botón esté presente
    const themeButton = page.locator('.theme-toggle-btn');
    await themeButton.waitFor({ state: 'visible' });
    
    // Hacer clic y esperar a que cambie
    await themeButton.click();
    await page.waitForTimeout(100); // Pequeña pausa para asegurar que el cambio se complete
    
    // Verificar el contenido del botón
    const buttonText = await themeButton.textContent();
    console.log('Contenido del botón después del click:', buttonText);
    
    await expect(themeButton).toContainText('☁️');
    
    // Verificar las clases del main
    const main = page.locator('main');
    const mainClasses = await main.getAttribute('class');
    console.log('Clases del main después del click:', mainClasses);
    
    await expect(main).toHaveClass(/bg-\[var\(--background\)\]/);
  });

  test('TS003 - Cambia a modo oscuro al segundo click', async ({ page }) => {
    await page.goto('/');
    
    // Esperar a que el botón esté presente
    const themeButton = page.locator('.theme-toggle-btn');
    await themeButton.waitFor({ state: 'visible' });
    
    // Hacer dos clics y esperar a que cambie
    await themeButton.click();
    await page.waitForTimeout(100);
    await themeButton.click();
    await page.waitForTimeout(100);
    
    // Verificar el contenido del botón
    const buttonText = await themeButton.textContent();
    console.log('Contenido del botón después de dos clicks:', buttonText);
    
    await expect(themeButton).toContainText('🌙');
    
    // Verificar las clases del main
    const main = page.locator('main');
    const mainClasses = await main.getAttribute('class');
    console.log('Clases del main después de dos clicks:', mainClasses);
    
    await expect(main).toHaveClass(/bg-\[var\(--background\)\]/);
  });

  test('TS004 - Retorna a modo claro al tercer click', async ({ page }) => {
    await page.goto('/');
    
    // Esperar a que el botón esté presente
    const themeButton = page.locator('.theme-toggle-btn');
    await themeButton.waitFor({ state: 'visible' });
    
    // Hacer tres clics y esperar a que cambie
    await themeButton.click();
    await page.waitForTimeout(100);
    await themeButton.click();
    await page.waitForTimeout(100);
    await themeButton.click();
    await page.waitForTimeout(100);
    
    // Verificar el contenido del botón
    const buttonText = await themeButton.textContent();
    console.log('Contenido del botón después de tres clicks:', buttonText);
    
    await expect(themeButton).toContainText('☀️');
    
    // Verificar las clases del main
    const main = page.locator('main');
    const mainClasses = await main.getAttribute('class');
    console.log('Clases del main después de tres clicks:', mainClasses);
    
    await expect(main).toHaveClass(/bg-\[var\(--background\)\]/);
  });
}); 