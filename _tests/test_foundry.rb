#!/usr/bin/env ruby

require 'capybara'
require 'capybara/rspec'
require 'capybara/poltergeist'

# Use Poltergiest for headless testing
# Capybara.register_driver :poltergeist do |app|
#   Capybara::Poltergeist::Driver.new(app, {
#     debug: true
#   })
# end
Capybara.javascript_driver = :poltergeist

# A somewhat dramatic way of loading my simple rack wrapper app
Capybara.app = eval "Rack::Builder.new {( " + File.read(File.dirname(__FILE__) +
                                                        '/../config.ru') + "\n )}"

describe '2.1 API, no redirect', :type => :feature, :js => true do
  it "loads and looks as expected" do
    visit '/foundry/soda.demo.socrata.com/b6kv-3wgw'

    # Check to make sure we have some elements we expect
    expect(find('#foundry-docs'))
    expect(find('h4.welcome').text).to include('Socrata API, powered by Socrata')
    expect(find('#splash .alert').text).to include('You\'re already using the latest version of this dataset API')
    expect(find('h1#title').text).to include('Old Backend Dataset Name')
    expect(find('#uid').text).to eq('b6kv-3wgw')
    expect(find('#foundry-docs .description').text).to include('This is the old backend dataset description')
    expect(find('#foundry-docs .endpoint .target').text).to include('/resource/b6kv-3wgw.json')
  end
end
