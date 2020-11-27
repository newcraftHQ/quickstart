# frozen_string_literal: true

module JsonResponse
  def self.parsing(response)
    case response.code
      when 200..201
        response.parsed_response.to_json
      when 404
        { errors: 'Not Found', status: response.code }.to_json
      when 401
        { errors: 'Unauthorized', status: response.code }.to_json
      when 500...600
        { errors: 'Something went wrong', status: response.code }.to_json
    end
  end
end