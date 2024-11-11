import burgerConstructorReducer, {
  initialState,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from './burgerConstructorSlice';
import { TConstructorIngredient } from '@utils-types';

describe('burgerConstructorSlice', () => {
  const craterBun: TConstructorIngredient = {
    _id: '643d69a5c3f7b9001cfa093c',
    id: 'unique-id-1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const magnoliaPatty: TConstructorIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    id: 'unique-id-2',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const luminousFish: TConstructorIngredient = {
    _id: '643d69a5c3f7b9001cfa093e',
    id: 'unique-id-3',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  };

  it('должен обрабатывать addIngredient', () => {
    const state = burgerConstructorReducer(
      initialState,
      addIngredient(craterBun)
    );

    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]).toEqual(craterBun);
  });

  it('должен обрабатывать removeIngredient', () => {
    const modifiedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [craterBun, magnoliaPatty, luminousFish]
      }
    };

    const state = burgerConstructorReducer(
      modifiedState,
      removeIngredient({ id: 'unique-id-1' })
    );

    expect(state.constructorItems.ingredients).toHaveLength(2);
    expect(state.constructorItems.ingredients).toEqual([
      magnoliaPatty,
      luminousFish
    ]);
  });

  it('должен обрабатывать moveIngredientUp', () => {
    const modifiedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [magnoliaPatty, luminousFish, craterBun]
      }
    };

    const state = burgerConstructorReducer(
      modifiedState,
      moveIngredientUp({ index: 2 })
    );

    expect(state.constructorItems.ingredients[1]).toEqual(craterBun);
    expect(state.constructorItems.ingredients[2]).toEqual(luminousFish);
  });

  it('должен обрабатывать moveIngredientDown', () => {
    const modifiedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [craterBun, magnoliaPatty, luminousFish]
      }
    };

    const state = burgerConstructorReducer(
      modifiedState,
      moveIngredientDown({ index: 0 })
    );

    expect(state.constructorItems.ingredients[0]).toEqual(magnoliaPatty);
    expect(state.constructorItems.ingredients[1]).toEqual(craterBun);
  });
});
