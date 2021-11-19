/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {


  const renderTweets = function (tweets) {
    $('#tweets-container').empty();
    for (const tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  }

  // Notes: Utilizing the .text method to prevent xss attacks;
  const createTweetElement = function (tweetData) {
    const name = tweetData.user.name;
    const handle = tweetData.user.handle;
    const avatar = tweetData.user.avatars;
    const tweet = tweetData.content.text;
    const timeCreated = timeago.format(tweetData.created_at);

    //Generate Parent elements
    const $tweetArticle = $('<article>').addClass('tweet');
    const $header = $(`<header>`);
    const $content = $('<div>').addClass('content');
    const $footer = $(`<footer>`);
    const $nameAvatarContainer = $(`<div>`).addClass('avatarname');

    //Header elements
    const $createName = $(`<span>`).addClass('name').text(name);
    const $createAvatar = $('<img>').addClass('avatar').attr('src', avatar);
    const $createHandle = $('<span>').addClass('handle').text(handle);

    //BodyTweet elements
    const $createTweet = $('<div>').addClass('body').text(tweet);

    //Footer Elements
    const $generateTime = $('<span>').addClass('time').text(timeCreated);
    const $iconContainer = $('<span>').addClass('iconContainer');
    const $flag = $("<i>").addClass("fas fa-flag");
    const $retweet = $("<i>").addClass("fas fa-retweet");
    const $heart = $("<i>").addClass("fas fa-heart");

    $nameAvatarContainer.append($createAvatar, $createName);
    $iconContainer.append($flag, $retweet, $heart);
    $header.append($nameAvatarContainer, $createHandle);
    $content.append($createTweet);
    $footer.prepend($generateTime, $iconContainer);
    $tweetArticle.append($header, $content, $footer);

    return $tweetArticle
  }

  $('#formTweet').submit(function () {
    event.preventDefault()
    let text = $(this).serialize();

    if (!$('#tweet-text').val()) {
      $('.error').slideDown('slow')
      $('.error-message').text('Text Area Cannot be left blank!');
    }

    if ($('#tweet-text').val().length > 140) {
      $('.error').slideDown('slow')
      $('.error-message').text('Too many characters! Please stay within the limit');
    }
    if ($('#tweet-text').val() && $('#tweet-text').val().length < 140) {
      $('.error').slideUp('slow');

      $('#formTweet').trigger('reset');
      $('.counter').text('140');
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: text,
      }).done(function (response) {
        loadTweets();
      })
    }

  })

  const loadTweets = function () {
    $.ajax({
      type: 'GET',
      url: "/tweets",
      dataType: 'JSON'
    })
      .done(data => {
        renderTweets(data)
      })
  }

  loadTweets()

});
