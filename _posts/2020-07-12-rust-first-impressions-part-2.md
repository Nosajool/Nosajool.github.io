---
title: "Rust first impressions - Part 2"
layout: post
published: true
---

This is the second part of the "Rust first impressions" series where I write some notes and add commentary to reading the [The Rust Programming Language Book ](https://doc.rust-lang.org/stable/book/). Start with [part 1](/2020/07/11/rust-first-impressions.html).

### Chapter 3 Common Programming Concepts

Now the author compares `mut` with **constants**. There is a `const` keyword in Rust which are always immutable.

We come back to **shadowing** variables and see that by using `let`, you do not need to declare the variable as `mut` as it will create a new immutable instance of the value rather than modifying the existing one.

Two of the data type subsets in Rust are **scalar** and **compound**.

There is type inference in Rust but looks like there is a means to disambiguate when there are different possible types. I do not like the word "consider" in the compiler error. Would there ever be a case where we would not need to give `guess` a type?

Scalar types in Rust:

* Integers
* Floating-point numbers
* Booleans
* Characters

There are 8, 16, 32, 64, 128 bit integers in both signed and unsigned variations. There is also a length called `arch` which I assume stands for **architecture**. The data types are `isize` and `usize` respectively. My guess is that this is the number of bytes in for a location in memory which is architecture dependent. Similar to how in C, an `int` can be 2 or 4 bytes.

Ah yes, reading further, looks like `isize` and `usize` can be 64 bits or 32 bits depending on the architecture.

Can write numbers in Decimal, Hex, Octal, Binary and `u8` bytes. Random thought, but since Rust is a compiled language, I wonder if there is a REPL. Whenever I need to do number format conversions, I usually crack open `irb` and manipulate things in Ruby.

There is a note about **panic**s in Rust and the example they use is for Integer overflowing. This is detected in debug compilation mode but in release mode, it will **wrap** the number instead. I don't think I have ever written code with intentional wrapping. Wonder what situations this is useful in.

The `char` type is 4 bytes in size and can represent a Unicode Scalar Value. Interesting that we can put non ASCII characters in a `char`. I am used to a `char` being 1 byte.

For the **compound** data types, there are:

* Tuples
* Arrays

I know that Python uses tuples heavily. Python is another language I would like to revisit and learn more in depth. Currently I just use it for small scripts.

Each position in the tuple has a type and the type doesn't need to be the same. That is neat. We can **destructure** tuples or use `.` syntax to access the index we want. I like this a lot. Curious about when to use tuples.

Arrays have fixed length and each element must contain the same type. There is some interesting array initialization syntax.

{% highlight rust %}
let months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
let a: [i32; 5] = [1, 2, 3, 4, 5]; // Each element is a 32 bit signed integer
let a = [3; 5]; // [3, 3, 3, 3, 3]
{% endhighlight %}

Accessing an out of bounds array index is caught at runtime. At least this is better than in C where you can get garbage memory or a segmentation fault if the program does not own the memory.

Yay, you can define functions in any order and do not need header files!

I always get confused with the terminology for **parameters** and **arguments**. So in the function signature, we have **parameters** and the concrete values that you provide to the function invocation are called **arguments**. Nice, now to commit that to memory.

Aw, can't chain statements like in C and Ruby.

Can create new scopes using `{}`. Talks about **Expressions** but it is not clear to me if this is a Rust thing or just a normal programming expression.

Reading about functions with return values. Ah, now I see where the tuples can be useful for returning multiple values. The final expression in the block of the body of a function is returned just like in Ruby.

Have to omit semi-colons at the end of expressions. This is important but will take some getting used to.

{% highlight rust %}
fn plus_one(x: i32) -> i32 {
  x + 1
}
{% endhighlight %}

Standard `//` C++/Java single line comments.

Do not need brackets for control flow. Also call the possible blocks of code **arms** like for `match` expressions.

Must explicitly convert non-Boolean types to Boolean.

You can `break` out of a loop and return an expression.

`for x in arr` syntax.

