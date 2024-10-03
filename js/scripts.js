// Inicialización del mapa y el marcador como variables globales
var iglesiaLocation = { lat: 40.4157922, lng: -3.6657747 }; // Coordenadas de la iglesia
var torreGallenLocation = { lat: 39.9043715, lng: -0.0723171 }; // Coordenadas de Torre Gallén
var map;    // Mapa global
var marker; // Marcador global

// Función alert_markup adaptada al código actual
function alert_markup(alert_type, msg) {
    var alert_background = alert_type === 'danger' ? '#f8d7da' : alert_type === 'info' ? '#d1ecf1' : '#d4edda';
    var alert_color = alert_type === 'danger' ? '#721c24' : alert_type === 'info' ? '#0c5460' : '#155724';

    return '<div class="alert alert-' + alert_type + '" role="alert" style="margin: 10px 0; padding: 10px; border-radius: 5px; background-color: ' + alert_background + '; color: ' + alert_color + ';">' +
        msg +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close" style="background: none; border: none; color: inherit; float: right; font-size: 1.2rem;">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '</div>';
}


// Función para inicializar el mapa
function initMap() {
    var currentLocation = iglesiaLocation; // Comienza con la ubicación de la iglesia
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 15,
        center: currentLocation,
        scrollwheel: false
    });

    marker = new google.maps.Marker({
        position: currentLocation,
        map: map
    });

    // Evento para abrir Google Maps al hacer clic en el marcador
    marker.addListener('click', function() {
        var position = marker.getPosition();
        var googleMapsURL = 'https://www.google.com/maps/search/?api=1&query=' + position.lat() + ',' + position.lng();
        window.open(googleMapsURL, '_blank');
    });
}

