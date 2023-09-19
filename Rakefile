require 'colorize'
require 'httparty'
require 'json'
require 'erb'
require 'rspec'
require 'rspec/core/rake_task'
require 'open3'
require 'timeout'

# Variables and setup
SHA = `git rev-parse --short HEAD`.strip
DATE = `git show --pretty="format:%at" HEAD | head -n 1`.strip
STAMP = <<-STAMP
define STAMP
{
  "sha" : "#{SHA}",
  "href" : "https://github.com/socrata/dev.socrata.com/commit/#{SHA}",
  "date" : #{DATE}
}
STAMP
URL = "https://dev-socrata-com-#{ENV['BUILD_NUMBER'] || SHA}.surge.sh"

# Borrowed from https://github.com/fedspendingtransparency/openbeta/blob/master/Rakefile
def exec_and_manually_watch_for_errors(cmd)
  stderr_output = []
  # we want to monitor stderr without blocking it from printing live
  # so we setup a pipe and fork a seperate process to run the command
  rd, wr = IO.pipe
  fork do
    system(cmd, out: :out, err: wr)
  end
  wr.close   # close the write end of the pipe, since we don't need it.
  rd.each_line { |line|
    $stderr.puts line;
    stderr_output << line.chomp
  }
  if stderr_output.any?
    # jekyll doesn't exit 1 if something fails to build, so instead we
    # check if anything printed to stderr, and if so, exit 1 ourselves
    exit 1
  end
end

task :default => [:clean, :jekyll]

desc "clean up after ourselves"
task :clean do
  puts "Cleaning up after ourselves...".green
  sh "rm -rf public"
end

desc "perform a full jekyll site build"
task :jekyll do
  Rake::Task['vendor'].invoke

  puts "Performing a full build...".green
  exec_and_manually_watch_for_errors 'bundle exec jekyll build'
end

desc "vendor js library"
task :vendor do
  unless Dir.exist?('node_modules')
    puts "Running npm install...".green
    exec_and_manually_watch_for_errors 'npm install'
  end

  puts "Vendoring files from node_modules into common/js/lib".green
  { 'node_modules/openapi-explorer/dist/browser/openapi-explorer.min.js' => 'common/js/lib/openapi-explorer.min.js'
  }.each do |src, tgt|
    exec_and_manually_watch_for_errors "cp #{src} #{tgt}"
  end
end

desc "automatically rebuild (incrementally), running a local server"
task :serve do
  Rake::Task['vendor'].invoke

  # Span a background fork for our incremental build
  jekyll_pid = fork do 
    puts "Performing an incremental build...".green
    exec_and_manually_watch_for_errors 'bundle exec jekyll build --incremental --safe --watch'
  end

  # Spawn a background fork for our server
  server_pid = fork do 
    puts "Starting Rack server at http://localhost:9292...".green
    sh 'bundle exec rackup'
  end

  # Wait for them to finish or be killed
  Process.wait
end

desc "create a build and version build.json file"
task :stamp do
  puts "Stamping build.json for #{SHA}...".green
  File.open("public/build.json", 'w') { |f| f.write(STAMP) }
end

desc "perform a quick build with a stamp"
task :quick => [:incremental, :stamp] do
end

desc "run all tests"
task :test => [:jekyll, :rspec, :htmlproof]

desc "test links with htmlproof"
task :htmlproof => [:jekyll] do
  sh "bundle exec htmlproofer ./public/ --only-4xx --check-html --disable-external --url-ignore \"/#/,/\/foundry/,/\/register/,/APP_TOKEN/\""
end

desc "run rspec tests"
task :rspec do
  RSpec::Core::RakeTask.new(:spec) do |t|
    t.pattern = '_tests/*.rb'
  end
  Rake::Task["spec"].execute
end

desc "clean up the ROUTER file, so we can push staging sites to Surge.sh"
task :rm_router do
  sh "rm public/ROUTER"
end

desc "stage site to #{URL}"
task :stage => [:jekyll, :stamp, :rm_router] do
  puts "Staging content to #{URL}...".green
  sh "surge --project ./public --domain #{URL}"
end

desc "tear down site at #{URL}"
task :teardown do
  puts "Tearing down content at #{URL}...".green
  sh "surge --domain #{URL} teardown"
end

