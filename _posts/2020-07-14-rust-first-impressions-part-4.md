---
title: "Rust first impressions - Part 4"
layout: post
published: false
---

This is the fourth part of the "Rust first impressions" series where I write some notes and add commentary to reading the [The Rust Programming Language Book ](https://doc.rust-lang.org/stable/book/). Start with [part 1](/2020/07/11/rust-first-impressions.html).

### Chapter 5 Using Structs to Structure Related Data

These look like Go `structs`. I also see similarities as the author compares them to **templates**.

You cannot mark only certain fields of an instance as mutable in Rust

The field initialization shortcut for instantiating instances with field names exactly the same as parameter names is great. I think I had done this in JavaScript before.

There is also the `..` struct update syntax. This also exists in JavaScript using the `...` spread operator. I wonder if there is **destructuring** in Rust.

**Tuple structs** can be used to give a name for the tuple.

There are **unit-like structs** that don't have any fields. There is a type in Rust called the **unit type** `()`. The book refers to **traits** again but has not explained what this means yet.

There is a segue to talk about the ownership of struct data. It introduces the concept of **lifetimes** to store references to data owned by something else. Lifetimes ensure that the data referenced by a struct is valid for as long as the struct is.

There is an example that shows you can use tuple arguments for functions. I did not initially realize that was possible.

There is formatting known as `std::fmt::Display` which is implemented by primitives by default but not for structs. Using `{:?}` allows `println!` to use the `std::fmt::Debug` output format. There are **annotations** in Rust. One of them is `#[derive(Debug)]`.

{% highlight rust %}
#[derive(Debug)]
struct Rectangle {
  width: u32,
  height: u32,
}

fn main() {
  let rect1 = Rectangle {
    width: 30,
    height: 50,
  };

  println!("rect1 is {:?}", rect1);
}
{% endhighlight %}

This formats the struct nicely for debugging:

{% highlight bash %}
$ cargo run
   Compiling structs v0.1.0 (file:///projects/structs)
    Finished dev [unoptimized + debuginfo] target(s) in 0.48s
     Running `target/debug/structs`
rect1 is Rectangle { width: 30, height: 50 }
{% endhighlight %}

Alternatively, can use `{:#?}` for larger structs that will print each field on a separate line:

{% highlight rust %}
println!("rect1 is {:?}", rect1);
{% endhighlight %}

This formats the struct nicely for debugging:

{% highlight bash %}
$ cargo run
   Compiling structs v0.1.0 (file:///projects/structs)
    Finished dev [unoptimized + debuginfo] target(s) in 0.48s
     Running `target/debug/structs`
rect1 is Rectangle {
    width: 30,
    height: 50,
}
{% endhighlight %}

Oh how I wish this existed in C.

**Methods** are defined within the context of a `struct`. First parameter is always `self` like in Python. Methods are defined with an `impl` block.

Rust uses **automatic referencing and dereferencing**. It will automatically add in the `&`, `&mut` or `*` so that `object` matches the signature of the method. This will be difficult to un-learn but I do agree that it looks cleaner.

There are **associated functions** that are used within `impl` blocks but they don't take `self` as a parameter. As we saw in the earlier chapter, these seem like "class functions" or "static functions" using the `::` syntax.

You can have multiple `impl` blocks for the same struct. I wonder why you would ever organize your code like this.

