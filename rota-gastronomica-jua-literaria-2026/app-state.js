var STORAGE_KEY = 'rotas_visitas';

function getVisitas() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function salvarVisita(slug, name, category) {
  try {
    var visitas = getVisitas();
    var already = visitas.some(function (v) { return v.slug === slug; });
    if (already) { return false; }

    var now = new Date();
    var months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    var dateStr = now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();

    visitas.push({
      slug: slug,
      name: name,
      category: category || '',
      timestamp: now.toISOString(),
      date: dateStr
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(visitas));
    return true;
  } catch (e) {
    return false;
  }
}

function isVisitado(slug) {
  return getVisitas().some(function (v) { return v.slug === slug; });
}

function getContagem() {
  return getVisitas().length;
}

function getVisitaPorSlug(slug) {
  var visitas = getVisitas();
  for (var i = 0; i < visitas.length; i++) {
    if (visitas[i].slug === slug) { return visitas[i]; }
  }
  return null;
}

function getSlugsVisitados() {
  return getVisitas().map(function (v) { return v.slug; });
}
