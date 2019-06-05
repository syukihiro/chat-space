$(function(){
  function buildHTML(message){
      var image = `<div class="chat-main__body--messages">
          <img class="lower-message__image" src= ${message.image.url} width="250" height="250">
          </div>`
      var html = `<p class="chat-main__body--name">
          ${message.user_name}
          </p>
          <p class="chat-main__body--time">
          ${message.time}
          </p>
          <div class="chat-main__body--messages">
          ${message.text}
          </div>`
      if (message.image.url == null) {
          html
      }else{
          html = image
      }
      return html;
  }
  $(".footer__form").on("submit",function (e) {
      e.preventDefault();
      var formData = new FormData(this);
      var href = window.location.href
      $.ajax({
          url: href,
          type: "POST",
          data: formData,
          dataType: "json",
          processData: false,
          contentType: false
      })
          .done(function (data) {
              var html = buildHTML(data);
              $('.chat-main__body').append(html)
              $('.chat-main__body').animate({ scrollTop: $('.chat-main__body')[0].scrollHeight }, 'slow');
              $('#message_body,#message_image').val('')
              $('.submit').prop('disabled', false);
          })
          .fail(function () {
              alert('error')
              $('.submit').prop('disabled', false);
      })
  })
});