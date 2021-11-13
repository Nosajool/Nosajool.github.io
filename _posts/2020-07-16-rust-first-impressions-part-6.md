---
title: "Rust first impressions - Part 6"
layout: post
published: false
---

This is the sixth part of the "Rust first impressions" series where I write some notes and add commentary to reading the [The Rust Programming Language Book ](https://doc.rust-lang.org/stable/book/). Start with [part 1](/2020/07/11/rust-first-impressions.html).

### Chapter 7 Managing Growing Projects with Packages, Crates, and Modules

- **Packages**: Cargo feature that lets you build, test and share one or more crates
  - Contains a `Cargo.toml` file
- **Crates**: A tree of modules that produces a library or a binary executable
- **Modules** and **se**: Let you control the organization, scope and privacy of paths
- **Paths**: A way of naming an item, such as a struct, function, or module

`mod` keyword used to create modules.

Finally we talk about the crate `::` syntax and introduce the **absolute path** and **relative path** forms.

Modules also define Rust's **privacy boundary** similarly to other languages. Private by default. Use `pub` to expose parts of the modules.

`super` in Rust can be used to construct relative paths that begin in the parent module.

{% highlight rust %}
fn serve_order() {}

mod back_of_house {
  fn fix_incorrect_order() {
    cook_order();
    super::serve_order();
  }

  fn cook_order() {}
}
{% endhighlight %}

It reminds me of the `../` operation used in the command line.

Structs and enums can also be made public. The default enum variant is to be public.

The book now answers my originally question about the `use` keyword. `use` is used to bring a path into scope. It is not the same as `using namespace` in C++. It is more like a symlink.

In Rust, we do add `use` paths that directly reach the functions in the modules. This is an idiomatic way to indicate that the function is not locally defined and belongs to the module. However, for structs, enums and other items, we do specify the full path.

Can also specify alias for a type using `as`. This reminds me of python imports.

You can **re-export names** using `pub use`. It is used when the internal structure of your code is different from how programmers calling your code would think about the domain.

Can import multiple items in the same package or module:

{% highlight rust %}
use std::{cmp::Ordering, io};
{% endhighlight %}

{% highlight rust %}
use std::io::{self, Write};
{% endhighlight %}

There is also a glob operator `*` for `use`.

{% highlight rust %}
use std::collections::*;
{% endhighlight %}

Load acontents of module from another file with the same name as the module:

{% highlight rust %}
mod front_of_house;
{% endhighlight %}

The directory structure is important to build the module tree. I am not sure if I like this. This seems like a convention over configuration pattern that reminds me of Ruby on Rails. I personally prefer explicitly importing files regardless of where they are located.

![Rust Logo](/assets/images/posts/rust-first-impressions-part-5/rust_logo.png)

