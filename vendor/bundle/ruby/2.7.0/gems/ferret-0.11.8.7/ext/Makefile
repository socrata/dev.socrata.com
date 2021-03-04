
SHELL = /bin/sh

# V=0 quiet, V=1 verbose.  other values don't work.
V = 0
Q1 = $(V:1=)
Q = $(Q1:0=@)
ECHO1 = $(V:1=@ :)
ECHO = $(ECHO1:0=@ echo)
NULLCMD = :

#### Start of system configuration section. ####

srcdir = .
topdir = /usr/include/ruby-2.7.0
hdrdir = $(topdir)
arch_hdrdir = /usr/include/x86_64-linux-gnu/ruby-2.7.0
PATH_SEPARATOR = :
VPATH = $(srcdir):$(arch_hdrdir)/ruby:$(hdrdir)/ruby
prefix = $(DESTDIR)/usr
rubysitearchprefix = $(sitearchlibdir)/$(RUBY_BASE_NAME)
rubyarchprefix = $(archlibdir)/$(RUBY_BASE_NAME)
rubylibprefix = $(libdir)/$(RUBY_BASE_NAME)
exec_prefix = $(prefix)
vendorarchhdrdir = $(sitearchincludedir)/$(RUBY_VERSION_NAME)/vendor_ruby
sitearchhdrdir = $(sitearchincludedir)/$(RUBY_VERSION_NAME)/site_ruby
rubyarchhdrdir = $(archincludedir)/$(RUBY_VERSION_NAME)
vendorhdrdir = $(rubyhdrdir)/vendor_ruby
sitehdrdir = $(rubyhdrdir)/site_ruby
rubyhdrdir = $(includedir)/$(RUBY_VERSION_NAME)
vendorarchdir = $(rubysitearchprefix)/vendor_ruby/$(ruby_version)
vendorlibdir = $(vendordir)/$(ruby_version)
vendordir = $(rubylibprefix)/vendor_ruby
sitearchdir = $(DESTDIR)./.gem.20210304-364-ui96pn
sitelibdir = $(DESTDIR)./.gem.20210304-364-ui96pn
sitedir = $(DESTDIR)/usr/local/lib/site_ruby
rubyarchdir = $(rubyarchprefix)/$(ruby_version)
rubylibdir = $(rubylibprefix)/$(ruby_version)
sitearchincludedir = $(includedir)/$(sitearch)
archincludedir = $(includedir)/$(arch)
sitearchlibdir = $(libdir)/$(sitearch)
archlibdir = $(libdir)/$(arch)
ridir = $(datarootdir)/$(RI_BASE_NAME)
mandir = $(datarootdir)/man
localedir = $(datarootdir)/locale
libdir = $(exec_prefix)/lib
psdir = $(docdir)
pdfdir = $(docdir)
dvidir = $(docdir)
htmldir = $(docdir)
infodir = $(datarootdir)/info
docdir = $(datarootdir)/doc/$(PACKAGE)
oldincludedir = $(DESTDIR)/usr/include
includedir = $(prefix)/include
runstatedir = $(DESTDIR)/var/run
localstatedir = $(DESTDIR)/var
sharedstatedir = $(prefix)/com
sysconfdir = $(DESTDIR)/etc
datadir = $(datarootdir)
datarootdir = $(prefix)/share
libexecdir = $(exec_prefix)/libexec
sbindir = $(exec_prefix)/sbin
bindir = $(exec_prefix)/bin
archdir = $(rubyarchdir)


CC_WRAPPER = 
CC = gcc
CXX = g++
LIBRUBY = $(LIBRUBY_SO)
LIBRUBY_A = lib$(RUBY_SO_NAME)-static.a
LIBRUBYARG_SHARED = -l$(RUBY_SO_NAME)
LIBRUBYARG_STATIC = -l$(RUBY_SO_NAME)-static $(MAINLIBS)
empty =
OUTFLAG = -o $(empty)
COUTFLAG = -o $(empty)
CSRCFLAG = $(empty)

