$(document).on('turbolinks:load', function() {
  var userList = $('#user-search-result');
  var member_list = $('#chat-group-users');
  function appendUser(user) {
      var html = `<div class= "chat-group-user clearfix">
      <p class= "chat-group-user__name">${user.name}</p>
      <a class= "user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
      </>`
      userList.append(html)
  }
  function appendNouser(user) {
      var html = `<div class="chat-group-user clearfix">
      <p class= "chat-group-user__name">${user}</p>
      </div>`
      userList.append(html)
  }
  function userAdd(user_id, user_name) {
      var html = `<div class= 'chat-group-user clearfix js-chat-member' id= 'chat-group-user-8'>
      <input id= "input" name= 'group[user_ids][]' type= 'hidden' value= "${user_id}">
      <p class= 'chat-group-user__name'>${user_name}</p>
      <a class= 'user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
      </div>`
      member_list.append(html)
  }
  $("#user-search-field").on("keyup", function () {
      var input = $('#user-search-field').val();
      $.ajax({
          url: '/users',
          type: 'GET',
          data: {keyword: input},
          dataType: 'json'
      })
          .done(function (data) {
              $('#user-search-result').empty();
              data.length !== 0 ? data.forEach(function (user) {
                appendUser(user)
                  }) :
                  appendNouser('一致するユーザがいません');
              })
          .fail(function () {
              alert('ユーザ検索に失敗しました')
          })
  });
  $(document).on('click', '.user-search-add', function () {
      var userId = $(this).data('user-id');
      var userName = $(this).data('user-name');
      userAdd(userId, userName);
      $(this).parent().remove()
  });
  $(document).on('click', '.user-search-remove', function () {
      $(this).parent().remove()
  })
});