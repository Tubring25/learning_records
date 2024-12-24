# Mental Models

# The JavaScript Universe
## Values
- **Primitive Values**
	Primitive values are a permanent part of JavaScript Universe, can't be created, destoried or changed.
 - **Objects and Functions**
	Objects and functions are also values, but can be manipulated in code.
## Types of Values
- **Primitive Values**
	- **Undefined**(undefined)
		used for unintentionally missed values.
	- **Null**(null)
		used for intentionally missed values.
	- **Number**(-100, 34)
		used for math calculations
	- **Boolean**(true / false)
		used for logical operations
	- **BigInts**(uncommon and new)
		used for math or big numbers
	- **String**("hello")
		used for text
	- **Symbol**(uncommon)
		used for perform rituals and hide secrets
- Objects and Functions
	- **Object**({} and others)
		used to group related data and code.
	- **Function**
		used  to refer to code
### Checking a Type
`typeof` the parens after it is now necessary but some time it will make an ambiguity if not use it. 
like 
```js
console.log(typeof (x=> x*2))

// error occurs
console.log(typeof x => x * 2)
```
# Values and Variables
```js
let reaction = 'yikes';

reaction[0] = 'l';

console.log(reaction);
```
- My thoughts:
	 - Define a string type variable named reaction and set its value as "yikes";
	 - Fined the 0nd letter by index, change the 0 letter to "l"
	 - get the result "likes"
- Answer
	- This code will either print `"yikes"` or throw an error depending on whether you are in [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode). **It will never print `"likes"`.**
## Primitive Variables Are Immutable
All primitive values are immutable
## Variables and Values are Contradiction?
- My thoughts
	- Defined a string type variable named pet and gave it value with "Narwhal“
	- Defined a string type variable named pet and gave it value with "The Kraken"
	- Found two same type variable named pet, so the last one overwrited the above one
	- The result of console log is "The Kraken"
## Variables Are Wires
- **Variables are not values**
- **Variables point to values**
- **Variables don't have types in JS, but values do. The answer of `typeof()` depends on *which value* the variable was pointing to when we checked the type.**
- We can't pass variables in JavaScript, we can only **pass values**. 
	- `feed(a)` the `a` here is not a variable. it represented the value of `a`

# Studying from the Inside
### Undefined
It represents the concepts of an unintentionally missing value.
```js
console.log(typeof(null)); // "object" (a lie!)
```
`null`is used for intentionally missing values.
### String

All conceivable string values have already exist from the beginning -- one value for every distinct string.

- **Not all numbers can be perfectly represented in JavaScript.** Their decimal part offers more precision closer to `0`, and less precision further away from it.
- **Numbers from invalid math operations like `1 / 0` or `0 / 0` are special.** `NaN` is one of such numbers. They may appear due to coding mistakes.
- **`typeof(NaN)` is a number because `NaN` is a numeric value.** It’s called “Not a Number” because it represents the _idea_ of an “invalid” number.

### Object
It includes arrays, dates, RegExps, and other non-primitive values.
Objects are mutable (we can change them). We can access their properties with `.` or `[]`
**Every time we use the `{}` object literal, we _create_ a brand new object value**

# Equality
- **Strict Equality: `a === b`**
- **Loose Equality: `a == b`**
- **Same Value Equality: `Object(a, b)`**

 `a === b` behaves the same way as `Object.is(a, b)`.
 
here are **two rare cases** where the behavior of `===` is different.
1. **`NaN === NaN` is `false`**, although they are the same value.
2. **`-0 === 0` and `0 === -0` are `true`**, although they are different values.
#### First Special Case: `NaN`
**Remember that `NaN === NaN` is always `false`:**
```js
console.log(width === height); // false
```
However, `NaN` is the _same value_ as `NaN`:
```js
console.log(Object.is(width, height)); // true
```
In regular math, there is no such concept as “minus zero,” but it exists in floating-point math for [practical reasons](https://softwareengineering.stackexchange.com/a/280708). Here’s an interesting fact about it.
#### Second Special Case: `-0`
**Both `0 === -0` and `-0 === 0` are always `true`:**
```js
let width = 0; // 0

let height = -width; // -0

console.log(width === height); // true
```
However, `0` is a _different value_ from `-0`:
```js
console.log(Object.is(width, height)); // false
```

# Properties

**JavaScript uses a set of rules that looks something like this:**
1. Figure out the value of the part before the dot (`.`).
2. If that value is `null` or `undefined`, throw an error immediately.
3. Check whether a property with that name exists on our object:  
    a. If **it exists**, answer with the value this property points to.  
    b. If **it doesn’t exist**, answer with the `undefined` value.
**a property always _points to a value!_ It can’t point to another property or a variable. In general, all wires in our universe _point to values_.**