RUBY_EXTCONF_H = 
cflags   = $(optflags) $(debugflags) $(warnflags)
cxxflags = 
optflags = -O3
debugflags = -ggdb3
warnflags = -Wall -Wextra -Wdeprecated-declarations -Wduplicated-cond -Wimplicit-function-declaration -Wimplicit-int -Wmisleading-indentation -Wpointer-arith -Wwrite-strings -Wimplicit-fallthrough=0 -Wmissing-noreturn -Wno-cast-function-type -Wno-constant-logical-operand -Wno-long-long -Wno-missing-field-initializers -Wno-overlength-strings -Wno-packed-bitfield-compat -Wno-parentheses-equality -Wno-self-assign -Wno-tautological-compare -Wno-unused-parameter -Wno-unused-value -Wsuggest-attribute=format -Wsuggest-attribute=noreturn -Wunused-variable
cppflags = 
CCDLFLAGS = -fPIC
CFLAGS   = $(CCDLFLAGS) -g -O2 -fdebug-prefix-map=/build/ruby2.7-W7xcA4/ruby2.7-2.7.0=. -fstack-protector-strong -Wformat -Werror=format-security -fPIC -Wall -D_FILE_OFFSET_BITS=64 -D_XOPEN_SOURCE=500 $(ARCH_FLAG)
INCFLAGS = -I. -I$(arch_hdrdir) -I$(hdrdir)/ruby/backward -I$(hdrdir) -I$(srcdir)
DEFS     = 
CPPFLAGS =  -Wdate-time -D_FORTIFY_SOURCE=2 $(DEFS) $(cppflags)
CXXFLAGS = $(CCDLFLAGS) -g -O2 -fdebug-prefix-map=/build/ruby2.7-W7xcA4/ruby2.7-2.7.0=. -fstack-protector-strong -Wformat -Werror=format-security $(ARCH_FLAG)
ldflags  = -L. -Wl,-Bsymbolic-functions -Wl,-z,relro -Wl,-z,now -fstack-protector-strong -rdynamic -Wl,-export-dynamic
dldflags = -Wl,-Bsymbolic-functions -Wl,-z,relro -Wl,-z,now 
ARCH_FLAG = 
DLDFLAGS = $(ldflags) $(dldflags) $(ARCH_FLAG)
LDSHARED = $(CC) -shared
LDSHAREDXX = $(CXX) -shared
AR = ar
EXEEXT = 

RUBY_INSTALL_NAME = $(RUBY_BASE_NAME)2.7
RUBY_SO_NAME = ruby-2.7
RUBYW_INSTALL_NAME = 
RUBY_VERSION_NAME = $(RUBY_BASE_NAME)-$(ruby_version)
RUBYW_BASE_NAME = rubyw
RUBY_BASE_NAME = ruby

arch = x86_64-linux-gnu
sitearch = $(arch)
ruby_version = 2.7.0
ruby = $(bindir)/$(RUBY_BASE_NAME)2.7
RUBY = $(ruby)
ruby_headers = $(hdrdir)/ruby.h $(hdrdir)/ruby/backward.h $(hdrdir)/ruby/ruby.h $(hdrdir)/ruby/defines.h $(hdrdir)/ruby/missing.h $(hdrdir)/ruby/intern.h $(hdrdir)/ruby/st.h $(hdrdir)/ruby/subst.h $(arch_hdrdir)/ruby/config.h

RM = rm -f
RM_RF = $(RUBY) -run -e rm -- -rf
RMDIRS = rmdir --ignore-fail-on-non-empty -p
MAKEDIRS = /bin/mkdir -p
INSTALL = /usr/bin/install -c
INSTALL_PROG = $(INSTALL) -m 0755
INSTALL_DATA = $(INSTALL) -m 644
COPY = cp
TOUCH = exit >

#### End of system configuration section. ####

preload = 
libpath = . $(archlibdir)
LIBPATH =  -L. -L$(archlibdir)
DEFFILE = 

CLEANFILES = mkmf.log
DISTCLEANFILES = 
DISTCLEANDIRS = 

