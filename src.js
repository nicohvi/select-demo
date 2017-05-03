$.fn.asEventStream = Bacon.$.asEventStream;

$(document).ready( () => {
const stream = $(document).asEventStream('click', '.js-select-list')
  .debounce(50)

  stream
  .map(event => $(event.currentTarget))
  .onValue($el => $el.toggleClass('active'));

  stream
  .filter(event => $(event.target).is('li'))
  .map(event => ({ $target: $(event.target), $el: $(event.currentTarget) }))
  .delay(300)
  .onValue(data => {
    const { $el, $target } = data;
    $el.find('span').text($target.text());
    $el.find('input').val($target.data('value'));
  });

});
