---
title: Learnings week of Sept 13
layout: learnings
published: true
---
Week 2 at Shopify. This week was RnD onboarding and we had workshops and code labs to work on throughout the week as well as talks from developers from different teams.

* [Shipit](https://github.com/Shopify/shipit-engine) was created and is used by Shopify to allow every developer at Shopify to deploy their changes to production with the click of a button.
  * Also allows easy rollbacks and/or reverting capabilities.

* **Fixtures** are sample data that can be used to populate test databases.
  * Written in YAML format in the `test/fixtures` directory.

* A **Datacentre Failover** is making a switch to another datacentre.

* [nginx](https://www.nginx.com/) is a web server with a focus on high concurrency, performance and low memory usage.
  * Can be used as a **load balancer**: A reverse proxy to distribute traffic across application servers.
  * Has 1 master process and multiple worker processes.
    * The master reads and evaluates the *nginx.conf* file and manages the worker processes which each process requests.

* [BEM](http://getbem.com/introduction/) stands for Blocks, Elements, Modifiers.
  * Methodology for naming css classes in large projects providing modularity, reusability and structure.

* [Turbograft](https://github.com/Shopify/turbograft) is a modified version of [Turbolinks](https://github.com/rails/turbolinks) allowing partial page refreshes.
  * Works by intercepting requests and fetching new body via Ajax whenever possible.
  * I guess this is what Turbolinks 3.0 will be like.

* `git push +branchname` will force push only to one branch.
  * `-f` applies to all refs that are being pushed.

* [Splunk](http://www.splunk.com/) provides a web interface that allows searching through big data.
  * Contains information like application logs, message queues, database transactions, etc...

* [Phabricator](http://phabricator.org/) is a suite of open source web applications for software development.
  * One of them is called **Differential** and has some neat features like *incremental diffs* and *seeing what code reviews you need to do*.

* `top` displays a sorted list of system processes.
  * `ps aux` provides a snapshot showing processes for all users, displaying in a user-oriented fromat, as well as processes without a *tty*.
    * `tty` is a terminal.

* `script` creates a typescript of everything printed on your terminal.
  * If argument file is given, save to a file.

* [ctags](http://ctags.sourceforge.net/whatis.html) is a tool that will go through your code, indexing objects in a *tags* file.
  * With vim, you can highlight a function call and use `<Ctrl-]>` to jump to the definition.
  * Can also use `:CtrlPTag` to search for tags using ctrlp.

* **Interest Rates** are determined by the central bank. Government economic observers create a policy to ensure stable prices and liquidity for the country.
  * Retail banks usually are the first to expose money to the economy. By adjusting the interest rates on the money the government lends to or borrows from the retail banks, the central bank can regulate the supply of money to individuals and companies.
  * To decrease the money supply, the government will increase the interest rate, making it attractive to deposit funds to gain more interest and reducing borrowing from the central bank.
  * On the other hand, to increase the money supply, the government will decrease the interest rate. This makes it attractive to borrow money with low interest rates.
    * Becoming a problem in Canada: Interest rates are so low so people are buying houses and cars. Demand is high, so there is a lot of inflation.

* A **bond** is a debt investment issued by governments and corporations for the purpose of financing.
  * The **Face Value** is the amount the investor purchases the bond for.
  * The **Coupon** is the bond's interest rate.
    * The higher the coupon, the riskier it is there is a greater chance for the issuer to *default* the bond.
    * **Interest Rate Risk** is the risk that an investment's value will decrease if the interest rate rises.
      * The bond value and interest rate are inversely proportional.
  * The **Maturity Date** is the date the bond issuer repays the loan to the investor.
  * Can sell bonds before they mature.

* A **stock** is a type of security that signifies ownership in a corporation.
  * Ownership of a portion of a corporation's assets and earnings.
  * A **dividend** is a cash distribution by a corporation to its shareholders.
    * A company that is growing rapidly probably won't pay dividends because it wants to invest as much as possible into further growth.
    * A company that things it is better to reinvest their earnings also won't pay dividends.
    * Investors like steady income from dividends so offering them will make their stock more appealing.
      * Greater demand for stock increases its price.


* A **mutual fund** is a pool of stocks, bonds or other securities.
  * Investing in a mutual fund is purchasing units of a professionally managed portfolio.
  * There are management fees but good for investors that don't have the time to manage a portfolio.
  * Priced once a day after the market closes.

* You can **short a stock** when you think a stock will go down in price.
  * Borrow shares of a stock and immediately sell them.
  * You must return those stocks at some point so if you purchase them back when the price goes down, you make money on the difference.
    * If you purchase them back when the price goes up, you lose money.

* **ETF**s are Exchange Traded Funds
  * Similarly to a mutual fund, ETFs generally hold a portfolio of stocks, bonds or commodities.
  * ETF trades on the stock exchange and prices are updated throughout the day
  * Can *short* an ETF in the same way as a stock.

* There are 2 types of orders to buy stock
  * **Market Order** buys or sell a stock at the best price available at the time the order is placed.
    * Quick to fill order, guaranteed execution.
  * **Limit Order** buys or sell a stock at a set price.
    * Control over price, can take longer to fill or might even expire.

* A stock that is on different exchanges is called **interlisted**.

* The major stock exchanges in Canada and the US are:
  * NYSE: New York Stock Exchange
  * NASDAQ: National Association of Securities Dealers Automated Quotations
  * TSX: Toronto Stock Exchange

* Vim
  * `CTRL-]` and `CTRL-o` to navigate the vim help links.
  * `CTRL-e` and `CTRL-y` to move screen up and down without moving cursor.
  * `u` and `CTRL-r` provide undo and redo capabilities.
  * `zz`, `zt`, `zb` moves screen to be centered at the middle, top and bottom respectively, keeping your cursor on the current line.
  * Using [Vundle](https://github.com/VundleVim/Vundle.vim) as my plugin manager
    * [Nerdtree](https://github.com/scrooloose/nerdtree) to visualize my file structure.
    * [ctrlp](https://github.com/ctrlpvim/ctrlp.vim) as my file finder.
    * [syntastic](https://github.com/scrooloose/syntastic) for syntax checking.
    * [commentary](https://github.com/tpope/vim-commentary) to quickly comment lines.
    * [endwise](https://github.com/tpope/vim-endwise) for adding end structures for Ruby.
    * [emmet](https://github.com/mattn/emmet-vim) for html expansion.
    * [IndentWise](https://github.com/jeetsukumaran/vim-indentwise) for motions based on indent depths.
      * Need to find better keybindings for these. Seems useful but default bindings are far from the home row.