extout = 
extout_prefix = 
target_prefix = 
LOCAL_LIBS = 
LIBS = $(LIBRUBYARG_SHARED)  -lm   -lc
ORIG_SRCS = BZLIB_blocksort.c BZLIB_bzlib.c BZLIB_compress.c BZLIB_crctable.c BZLIB_decompress.c BZLIB_huffman.c BZLIB_randtable.c STEMMER_api.c STEMMER_libstemmer.c STEMMER_stem_ISO_8859_1_danish.c STEMMER_stem_ISO_8859_1_dutch.c STEMMER_stem_ISO_8859_1_english.c STEMMER_stem_ISO_8859_1_finnish.c STEMMER_stem_ISO_8859_1_french.c STEMMER_stem_ISO_8859_1_german.c STEMMER_stem_ISO_8859_1_hungarian.c STEMMER_stem_ISO_8859_1_italian.c STEMMER_stem_ISO_8859_1_norwegian.c STEMMER_stem_ISO_8859_1_porter.c STEMMER_stem_ISO_8859_1_portuguese.c STEMMER_stem_ISO_8859_1_spanish.c STEMMER_stem_ISO_8859_1_swedish.c STEMMER_stem_ISO_8859_2_romanian.c STEMMER_stem_KOI8_R_russian.c STEMMER_stem_UTF_8_danish.c STEMMER_stem_UTF_8_dutch.c STEMMER_stem_UTF_8_english.c STEMMER_stem_UTF_8_finnish.c STEMMER_stem_UTF_8_french.c STEMMER_stem_UTF_8_german.c STEMMER_stem_UTF_8_hungarian.c STEMMER_stem_UTF_8_italian.c STEMMER_stem_UTF_8_norwegian.c STEMMER_stem_UTF_8_porter.c STEMMER_stem_UTF_8_portuguese.c STEMMER_stem_UTF_8_romanian.c STEMMER_stem_UTF_8_russian.c STEMMER_stem_UTF_8_spanish.c STEMMER_stem_UTF_8_swedish.c STEMMER_stem_UTF_8_turkish.c STEMMER_utilities.c analysis.c array.c bitvector.c compound_io.c document.c except.c ferret.c field_index.c filter.c fs_store.c global.c hash.c hashset.c helper.c index.c lang.c mempool.c multimapper.c posh.c priorityqueue.c q_boolean.c q_const_score.c q_filtered_query.c q_fuzzy.c q_match_all.c q_multi_term.c q_parser.c q_phrase.c q_prefix.c q_range.c q_span.c q_term.c q_wildcard.c r_analysis.c r_index.c r_qparser.c r_search.c r_store.c r_utils.c ram_store.c scanner.c scanner_mb.c scanner_utf8.c search.c similarity.c sort.c stopwords.c store.c symbol.c term_vectors.c
SRCS = $(ORIG_SRCS) 
OBJS = BZLIB_blocksort.o BZLIB_bzlib.o BZLIB_compress.o BZLIB_crctable.o BZLIB_decompress.o BZLIB_huffman.o BZLIB_randtable.o STEMMER_api.o STEMMER_libstemmer.o STEMMER_stem_ISO_8859_1_danish.o STEMMER_stem_ISO_8859_1_dutch.o STEMMER_stem_ISO_8859_1_english.o STEMMER_stem_ISO_8859_1_finnish.o STEMMER_stem_ISO_8859_1_french.o STEMMER_stem_ISO_8859_1_german.o STEMMER_stem_ISO_8859_1_hungarian.o STEMMER_stem_ISO_8859_1_italian.o STEMMER_stem_ISO_8859_1_norwegian.o STEMMER_stem_ISO_8859_1_porter.o STEMMER_stem_ISO_8859_1_portuguese.o STEMMER_stem_ISO_8859_1_spanish.o STEMMER_stem_ISO_8859_1_swedish.o STEMMER_stem_ISO_8859_2_romanian.o STEMMER_stem_KOI8_R_russian.o STEMMER_stem_UTF_8_danish.o STEMMER_stem_UTF_8_dutch.o STEMMER_stem_UTF_8_english.o STEMMER_stem_UTF_8_finnish.o STEMMER_stem_UTF_8_french.o STEMMER_stem_UTF_8_german.o STEMMER_stem_UTF_8_hungarian.o STEMMER_stem_UTF_8_italian.o STEMMER_stem_UTF_8_norwegian.o STEMMER_stem_UTF_8_porter.o STEMMER_stem_UTF_8_portuguese.o STEMMER_stem_UTF_8_romanian.o STEMMER_stem_UTF_8_russian.o STEMMER_stem_UTF_8_spanish.o STEMMER_stem_UTF_8_swedish.o STEMMER_stem_UTF_8_turkish.o STEMMER_utilities.o analysis.o array.o bitvector.o compound_io.o document.o except.o ferret.o field_index.o filter.o fs_store.o global.o hash.o hashset.o helper.o index.o lang.o mempool.o multimapper.o posh.o priorityqueue.o q_boolean.o q_const_score.o q_filtered_query.o q_fuzzy.o q_match_all.o q_multi_term.o q_parser.o q_phrase.o q_prefix.o q_range.o q_span.o q_term.o q_wildcard.o r_analysis.o r_index.o r_qparser.o r_search.o r_store.o r_utils.o ram_store.o scanner.o scanner_mb.o scanner_utf8.o search.o similarity.o sort.o stopwords.o store.o symbol.o term_vectors.o
HDRS = $(srcdir)/multimapper.h $(srcdir)/stem_UTF_8_turkish.h $(srcdir)/stem_ISO_8859_1_french.h $(srcdir)/search.h $(srcdir)/helper.h $(srcdir)/bitvector.h $(srcdir)/stem_ISO_8859_1_portuguese.h $(srcdir)/mempool.h $(srcdir)/lang.h $(srcdir)/index.h $(srcdir)/stem_ISO_8859_1_english.h $(srcdir)/stem_UTF_8_russian.h $(srcdir)/stem_UTF_8_italian.h $(srcdir)/stem_KOI8_R_russian.h $(srcdir)/stem_ISO_8859_1_hungarian.h $(srcdir)/stem_UTF_8_english.h $(srcdir)/config.h $(srcdir)/stem_UTF_8_norwegian.h $(srcdir)/stem_ISO_8859_1_finnish.h $(srcdir)/threading.h $(srcdir)/priorityqueue.h $(srcdir)/stem_ISO_8859_1_italian.h $(srcdir)/posh.h $(srcdir)/stem_UTF_8_spanish.h $(srcdir)/stem_UTF_8_german.h $(srcdir)/stem_UTF_8_dutch.h $(srcdir)/stem_UTF_8_romanian.h $(srcdir)/win32.h $(srcdir)/bzlib.h $(srcdir)/ferret.h $(srcdir)/bzlib_private.h $(srcdir)/store.h $(srcdir)/stem_UTF_8_swedish.h $(srcdir)/stem_UTF_8_porter.h $(srcdir)/internal.h $(srcdir)/stem_ISO_8859_2_romanian.h $(srcdir)/except.h $(srcdir)/global.h $(srcdir)/stem_ISO_8859_1_dutch.h $(srcdir)/array.h $(srcdir)/stem_ISO_8859_1_norwegian.h $(srcdir)/stem_UTF_8_finnish.h $(srcdir)/stem_ISO_8859_1_danish.h $(srcdir)/stem_UTF_8_danish.h $(srcdir)/document.h $(srcdir)/stem_UTF_8_portuguese.h $(srcdir)/modules.h $(srcdir)/stem_UTF_8_hungarian.h $(srcdir)/stem_ISO_8859_1_porter.h $(srcdir)/header.h $(srcdir)/hash.h $(srcdir)/symbol.h $(srcdir)/similarity.h $(srcdir)/field_index.h $(srcdir)/stem_ISO_8859_1_spanish.h $(srcdir)/analysis.h $(srcdir)/stem_ISO_8859_1_swedish.h $(srcdir)/api.h $(srcdir)/hashset.h $(srcdir)/libstemmer.h $(srcdir)/stem_UTF_8_french.h $(srcdir)/stem_ISO_8859_1_german.h $(srcdir)/scanner.h
LOCAL_HDRS = 
TARGET = ferret_ext
TARGET_NAME = ferret_ext
TARGET_ENTRY = Init_$(TARGET_NAME)
DLLIB = $(TARGET).so
EXTSTATIC = 
STATIC_LIB = 

