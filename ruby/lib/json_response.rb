# frozen_string_literal: true

module JsonResponse
  def self.parsing(response)
    response.to_json
  end
end