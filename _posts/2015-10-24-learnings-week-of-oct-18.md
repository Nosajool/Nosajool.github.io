---
title: Learnings week of Oct 18
layout: learnings
published: true
---
* `ri` is the CLI Ruby Programmers Reference Guide and can be used to explore the Ruby API.

{% highlight sh %}
ri Array.split
{% endhighlight %}

Gives

{% highlight sh %}
= Array.split

(from gem activesupport-4.2.4)
------------------------------------------------------------------------------
  split(value = nil) { |element| ... }

  ------------------------------------------------------------------------------

  Divides the array into one or more subarrays based on a delimiting value or
  the result of an optional block.

    [1, 2, 3, 4, 5].split(3)              # => [[1, 2], [4, 5]]
    (1..10).to_a.split { |i| i % 3 == 0 } # => [[1, 2], [4, 5], [7, 8], [10]]

{% endhighlight %}

* `redis.setex` sets a key with a timeout in seconds.
{% highlight ruby %}
require 'redis'
redis = Redis.new
redis.setex("foo", 86_400, "bar") # Expire in 1 day
{% endhighlight %}

* [Docker](https://www.docker.com/) is used to isolate all parts of your software including code, dependencies, and tools into a lightweight container.
  * Can run as a process on any computer and can share it's kernel with other containers.
  * Guarantees app will always run the same regardless of the environment it is in.

* [Elm](http://elm-lang.org/) is a functional browser-side programming language used for creating user interfaces.
  * Compiles to javascript

* There is an existential operator `?` in coffeescript.
{% highlight coffeescript %}
person = "adult" if age? >= 18
{% endhighlight %}

Compiles to:

{% highlight javascript %}
var person;

if ((typeof age !== "undefined" && age !== null) > 18) {
  person = "adult";
}
{% endhighlight %}

* A **notary** is a person authorized to perform certain legal formalities like certifying contracts, deeds and legal documents.
  * Notaries do not represent clients in court.
  * Only non-contentious matters like preparation of wills, marriage ceremonies etc..

* An **attorney** is a **lawyer** but a lawyer may not necessarily be an attorney.
  * A lawyer has trained in the law. An attorney is a lawyer that has passed a Bar examination and has been admitted to practice law in the particular jurisdiction.

* The **S & P 500** or Standard & Poor's 500 Index is an index of 500 stocks representing the US economy.
  * Chosen for liquidity and market size.
  * Better representation than DJIA because it has more companies.

* **Day Trading** is profiting from trades intraday.
  * Usually will not hold any open positions overnight.
  * Must earn profit greater than trading commissions.

* **Swing Trading** is a style of trading that attempts to capture gains in a stock within 1 to 4 days.
  * Focus on short-term price momentum.

* An **Outside Day** is when a stock is higher and lower than that of the previous day.
  * Very volatile price for that day.

* Weekly Vim
  * `K` opens the *man* page for the word under your cursor
  * `:e $MYVIMRC` to edit vimrc. I ended up mappping a key binding for this.
  * `cit` has been super helpful for replacing the inside of an html tag.
  * `:set spell` for spell checking. Should probably restrict to certain file types.
