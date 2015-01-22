chrome.extension.onMessage.addListener(function() {
	// TODO
	// utilizar o .attr("title") ou o alt para o caso de imagens, caso o text() esteja vazio
	// adicionar pagedown e pageup
	// o link ativo deve estar sempre visível
	// Links de divs em vez de links de texto, não aparecem como ativas
	
	// PROBLEMAS
	// Ativar a extensão automaticamente em todas as páginas ou quando o browser é aberto
	// Links que abram popups não devem ser capturados??? ou deviam abrir o popup?
	// Ignorar links com o href="#"
	// Quando o ponteiro do rato está em cima de um link, deve abrir esse link ou deve abrir o link ativo?
	
	
	
	
	var flag_plugin_ativo = 1;
	
	$(function() {
		$(document).on('mousedown', function(e){
			var url = links_href_array[link_active-1];
			
			//botão esquerdo -> abre link ativo
			if (e.which === 1) {
				window.open(url, "_self");
			}        
			//botão direito -> desativa plugin
			if (e.which === 2) {
				console.log("flag_plugin_ativo -> "+flag_plugin_ativo);
				//clearInterval(intervalActivateLink);
				if (flag_plugin_ativo==1) {
					//$('#al_status').append('<img src="'+imgUrl+'" width="48" height="48" style="vertical-align:top">Accessible Links inativo');
					clearInterval(intervalActivateLink);
					flag_plugin_ativo = 0;
					//console.log("desativar plugin");
				} else {
					//$('#al_status').append('<img src="'+imgUrl+'" width="48" height="48" style="vertical-align:top">Accessible Links ativado');
					intervalActivateLink = setInterval(activateLink, 1100);
					flag_plugin_ativo = 1;
					console.log("ativar plugin");
				}
		
			}   
			console.log("e.which -> "+e.which); 
			e.preventDefault();    
		});
	});
	
	var id_number = 0;
	var getNewId = function() {
		id_number++;
		return 'al_id_'+id_number;
	}
	
	// ===================================================================================================
	var link_active = 0;
	var original_bg_color = '';
	var activateLink = function() {
		if (original_bg_color != '') {
			// voltar a colocar a cor de fundo original no link anterior
			$('#'+links_id_array[link_active-1]).css('background-color', original_bg_color);
			//$('#'+links_id_array[link_active-1]).removeClass('al_link_active');
		}
		
		$('html, body').animate({
        	scrollTop: $('#'+links_id_array[link_active]).offset().top
    	}, 500);
		
		original_bg_color = $('#'+links_id_array[link_active]).css('background-color');
		// Colocar a cor de fundo no link ativo
		$('#'+links_id_array[link_active]).css('background-color', '#99CC00');
		//$('#'+links_id_array[link_active]).addClass('al_link_active');
		$('#al_status').empty();

		var imgUrl = chrome.extension.getURL("icons/48x48.png");
		
		$('#al_status').append('<img src="'+imgUrl+'" width="48" height="48" style="vertical-align:top">'+links_text_array[link_active]);
		if (link_active < links_total-1) {
			link_active++;	
		} else {
			link_active = 0;	
		}
	}
	
	// ###################################################################################################
	// esta função não está a ser utilizada
	function isScrolledIntoView(elem) {
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();
		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();	
		return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
		  && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );
	}
	// ####################################################################################################
	
	var link_id;
	var $body_element = $('body');
	var links_id_array = []; 
	var links_href_array = []; 
	var links_text_array = []; 
	$body_element.prepend('<div id="al_status">A detetar links...</div>');
	//$('a').css('background-color', '#0F0');
	$('a').each(function(index, element) {
        link_id = $(this).attr('id');
		if (link_id == undefined) {
			link_id = getNewId();
			$(this).attr('id', link_id);
		}
		links_id_array[index] = link_id;
		links_href_array[index] = $(this).attr('href');
		links_text_array[index] = $(this).text();	
    });
	var links_total = links_id_array.length;
	console.log("links_total -> "+links_total);

	// Ativar links (1 link por segundo)
	var intervalActivateLink = setInterval(activateLink, 1100);	
	
});