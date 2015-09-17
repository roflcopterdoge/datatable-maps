var map, infowindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 9.194921,
            lng: 76.542993
        },
        zoom: 8
    });
    infowindow = new google.maps.InfoWindow();
    $(document).ready(function() {
        $.get('data.json', function(tabledata) {
            if (tabledata instanceof Array) {
                tabledata.map(function(place) {
                    var infowindowContent = "<h1>" + place.name + "</h1><br><p>" + place.info + "</p>";
                    var row = $("<tr>" + "<td>" + place.name + "</td>" + "<td>" + place.lat + "</td>" + "<td>" + place.lng + "</td>" + "<td>" + place.info + "</td>" + "</tr>");
                    var clickToggle = function() {
                        map.setCenter({
                            lat: place.lat,
                            lng: place.lng
                        });
                        infowindow.setContent(infowindowContent);
                        infowindow.open(map, marker);
                        row.parent().find('tr').removeClass('bolderText');
                        row.addClass('bolderText');
                    }
                    $("#datatablex").find('tbody').append(row);

                    var marker = new google.maps.Marker({
                        position: {
                            lat: place.lat,
                            lng: place.lng
                        },
                        map: map,
                        title: place.name
                    });
                    row.click(clickToggle);
                    marker.addListener('click', clickToggle);
                });
                $('#datatablex').DataTable();
            } else {
                console.log("AJAX error");
            }
        });
    });
}
