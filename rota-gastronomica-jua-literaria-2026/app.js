var ESTABELECIMENTOS = [
  {"id":1,"slug":"casa-da-orla","name":"Casa da Orla","category":"Restaurante","priceLabel":"R$ 58","specialDish":"Arroz de panela com carne de sol e creme de abóbora","description":"Um ponto de encontro voltado para almoços demorados, conversa e cozinha regional com leitura contemporânea.","neighborhood":"Orla I","image":"assets/estabelecimento-1.svg","featured":true,"lat":-9.4150,"lng":-40.5030},
  {"id":2,"slug":"cafe-da-ponte","name":"Cafe da Ponte","category":"Cafe","priceLabel":"R$ 24","specialDish":"Bolo de milho tostado com creme de queijo e café gelado","description":"Ambiente leve e urbano, pensado para pausas rápidas entre uma atividade do festival e outra.","neighborhood":"Centro","image":"assets/estabelecimento-2.svg","featured":true,"lat":-9.4080,"lng":-40.4970},
  {"id":3,"slug":"quintal-do-velho-chico","name":"Quintal do Velho Chico","category":"Bistro","priceLabel":"R$ 67","specialDish":"Peixe grelhado com purê de macaxeira e farofa de castanhas","description":"Uma experiência mais calma, com quintal sombreado, pratos quentes e clima de fim de tarde.","neighborhood":"Orla II","image":"assets/estabelecimento-3.svg","featured":true,"lat":-9.4200,"lng":-40.5080},
  {"id":4,"slug":"mercado-dos-sabores","name":"Mercado dos Sabores","category":"Cozinha rapida","priceLabel":"R$ 31","specialDish":"Sanduíche regional com queijo coalho, melão e melão de rapadura","description":"Parada agitada da rota, com serviço rápido, visual vibrante e proposta pensada para circular.","neighborhood":"Centro","image":"assets/estabelecimento-4.svg","featured":true,"lat":-9.4100,"lng":-40.4950},
  {"id":5,"slug":"varanda-do-sertao","name":"Varanda do Sertao","category":"Restaurante","priceLabel":"R$ 52","specialDish":"Galinhada cremosa com picles de maxixe","description":"Comida afetiva e atmosfera familiar para quem deseja prolongar o passeio pela rota.","neighborhood":"Santo Antonio","image":"assets/estabelecimento-5.svg","featured":false,"lat":-9.4030,"lng":-40.4880},
  {"id":6,"slug":"atelier-doce","name":"Atelier Doce","category":"Sobremesas","priceLabel":"R$ 22","specialDish":"Cartola reinterpretada com mel de umbu","description":"Pequena casa de doces e café, ideal para encerrar o circuito com uma última parada.","neighborhood":"Centro","image":"assets/estabelecimento-6.svg","featured":false,"lat":-9.4120,"lng":-40.4920}
];

function renderCards(restaurants) {
  var target = document.querySelector("#featured-restaurants");
  if (!target) return;

  var featured = restaurants.filter(function (item) { return item.featured; });

  target.innerHTML = featured.map(function (item) {
    return '<a href="estabelecimento.html?slug=' + item.slug + '" style="display: block; text-decoration: none; color: inherit;">' +
      '<article class="restaurant-card">' +
        '<img src="' + item.image + '" alt="Ilustração placeholder do estabelecimento ' + item.name + '" loading="lazy">' +
        '<div class="card-body">' +
          '<div class="card-meta">' +
            '<span>' + item.category + '</span>' +
            '<span class="card-price">' + item.priceLabel + '</span>' +
          '</div>' +
          '<h3>' + item.name + '</h3>' +
          '<p>' + item.description + '</p>' +
          '<span class="card-dish">Prato especial: ' + item.specialDish + '</span>' +
        '</div>' +
      '</article>' +
    '</a>';
  }).join("");
}

renderCards(ESTABELECIMENTOS);

function setCurrentYear() {
  var yearTarget = document.querySelector("#current-year");
  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }
}

setCurrentYear();