// Código que se ejecuta cuando el DOM está completamente cargado
$(document).ready(function () {
    /***************** Waypoints ******************/
    $('.wp1').waypoint(function () { $('.wp1').addClass('animated fadeInLeft'); }, { offset: '75%' });
    $('.wp2').waypoint(function () { $('.wp2').addClass('animated fadeInRight'); }, { offset: '75%' });
    $('.wp3').waypoint(function () { $('.wp3').addClass('animated fadeInLeft'); }, { offset: '75%' });
    $('.wp4').waypoint(function () { $('.wp4').addClass('animated fadeInRight'); }, { offset: '75%' });
    $('.wp5').waypoint(function () { $('.wp5').addClass('animated fadeInLeft'); }, { offset: '75%' });
    $('.wp6').waypoint(function () { $('.wp6').addClass('animated fadeInRight'); }, { offset: '75%' });
    $('.wp7').waypoint(function () { $('.wp7').addClass('animated fadeInUp'); }, { offset: '75%' });
    $('.wp8').waypoint(function () { $('.wp8').addClass('animated fadeInLeft'); }, { offset: '75%' });
    $('.wp9').waypoint(function () { $('.wp9').addClass('animated fadeInRight'); }, { offset: '75%' });

    /***************** Iniciar Flexslider ******************/
    $('.flexslider').flexslider({ animation: "slide" });

    /***************** Iniciar Fancybox ******************/
    $('.single_image').fancybox({ padding: 4 });
    $('.fancybox').fancybox({ padding: 4, width: 1000, height: 800 });

    /***************** Tooltips ******************/
    $('[data-toggle="tooltip"]').tooltip();

    /***************** Nav Transformicon ******************/
    $('.nav-toggle').click(function (event) {
        $(this).toggleClass('active');
        $('.header-nav').toggleClass('open');
        event.preventDefault();
    });
    $('.header-nav li a').click(function () {
        $('.nav-toggle').toggleClass('active');
        $('.header-nav').toggleClass('open');
    });

    /***************** Header BG Scroll ******************/
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 20) {
            $('section.navigation').addClass('fixed');
            $('header').css({ "border-bottom": "none", "padding": "35px 0" });
            $('header .member-actions').css({ "top": "26px" });
            $('header .navicon').css({ "top": "34px" });
        } else {
            $('section.navigation').removeClass('fixed');
            $('header').css({ "border-bottom": "solid 1px rgba(255, 255, 255, 0.2)", "padding": "50px 0" });
            $('header .member-actions').css({ "top": "41px" });
            $('header .navicon').css({ "top": "48px" });
        }
    });

    /***************** Smooth Scrolling ******************/
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({ scrollTop: target.offset().top - 90 }, 2000);
                return false;
            }
        }
    });

    /********************** Social Share buttons ***********************/
    var share_bar = document.getElementsByClassName('share-bar');
    var po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    po.src = 'https://apis.google.com/js/platform.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);

    for (var i = 0; i < share_bar.length; i++) {
        var html = '<iframe allowtransparency="true" frameborder="0" scrolling="no"' +
            'src="https://platform.twitter.com/widgets/tweet_button.html?url=' + encodeURIComponent(window.location) + '&amp;text=' + encodeURIComponent(document.title) + '&amp;count=horizontal"' +
            'style="width:105px; height:21px;"></iframe>' +
            '<iframe src="//www.facebook.com/plugins/like.php?href=' + encodeURIComponent(window.location) + '&amp;width&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;share=true&amp;height=21&amp;width=150" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:150px; height:21px;" allowTransparency="true"></iframe>' +
            '<div class="g-plusone" data-size="medium"></div>';
        share_bar[i].innerHTML = html;
        share_bar[i].style.display = 'inline-block';
    }

    /********************** Embed youtube video *********************/
    $('.player').YTPlayer();

    /********************** Toggle Map Content **********************/
    $('#btn-show-map').click(function () {
        $('#map-content').toggleClass('toggle-map-content');
        $('#btn-show-content').toggleClass('toggle-map-content');
    });
    $('#btn-show-content').click(function () {
        $('#map-content').toggleClass('toggle-map-content');
        $('#btn-show-content').toggleClass('toggle-map-content');
    });

    /********************** Add to Calendar **********************/
    var myCalendar = createCalendar({
        options: { class: '', id: '' },
        data: {
            title: "Boda Ana y David",
            start: new Date('Feb 22, 2025 11:30'),
            end: new Date('Feb 22, 2025 22:00'),
            address: 'Igelsia Nuestra Señora de la Consolación, Castellón de la Plana',
            description: "Para celebrar juntos esta nueva unidad familiar"
        }
    });
    $('#add-to-cal').html(myCalendar);

    /********************** RSVP **********************/
    $('#rsvp-form').on('submit', function (e) {
        e.preventDefault();
    
        // Validación para comprobar si se ha seleccionado una opción de Autobús y Hotel
        var busIda = $("input[name='bus_ida']:checked").val();
        var hotelSelected = $("input[name='hotel']:checked").val();
        var busVuelta = $("input[name='bus_vuelta']:checked").val();
    
        if (!busIda || !busVuelta || !hotelSelected) {
            // Mostrar mensaje de advertencia si no se seleccionó Autobús o Hotel
            var message = '';
            if (!busIda) message += '<p>Por favor selecciona una opción para el bus de ida.</p>';
            if (!busVuelta) message += '<p>Por favor selecciona una opción para el bus de vuelta.</p>';
            if (!hotelSelected) message += '<p>Por favor selecciona una opción para el hotel.</p>';
            
            $('#alert-wrapper').html(alert_markup('danger', message));
            return; // Detener el proceso de envío hasta que se complete la selección
        }
    
        // Si la validación es exitosa, proceder con el envío del formulario
        var data = $(this).serialize();
        $('#alert-wrapper').html(alert_markup('info', '<strong>Just a sec!</strong> Estamos guardando tus datos.'));
    
        $.post('https://script.google.com/macros/s/AKfycbzp0U2pn9MhtqF7_TFVFlQyeI86asWokLWO-AdrSwcpsPpZK48RuVMBQgeua3RnIcaE6w/exec', data)
            .done(function (data) {
                if (data.result === "error") {
                    $('#alert-wrapper').html(alert_markup('danger', data.message));
                } else {
                    $('#alert-wrapper').html('');
                    $('#rsvp-modal').modal('show');
                }
            })
            .fail(function () {
                $('#alert-wrapper').html(alert_markup('danger', '<strong>Sorry!</strong> There is some issue with the server.'));
            });
    });

    /********************** Manejo de los botones del mapa **********************/
    $('#btn-show-map-iglesia').on('click', function() {
        map.setCenter(iglesiaLocation);
        marker.setPosition(iglesiaLocation);
    });

    $('#btn-show-map-torregallen').on('click', function() {
        map.setCenter(torreGallenLocation);
        marker.setPosition(torreGallenLocation);
    });

    // Inicializar el mapa
    initMap();
});
