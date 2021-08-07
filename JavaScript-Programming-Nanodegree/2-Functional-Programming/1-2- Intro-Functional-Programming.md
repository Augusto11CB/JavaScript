
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

### Side effects
- The state of the programm is modified and this modification haven't come from the return statement of the function. (Bueno, 2021)
- An effect on your overall program from running a function, that did not come from the return statement of that function. 
-  Same inputs get the same output and the return value is the total effect of running the function.


**Considerations**
- If we can count on a function to produce the same result no matter where in the program it runs, then we don’t have to be afraid of calling it anywhere. It makes my functions easy to reuse.

- If a function has no side effects, then we remove the mental load of needing to remember them. I have confidence about what my functions do, and the effect they will have on my app. That confidence means that I can scale things more easily and alter programs with less fear.

### Immutability
 Unchanging. Immutable values are ones which, once declared, cannot be changed.

Another major tenant of functional programming is that there is no “edit” things; new things are made.

Editing - more commonly referred to in development as “mutating” the same thing over and over again makes it hard to know what copy are being looked at and is prone to errors.

### Functional Pros and Cons
What typically differentiates paradigms is **how they deal with application state** - or put more simply - how they keep track of stuff (values and entities) and how those things change while the program runs.

**How does Functional Programming deal with application state?**
Functional Programming believes that values shouldn’t be sloppily edited, but rather replaced with fresh values every time. 

#### Pros
The Functional Programming paradigm shines when things get complicated. When you need to work with concurrent or parallel programs, or with applications that need to be stable and yet scalable, this is the paradigm to choose. Confidence, simplicity, and clarity are some of the benefits of writing Functional code.

- **Easier to test**
  - Because every function is pure, it is known that the return value is the sum of the function, and is the only part that needs to be tested. Functions that avoid side effects are easier to test.
  
- **More predictable code**
  - Functions that avoid side effects and the use of immutable values makes changes in the programs more visible. By definition, pure functions always return the same value when given the same inputs. **This predictability is the backbone of success with Functional Programming**

- **Easier to edit and expand**
  - Because pure functions return the same value every time, and perfectly encapsulate their logic in the return statement, it means that a function could be copied and pasted to a new part of a program, or moved to an entirely different program, and it would still always produce the same result. Functions with side effects cannot be moved without the possibility of breaking something.

#### Cons
- **More difficult to write in some languages**
  - While most modern dynamic languages have the ability to write in a Functional style, it can go against the grain with some. Even JavaScript, for instance, does not have a way to make values truly immutable. Writing programs without classes goes against the grain of Ruby, and PHP does not have all the array methods JavaScript has that follow a Functional methodology.

- **Will never be able to implement completely**
