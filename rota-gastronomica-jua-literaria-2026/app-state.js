var STORAGE_KEY = 'rotas_visitas';
var PARTICIPANT_NAME_KEY = 'rota_participante_nome';
var VISITOR_ID_KEY = 'rota_visitante_id';
var EVENT_SLUG = 'jua-literaria-2026';

function getVisitorId() {
  try {
    var existing = localStorage.getItem(VISITOR_ID_KEY);
    if (existing) return existing;

    var id = window.crypto && window.crypto.randomUUID
      ? window.crypto.randomUUID()
      : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0;
          var v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    localStorage.setItem(VISITOR_ID_KEY, id);
    return id;
  } catch (e) {
    return '';
  }
}

function registrarVisitaServidor(establishmentSlug) {
  var visitorId = getVisitorId();
  if (!visitorId || !establishmentSlug) return;

  fetch('/api/visitas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      visitorId: visitorId,
      establishmentSlug: establishmentSlug,
      event: EVENT_SLUG
    }),
    keepalive: true
  }).catch(function () {
    // O passaporte local continua funcionando se a API estiver indisponível.
  });
}

function getParticipantName() {
  try {
    return localStorage.getItem(PARTICIPANT_NAME_KEY) || '';
  } catch (e) {
    return '';
  }
}

function saveParticipantName(name) {
  try {
    localStorage.setItem(PARTICIPANT_NAME_KEY, name.trim());
    return true;
  } catch (e) {
    return false;
  }
}

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
