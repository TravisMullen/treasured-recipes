## Common Matchers

Arrays:

```JS
expect(array).toBeArray();
expect(array).toBeArrayOfNumbers();
expect(array).toBeEmptyArray();
```

Booleans:

expect(boolean).toBeBoolean();
expect(boolean).toBeFalse();
expect(boolean).toBeTrue();


Mix:

expect(instance).toBe(instance);
expect(number).toBeGreaterThan(number);
expect(number).toBeLessThan(number);
expect(mixed).toBeNull();
expect(mixed).toBeUndefined();


- See more at: http://www.tothenew.com/blog/make-custom-matcher-for-testing-with-jasmine/#sthash.LE633K67.dpuf