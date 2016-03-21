$(document).ready(function(){

  $('.slider').slider({full_width: true});

  $('#login').webuiPopover({url:'#login-form'});

  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal-trigger').leanModal();
  
});