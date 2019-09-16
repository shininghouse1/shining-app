/* SCRIPTS DO TEMA */

console.log('oi')

var app = {
    // inicializaÃ§Ã£o do jQuery e Cordova
    start: function(){
        $(document).ready(this.config);
    },

    // configura o app (firebase ou local)
    config: function(){
        console.log('configurando o app');
        app.run();
    },

    // executa o app que estÃ¡ na funÃ§Ã£o 'runApp()'
    run: function(){
        console.log("executando o app");
        runApp();
    }
}

function toggleMenu(){
    if( $('nav').attr('class') == 'slideOn' ){
        $('nav').attr('class', function(){
            $('#menuModal').fadeOut('fast');

            // Efeito do botÃ£o de menu
            $('#menu').removeClass('rotateMenuBtn'); // usando elipsis
            // $('#menu').html('<i class="fas fa-fw fa-bars"></i>'); // usando bars

            return 'slideOff';
        });
    } else {
        $('nav').attr('class', function(){
            $('#menuModal').fadeIn('fast');
            
            // Efeito do botÃ£o de menu
            $('#menu').addClass('rotateMenuBtn'); // usando elipsis
            // $('#menu').html('<i class="fas fa-fw fa-times"></i>'); // usando bars
            
            return 'slideOn';
        });
    }
}

// Aplicativo (camada de controle)
function runApp(){
    console.log('meu app');

    // monotorando botÃ£o do menu principal
    $(document).on('click', '#menu', toggleMenu);


}



app.start();