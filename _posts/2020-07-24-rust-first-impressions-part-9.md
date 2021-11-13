---
title: "Rust first impressions - Part 9"
layout: post
published: false
---

This is the ninth part of the "Rust first impressions" series where I write some notes and add commentary to reading the [The Rust Programming Language Book ](https://doc.rust-lang.org/stable/book/). Start with [part 1](/2020/07/11/rust-first-impressions.html).

### Chapter 10 Generic Types, Traits, and Lifetimes

We can use generics to build templated functions similar to other languages.

{% highlight rust %}
fn largest<T>(list: &[T]) -> T{
{% endhighlight %}

`std::cmp::PartialOrd` is a **trait** used for comparisons.

Just like in Java, you can use multiple generic types:

{% highlight rust %}
struct Point<T, U> {
  x: T,
  y: U,
}
{% endhighlight %}

Rust performs **monomorphization** of code that is using generics at compile time. The concrete types are filled in when compiled. This ensures no performance impact when running the code.

**Traits** are similar to **interfaces** in other languages with a couple of differences.
