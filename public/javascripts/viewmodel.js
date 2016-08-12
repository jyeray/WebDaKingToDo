$( document ).ready( function() {
    var viewModel = {
        tasks : ko.observableArray([])
    };
    ko.applyBindings(viewModel);

    $.getJSON("http://localhost:52134/tasks", function (data) {
        viewModel.tasks(data)
    });
});