---
title: Learnings week of Oct 25 - Big Data Dictionary
layout: learnings
published: true
---
This week I started doing some work with the Data team and decided to look up some of the terms I kept seeing float around. 

* A **data warehouse** is a database for data from various sources used to support reporting and analytics.

* [Hadoop](https://hadoop.apache.org/) is a Java-based framework that supports proessing of large data sets in a distributed computing environment.
    * One processing example is **MapReduce**.
      * MapReduce is an implementation for processing and generating large data sets with a parallel, distributed algorithm on a cluster.
      * These large data sets can be stored in a file system like **HDFS**.

* [HDFS](http://hortonworks.com/hadoop/hdfs/) stands for Hadoop Distributed File System and is used to store large volumes of data.
  * A **NameNode** manages cluster metadata and **DataNodes** that store the data.
  * Data is replicated into large blocks on multiple DataNodes.
  * This distributed system makes reads very fast.
  * If a DataNode goes down, the NameNode creates a replica of the block onto another DataNode.

* [Apache Hive](https://hive.apache.org/) is a data warehouse infrastructure built on top of Hadoop to perform analysis on HDFS (ie: MapReduce) using a SQL-Like language called HiveQL.
  * SQL programmers can use this as an alternative to Hadoop/Java.

* [YARN](https://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/YARN.html) stands for Yet Another Resource Negotiator.
  * Hadoop was originally written solely as a MapReduce engine. You couldn't really run anything else.
  * Now in > Hadoop 0.23, we can run other types of jobs and we can use YARN to manage them.

* [HBase](https://hbase.apache.org/) is a distributed column-family oriented datastore built on top of HDFS.
  * Random-access, key-value store for structured data.

* **ETL** or Extract Transform Load is a process for data warehousing.
  * Extract data from data sources
  * Transform data into a nice format for querying
  * Load data into final target

* [Apache Pig](https://pig.apache.org/) is a platform used to create MapReduce programs used with Hadoop.
  * Language for the platform is called **Pig Latin**.

* [Impala](http://impala.io/) allows one to query HDFS using SQL without data movement or transformation.


* [Elasticsearch](https://www.elastic.co/) is search engine server that allows you to index your documents and perform full text searches.
  * HTTP web interface and REST API.
  * Schemaless JSON documents.

* [Zookeeper](http://zookeeper.apache.org/) is a coordination service for maintaining configuration information, synchronization and group services for distributed applications.

* [Apache Spark](http://spark.apache.org/) is a cluster computing framework that performs much faster than Hadoop MapReduce.
  * Uses more RAM than network and disk I/O.
    * Data stored in-memory while Hadoop stores data on disk.

* [Flume](https://flume.apache.org/) is a distributed service for collecting, aggregating and moving large amounts of
  log data into Hadoop.

* [Kafka](http://kafka.apache.org/) is a publish-subscribe messaging system.
  * Take the logs from your various infrastructure components and send them to a central commit log.
  * **Producers** like your application write to the commit log.
  * **Consumers** like your monitoring system and Hadoop clusters fetch from the commit log.

* [Sqoop](http://sqoop.apache.org/) is a tool to transfer data betweeen Hadoop and relational database servers.

* [Tableau](http://www.tableau.com/) provides interactive data visualization tools.

* You can swap panes in tmux using `prefix-{` or `prefix-}`

* `%w` in Ruby:
{% highlight ruby %}
irb(main):001:0> %w(This is neat)
=> ["This", "is", "neat"]
{% endhighlight %}

* A **Candlestick Chart** displays the high, low, opening and closing prices for a security for a single day.
  * **Wide part** is called the **real body**: Tells investors whether the closing price was higher or lower than the opening price.
  * The **shadows** show the day's high and lows and how they compare to the open and close.
  * Long candles means that there was large price movements while smaller ones mean small price movements.
