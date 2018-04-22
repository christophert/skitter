require 'elasticsearch'

class SkitreplyController < ApplicationController
  def AddSkitReply
      @json = JSON.parse(request.raw_post)
      @skitId = @json['skitId']
      @reply = @json['reply']
      @uid = request.headers['X-SKITTER-AUTH-USER']
      @name = request.headers['X-SKITTER-AUTH-NAME']
      if @reply.to_s.empty? or @reply.length > 140
          render json: {error: 'reply must contain data, but be less than 140 characters'}, status: :bad_request
      end
      if @skitId.to_s.empty? or @uid.to_s.empty? or @name.to_s.empty?
          render json: {error: 'skitId empty, or skitter headers not set'}, status: :forbidden
      end

      # ssl verification is borked in the ruby client????
      @client = Elasticsearch::Client.new log: true, 
          urls: 'https://elastic:s00pers3cur3pa$$word@skitdb:9200',
          transport_options: { ssl: { verify: false } }
      
      # elastic search exists does not work because it requires an ID (i love
      # people design their own applications wrong)
      #if !(@client.exists? index: @skitId, )
      begin
          @client.indices.create index: @skitId, body: { 
              mappings: {
                 replies: { 
                     properties: {
                      reply: { type: 'text' },
                      name: { type: 'text'},
                      uid: { type: 'text'},
                      date: { type: 'date'}
                     }
                 } 
              } 
          }
      rescue Elasticsearch::Transport::Transport::Errors::BadRequest
        #already exists
      end

      @client.index index: @skitId, type: 'replies',
          body: {
            reply: @reply,
            uid: @uid, 
            name: @name, 
            date: Time.now
          }
    
  end
end
