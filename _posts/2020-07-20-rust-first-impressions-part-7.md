---
title: "Rust first impressions - Part 7"
layout: post
published: true
---

This is the seventh part of the "Rust first impressions" series where I write some notes and add commentary to reading the [The Rust Programming Language Book ](https://doc.rust-lang.org/stable/book/). Start with [part 1](/2020/07/11/rust-first-impressions.html).

### Chapter 8 Common Collections

`Vec<T>` for **vector**. Note that it uses **generics**.

`vec!` macro for creating a `Vec<T>` with initial values:

{% highlight rust %}
let v = vec![1, 2, 3];

let mut my_vec = Vec::new();

my_vec.push(5);
my_vec.push(6);
my_vec.push(7);
my_vec.push(8);
{% endhighlight %}

Can use indexing syntax or `get` method for reading values. `get` returns an `Option<^T>`.

Iterating over a vector is pretty straightforward.

{% highlight rust %}
let mut v = vec![100, 32, 57];
for i in &mut v {
  *i += 50;
}
{% endhighlight %}

There is a neat trick to store lists with different types. In Rust, you can use a vector of enums with different type variants.

{% highlight rust %}
enum SpreadsheetCell {
  Int(i32),
  Float(f64),
  Text(String),
}

let row = vec![
  SpreadsheetCell::Int(3),
  SpreadsheetCell::Text(String::from("blue")),
  SpreadsheetCell::Float(10.12),
];
{% endhighlight %}

There are various string types such as `String`, `OsString`, `OsStr`, `CString` and `CStr`.

There is a concept called  `deref coercion` which the compiler uses to turn `&s2` into `&s2[..]`. You cannot index into strings in Rust. This makes sense when you understand that a `String` is a wrapper over a `Vec<u8>`.


`HashMap` has keys of type `String` and values have values of type `i32`. You must be able to change these. Yay, there is are `zip` and `collect` methods for building hash maps from vector of tuples.

Ah yes, you can use different types for `HashMap` keys and values. Can use `_` for Rust to infer the type for the hash map.

There is an `entry` API to check whether or not a value exists in the hash map.

{% highlight rust %}
use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);

scores.entry(String::from("Yellow")).or_insert(50);
scores.entry(String::from("Blue")).or_insert(50);
{% endhighlight %}

