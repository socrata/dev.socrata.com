# -*- encoding: utf-8 -*-
# stub: cliver 0.3.2 ruby lib

Gem::Specification.new do |s|
  s.name = "cliver".freeze
  s.version = "0.3.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Ryan Biesemeyer".freeze]
  s.date = "2013-12-13"
  s.description = "Assertions for command-line dependencies".freeze
  s.email = ["ryan@yaauie.com".freeze]
  s.homepage = "https://www.github.com/yaauie/cliver".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.1.2".freeze
  s.summary = "Cross-platform version constraints for cli tools".freeze

  s.installed_by_version = "3.1.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 3
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_development_dependency(%q<bundler>.freeze, ["~> 1.3"])
    s.add_development_dependency(%q<rake>.freeze, [">= 0"])
    s.add_development_dependency(%q<rspec>.freeze, [">= 0"])
    s.add_development_dependency(%q<ruby-appraiser-reek>.freeze, [">= 0"])
    s.add_development_dependency(%q<ruby-appraiser-rubocop>.freeze, [">= 0"])
    s.add_development_dependency(%q<yard>.freeze, [">= 0"])
  else
    s.add_dependency(%q<bundler>.freeze, ["~> 1.3"])
    s.add_dependency(%q<rake>.freeze, [">= 0"])
    s.add_dependency(%q<rspec>.freeze, [">= 0"])
    s.add_dependency(%q<ruby-appraiser-reek>.freeze, [">= 0"])
    s.add_dependency(%q<ruby-appraiser-rubocop>.freeze, [">= 0"])
    s.add_dependency(%q<yard>.freeze, [">= 0"])
  end
end
