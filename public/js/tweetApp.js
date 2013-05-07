/**
 * Client side JS for the /tweet sending page
 */

function sendTweet() {
   // The below code is just an example of sending arrays via javascript
   // I need to udpate this to send the actual twitter information
   var dataToSend = { 
      page: location.href, 
      data: []
   };
   var dataindex = 0;
   jQuery(".myclass").each(function(){
      var temp = unique_selector(jQuery(this), "");
      dataToSend.data[dataindex++] = {
         selector: temp,
         contents: jQuery(temp).html()
      };
   });
   jQuery.ajax({
      type: 'POST',
      url: "/main/save.php",
      data: JSON.stringify(dataToSend),
      dataType: "json",
      success: function(data){ alert(data); }
   });   
}

/**
 * function getShort(url) {
 * @param  {String} url The input url, pre-shortened
 */
function getShort(url, callback) {
   var apiURL = 'http://is.gd/create.php?format=simple&url=' + url;
   $.get(apiURL).done(function(data){
      callback(url, data);
   }).fail(function() {
      console.log('shortening failed for ' + url);
      callback(url, url+' fail ');
   });
}

// when page loads, do this
$(document).ready(function(){
   // watch the message box and adjust the chars left as needed
   var maxChars = parseInt($('#charsCounter').text());
   $('#message').keyup(function(){
      var allowedChars = maxChars - $('#message').val().length;
      if (allowedChars < 0) {
         $('#message').val($('#message').val().substring(0, maxChars));
         $('#charsCounter').text('0');
      } else {
         $('#charsCounter').text(allowedChars);
      }
   });

   // watch the shorten urls button
   $('#shorten').click(function() {
      var message = $('#message').val();
      var exp = /((http|https)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?)/gi,
         match, matches = [],
         decode = function(s) {
            getShort(s, function(input, output) {
               $('#message').val($('#message').val().replace(input, output));
            });
         };
      while (match = exp.exec(message)) {
         decode(match[1]);
      }
   });


});