desc "allows you to clean up surge staged sites" 
task :surge_cleanup do
  sites = `surge list | grep dev-socrata-com`.lines.collect { |s| s.strip }

  puts "We will now " + "PERMANANTLY DELETE".on_red + " the following #{sites.count} sites:"
  sites.each { |s| puts " - #{s}" }

  print "Are you sure you want to do that? (y/N) ".green
  answer = STDIN.gets

  if answer.strip.downcase == "y"
    sites.each do |s|
      puts "Tearing down #{s}..."
      sh "surge --domain #{s} teardown"
    end
  else
    print "Aborted!".red
  end
end

desc "add a comment to a pull request with the staging URL, #{URL}"
task :tag_pull_request do
  response = HTTParty.post(
    "https://api.github.com/repos/#{ENV['TRAVIS_REPO_SLUG']}/issues/#{ENV['TRAVIS_PULL_REQUEST']}/comments",
    :body => {
      body: ":rocket: Site staged at #{URL}"
    }.to_json,
    :headers => {
      "Content-Type" => "application/json",
      "User-Agent" => "Travis Integration",
      "Authorization" => "token #{ENV['GITHUB_OAUTH_TOKEN']}"
    }
  )

  puts response.inspect
end

TEMPLATE = <<TMPL
---
layout: post
categories: <%= @category %>
tags:
<%= @tags.collect { |t| "- " + t.downcase }.join("\n") %>
title: "<%= @title %>"
date: <%= @date %>
author: <%= ENV['GITHUB_USERNAME'] || ENV['USER'] %>
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dictum augue ac lorem malesuada at rhoncus turpis condimentum. Maecenas commodo sem ac magna posuere ultrices. Proin ut felis ac odio consectetur rutrum vel quis sem.
TMPL

desc "generate a new blog post"
task :blog do
  @date = Time.now.strftime("%Y-%m-%d")

  print "Title: "
  @title = $stdin.gets.strip

  print "Category (default: 'blog'): "
  @category = $stdin.gets.strip
  @category = @category.empty? ? "blog" : @category

  print "Tags (comma separated): "
  @tags = $stdin.gets.strip.split(/\s*,\s*/)

  template = ERB.new(TEMPLATE)

  filename = "_posts/#{@date}-#{@title.gsub(/[^A-Za-z-]/, '-').gsub(/-\+/, '-').downcase}.md"
  File.open(filename, 'w') { |f| f.write(template.result) }
  system(ENV['EDITOR'], filename) if ENV['EDITOR']
end

desc "update the date for a blog post"
task :redate do
  post = ENV['POST']
  date = ENV['DATE'] || Time.now.strftime("%Y-%m-%d")

  raise "You must specify a POST to update!" unless File.exist?(post)
  raise "DATE must be in the correct YYYY-mm-dd format" unless date.match(/^\d{4}-\d{2}-\d{2}$/)

  IO.write(post, File.open(post) {|f| f.read.gsub(/^date: \d{4}-\d{2}-\d{2}/, "date: #{date}")})
  new_post = post.gsub(/\d{4}-\d{2}-\d{2}/, date)
  puts "#{post} -> #{new_post}"

  if system("git ls-files #{post} --error-unmatch")
    system("git mv #{post} #{new_post}")
  else
    system("mv #{post} #{new_post}")
  end
end

OPENAPI_TEMPLATE = <<TMPL
---
layout: openapi-explorer
custom_deps:
- /common/js/lib/openapi-explorer.min.js
custom_css:
- /common/css/openapi-customization.css
spec_url: /<%= spec_url %>
---
TMPL
desc "generate openapi-explorer files"
task :openapi do
  existing_apis = `git ls-files apis`
    .split($/)
    .select { |filename| File.extname(filename).match?(/json|ya?ml/) }

  created = existing_apis.map do |spec_url|
    md_filename = File.basename(spec_url)
      .gsub('_', '-')
      .sub(File.extname(spec_url), '.md')
      .yield_self { |basename| File.join('docs', 'other', basename) }

    if File.exist? md_filename
      puts "#{md_filename} already exists. Skipping."
      next
    end

    puts "Creating #{md_filename}."
    ERB.new(OPENAPI_TEMPLATE)
      .result_with_hash({ spec_url: spec_url })
      .yield_self { |contents| File.write(md_filename, contents) }
  end.compact

  puts "Don't forget to commit!" if created.any?
end

# Pre-compile task for Heroku
namespace :assets do
  task :precompile do
    puts `bundle exec jekyll build`
  end
end
