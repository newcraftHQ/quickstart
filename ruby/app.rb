# myapp.rb
require 'sinatra'
require 'json'

get '/' do
  erb :index
end