import {factorial} from './calculate';
import {test, describe, expect, jest} from "@jest/globals"; // this is optional, all three are global variables im runner scope


describe('factorial', () => {

    test('5! is 120', () => {
        expect(factorial(5)).toBe(120)
    });

    test('0! is 1', () => {
        expect(factorial(0)).toBe(1)
    });

    test('Factorial of negative int is throwing exception ', () => {
        expect(() => {
            factorial(-5);
        }).toThrow();
    });

})

describe('product', ()=>{

    // product(5) --> 120
    // product(1) --> 1

});

//homework

import { test, expect } from "@jest/globals";
import { product } from './calculate';

test('Product of terms from 1 to 5', () => {
    const n = 5;
    const expectedProduct = 1 * 2 * 3 * 4 * 5; // Product of terms from 1 to 5

    const result = product(n);

    expect(result).toBe(expectedProduct);
});


