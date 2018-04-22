require 'elasticsearch'

class SkitreplyController < ApplicationController
  def AddSkitReply
      @json = JSON.parse(request.raw_post)
      @skitId = @json['skitId']
      @reply = @json['reply']
      @otherUid = @json['uid']
      @uid = request.headers['X-SKITTER-AUTH-USER']
      @name = request.headers['X-SKITTER-AUTH-NAME']
      if @reply.to_s.empty? or @reply.length > 140
          render json: {error: 'reply must contain data, but be less than 140 characters'}, status: :bad_request
      end
      if @skitId.to_s.empty? or @uid.to_s.empty? or @name.to_s.empty?
          render json: {error: 'skitId empty, or skitter headers not set'}, status: :forbidden
      else
          # ssl verification is borked in the ruby client????
          @client = Elasticsearch::Client.new log: true, 
              urls: 'https://elastic:s00pers3cur3pa$$word@skitdb:9200',
              transport_options: { ssl: { verify: false } }
          
          @oldskit = (@client.search index: @otherUid, id: @skitId)['hits']['hits'][0]

          @toadd = {
                      msg: @reply,
                      name: @name, 
                      uid: @uid,
                      date: Time.now
          }
          puts @toadd

          @client.update index: @otherUid, type: 'skits', id: @skitId, 
              body: { script: { source: 'ctx._source.replies.add(params.reply)', params: { reply: @toadd } } }

      end
  end

  def GetSkitReply
      @uid = request.query_parameters['uid']
      @skitId = request.query_parameters['skitId']
      @myuid = request.headers['X-SKITTER-AUTH-USER']
      @name = request.headers['X-SKITTER-AUTH-NAME']
      if @myuid.to_s.empty? or @name.to_s.empty? or @skitId.to_s.empty?
          render json: {error: 'skitId empty, or skitter headers not set'}, status: :forbidden
      else
          @client = Elasticsearch::Client.new log: true, 
              urls: 'https://elastic:s00pers3cur3pa$$word@skitdb:9200',
              transport_options: { ssl: { verify: false } }
          @result = @client.get index: @uid, id: @skitId, type: 'skits'
          render json: @result
      end
  end
end
