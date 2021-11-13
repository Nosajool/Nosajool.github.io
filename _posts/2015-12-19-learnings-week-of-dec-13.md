---
title: Learnings week of Dec 13 - HTTP Cookies, pry
layout: learnings
published: true
---

* The giant tanks on Hoth in The Empire Strikes back are called *AT-AT* Walkers (All Terrain Armored Transport).
* [pry](https://github.com/pry/pry) is an awesome IRB alternative that can be used for debugging. My favourite part is that you can `cd` into objects use and `ls` to see its methods.
* **HTTP Cookie** is a small piece of data stored in a user's browser and sent along with subsequent requests to the server to notify the server of previous activity.
  * 4kb size limit for key value pairs
  * Each request sends all cookies
  * For user session information, Rails stores a special `session` cookie containing entire session hash.
    * Storing stuff in the `cookies` hash gets stored in individual cookies.
* When you buy **insurance**, you transfer the potential loss costs to the insurance company in exchange for a fee known as the **premium**.
  * Insurance companies then invest the funds so it can pay out claims.
  * The higher the risk, the higher the premium.
  * **Idemnity** is the protection against a financial loss.
* The **SEC** or Securities and Exchange Commission is a government agency to enforce securities laws.
* **SEC Filings** are reports on a company's history, progress and future.
* The **Annual Report** is an annual publication that public corporations must provide to shareholders to describe operations and financial conditions.
* The **FY** or Fiscal Year is used in accounting to denote the beginning and end of one year of business activity.
* The **10-K** is a yearly comprehensive summary report of a company's report containing much more detail than the annual report.
  * **10-Q** report is submitted quarterly. (35 days after each of the first 3 fiscal quarters)
* The **Black-Scholes** model is used to calculate the theoretical price of stock options.
  * Takes into account, current price, strike price, expiration time, volatility, interest rates
  * **Cox-Rubenstein Binomial Option Pricing Model** is a variation that looks at the security over a period of time rather than just at one point in time.
* A **naked position** is a trading position where the seller is not protected against adverse price movements.
  * To cover a naked position, you can buy **put options**.
