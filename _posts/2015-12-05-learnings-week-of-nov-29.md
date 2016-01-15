---
title: Learnings week of November 29
layout: learnings
published: true
---
* Can use `instance_variable_get` to check the values of your variables.
  * Sometimes useful for tests.

* **i18n** is an abbreviation for **internationalization**
  * There are 18 letters between the first **i** and the last **n**.

* A **dimensional model** is a Data warehouse Design Technique using *dimensions* and *facts*.
  * A **Fact Table** is a table containing measurements. For example: Sales, Quantity, Location.
  * A **Dimension** is a table containing business elements. For example: Shirt, Colour, Size.
  * A **Slow Changing Dimension**(SCD) is a dimension that changes over time.
    * In Data Warehouses, it is important to keep track of these changes.

* In Ruby, `_` in Numbers are ignored and can be used for readability.
{% highlight ruby %}
irb(main):001:0> 100_000 == 100000
=> true
{% endhighlight %}

* **PORO** stands for Plain Old Ruby Object

* You take a **long position** when you buy and believe a security will rise in value.

* To **exercise** an option means to put into effect the right specified in the contract.
  * Most options are not exercised; expired or closed by opposing positions

* **In The Money** refers to an option that will produce a profit if it is exercised.
  **At The Money** is when the option's **strike price** is identical to the security market price.

* The **Premium** is the total cost of an option including the intrinsic value plus the time value and volatility factor.

* **Leverage** is the use of borrowed money to increase the rate of return on an investment.

* The **Uptick Rule**, also known as Rule 201 requires that every short sale must be entered at a price that is higher than the price of the previous trade.
  * Prevents short sellers from adding to downward momentum
  * By entering price above current bid, order will be fulfilled on an "uptick"
  * Certain liquid securities are excluded from this rule such as market ETFs.
