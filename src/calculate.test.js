
test ('0! is 1', () => {
    expect(factorial(0)).toBe(1)
});

test ('Factorial of negative int is throwing exception', () => {
    expect(()=> {
        factorial(-5);
    }).toThrow();
});

export