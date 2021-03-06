/*
 * Makes the pages list sortable with animations.
 * On drop sends the new order of the pages to the server,
 * where it is saved.
 */

$(function(){
   // loop through pages
   $("#pages li").each(function () {

      // clone the original items to make their
      // absolute-positioned counterparts
      var item = $(this);
      var item_clone = item.clone();
      // 'store' the clone for later use
      item.data("clone", item_clone);

      // set the initial position of the clone
      var position = item.position();
      item_clone.css("left", position.left);
      item_clone.css("top", position.top);

      // append the clone
      $("#cloned_items").append(item_clone);
   });

   // create our sortable as usual
   // with some event handler extras
   $("#pages").sortable({
      // this makes the element snap to it's positions
      // with animation
      revert:'invalid',
      // on sorting start, hide the original items
      // only adjust the visibility, we still need
      // their float positions!
      start: function(e, ui){
         // loop through the items, except the one we're
         // currently dragging, and hide it
         ui.helper.addClass("exclude-me");
         $("#pages li:not(.exclude-me)")
            .css("visibility", "hidden");
         // makes the cloned items visible
         $("#cloned_items li")
            .css("visibility", "visible");

         // get the clone that's under it and hide it
         ui.helper.data("clone").hide();
      },

      stop: function (e, ui) {
         // get the item we were just dragging, and
         // its clone, and adjust accordingly
         $("#pages li.exclude-me").each(function(){
            var item = $(this);
            var clone = item.data("clone");
            var position = item.position();

            // move the clone under the item we've just dropped
            clone.css("left", position.left);
            clone.css("top", position.top);
            clone.show();

            // remove unnecessary class
            item.removeClass("exclude-me");
         });

         // make sure all our original items are visible again
         $("#pages li").css("visibility", "visible");
         // makes all cloned items hidden again
         $("#cloned_items li").css("visibility", "hidden");

         //saving the new order of the pages here
         var pages = [];
         $('#pages > li').each(function () {
            var page = {
               name: $('span', this).html(),
               address: $('a', this).attr('href'),
               image: $('img', this).attr('src')
            };
            pages.push(page);
         });

         // posts the new order of the pages to server
         $.ajax({
            url: '/',
            type: 'POST',
            dataType: 'text',
            data: JSON.stringify(pages),
            //success: console.log(JSON.stringify(pages))
         });
      },

      // here's where the magic happens
      change: function(e, ui){
         // get all invisible items that are also not placeholders
         // and process them when ordering changes
         $("#pages li:not(.exclude-me, .ui-sortable-placeholder)").each(function(){
            var item = $(this);
            var clone = item.data("clone");

            // stop current clone animations
            clone.stop(true, false);

            // get the invisible item, which has snapped to a new
            // location, get its position, and animate the visible
            // clone to it
            var position = item.position();
            clone.animate({
               left: position.left,
               top:position.top
            }, 300);
         });
      }
   });
});
