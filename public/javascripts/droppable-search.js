/*
 * Adds the ability to add a site: search to the google search bar
 * by dropping a page onto it
 */
$(function () {
  // adds a search string to the google search input element
  $('#google-search').droppable({
     drop: function (event, ui) {

        // stores the url of the page
        var draggableHref = ui.draggable.find("a").attr("href");

        // if search query is empty
        if ($(this).val() == "") {
           $(this).val("site:" + draggableHref);
        }

        // else search query is not empty
        else {
           // appends current site string to current query
           $(this).val($(this).val() + " OR site:" + draggableHref);
        }
     }
  });
});
