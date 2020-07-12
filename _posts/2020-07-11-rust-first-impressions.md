---
title: Rust first impressions
layout: post
published: true
---

This morning, I decided to take a look at Rust. It is a language I had heard about a couple of years ago as the "Most loved programming language by developers", but I have never tried it out nor have I done any research on it. I have been working on C code lately for the past month and have heard that Rust can be used to solve similar problem spaces.

These are my initial thoughts and commentary from playing around with the first couple of chapters of the [The Rust Programming Language Book ](https://doc.rust-lang.org/stable/book/).

For a tiny bit of background, I work primarily in Java and Ruby but have worked in the past with JavaScript, Python, Go and Bash.  My comparisons will be drawn from my experience with those languages. I am working through this book using a 2015 Macbook Pro running macOS Catalina 10.15.4.

### Forward & Introduction

The introduction talks about Rust simplifying memory management, data representation and concurrency for systems programming. I have been running into these pitfalls lately while dipping my toes into C.

Seems like the author wants to emphasize the Rust compiler warnings and errors are useful.

It is nice that you can write a variety of programs like CLI apps and web apps using Rust and can write programs for embedded devices, and both client and server applications.

### Chapter 1 Getting Started

{% highlight bash %}
$ curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
{% endhighlight %}

This is a [bash script](https://static.rust-lang.org/rustup/rustup-init.sh) that runs on Unix shells. The script downloads and starts the installation of the `rustup` tool.

{% highlight bash %}
$ rustc --version
rustc 1.44.1 (c7087fe00 2020-06-17)
{% endhighlight %}

Clean and easy installation. No errors.

The workflow for running the Hello World program felt very C like with `rustc` and then running the compiled executable program.

Cargo seems nice. Build system and package manager that comes with the installation.

Woah. Cargo configuration is written in TOML. Crazy coincidence since I had just learnt about TOML from our intern this past week.

There is a `cargo check` command that you can use to check for compilation errors instead of `cargo build` which builds the executable. I wonder how long the build times are for large projects.

I like the simplicity of checking out an open source project in Rust and running `cargo build`.

### Chapter 2 Programming a Guessing Game

`cargo new guessing_game` reminds me of `rails new guessing_game`.

They introduce a `println!` function. I am not sure what the `!` does yet and it does not seem like it will be explained in this chapter.

I like semi-colons at the end of lines of code. Glad that is used in Rust.

When I first read `let mut`, the first thing that came to mind was [mutt](https://en.wikipedia.org/wiki/Mongrel). Quickly learned it means **mutable** variable. Wondering why they did not use the `const` keyword instead.

The program declares `use std::io` but then invokes `io::stdin`. This was a bit surprising as it is different behavior than `using namespace std` in C++.

There are some defaults in the **prelude** of every program. This is not discussed further in this chapter.

`println!` is a **macro**. Is this different from a C macro?

`String::new()` returns a new instance of a `String`. Strings are growable, UTF-8 encoded bit of text. I have gotten used to the mindset of `String` being immutable in Java. Also, I am still not sure if `String` in Rust is a class or a primitive data type yet.

`::new` means that `new` is an **associated function** of the `String` **type**. Ah, so it seems that `String` is a **type** and not a **class**. Wait a second... The book compares it to a **static method**. So a **type** is a **class** in Rust?

We can pass in **references** to variables using `&`. Is this a pointer reference? Also interesting that we need to use the `mut` keyword again to allow the referenced variable to be modified.

The return value of `read_line` is a `Result`. This seems like a Rust specific construct. The instance of `io::Result` has an `expect` method that is called when the `read_line` method returns an `Err` instead of an `Ok`. A bit curious how error handling will be done but that is in a future chapter.

There are string formatting placeholders. `{}` looks like python which is nice. I have been getting frustrated with formatting different data types in strings in C and this is a relief that it seems simple to do in Rust. This section also shows that you can have functions that have variable arguments. This is pretty expected in new languages nowadays but good to see it up front in the frist example.

The chapter shows how to add an external dependency to the project as we add in the `rand` crate. The workflow feels very much like Ruby. The Cargo.lock file reminds me a lot of Gemfiles.

`cargo doc --open` is unique and amazing. I wish other languages had similar documentation and tooling.

I am still confused by `use rand::Rng` syntax. Why do we need to still preface `thread_rng()` with `rand::` if we included `rand` at the top? I will need to look at the documentation for `use` in the future.

`match` looks like a powerful `switch` operation. Curious to see more examples of how it can be used. A `match` expression is made up of **arms**. A little bit of a strange name but I dig it.

`guess.cmp(&secret_number)` returns an `Ordering` type. I wonder if this can return an `Err` as well if you do not pass in a number.

Ah, later on, the compiler stops us because Rust uses a strong static type system.

We are introduced to some primitive data types `i32`, `u32`, `i64`.

Rust allows you to **shadow** a previous value of a variable to re-use the variable name even if the old variable and the new one have different types. This seems a little strange but alright.

Looping using `loop` and `break` is very similar to other programming languages. Not much to say here.

Ah, we get to some error handling. I was wondering how this would work.

{% highlight rust %}
let guess: u32 = match guess.trim().parse() {
  Ok(num) => num,
  Err(_) => continue,
};
{% endhighlight %}

### That's it for Chapter 1 & 2

Pleasant opening documentation. Excited to continue learning another day.

Stay tuned for part 2...
