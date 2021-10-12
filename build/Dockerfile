FROM ubuntu:18.04

RUN apt-get update -q && apt-get install -y \
 	libfontconfig1 \
  pkg-config \
  libxml2-dev \
  libxslt-dev \
  gcc \
  g++ \
  autoconf \
  automake \
  build-essential \
  bzip2 \
  libssl-dev \
  libreadline-dev \
  zlib1g-dev \
  git \
  curl \
  dirmngr \
  gnupg

# Setup a user account to run ruby and node later
RUN adduser --shell /bin/bash --home /ci --disabled-password ci

ENV PATH="${PATH}:/ci/.asdf/shims:/ci/.asdf/bin"
ENV NOKOGIRI_USE_SYSTEM_LIBRARIES=true
ENV NODEJS_CHECK_SIGNATURES=no

USER ci
WORKDIR /ci

RUN git clone --depth 1 https://github.com/asdf-vm/asdf.git $HOME/.asdf && \
    echo '. $HOME/.asdf/asdf.sh' >> $HOME/.bashrc && \
    echo '. $HOME/.asdf/asdf.sh' >> $HOME/.profile

# Install Ruby and Node through asdf
RUN asdf plugin-add ruby
RUN asdf plugin-add nodejs
COPY .tool-versions /ci/.tool-versions

RUN asdf install

COPY . /ci

# Install node deps
RUN npm install
RUN npm install -g phantomjs-prebuilt

# Install bundler and gems
RUN gem install bundler --force --version 1.17.3
RUN bundle install

ENTRYPOINT ["/bin/bash", "-c"]
