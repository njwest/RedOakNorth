$(function(){

    var dataRef = new Firebase ("https://trekhub.Firebaseio.com/notes");
    var noteCount = 0;

    $("#addToNotes").on("click", function(){

        var noteInput = $("#noteInput").val().trim();
        dataRef.push ({
            'note' : noteInput
        });
     });

    dataRef.on('child_added', function(child, prevChild){

        var addNote = $('<p>');
        addNote.append(" " + child.val().note);


        var noteClose = $("<button>");
        noteClose.attr("data-notes", noteCount);
   noteClose.attr('data-key', child.key());

        noteClose.addClass("checkbox");
        noteClose.append("X");
        addNote = addNote.prepend(noteClose);

        $("#notes").append(addNote);
        $('#noteInput').val("");



        return false;
    });

 $(document.body).on('click', '.checkbox', function(){
   var key = $(this).data("key");
   console.log('key', key);
   dataRef.child(key).remove();
 });

});