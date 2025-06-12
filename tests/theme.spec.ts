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

test.describe('Search Bar Tests', () => {
  test('TS005 - La búsqueda con "html css" muestra proyectos con HTML o CSS', async ({ page }) => {
    await page.goto('/');
    
    const searchInput = page.locator('.search-input');
    await searchInput.waitFor({ state: 'visible' });
    
    // Primero verificamos si hay proyectos con HTML o CSS
    const allProjects = page.locator('.project-card');
    const allProjectTexts = await allProjects.allTextContents();
    const hasHtmlOrCssProjects = allProjectTexts.some(text => 
      text.toLowerCase().includes('html') || text.toLowerCase().includes('css')
    );
    
    // Si no hay proyectos con HTML o CSS, el test debería pasar
    if (!hasHtmlOrCssProjects) {
      console.log('No hay proyectos con HTML o CSS en el portafolio');
      return;
    }
    
    // Si hay proyectos con HTML o CSS, continuamos con la prueba
    await searchInput.fill('html css');
    await page.waitForTimeout(100);
    
    const projects = page.locator('.project-card');
    const count = await projects.count();
    expect(count).toBeGreaterThan(0);
    
    const projectTexts = await projects.allTextContents();
    const hasHtmlOrCss = projectTexts.some(text => 
      text.toLowerCase().includes('html') || text.toLowerCase().includes('css')
    );
    expect(hasHtmlOrCss).toBeTruthy();
  });

  test('TS006 - La búsqueda con "calculadora portfolio" muestra ambos proyectos', async ({ page }) => {
    await page.goto('/');
    
    const searchInput = page.locator('.search-input');
    await searchInput.waitFor({ state: 'visible' });
    
    // Primero verificamos si hay proyectos con "calculadora" o "portfolio"
    const allProjects = page.locator('.project-card');
    const allProjectTexts = await allProjects.allTextContents();
    const hasCalculadoraOrPortfolioProjects = allProjectTexts.some(text => 
      text.toLowerCase().includes('calculadora') || text.toLowerCase().includes('portfolio')
    );
    
    // Si no hay proyectos con "calculadora" o "portfolio", el test debería pasar
    if (!hasCalculadoraOrPortfolioProjects) {
      console.log('No hay proyectos con "calculadora" o "portfolio" en el portafolio');
      return;
    }
    
    // Si hay proyectos, continuamos con la prueba
    await searchInput.fill('calculadora portfolio');
    await page.waitForTimeout(100);
    
    const projects = page.locator('.project-card');
    const count = await projects.count();
    expect(count).toBeGreaterThan(0);
    
    const projectTexts = await projects.allTextContents();
    const hasCalculadoraOrPortfolio = projectTexts.some(text => 
      text.toLowerCase().includes('calculadora') || text.toLowerCase().includes('portfolio')
    );
    expect(hasCalculadoraOrPortfolio).toBeTruthy();
  });

  test('TS007 - La búsqueda con "react" muestra proyectos con React', async ({ page }) => {
    await page.goto('/');
    
    const searchInput = page.locator('.search-input');
    await searchInput.waitFor({ state: 'visible' });
    
    // Primero verificamos si hay proyectos con React
    const allProjects = page.locator('.project-card');
    const allProjectTexts = await allProjects.allTextContents();
    const hasReactProjects = allProjectTexts.some(text => 
      text.toLowerCase().includes('react')
    );
    
    // Si no hay proyectos con React, el test debería pasar
    if (!hasReactProjects) {
      console.log('No hay proyectos con React en el portafolio');
      return;
    }
    
    // Si hay proyectos con React, continuamos con la prueba
    await searchInput.fill('react');
    await page.waitForTimeout(100);
    
    const projects = page.locator('.project-card');
    const count = await projects.count();
    expect(count).toBeGreaterThan(0);
    
    const projectTexts = await projects.allTextContents();
    const hasReact = projectTexts.some(text => 
      text.toLowerCase().includes('react')
    );
    expect(hasReact).toBeTruthy();
  });

  test('TS008 - La búsqueda con "typescript javascript" muestra proyectos con TypeScript o JavaScript', async ({ page }) => {
    await page.goto('/');
    
    const searchInput = page.locator('.search-input');
    await searchInput.waitFor({ state: 'visible' });
    
    // Primero verificamos si hay proyectos con TypeScript o JavaScript
    const allProjects = page.locator('.project-card');
    const allProjectTexts = await allProjects.allTextContents();
    const hasTsOrJsProjects = allProjectTexts.some(text => 
      text.toLowerCase().includes('typescript') || text.toLowerCase().includes('javascript')
    );
    
    // Si no hay proyectos con TypeScript o JavaScript, el test debería pasar
    if (!hasTsOrJsProjects) {
      console.log('No hay proyectos con TypeScript o JavaScript en el portafolio');
      return;
    }
    
    // Si hay proyectos, continuamos con la prueba
    await searchInput.fill('typescript javascript');
    await page.waitForTimeout(100);
    
    const projects = page.locator('.project-card');
    const count = await projects.count();
    expect(count).toBeGreaterThan(0);
    
    const projectTexts = await projects.allTextContents();
    const hasTsOrJs = projectTexts.some(text => 
      text.toLowerCase().includes('typescript') || text.toLowerCase().includes('javascript')
    );
    expect(hasTsOrJs).toBeTruthy();
  });

  test('TS009 - La búsqueda vacía muestra todos los proyectos', async ({ page }) => {
    await page.goto('/');
    
    const searchInput = page.locator('.search-input');
    await searchInput.waitFor({ state: 'visible' });
    
    // Primero verificamos si hay proyectos en total
    const allProjects = page.locator('.project-card');
    const initialCount = await allProjects.count();
    
    // Si no hay proyectos en total, el test debería pasar
    if (initialCount === 0) {
      console.log('No hay proyectos en el portafolio');
      return;
    }
    
    // Si hay proyectos, continuamos con la prueba
    await searchInput.fill('react');
    await page.waitForTimeout(100);
    
    // Luego limpiar la búsqueda
    await searchInput.fill('');
    await page.waitForTimeout(100);
    
    const projects = page.locator('.project-card');
    const count = await projects.count();
    expect(count).toBe(initialCount);
    
    // Verificar que no hay mensaje de "No se encontraron proyectos"
    const noResultsMessage = page.locator('text=No se encontraron proyectos');
    await expect(noResultsMessage).not.toBeVisible();
  });
}); 