TIMESTAMP_DIR = .
BINDIR        = $(bindir)
RUBYCOMMONDIR = $(sitedir)$(target_prefix)
RUBYLIBDIR    = $(sitelibdir)$(target_prefix)
RUBYARCHDIR   = $(sitearchdir)$(target_prefix)
HDRDIR        = $(rubyhdrdir)/ruby$(target_prefix)
ARCHHDRDIR    = $(rubyhdrdir)/$(arch)/ruby$(target_prefix)
TARGET_SO_DIR =
TARGET_SO     = $(TARGET_SO_DIR)$(DLLIB)
CLEANLIBS     = $(TARGET_SO) 
CLEANOBJS     = *.o  *.bak

all:    $(DLLIB)
static: $(STATIC_LIB)
.PHONY: all install static install-so install-rb
.PHONY: clean clean-so clean-static clean-rb

clean-static::
clean-rb-default::
clean-rb::
clean-so::
clean: clean-so clean-static clean-rb-default clean-rb
		-$(Q)$(RM) $(CLEANLIBS) $(CLEANOBJS) $(CLEANFILES) .*.time

distclean-rb-default::
distclean-rb::
distclean-so::
distclean-static::
distclean: clean distclean-so distclean-static distclean-rb-default distclean-rb
		-$(Q)$(RM) Makefile $(RUBY_EXTCONF_H) conftest.* mkmf.log
		-$(Q)$(RM) core ruby$(EXEEXT) *~ $(DISTCLEANFILES)
		-$(Q)$(RMDIRS) $(DISTCLEANDIRS) 2> /dev/null || true

