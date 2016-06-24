$(function(){

  var dataRef = new Firebase("https://trekhub.firebaseio.com/schedule");

  var schedCount = 0;

  $("#addToSched").on("click", function(){

    var schedTask = $('#schedInput').val().trim();
    dataRef.push({
        'toDo' : schedTask,
        'itemNum' : schedCount
    })
  });

  dataRef.on('child_added', function(child, prevChild){
    console.log(child.val().sched);

    var schedItem = $('<p>');
    schedItem.attr('id', 'item-' + schedCount);
    schedItem.append(" " + child.val().toDo);
    
    var schedClose = $("<button>");
    schedClose.attr("data-sched", schedCount);
    schedClose.addClass("checkbox");
    schedClose.append("X");
    schedItem = schedItem.prepend(schedClose);

    $("#sched").append(schedItem);

    $('#schedInput').val("");

    schedCount++;

    return false;
  });

  // $('#sched').toString();
  // $('#sched').html();

  $(document.body).on('click', '.checkbox', function(){

    var schedNumber = $(this).data("sched");

    $("#item-" + schedNumber).remove();

  });
});