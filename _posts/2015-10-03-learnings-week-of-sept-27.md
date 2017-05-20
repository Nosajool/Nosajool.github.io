---
title: Learnings week of Sept 27
layout: learnings
published: true
---
Back from the Shopify Intern Retreat!

* When adding a decimal column in Rails, you can specify a `precision` and a `scale`.
  * `precision` is the number of significant digits.
  * `scale` is the number of digits stored following the decimal point.
  * ie. 123.45 has a precision of 5 and a scale of 2.
* `Hash#delete` deletes a key-value pair and returns the value from a hash
{% highlight ruby %}
h = { "a" => 100, "b" => 200 }
h.delete("a") #=> 100
{% endhighlight %}

* Ruby *keyword arguments* can be used to know what arguments mean without looking at the method implementation.
  * Can also switch up the order of the arguments without changing behaviour of the method which would occur with positional arguments.
{% highlight ruby %}
def score(num_correct:, num_blank:, num_incorrect)
  num_correct * 3 + num_blank - num_incorrect * 2
end
score(num_blank: 2, num_incorrect: 1, num_correct: 4) #=> 12
{% endhighlight %}

* [Toxiproxy](https://github.com/Shopify/toxiproxy) is used to simulate network conditions.
  * Prove that your application is resiliant to single points of failiure.
* [ejson](https://github.com/Shopify/ejson) is a command line utility to manage secrets.
  * Secrets can be encrypted and stored safetly in a git repo.
  * Decryption can be restricted to production environments.
* Remapping `Caps Lock` to `Ctrl` is an amazing trick to save you from reaching for that awkward pinky position.
* In YAML, you can define an object and re-use it with modifications later.
{% highlight yaml %}
box: &green_box
  size: Medium
  colour: Green
large_box:
  <<: *green_box
  size: Large

{% endhighlight %}

* [tmux](https://tmux.github.io/) is a neat terminal multiplexer that lets you manage your sessions and terminal windows.
  * Can manage configuration with a `.tmux.conf` file.
* The **management expense ratio** is the percentage of a mutual fund's assets that goes towards fees that run the fund each year.
  * Generally, the lower the ratio, the better.
* **Portfolio Managers** get paid in 2 ways:
  * **Expense Ratio**
  * **Two and Twenty**
    * 2% of total asset value as management fee.
    * 20% of profits earned.
* The **Sharpe Ratio** is used to measure an asset performance.
  * It determines how well of a return an asset has compared to the risk that the investor took.
  * The higher the Sharpe ratio, the better.
  * Assets with the same return but different Sharpe ratio means that one stock is more volatile or "risky" than the other.
* Weekly vim
  * `CTRL-a` increments number under cursor. `CTRL-x` decrements it.
  * Can record macro using `q+{char}` and then execute it using `@{char}`.
  * `~` inverts the case of a selection.
  * Can fold, open and close folds using `zf`, `zo`, `zc`.
