---
title: Learnings week of Nov 8
layout: learnings
published: true
---

* [TensorFlow](https://www.tensorflow.org/) is a Google Library for Machine Library.
  * Uses **data flow graphs** which describes mathematical computation with a directed graph of nodes and edges.

* **rjust** and **ljust** in Ruby:
{% highlight ruby %}
irb(main):001:0> "2419".rjust(16, "*")
=> "************2419"
{% endhighlight %}

* `git grep` looks for specified patterns in the tracked files in the work tree.
  * Won't go spitting out results from tmp/ and logs/ if you don't track them.

* In Minitest, we can change "test" to "skip" to skip the test
  * ...Who would have guessed?

* [Spring](https://github.com/rails/spring) is an application preloader that speeds up development by keeping your application running in the background so you don't need to boot it every time you run a test, rake task or migration.

* **vimdiff** is a tool you can use to resolve merge conflicts in Vim

* `git rebase -p` to preserve merges commits.
  * I forget why I needed this but it was necessary.

* You can disable javascript on mobile chrome for much faster browsing.

* A **serial port** is a communication interface where 1 bit is transferred at a time.

* The **Rule of 72** is an easy way to calculate an approximation of the effect of compound interest.
  * Years to double investment = 72 / compound annual interest rate.
  * The real calculation would be ln(2) / ln(compound annual interst rate) but it is tough to do logarithmic calculations in your head.
  * Same calculation can be used to calculate the how long it will take for your money to halve due to inflation.

* Weekly vim
  * `guu` to make line lowercase and `gUU` to make the line uppercase.
  * `V` to select entire line.
  * `*` jumps to next instance of identifier under cursor. `#` goes to the previous one.
