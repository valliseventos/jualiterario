const { neon } = require('@neondatabase/serverless');
const establishments = require('../../data/estabelecimentos.json');

const EVENT_SLUG = 'jua-literaria-2026';
const establishmentsBySlug = {};
establishments.forEach(function (est) { establishmentsBySlug[est.slug] = est; });

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    sendJson(res, 405, { error: 'method_not_allowed' });
    return;
  }

  if (!process.env.DATABASE_URL) {
    sendJson(res, 503, { error: 'database_not_configured' });
    return;
  }

  try {
    var sql = neon(process.env.DATABASE_URL);
    var totals = await sql`
      SELECT establishment_slug, COUNT(*)::int AS unique_visitors, MAX(created_at) AS latest_visit
      FROM establishment_visits
      WHERE event_slug = ${EVENT_SLUG}
      GROUP BY establishment_slug
    `;
    var totalVisitors = await sql`
      SELECT COUNT(DISTINCT visitor_id)::int AS total_visitors
      FROM establishment_visits
      WHERE event_slug = ${EVENT_SLUG}
    `;
    var recent = await sql`
      SELECT establishment_slug, created_at
      FROM establishment_visits
      WHERE event_slug = ${EVENT_SLUG}
      ORDER BY created_at DESC
      LIMIT 100
    `;

    var totalsBySlug = {};
    totals.forEach(function (row) { totalsBySlug[row.establishment_slug] = row; });

    sendJson(res, 200, {
      event: EVENT_SLUG,
      totalVisitors: totalVisitors[0] ? totalVisitors[0].total_visitors : 0,
      establishments: establishments.map(function (est) {
        var row = totalsBySlug[est.slug];
        return {
          id: est.id,
          slug: est.slug,
          name: est.name,
          category: est.category,
          neighborhood: est.neighborhood,
          uniqueVisitors: row ? row.unique_visitors : 0,
          latestVisit: row ? row.latest_visit : null
        };
      }),
      recentVisits: recent.map(function (row) {
        var est = establishmentsBySlug[row.establishment_slug];
        return {
          slug: row.establishment_slug,
          name: est ? est.name : row.establishment_slug,
          category: est ? est.category : '',
          timestamp: row.created_at
        };
      })
    });
  } catch (error) {
    console.error('dashboard_query_failed', error);
    sendJson(res, 500, { error: 'dashboard_query_failed' });
  }
};
