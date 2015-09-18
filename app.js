var map, infowindow;
localStorage.placeData = localStorage.placeData ? localStorage.placeData : "";

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 9.194921,
            lng: 76.542993
        },
        zoom: 8
    });
    infowindow = new google.maps.InfoWindow();

    function placeMapper(place) {
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
    }
    $(document).ready(function() {
        $.get('data.json', function(tabledata) {
            if (tabledata instanceof Array) {
                tabledata = tabledata.concat(JSON.parse("[" + localStorage.placeData.slice(0, -1) + "]") || []);
            } else {
                console.log("AJAX error");
                tabledata = JSON.parse("[" + localStorage.placeData.slice(0, -1) + "]") || [];
            }
            tabledata.map(placeMapper);
            $('#datatablex').DataTable();
        });
        map.addListener('click', function(evt) {
            $("#newPlaceLatiudex").val(evt.latLng.H);
            $("#newPlaceLongitudex").val(evt.latLng.L);
        });
        $("#addNewPlace").click(function() {
            $("#dialog").dialog({
                buttons: {
                    "Add Place": function() {
                        var tmpPlace = {
                            name: $("#newPlaceNamex").val(),
                            lat: parseFloat($("#newPlaceLatiudex").val()),
                            lng: parseFloat($("#newPlaceLongitudex").val()),
                            info: $("#newPlaceInfox").val()
                        };
                        placeMapper(tmpPlace);
                        localStorage.placeData += JSON.stringify(tmpPlace) + ",";
                        $("#dialog").dialog("close");
                        $("#newPlaceNamex").val("");
                        $("#newPlaceLatiudex").val("");
                        $("#newPlaceLongitudex").val("");
                        $("#newPlaceInfox").val("");
                    },
                    Cancel: function() {
                        $("#dialog").dialog("close");
                    }
                }
            });
        });
    });
}
