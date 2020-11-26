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

  response = HTTParty.post(build_api_url + '/connect_tokens/create', credential_options)
  JsonResponse.parsing(response.parsed_response)
end

get '/public_token/exchange/:public_token' do
  content_type :json

  merge_credentials('public_token', params[:public_token])

  response = HTTParty.post(API_URL + '/public_token/exchange', options)
  JsonResponse.parsing(response.parsed_response)
end

get '/:record/fetch_resource/:access_token' do
  content_type :json

  return unless ENV['CLIENT_ID']
  return unless ENV['CLIENT_SECRET']
  return unless params[:access_token]
  return unless params[:record]

  merge_credentials('access_token', params[:access_token])

  response = HTTParty.post(build_api_url + '/' + params[:record] + '/get', credential_options)
  JsonResponse.parsing(response.parsed_response)
end

get '/show_job/:job_id' do
  content_type :json

  merge_credentials('public_token', params[:public_token])

  response = HTTParty.post(build_api_url + '/jobs/' + params[:job_id] + '/get', credential_options)
  JsonResponse.parsing(response.parsed_response)
end

get '/get_candidates/:job_id' do
  content_type :json

  merge_credentials('public_token', params[:public_token])

  response = HTTParty.post(build_api_url + '/jobs/' + params[:job_id] + '/candidates/get', options)
  JsonResponse.parsing(response.parsed_response)
end

get '/jobs/:job_id/candidates/:candidate_id/get' do
  content_type :json

  merge_credentials('public_token', params[:public_token])

  response = HTTParty.post(build_api_url + '/jobs/' + params[:job_id] + '/candidates/' + params[:candidate_id] + '/get', credential_options)
  JsonResponse.parsing(response.parsed_response)
end

def build_api_url
  if API_ENV === 'sandbox'
    @new_api_url = API_URL.dup.sub! 'development', 'sandbox'
  else
    @new_api_url = API_URL
  end
end

def credential_options
  {
    body: {
      client_id: ENV['CLIENT_ID'],
      client_secret: ENV['CLIENT_SECRET']
    }
  }
end

def merge_credentials(key, value)
  credential_options[:body].merge(key.to_sym => value)
end
