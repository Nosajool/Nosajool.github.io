---
title: "Rust first impressions - Part 5"
layout: post
published: true
---

This is the fourth part of the "Rust first impressions" series where I write some notes and add commentary to reading the [The Rust Programming Language Book ](https://doc.rust-lang.org/stable/book/). Start with [part 1](/2020/07/11/rust-first-impressions.html).

### Chapter 6 Enums and Pattern Matching

Enums in Rust are compared to **algebraic data types** in functional languages such as F#, OCaml, and Haskell. I have yet to use any of these languages but would love to in the future.

{% highlight rust %}
enum IpAddrKind {
  V4,
  V6,
}

let four = IpAddrKind::V4;
let six = IpAddrKind::V6;

fn route(ip_kind: IpAddrKind) {
}

route(IpAddrKind::V4);
route(IpAddrKind::V6);
{% endhighlight %}

Can also associate types and associated data to enum varients like in Java:

{% highlight rust %}
enum IpAddr {
  V4(u8, u8, u8, u8_,
  V6(String),
}

let home = IpAddr::V4(127, 0, 0, 1);

let loopback = IpAddr::V6(String::from("::1"));
{% endhighlight %}

You can create **anonymous struct**s using `{}`.

Can also define methods on enums using `impl`.

The `Option` type is used to denote an optional value. Rust does not have a **null** feature. Rust uses the `Option<T>` enum. Ah, looks like there is templating.

Uses the varients: `Some` and `None`. Need to convert an `Option<T>` to a `T` before performing a `T` operation with it. I wonder if the API is similar to Java `Optional`.

Next we move onto the `match` control flow operator. The power of `match` comes from the expressiveness of the patterns that can be applied.

Can bind patterns to values. The coin example with states makes sense.

Can also match with `Option<T>` to do something if and only if the optional contains a value. This is supposedly a common pattern in Rust code.

For `match`, Rust compiler ensures that every possible pattern case is accounted for and will give an error if it is not.

There is a default `match` case denoted by the `_` placeholder.

The `if let` syntax is useful for matching on only **one pattern** while ignoring the rest. This is syntactic sugar short form.

{% highlight rust %}
let some_u8_value = Some(0u8);
if let Some(3) = some_u8_value {
  println!("three");
}
{% endhighlight %}

![Rust Logo](/assets/images/posts/rust-first-impressions-part-5/rust_logo.png)

