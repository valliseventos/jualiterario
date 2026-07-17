const { neon } = require('@neondatabase/serverless');
const establishments = require('../data/estabelecimentos.json');

const EVENT_SLUG = 'jua-literaria-2026';
const establishmentSlugs = new Set(establishments.map(function (est) { return est.slug; }));

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'method_not_allowed' });
    return;
  }

  if (!process.env.DATABASE_URL) {
    sendJson(res, 503, { error: 'database_not_configured' });
    return;
  }

  var body = req.body || {};
  var visitorId = typeof body.visitorId === 'string' ? body.visitorId.trim() : '';
  var establishmentSlug = typeof body.establishmentSlug === 'string' ? body.establishmentSlug.trim() : '';

  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(visitorId)) {
    sendJson(res, 400, { error: 'invalid_visitor_id' });
    return;
  }

  if (!establishmentSlugs.has(establishmentSlug)) {
    sendJson(res, 400, { error: 'invalid_establishment' });
    return;
  }

  try {
    var sql = neon(process.env.DATABASE_URL);
    var result = await sql`
      INSERT INTO establishment_visits (visitor_id, establishment_slug, event_slug)
      VALUES (${visitorId}::uuid, ${establishmentSlug}, ${EVENT_SLUG})
      ON CONFLICT (visitor_id, establishment_slug, event_slug) DO NOTHING
      RETURNING id
    `;

    sendJson(res, 200, { registered: result.length > 0 });
  } catch (error) {
    console.error('visit_registration_failed', error);
    sendJson(res, 500, { error: 'visit_registration_failed' });
  }
};
