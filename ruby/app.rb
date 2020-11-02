# frozen_string_literal: true

require 'dotenv'
Dotenv.load('../.env')
require 'sinatra'
require 'json'
require 'byebug'
require 'httparty'

require_relative 'lib/json_response'

API_ENV = ENV['API_ENV']

API_URL = ENV['DEV_ENV'] === 'development' ?
            'http://development.newcraft-dev.com:3000/api/v1'
            : 'https://development.newcraft.io/api/v1'

get '/' do
  @company_name = ENV['COMPANY_NAME']
  @authenticator_env = ENV['API_ENV']

  erb :index
end

get '/connect_tokens/create' do
  content_type :json

  return unless ENV['CLIENT_ID']
  return unless ENV['CLIENT_SECRET']

  options = {
    body: {
      client_id: ENV['CLIENT_ID'],
      client_secret: ENV['CLIENT_SECRET']
    }
  }

  response = HTTParty.post(API_URL + '/connect_tokens/create', options)
  JsonResponse.parsing(response.parsed_response)
end

get '/public_token/exchange/:public_token' do
  content_type :json

  options = {
    body: {
      client_id: ENV['CLIENT_ID'],
      client_secret: ENV['CLIENT_SECRET'],
      public_token: params[:public_token]
    }
  }

  response = HTTParty.post(API_URL + '/public_token/exchange', options)
  JsonResponse.parsing(response.parsed_response)
end

get '/:record/fetch_resource/:access_token' do
  content_type :json

  if API_ENV === 'sandbox'
    NEW_API_URL = API_URL.dup.sub! 'development', 'sandbox'
  else
    NEW_API_URL = API_URL
  end

  return unless ENV['CLIENT_ID']
  return unless ENV['CLIENT_SECRET']
  return unless params[:access_token]
  return unless params[:record]

  options = {
    body: {
      client_id: ENV['CLIENT_ID'],
      client_secret: ENV['CLIENT_SECRET'],
      access_token: params[:access_token]
    }
  }

  response = HTTParty.post(NEW_API_URL + '/' + params[:record] + '/get', options)
  JsonResponse.parsing(response.parsed_response)
end
