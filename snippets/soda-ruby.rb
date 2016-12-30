---
type: snippet
title: soda-ruby
language: Ruby
description: "The [`soda-ruby`](https://github.com/socrata/soda-ruby) gem is a simple wrapper around the SODA APIs that makes usage with Ruby more natural."
see_also:
- name: soda-ruby on GitHub
  url: https://github.com/socrata/soda-ruby 
- name: Upsert via soda-ruby
  url: https://socrata.github.io/soda-ruby/examples/upsert.html
---
#!/usr/bin/env ruby

require 'soda/client'
%%if_private%%
client = SODA::Client.new({:domain => "%%domain%%", :app_token => "YOURAPPTOKENHERE",
                           :username => "user@agency.gov", :password => "password"})
%%else%%
client = SODA::Client.new({:domain => "%%domain%%", :app_token => "YOURAPPTOKENHERE"})
%%end%%

results = client.get("%%uid%%", :$limit => 5000)

puts "Got #{results.count} results. Dumping first results:"
results.first.each do |k, v|
  puts "#{key}: #{value}"
end
