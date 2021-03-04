# -*- encoding: utf-8 -*-
# stub: ferret 0.11.8.7 ruby lib
# stub: ext/extconf.rb

Gem::Specification.new do |s|
  s.name = "ferret".freeze
  s.version = "0.11.8.7"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["David Balmain".freeze]
  s.date = "2017-04-14"
  s.description = "Ferret is a super fast, highly configurable search library.".freeze
  s.email = "dbalmain@gmail.com".freeze
  s.executables = ["ferret-browser".freeze]
  s.extensions = ["ext/extconf.rb".freeze]
  s.extra_rdoc_files = ["README.md".freeze, "TODO".freeze, "TUTORIAL.md".freeze, "MIT-LICENSE".freeze, "ext/r_analysis.c".freeze, "ext/r_index.c".freeze, "ext/r_qparser.c".freeze, "ext/r_search.c".freeze, "ext/r_store.c".freeze, "ext/r_utils.c".freeze, "ext/ferret.c".freeze]
  s.files = ["MIT-LICENSE".freeze, "README.md".freeze, "TODO".freeze, "TUTORIAL.md".freeze, "bin/ferret-browser".freeze, "ext/extconf.rb".freeze, "ext/ferret.c".freeze, "ext/r_analysis.c".freeze, "ext/r_index.c".freeze, "ext/r_qparser.c".freeze, "ext/r_search.c".freeze, "ext/r_store.c".freeze, "ext/r_utils.c".freeze]
  s.homepage = "http://github.com/dbalmain/ferret".freeze
  s.rdoc_options = ["--title".freeze, "Ferret -- Ruby Search Library".freeze, "--main".freeze, "README".freeze, "--line-numbers".freeze, "TUTORIAL".freeze, "TODO".freeze]
  s.rubygems_version = "3.1.2".freeze
  s.summary = "Ruby indexing library.".freeze

  s.installed_by_version = "3.1.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_development_dependency(%q<rake>.freeze, [">= 0"])
  else
    s.add_dependency(%q<rake>.freeze, [">= 0"])
  end
end
