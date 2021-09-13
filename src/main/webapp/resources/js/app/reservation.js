$(document).ready(function () {
    $.get('http://localhost:8080/api/reservation/available-locations-names', function (response){
        console.log(response);
    })
});
