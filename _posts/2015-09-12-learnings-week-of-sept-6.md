---
title: Learnings week of Sept 6
layout: learnings
published: true
---
This was my first week at Shopify. All of the interns went through a commerce bootcamp so that we could familiarize ourselves with Shopify from a merchant and customer's perspective.

* `Command–Option–Power` puts your Mac to sleep.
  * Don't want coworkers aliasing `cd` to `exit` while you downstairs getting coffee.

* **Zsh** is an interactive shell.
  * Out of the box command line completion
  * Shared command history
  * Easily view command-line options

* Created [my own](https://github.com/Nosajool/dotfiles) set of [dotfiles](https://dotfiles.github.io/).
  * Learned that the way you usually install these on a new computer is by creating symbolic links from your dotfiles project to `~/`.
* A **payment gateway** is a service that authorizes credit card payments.
  * Shopify's [Active Merchant gem](https://github.com/activemerchant/active_merchant) provides a simple and unified API to access over 100 payment gateways including Stripe and Paypal.

* [Vagrant](https://www.vagrantup.com/) is a tool to build development environments.
  * Isolates dependencies and configuration in a disposable consistent environment.
  * Configuration is stored in a **Vagrantfile**.

* The **script/** directory in projects usually contain scripts to automate tasks.
  * Shopify has scripts to start servers, bootstrap projects and to list who worked on various files.

* [Vimwiki](https://github.com/vimwiki/vimwiki) is an awesome personal wiki for vim.
  * I use it to take daily notes and store things like my vim command reference.

* A **GIC** is a Guaranteed Investment Certificate
  * Contract that guarantees the owner principal repayment and interest rate for a predetermined period of time.
  * Usually low interest rate.
  * Two types:
    * **Non Redeemable GIC**'s can only be withdrawn after maturity date.
    * **Redeemable GIC**'s can be withdrawn before the maturity date.

* **TFSA** stands for Tax Free Savings Account
  * Investment income is not taxed even when withdrawn.
  * Limit is $5,500 a year in 2016. Was $10,000 in 2015.
    * Unused contribution room can be carried forward indefinitely.

* An **RRSP** is a Registered Retirement Savings Plan
  * An investment portfolio that is tax deductible and one that grows tax sheltered.
  * A **tax deduction** reduces your taxable income.
  * **Tax sheltering** means deferring taxes on investment earnings until later.
    * For an RRSP, you only pay taxes when you withdraw you money.
    * This is generally when you retire and your tax rate is lower since your income is lower.

* An **RRIF** is a Registered Retirement Income Fund is an extension of your RRSP.
  * Your RRSP turns into an RRIF automatically at the end of the year that you turn 71.
  * Still tax deferred growth however you must make minimum mandatory withdrawals each year.

* An **RESP** is a Registered Education Savings Plan
  * Tax sheltered plan with government assistance.
  * Cannot deduct contributions made to RESP from taxable income.
  * Multiple grants where the government will match contribution amounts.
    * CESG Canadian Education Savings Grant matches 20% on first $2500 contributed annually.

* An **IPO**, also known as the Initial Public Offering, is the first sale of stock from a private company to the public.
  * **IPO Lock-Up** is the period of time after a company has gone public where company insiders are forbidden from selling shares.
    * Large share holders selling stock could send stock spiraling downwards.

* **Underwriting** for commercial banking is assessing the credit worthiness of borrowers and agreeing to fund loans.
  * **Defaulting** is the failure to pay interest or principal when due.
      
* Vim commands of the week
  * `:h{word}` searches the vim help entries for `{word}`.
  * `f{char}` Moves cursor onto next occurence of `{char}`.
  * `t{char}` Moves cursor upto next occurence of `{char}`.
  * Type `vimtutor` in your terminal for an awesome introduction to vim.
  * `.` repeats last change
  * `>>` indents
  * `<<` unindents
  * `15G` jumps to line 15
