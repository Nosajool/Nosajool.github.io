---
title: "Rust first impressions - Part 8"
layout: post
published: false
---

This is the eighth part of the "Rust first impressions" series where I write some notes and add commentary to reading the [The Rust Programming Language Book ](https://doc.rust-lang.org/stable/book/). Start with [part 1](/2020/07/11/rust-first-impressions.html).

### Chapter 9 Error Handling

There are **recoverable** and **unrecoverable** errors. Rust uses `Result<T, E>` for recoverable errors and the `panic!` macro for unrecoverable errors.

Panics use **stack unwinding**. There is an option to **abort** instead of cleaning up memory using configuration in the `Cargo.toml` file.

Rust has **buffer overread** protection.

Errors can have methods. For example `kind` represents the variants of `io` operation errors.

{% highlight rust %}
use std::fs::File;
use std::io::ErrorKind;

fn main() {
  let f = File::open("hello.txt");

  let f = match f {
    Ok(file) => file,
    Err(error) => match error.kind() {
      ErrorKind::NotFound => match File::create("hello.txt") {
        Ok(fc) => fc,
        Err(e) => panic!("Problem creating the file: {:?}", e),
      },
      other_error => {
        panic!("Problem opening the file: {:?}", other_error)
      }
    },
  };
}
{% endhighlight %}

There are a couple of shortcuts for panics on errors: `unwrap` and `expect`.

{% highlight rust %}
use std::fs::File;

fn main() {
  let f = File::open("hello.txt").unwrap(); // Will call panic! for us

  let f2 = File::open("bye.txt").expect("Failed to open bye.txt"); // Will call panic! for us with an error message
}
{% endhighlight %}

Can **propagate** errors to the calling code by returning the `Result`.

We can use the `?` operator to propagate errors.

{% highlight rust %}
use std::fs::File;
use std::io;
use std::iot::Read;

fn read_username_from_file() -> Result<String, io::Error> {
  let mut f = File::open("hello.txt")?;
  let mut s = String::new();
  f.read_to_string(&mut s)?;
  Ok(s)
}
{% endhighlight %}

The `main` function is special and can have a return type of `()` and `Result<T, E>`.
