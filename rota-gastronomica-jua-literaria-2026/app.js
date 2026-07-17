function renderCards(restaurants) {
  var target = document.querySelector("#featured-restaurants");
  if (!target) return;

  var featured = restaurants.filter(function (item) { return item.featured; });

  target.innerHTML = featured.map(function (item) {
    return '<a href="estabelecimento.html?slug=' + item.slug + '" style="display: block; text-decoration: none; color: inherit;">' +
      '<article class="restaurant-card">' +
        '<img src="' + item.image + '" alt="' + item.name + '" loading="lazy">' +
        '<div class="card-body">' +
          '<div class="card-meta">' +
            '<span>' + item.category + '</span>' +
            '<span class="card-price">' + (item.priceLabel || 'Consultar cardápio') + '</span>' +
          '</div>' +
          '<h3>' + item.name + '</h3>' +
          '<p>' + (item.description || 'Estabelecimento participante da Rota Gastronômica Juá Literária.') + '</p>' +
          (item.specialDish ? '<span class="card-dish">Prato especial: ' + item.specialDish + '</span>' : '') +
        '</div>' +
      '</article>' +
    '</a>';
  }).join("");
}

function setCurrentYear() {
  var yearTarget = document.querySelector("#current-year");
  if (yearTarget) yearTarget.textContent = String(new Date().getFullYear());
}

fetch("data/estabelecimentos.json")
  .then(function (response) { return response.json(); })
  .then(renderCards)
  .catch(function () {
    var target = document.querySelector("#featured-restaurants");
    if (target) target.innerHTML = '<p>Não foi possível carregar os estabelecimentos.</p>';
  });

setCurrentYear();
