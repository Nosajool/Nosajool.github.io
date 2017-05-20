---
title: Learnings week of Sept 20
layout: learnings
published: true
---
First week with my team. Really exciting project so I can't wait to get started!

* [Buildkite](https://buildkite.com/) is used for continuous integration to create builds and run tests.
  * Accepts Github webhooks and pushes notifications to Slack
* Rails does not make any distinction between **query string parameters** and **POST** parameters.
  * Both are available in the `params` hash in your controller.
* [Datadog](https://www.datadoghq.com/) is used to monitor our infrastructure.
  * Can use to view response times, successful payments, signups, exceptions, etc...
  * Can set up monitors to page people when shit goes down.
* `kill` command sends signals to running processes in order to request the termination of the process.
* Resetting your Mac's PRAM (Parameter Random Access Memory)
  1. Shut down machine
  2. Press power and immediately hold down `command-options-p-r` until you hear the startup chime.
* Database Sharding is used to horizontally partition your database.
  - Reduce the number of rows in a table by splitting the data onto different servers.
    - Reducing table size reduces index size, leading to faster reads.
* The [state_machines](https://github.com/pluginaweek/state_machine) gem provides an easy way to create state machines
  for a Ruby class.
  * Make it really easy to design the life of a resource.
  * [state_machines-audit_trail](https://github.com/state-machines/state_machines-audit_trail) helps keep a history of these state transitions.
    * Important for Data teams and financial data.
* [Large Hadron Migrations](https://github.com/soundcloud/lhm) are used to perform migrations online without locking database tables.
  * It achieves this by copying ranges from the original table to a copy table and then renaming both tables.
  * During the copying, incoming `CREATE`, `UPDATE` and `DELETE` statements are stored in a journal table which is replayed onto the new table at the end.
* [Resque](https://github.com/resque/resque) is a Redis-backed ruby library for creating background jobs, placing in multiple queues and processing later.
    * Includes Rake task to start worker to process jobs
    * Includes a Sinatra Web app for monitoring queues, jobs and workers
    * Persistent jobs, constant time push and pop, jobs stored as JSON packages
  * [Progressrus](https://github.com/Sirupsen/progressrus) can be used to provide progress updates of the jobs given a prediction.
* The following are equivalent in Ruby:
{% highlight ruby %}
class Test
  def self.hi
  end
end
{% endhighlight %}
{% highlight ruby %}
class Test
  class << self
    def self.hi
    end
  end
end
{% endhighlight %}
{% highlight ruby %}
class Test
  def Test.hi
  end
end
{% endhighlight %}

* The **Stock Market** is the market where shares of publicly held companies are issued and traded.
  * Provides companies with access to capital in exchange for pieces of ownership in their company.
  * Provides investors opportunity to participate in company growth and potentially make money.
  * To find out how the stock market is performing, we consult **indexes** that represent a portion of the stock market or all of the stock market.
* The **DJIA** or Dow Jones Industrial Average is a weighted index of the market price of the 30 largest publicly traded companies on the New York Stock Exchange.
  * Includes companies like Apple, Microsoft, Mcdonalds, Disney, Coca-Cola
    * All considered **Blue Chip companies**: Well established financially sound company.
      * Name "Blue Chip" came from poker where the highest value chip was the colour blue.
* **Return** is the gain or loss of a security in a particular period
  * The income and capital gains relative on an investment
  * Usually quoted as a percentage
* **Risk** The chance that an investment's actual return will be different than expected.
  * Usually calculated by looking at the **standard deviation** of historical returns.
    * High standard deviation -> High degree of risk: Stock is **volatile**.
    * Low standard deviation -> Low degree of risk.
* The **Order Book** is the list of the public market.
  * Who is selling and buying what for what price.
* A **Hedge fund** uses pooled strategies and aggressive strategies to earn better than average returns.
  * One strategy that **High Frequency Traders** use is  **Order Book Observation**.
    * Observe that a stock is falling, start short selling automatically.
  * Another is called **Arbitrage** and requires multiple stock exchanges.
    * Simultaneous purchase and sale of an asset in order to profit by exploiting price differences for similar stocks in different markets.
* The **bid price** is the amount a buyer is willing to pay for a security.
* The **ask price** is the amount a seller will accept for a security.
* The **spread** is the difference between the highest bid price and the lowest ask price.
  * The more liquid a stock is, the smaller the spread.
* **Market orders** drive prices up if there is a lot of buying and drive prices down if there is a lot of selling.
  * This is because buy market orders always remove the lowest ask price, which inevitably increases when all the stock at that price is fulfilled.
  * Vice-versa for sell market orders.
* Weekly Vim
  * `$` moves you to the end of the line and `^` moves you to the first non blank character of the line.
  * `CTRL-o` let's you jump back to a previous line you were on. Can repeat multiple times. `CTRL-i` goes in the
    opposite direction.
  * `D` deletes from cursor position until the end of the line.
  * `C` edits text from cursor position to end of the line.
  * Using `ciw` for "change inner word" very frequently.
