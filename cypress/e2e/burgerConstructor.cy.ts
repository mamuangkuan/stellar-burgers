//Действия до проведения тестов
beforeEach(() => {
  // Перехватываем запросы и подставляем моковые данные
  cy.intercept('GET', '/api/ingredients', {
    fixture: 'ingredients.json'
  }).as('getIngredients');

  cy.intercept('POST', '/api/auth/login', {
    fixture: 'user.json'
  }).as('login');

  cy.intercept('GET', '/api/auth/user', {
    fixture: 'user.json'
  }).as('getUser');

  cy.intercept('POST', '/api/orders', {
    fixture: 'order.json'
  }).as('createOrder');

  // Установка токенов авторизации
  window.localStorage.setItem('refreshToken', '22222222222222222222');
  cy.setCookie('accessToken', '111111111111111111111');

  // Переход на начальную страницу перед каждым тестом
  cy.visit('/');

  // Ожидаем выполнения перехваченного запроса
  cy.wait('@getIngredients');

  // Находим элемент с id="modals" и создаем для него алиас 'modal'
  cy.get('#modals').as('modal');
});

//Действия после проведения тестов
afterEach(() => {
  // Очищаем состояние после каждого теста
  window.localStorage.clear();
  cy.clearAllCookies();
  cy.getAllLocalStorage().should('be.empty');
  cy.getAllCookies().should('be.empty');
});

describe('Тесты конструктора бургера', () => {
  it('Проверяем добавление булочек и ингредиентов в конструктор', () => {
    // Проверяем, что конструктор бургера пустой
    cy.get('[data-testid="burger_constructor"]').should(
      'contain',
      'Выберите булки'
    );
    cy.get('[data-testid="burger_ingredients"]').should(
      'contain',
      'Выберите начинку'
    );

    // Кликаем по кнопке у булочки
    cy.get('[data-testid="643d69a5c3f7b9001cfa093c"]')
      .children('button')
      .click();

    // Кликаем по кнопке у ингредиента
    cy.get('[data-testid="643d69a5c3f7b9001cfa0941"]')
      .children('button')
      .click();

    // Проверяем, что в конструкторе содержится булка с именем "Краторная булка N-200i"
    cy.get('[data-testid="burger_constructor"]').should(
      'contain',
      'Краторная булка N-200i'
    );

    // Проверяем, что в конструкторе содержится ингредиент с именем "Биокотлета из марсианской Магнолии"
    cy.get('[data-testid="burger_constructor"]').should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
  });
});

describe('Тесты работы модальных окон', () => {
  it('Открытие и закрытие модального окна ингредиента крестиком', () => {
    // Проверяем, что модального окна нет на странице
    cy.get('@modal').should('be.empty');

    // Открытие модального окна ингредиента и проверка соответствия
    cy.get('[data-testid="643d69a5c3f7b9001cfa0941"]').click();
    cy.get('@modal')
      .find('h3')
      .should('contain', 'Биокотлета из марсианской Магнолии');

    // Закрытие окна по клику на крестик
    cy.get('@modal').find('button').click();
    cy.get('@modal').should('be.empty');
  });

  it('Открытие и закрытие модального окна ингредиента кликом на оверлей', () => {
    // Проверяем, что модального окна нет на странице
    cy.get('@modal').should('be.empty');

    // Открытие модального окна ингредиента и проверка соответствия
    cy.get('[data-testid="643d69a5c3f7b9001cfa0941"]').click();
    cy.get('@modal')
      .find('h3')
      .should('contain', 'Биокотлета из марсианской Магнолии');

    // Закрытие окна кликом на оверлей
    cy.get('[data-testid="overlay"]').click({ force: true });
    cy.get('@modal').should('be.empty');
  });
});

describe('Тесты оформления заказа', () => {
  it('Проверка оформления нового заказа', () => {
    // Добавляем булочку и ингредиент через клик на дочерний элемент button
    cy.get('[data-testid="643d69a5c3f7b9001cfa093c"]')
      .children('button')
      .click();
    cy.get('[data-testid="643d69a5c3f7b9001cfa0941"]')
      .children('button')
      .click();

    // Кликаем на кнопку заказа
    cy.get('[data-testid="order_burger"]').click();

    // Ожидаем выполнения перехваченного запроса
    cy.wait('@createOrder');

    // Проверяем, что модальное окно открыто и содержит номер заказа
    cy.get('@modal').should('be.not.empty');
    cy.get('@modal').find('h2').should('contain', '11111');

    // Закрываем модальное окно по клику на кнопку
    cy.get('@modal').find('button').click();
    cy.get('@modal').should('be.empty');

    // Проверяем, что после закрытия модального окна конструктор бургера пустой
    cy.get('[data-testid="burger_constructor"]').should(
      'contain',
      'Выберите булки'
    );
    cy.get('[data-testid="burger_ingredients"]').should(
      'contain',
      'Выберите начинку'
    );
  });
});
