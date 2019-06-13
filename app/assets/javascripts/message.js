$(function(){
  function buildHTML(message){
      var image = `<div class="chat-main__body--messages">
          <img class="lower-message__image" src='${message.image.url}'>
          </div>`
      var html = `<div class="chat" data-message-id=${message.id}></div>
          <p class="chat-main__body--name">
          ${message.user_name}
          </p>
          <p class="chat-main__body--time">
          ${message.time}
          </p>
          <div class="chat-main__body--messages">
          ${message.text}
          </div>`
       message.image.url == null ?  html : html += image
       return html;
  }
  $(".footer__form").on("submit",function (e) {
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
          url: url,
          type: "POST",
          data: formData,
          dataType: "json",
          processData: false,
          contentType: false,
      })
          .done(function (data) {
              var html = buildHTML(data);
              $('.chat-main__body').append(html)
              $('.chat-main__body').animate({ 
                scrollTop: $('.chat-main__body')[0].scrollHeight
              }, 'fast');
              $('form')[0].reset();
              $('.submit').prop('disabled', false);
          })
          .fail(function () {
              alert('error')
              $('.submit').prop('disabled', false);
      })
  })
  var reloadMessages = (function(){
    if (window.location.pathname.match(/\/groups\/\d+\/messages/)) {
    var last_message_id = $('.chat:last').data('message-id');
    var group_id = $('.chat-main').data('group-id');
    var url = `/groups/${group_id}/api/messages`;
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id},
    })
    .done(function(messages) {
    messages.forEach(function (message) {
        var insertHTML = buildHTML(message);
        $('.chat-main__body').append(insertHTML);
        $('.chat-main__body').animate({ scrollTop: $('.chat-main__body')[0].scrollHeight});
      })
    })
    .fail(function(){
      alert('error');
      });
    }
  })
  setInterval(reloadMessages, 5000);
});