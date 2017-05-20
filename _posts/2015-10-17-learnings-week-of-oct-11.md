---
title: Learnings week of Oct 11
layout: learnings
published: true
---
* To kill rogue rails process
  * Find **pid** (process id) using `ps aux | grep rails` or `cat tmp/pids/server.pid`
  * `kill -9 pid`
* Can restart nginx with `sudo service nginx restart`
* In Finder, press `Command-Up` to go up a directory.
* [Monosnap](https://monosnap.com/welcome) is a neat screen recording tool to create gifs to add to your PRs.
* [Flexbox](http://www.w3schools.com/css/css3_flexbox.asp) is a sweet CSS3 layout mode.
  * Can make content respond to available space, display in any direction.
* In Sass, `&` references the parent selector.

{% highlight sass %}
#main {
  color: black;
  &-sidebar {
    border: 1px solid;
  }
}
{% endhighlight %}

Compiles to:

{% highlight css %}
#main {
  color: black;
}

#main-sidebar {
  border: 1px solid;
}

{% endhighlight %}

* The `/etc/hosts` file is used by the operating system to map *hostnames* to *IP addresses*
  * The line `127.0.0.1 localhost` means that your system will not do a DNS lookup for `localhost` and it will be redirected directed to the IP address `127.0.0.1`
* After installing a new gem using [rbenv](https://github.com/rbenv/rbenv) make sure to use `rbenv rehash` to install the shims needed to make the gem's commands executable.
* The 401(K) plan is the American equivalent of the RRSP
  * Set up with your employer and contributions come from payroll deductions.
* [Questrade](http://www.questrade.com/) is a brokerage that is not owned by a bank.
  * Cheap trades of $4.95 for stocks and free ETF trades.
* A **Penny Stock** is a stock that trades at a relatively low price.
  * Highly speculative and risky stocks: Gamble
  * Lack of liquidity: Tough to buy or sell without affecting price.
  * Large bid-ask spreads
  * The **Penny Stock Fallacy** is to think that many of today's stocks were once penny stocks.
    * Counter example: Microsoft  was $21 and Wal-Mart was $16.50 on their first day of trading.
* **Boiler Room Tactic** is when a broker gives customers only positive information about a stock and discourages them from doing any outside research.
  * High pressure selling by phone.
* Weekly Vim
  * In insert mode, `CTRL-w` and `CTRL-u` backspace a word/line. Also works on the command line.
  * Can execute arbitrary command line commands with `:!{command}`
