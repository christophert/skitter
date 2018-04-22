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
      end

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

  def GetSkitReply
      @client = Elasticsearch::Client.new log: true, 
          urls: 'https://elastic:s00pers3cur3pa$$word@skitdb:9200',
          transport_options: { ssl: { verify: false } }
      @id = request.query_parameters['id']
      @result = @client.search index: 'jfb3657'
      render json: @result
  end
end
