# -*- encoding: utf-8 -*-
# stub: rack-contrib 2.1.0 ruby lib

Gem::Specification.new do |s|
  s.name = "rack-contrib".freeze
  s.version = "2.1.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["rack-devel".freeze]
  s.date = "2018-10-04"
  s.description = "Contributed Rack Middleware and Utilities".freeze
  s.email = "rack-devel@googlegroups.com".freeze
  s.extra_rdoc_files = ["README.md".freeze, "COPYING".freeze]
  s.files = ["COPYING".freeze, "README.md".freeze]
  s.homepage = "https://github.com/rack/rack-contrib/".freeze
  s.licenses = ["MIT".freeze]
  s.rdoc_options = ["--line-numbers".freeze, "--inline-source".freeze, "--title".freeze, "rack-contrib".freeze, "--main".freeze, "README".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.2.2".freeze)
  s.rubygems_version = "3.1.2".freeze
  s.summary = "Contributed Rack Middleware and Utilities".freeze

  s.installed_by_version = "3.1.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 2
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<rack>.freeze, ["~> 2.0"])
    s.add_development_dependency(%q<bundler>.freeze, ["~> 1.0"])
    s.add_development_dependency(%q<git-version-bump>.freeze, ["~> 0.15"])
    s.add_development_dependency(%q<github-release>.freeze, ["~> 0.1"])
    s.add_development_dependency(%q<i18n>.freeze, ["~> 0.6", ">= 0.6.8"])
    s.add_development_dependency(%q<json>.freeze, ["~> 2.0"])
    s.add_development_dependency(%q<mime-types>.freeze, ["~> 3.0"])
    s.add_development_dependency(%q<minitest>.freeze, ["~> 5.6"])
    s.add_development_dependency(%q<minitest-hooks>.freeze, ["~> 1.0"])
    s.add_development_dependency(%q<mail>.freeze, ["~> 2.3", ">= 2.6.4"])
    s.add_development_dependency(%q<nbio-csshttprequest>.freeze, ["~> 1.0"])
    s.add_development_dependency(%q<rake>.freeze, ["~> 10.4", ">= 10.4.2"])
    s.add_development_dependency(%q<rdoc>.freeze, ["~> 5.0"])
    s.add_development_dependency(%q<ruby-prof>.freeze, ["~> 0.17"])
  else
    s.add_dependency(%q<rack>.freeze, ["~> 2.0"])
    s.add_dependency(%q<bundler>.freeze, ["~> 1.0"])
    s.add_dependency(%q<git-version-bump>.freeze, ["~> 0.15"])
    s.add_dependency(%q<github-release>.freeze, ["~> 0.1"])
    s.add_dependency(%q<i18n>.freeze, ["~> 0.6", ">= 0.6.8"])
    s.add_dependency(%q<json>.freeze, ["~> 2.0"])
    s.add_dependency(%q<mime-types>.freeze, ["~> 3.0"])
    s.add_dependency(%q<minitest>.freeze, ["~> 5.6"])
    s.add_dependency(%q<minitest-hooks>.freeze, ["~> 1.0"])
    s.add_dependency(%q<mail>.freeze, ["~> 2.3", ">= 2.6.4"])
    s.add_dependency(%q<nbio-csshttprequest>.freeze, ["~> 1.0"])
    s.add_dependency(%q<rake>.freeze, ["~> 10.4", ">= 10.4.2"])
    s.add_dependency(%q<rdoc>.freeze, ["~> 5.0"])
    s.add_dependency(%q<ruby-prof>.freeze, ["~> 0.17"])
  end
end
