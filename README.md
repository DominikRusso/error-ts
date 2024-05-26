# @dominikrusso/error

This package provides `sTry` and `aTry`,
functions that transform synchronous and asynchronous functions
that throw or reject into functions that
return their original return type or an error.
`isError` can then be used to check if `T | Error` is an error.

```ts
import { sTry, isError } from "@dominikrusso/error";

const result = sTry(() => functionThatMightThrow(42));
//    ^ T | Error
if (isError(result)) {
    handleTheError(result)
    //             ^ Error
    process.exit(1);
}
console.log(result);
//          ^ T
```
