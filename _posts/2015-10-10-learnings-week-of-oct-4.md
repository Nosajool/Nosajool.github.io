---
title: Learnings week of Oct 4
layout: learnings
published: true
---
* [mocha](https://github.com/freerange/mocha) is a mocking a stubbing library for Ruby tests.

* **ACH** (Automated Clearing House) is an electronic network for financial transactions in the United States.
  * Can be used to debit directly from a client's checking or savings account.

* Can use `gem server` to start up a local web server that hosts the RDoc for your installed gems at http://localhost:8808.
  * If you are missing docs, run `gem rdoc [--all|gem_name]`

* In IRB, you can retrieve the last return value using `_`:

{% highlight ruby %}
irb(main):001:0> 5 + 6
=> 11
irb(main):002:0> _ * 3
=> 33
{% endhighlight %}

* `git commit -v` shows the unified diff of the commit while editing the commit message.

* Users only care about *perceived performance*. There are many front end techniques you can use to trick your users into thinking your app is faster than it actually is.
  * Facebook loads pages in blocks, drawing on screen before any of the data loads.
  * When deleting an Instagram comment, the `DELETE` request isn't sent until you leave the comments part of the app, just incase you want to undo.
  * Instagram also uploads your photos while you are adding filters.
    * The blue progress bar used when you click "share" doesn't actually do any uploading, just applies the transformations.

* [Guard](https://github.com/guard/guard) is a command line tool to handle events on file system modifications.
  * Can be used to run tests when files change.

* [How to Copy Paste with tmux on Mac OS X](https://robots.thoughtbot.com/how-to-copy-and-paste-with-tmux-on-mac-os-x)

* **Reconcilliation** in accounting terms is the process of ensuring that 2 sets of records are in agreement.

* **Liquidation** occurs when a business goes bankrupt.
  * Assets are sold to pay creditors.
  * Leftovers go to **preferred shareholders**.
  * Leftovers go to **common shareholders**

* **Preferred stock**
  * Higher claim on assets than common stock.
  * Have dividend that must be paid out before dividends to common shareholders
  * No voting rights for board of directors.
  * Predictable income, low potential appreciation.
  * **Callable**: company has the right to redeem or repurchase the shares after a specified date.

* A **Derivative** is a contract whose value derived from the underlying assets.
  * These assets can be things like stocks, bonds, commodities, currencies, interest rates, market rates etc...

* A **Futures Contract** is a derivative to buy or sell a commodity or financial instrument at a pre-determined price in the future.
  * Protects producers and suppliers from price changes.
  * If the price of the commodity goes up, the investor profits as they are purchasing for a lower than market price. Vice-versa if the price goes down.

* An **Option** is a derivative that offers the buyer the right to buy or sell a security at an agreed-upon price known as the **strike price**.
  * **Call options** give option to buy at a certain price so the buyer wants the stock to go up.
  * **Put options** give option to sell at a certain price so the buyer wants the stock to go down.
  * **ESO**s or Equity Stock Options are granted to employees as a form of compensation and are generally non-transferable.
  * You can also purchase options.
    * One strategy used by Hedge Funds is to purchase Put options with a strike price slightly below the market price.
    * If the stock crumbles, you can sell your stock at the strike price so you don't lose as much.

* Weekly Vim
  * `=` will auto indent the selected text.
  * `gg` to go to top of file, `G` to jump to bottom of file.

* Played around with some more Vim plugins
  * [vim-airline](https://github.com/bling/vim-airline) lets you customize your vim status line. I like using it to visualize buffes.
  * [vim-rails](https://github.com/tpope/vim-rails) to easily jump around a project.
    * Super useful for Shopify since it is a monolith Rails project.

