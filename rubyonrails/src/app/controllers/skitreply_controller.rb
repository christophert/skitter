class SkitreplyController < ApplicationController
  def AddSkitReply
      reply = JSON.parse(request.raw_post)['reply']
      uid = request.headers['X-SKITTER-AUTH-USER']
      name = request.headers['X-SKITTER-AUTH-NAME']
      if reply.to_s.empty? or reply.length > 140
          render json: {}, status: :bad_request
      end
      if uid.to_s.empty? or name.to_s.empty?
          render json: {}, status: :forbidden
      end

      
  end
end
