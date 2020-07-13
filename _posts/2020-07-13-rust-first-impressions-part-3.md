---
title: "Rust first impressions - Part 3"
layout: post
published: true
---

This is the third part of the "Rust first impressions" series where I write some notes and add commentary to reading the [The Rust Programming Language Book ](https://doc.rust-lang.org/stable/book/). Start with [part 1](/2020/07/11/rust-first-impressions.html).

### Chapter 4 Understanding Ownership

This is the main Rust specific feature that makes it unique compared to other languages. In Rust, memory is managed through a **system of ownership** with a set of rules that the compiler checks at compile time.

Ownership rules:

- Each value in Rust has a variable that's called its **owner**
- There can only be **one owner at a time**
- When the owner goes **out of scope**, the value will be dropped

When a variable goes out of scope, Rust calls the `drop` function and returns the variable to memory. I vaguely remember the Resource acquisition is Initialization pattern from a University class on C++.

![Rust string memory representation](/assets/images/posts/rust-first-impressions-part-3/string_memory_representation.png)<br>
<a class="img-source" href="https://doc.rust-lang.org/stable/book/ch04-01-what-is-ownership.html">https://doc.rust-lang.org/stable/book/ch04-01-what-is-ownership.html</a>

`len` is supposed to be how much memory in bytes the contents of the `String` is currently using. I thought that `char`s in Rust were 4 bytes? I guess `String` can only contain 1 byte ASCII characters.

![Rust string copy](/assets/images/posts/rust-first-impressions-part-3/string_copy.png)<br>
<a class="img-source" href="https://doc.rust-lang.org/stable/book/ch04-01-what-is-ownership.html">https://doc.rust-lang.org/stable/book/ch04-01-what-is-ownership.html</a>

When copying the string, the data on the heap is not copied, just the pointer.

Instead of copying a string `s1` into `s2`, Rust marks `s1` as invalid so when `s1` goes out of scope, Rust does not call `drop` on it. But you can no longer use `s1` and the compiler will stop you. It is called a `move` instead of a `copy`.

![Rust string invalidation](/assets/images/posts/rust-first-impressions-part-3/string_invalidation.png)<br>
<a class="img-source" href="https://doc.rust-lang.org/stable/book/ch04-01-what-is-ownership.html">https://doc.rust-lang.org/stable/book/ch04-01-what-is-ownership.html</a>

My brain is still having a hard time wrapping my head around this ownership idea. How would you have different objects that reference the same memory on the heap in Rust? For example, a shared buffer. Is there a similar concept to a `shared_ptr`?

If you do want a **deep copy** of a type instance, use `clone`.

Copying primitives is always a deep copy.

Using the `Copy` trait, can still use the older variable after assignment.

When you pass a value to a function, it passes ownership to the function unless it is `Copy`. Can also return a value from a function to transfer ownership.

This feels strange. I usually like to refactor things like validation code into smaller functions that all act on the same object. Perhaps need to think of writing code like the Builder pattern using `.withX` where we always return the same object at the end of the function. Also, what happens if you need to pass multiple arguments of objects on the heap? Do you need to explicitly return all of them?

Ah, the book addresses this tedious pattern. Using **references**.

Using `&`, the function won't take ownership. This is known as **borrowing**. Need to declare `mut` reference if we want to allow modifying.

Rust compiler prevents dangling references by ensuring that data does not go out of scope before the reference to the data does.

Rust also has **slices**. I remember this is heavily used in Go. String literals are slices.

There is a future chapter that talks about storing UTF-8 encoded text with strings.

I get the basic idea of ownership but I think I will need to play around with passing references to functions and returning mutable and immutable variables to fully grasp what can and can't be done.

