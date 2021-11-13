---
title: Learnings week of Nov 1 - resque workers, byebug, virtualenv, ActiveRecord
layout: learnings
published: true
---
* `bundle exec rake resque:work` to start a Resque worker.
  * `tail logs/jobs.log`
* Use `has_key` when testing named hashes in minitest.
* When debugging with [byebug](https://github.com/deivid-rodriguez/byebug), `e` gives you the error.
* [Thor](https://github.com/erikhuda/thor) is a toolkit for building command line interfaces.
* [Virtualenv](https://virtualenv.readthedocs.org/en/latest/) is a development environment for python to isolate dependencies
  * Kind of like bundler for Ruby projects
* [Viscosity](https://www.sparklabs.com/viscosity/) is an OpenVPN client for Mac & Windows
* `ActiveRecord::Base#unscoped` returns a scope for a model without previously set scopes VERIFY which class has this method

{% highlight ruby %}
class Post < ActiveRecord::Base
  def self.default_scope
    where published: true
  end
end

Post.all # "SELCT * FROM posts WHERE published = true"
Post.unscoped.all # "SELECT * FROM posts"
{% endhighlight %}

* The **90/10 Strategy** involves deploying 90% of one's investment capital in low risk investments and 10%  in high risk investments.
* A **Valium Picnic** is a slang word for a slow trading day / market holiday.
  * **Valium** is the proprietary name for **diazepam**, a pharmaceutical drug known for causing drowsiness.
* **Margin** is borrowed money used to purchase securities.
  * Gains and losses amplified.
  * Interest on borrowed money.
* **Leverage** is the use of borrowed capital such as margin to increase potential return of an investment.
* **CPP**, the Canadian Pension Plan and the United States Social Security Benefits
  * Contributions made through payroll deductions.
* Weekly Vim
  * `r` to replace the character under your key
  * Remapped `H` and `L` jump to the beginning and end of the line.
  * `set wildmenu` for a nice menu when using `:{command}` completion
  * map `jj` to `<ESC` in insert mode to quickly leave insert mode.
