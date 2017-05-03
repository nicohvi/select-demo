'use strict';

$.fn.asEventStream = Bacon.$.asEventStream;

$(document).ready(function () {
  var stream = $(document).asEventStream('click', '.js-select-list').debounce(50);

  stream.map(function (event) {
    return $(event.currentTarget);
  }).onValue(function ($el) {
    return $el.toggleClass('active');
  });

  stream.filter(function (event) {
    return $(event.target).is('li');
  }).map(function (event) {
    return { $target: $(event.target), $el: $(event.currentTarget) };
  }).delay(300).onValue(function (data) {
    var $el = data.$el,
        $target = data.$target;

    $el.find('span').text($target.text());
    $el.find('input').val($target.data('value'));
  });
});
