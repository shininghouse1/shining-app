/* FUNÃ‡Ã•ES DO TEMA E DE USO GERAL DO APP */
 
var $FB = {}; // Superglobal do Firebase

// Construtor de configuraÃ§Ã£o do App
var conf = {

    // ConfiguraÃ§Ãµes locais iniciais do App
    initial : {
        tema : 'light',
        user : {
            name : '',
            email : '',
            photo : ''
        }
    },

    // ConfiguraÃ§Ã£o da conexÃ£o com o Google Firebase
    fireConfig : {
        apiKey: "AIzaSyCqpWi7y5mZrLF51riDU6IPGwEZsgzl5uQ",
        authDomain: "shininghouse-8d3d5.firebaseapp.com",
        databaseURL: "https://shininghouse-8d3d5.firebaseio.com",
        projectId: "shininghouse-8d3d5",
        storageBucket: "shininghouse-8d3d5.appspot.com",
        messagingSenderId: "735467682715",
        appId: "1:735467682715:web:0e4fd7e3299b27790dbf3e"
    },

    // Chave do armazenamento que contÃ©m a configuraÃ§Ã£o local do App
    name : 'config',

    // ConexÃ£o com armazenamento local
    conn : function(){
        return window.localStorage
    },

    // ObtÃ©m configuraÃ§Ãµes locais do App
    getAll : function(){
        return JSON.parse(conf.conn().getItem(this.name)); // Transforma JSON em objeto
    },

    // ObtÃ©m uma configuraÃ§Ã£o local do App
    get : function(key){
        return this.getAll()[key];
    },

    // Altera uma configuraÃ§Ã£o local do App
    set : function(key, value){
        config = this.getAll();
        config[key] = value;
        this.conn().setItem(this.name, JSON.stringify(config));
    },

    // Retorna para as configuraÃ§Ãµes iniciais
    reset : function(){
        this.conn().removeItem(this.name);
        this.conn().setItem(this.name, JSON.stringify(this.initial));
        return this.initial;
    },

    // Google Firebase
    fireStart : function(){
        firebase.initializeApp(this.fireConfig); // Inicializa firebase
        $FB.db = firebase.firestore(); // Inicializa Firestore
    }
}

// 'Control' do menu principal
function toggleMenu(){
    if($('nav').attr('class') == 'slideOn'){ // Se o menu estÃ¡ aparecendo...
        menuOff(); // Ocuta
    } else { // Se o menu estÃ¡ oculto...
        menuOn(); // Mostra
    }
}

// Mostra o menu principal
function menuOn(){
    $('nav').attr('class', function(){ // Altera a classe do menu
        $('#menuModal').fadeIn('fast'); // Mostra o fundo do menu com fade
        $('#menu').addClass('rotateMenuBtn'); // Adiciona classe que rotaciona o botÃ£o
        return 'slideOn'; // Aplica classe que desloca o menu para a direita, exibindo-o
    });
}

// Oculta menu principal
function menuOff(){
    $('nav').attr('class', function(){ // Altera a classe do menu
        $('#menuModal').fadeOut('fast'); // Esconde fundo do menu com fade
        $('#menu').removeClass('rotateMenuBtn'); // Remove classe que rotaciona o botÃ£o
        return 'slideOff'; // Aplica classe que desloca o menu para a esquerda, escondendo
    });
}

// Identifica usuÃ¡rio logado no menu e na barra superior
function userStatus(){
    var user = conf.get('user');
    if(user.email !== ''){
        abbrName = (user.name.length > 20) ? user.name.substr(0, 20) + '...' : user.name;
        $('#headerUser').html(`<img src="${user.photo}" alt="${user.name}" title="Clique para ver seu perfil.">`);
        $('#headerUser').attr({'href':'https://profiles.google.com/','target':'_blank'});
        $('#menuProfile a').html(`<img src="${user.photo}" alt="${user.name}" title="Clique para ver seu perfil."><span title="${user.name}">${abbrName}</span>`);
        $('#menuProfile').show('fast');
        $('#menuLoginout').html('<i class="fas fa-fw fa-sign-out-alt"></i> Logout / Sair');
        $('#menuLoginout').attr('href','#logout');
    } else {
        $('#headerUser').html('<img src="img/nouser.png" alt="Entrar" title="CLique para entrar">');
        $('#headerUser').attr({'href':'#login','target':'_none'});
        $('#menuProfile a').html(`<img src="img/nouser.png" alt="Entrar" title="CLique para entrar"><span>Fazer login</span>`);
        $('#menuProfile').hide('fast');
        $('#menuLoginout').html('<i class="fas fa-fw fa-sign-in-alt"></i> Login / Entrar');
        $('#menuLoginout').attr('href','#login');
    }
}

// Faz login de um usuÃ¡rio
function loginUser(){
    /******************* REMOVER * LOGIN * FAKE **********************/
    var user = {
        name : 'Joca da Silva Souza de Castro Siriliano QueirÃ³z Javaijunto',
        email : 'joca@silva.com',
        photo : 'img/jocasilva.jpg'
    }
    conf.set('user', user);
    userStatus();
    menuOff();
}

// Faz logout de um usuÃ¡rio
function logoutUser(){
    /******************* REMOVER * LOGOUT * FAKE **********************/
    var user = {
        name : '',
        email : '',
        photo : ''
    }
    conf.set('user', user);
    userStatus();
    menuOff();
}

// ObtÃ©m a data formatada em YYYY-MM-DD HH:II:SS
function agoraDb(myDate = ''){
    if(myDate == '') n = new Date()
    else n = new Date(myDate);
    y = n.getFullYear();
    m = n.getMonth();
    d = n.getDate();
    h = n.getHours();
    i = n.getMinutes();
    s = n.getSeconds();
    if(m < 10) m = `0${m}`;
    if(d < 10) d = `0${d}`;
    if(h < 10) h = `0${h}`;
    if(i < 10) i = `0${i}`;
    if(s < 10) s = `0${s}`;
    return `${y}-${m}-${d} ${h}:${i}:${s}`;
}

// FunÃ§Ã£o padrÃ£o para 'sanitizar' os valores dos campos
function sanitiza(texto) { 
	// Limpa espaÃ§os antes e depois da string
	texto = texto.trim();

	// Limpa espaÃ§os duplicados dentro da string
	while(texto.indexOf('  ') != -1) { 
		texto = texto.replace('  ', ' ');
	}

	// Altera caracteres indesejados(usando expressÃ£o regular) 
	texto = texto.replace(/&/g, '&amp;'); /* Caractere '&' */
	texto = texto.replace(/</g, '&lt;'); /* Caractere '<' */
	texto = texto.replace(/>/g, '&gt;'); /* Caractere '>' */
	texto = texto.replace(/"/g, '&quot;'); /* Caractere '"' */

	// Retorna string 'limpa'
	return texto;
}

// FunÃ§Ã£o para validar somente letras (usando expressÃ£o regular e match())
function soLetras(texto) { 
	if(texto.match(/[^a-zÃ -Ãº ]/gi)) { 
		return false;
	}
	return true;
}

// FunÃ§Ã£o para validar um endereÃ§o de e-mail(usando expressÃ£o regular e match())
function isMail(texto) { 
	if(texto.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]{2,}$/)) {
		return true;
	}
	return false;
}