realclean: distclean
install: install-so install-rb

install-so: $(DLLIB) $(TIMESTAMP_DIR)/.sitearchdir.time
	$(INSTALL_PROG) $(DLLIB) $(RUBYARCHDIR)
clean-static::
	-$(Q)$(RM) $(STATIC_LIB)
install-rb: pre-install-rb do-install-rb install-rb-default
install-rb-default: pre-install-rb-default do-install-rb-default
pre-install-rb: Makefile
pre-install-rb-default: Makefile
do-install-rb:
do-install-rb-default:
pre-install-rb-default:
	@$(NULLCMD)
$(TIMESTAMP_DIR)/.sitearchdir.time:
	$(Q) $(MAKEDIRS) $(@D) $(RUBYARCHDIR)
	$(Q) $(TOUCH) $@

site-install: site-install-so site-install-rb
site-install-so: install-so
site-install-rb: install-rb

.SUFFIXES: .c .m .cc .mm .cxx .cpp .o .S

.cc.o:
	$(ECHO) compiling $(<)
	$(Q) $(CXX) $(INCFLAGS) $(CPPFLAGS) $(CXXFLAGS) $(COUTFLAG)$@ -c $(CSRCFLAG)$<

.cc.S:
	$(ECHO) translating $(<)
	$(Q) $(CXX) $(INCFLAGS) $(CPPFLAGS) $(CXXFLAGS) $(COUTFLAG)$@ -S $(CSRCFLAG)$<

.mm.o:
	$(ECHO) compiling $(<)
	$(Q) $(CXX) $(INCFLAGS) $(CPPFLAGS) $(CXXFLAGS) $(COUTFLAG)$@ -c $(CSRCFLAG)$<

.mm.S:
	$(ECHO) translating $(<)
	$(Q) $(CXX) $(INCFLAGS) $(CPPFLAGS) $(CXXFLAGS) $(COUTFLAG)$@ -S $(CSRCFLAG)$<

.cxx.o:
	$(ECHO) compiling $(<)
	$(Q) $(CXX) $(INCFLAGS) $(CPPFLAGS) $(CXXFLAGS) $(COUTFLAG)$@ -c $(CSRCFLAG)$<

.cxx.S:
	$(ECHO) translating $(<)
	$(Q) $(CXX) $(INCFLAGS) $(CPPFLAGS) $(CXXFLAGS) $(COUTFLAG)$@ -S $(CSRCFLAG)$<

.cpp.o:
	$(ECHO) compiling $(<)
	$(Q) $(CXX) $(INCFLAGS) $(CPPFLAGS) $(CXXFLAGS) $(COUTFLAG)$@ -c $(CSRCFLAG)$<

.cpp.S:
	$(ECHO) translating $(<)
	$(Q) $(CXX) $(INCFLAGS) $(CPPFLAGS) $(CXXFLAGS) $(COUTFLAG)$@ -S $(CSRCFLAG)$<

.c.o:
	$(ECHO) compiling $(<)
	$(Q) $(CC) $(INCFLAGS) $(CPPFLAGS) $(CFLAGS) $(COUTFLAG)$@ -c $(CSRCFLAG)$<

.c.S:
	$(ECHO) translating $(<)
	$(Q) $(CC) $(INCFLAGS) $(CPPFLAGS) $(CFLAGS) $(COUTFLAG)$@ -S $(CSRCFLAG)$<

.m.o:
	$(ECHO) compiling $(<)
	$(Q) $(CC) $(INCFLAGS) $(CPPFLAGS) $(CFLAGS) $(COUTFLAG)$@ -c $(CSRCFLAG)$<

.m.S:
	$(ECHO) translating $(<)
	$(Q) $(CC) $(INCFLAGS) $(CPPFLAGS) $(CFLAGS) $(COUTFLAG)$@ -S $(CSRCFLAG)$<

$(TARGET_SO): $(OBJS) Makefile
	$(ECHO) linking shared-object $(DLLIB)
	-$(Q)$(RM) $(@)
	$(Q) $(LDSHARED) -o $@ $(OBJS) $(LIBPATH) $(DLDFLAGS) $(LOCAL_LIBS) $(LIBS)



$(OBJS): $(HDRS) $(ruby_headers)
