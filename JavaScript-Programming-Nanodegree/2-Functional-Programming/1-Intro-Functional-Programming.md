
### What is paradigm?
A paradigm is an overarching approach or style to problem-solving

### What is a programming paradigm?
> A programming paradigm is a philosophy, style, or general approach to writing code. (Patrick Smyth)

- A programming paradigm is a style, or "way" of programming.


### Imperative Style
- Solves problems with an explicit sequence of commands
- "Tell the program what to do step-by-step"
- Code or comments may read like a recipe
- Many programming languages including JS, PHP, Python can be used to write imperative programs

### Functional Style
- Solves problems with functions that hold simple pieces of logic
- Many funcitons strung together can accomplish complex actions
- Avoids global states

### Object Oriented Style
- Holds state and functionality together in objects
- Intuitive to reason about entities in programs


## Foundations of Functional Programming
### Pure Functions

> A pure function is a function that, given the same input, will always return the same output and does not have any observable side effect. (Frisby, 2020)

- Side effects
  - The state of the programm is modified and this modification haven't come from the return statement of the function. (Bueno, 2021)
  - An effect on your overall program from running a function, that did not come from the return statement of that function. 
-  Same inputs get the same output and the return value is the total effect of running the function.


**Considerations**
- If we can count on a function to produce the same result no matter where in the program it runs, then we don’t have to be afraid of calling it anywhere. It makes my functions easy to reuse.

- If a function has no side effects, then we remove the mental load of needing to remember them. I have confidence about what my functions do, and the effect they will have on my app. That confidence means that I can scale things more easily and alter programs with less fear.

### Immutability
Another major tenant of functional programming is that there is no “edit” things; new things are made.

Editing - more commonly referred to in development as “mutating” the same thing over and over again makes it hard to know what copy are being looked at and is prone to errors.