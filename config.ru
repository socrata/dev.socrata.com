require 'rack'
require 'rack/contrib/try_static'
require 'rack/contrib/not_found'

use Rack::TryStatic, {
  root: 'public',
  urls: %w[/],
  try: %w[
    .html index.html /index.html
  ],
  :header_rules => [[ :all, { 'Cache-control' => 'no-cache' } ]]
}

run lambda { |env|
  [
    200,
    {
      'Content-type' => 'text/html',
      'Cache-control' => 'no-cache'
    },
    File.open('public/200.html', File::RDONLY)
  ]
}
