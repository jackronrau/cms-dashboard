    const rows =  fetch(`https://frp.maxd.cloud:17922/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
  sql: 'insert into "tools" ("id", "slug", "created_at", "updated_at", "is_active", "name", "description", "website_url", "logo_url", "type", "usage", "meta_title", "meta_description", "og_image", "canonical_url", "alternate_urls", "view_count", "ranking", "content_status", "last_content_sync", "default_content_source") values (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, ?, ?, ?, ?, ?, ?, null, null, null, null, null, ?, null, null, null, null) returning "id", "slug", "created_at", "updated_at", "is_active", "name", "description", "website_url", "logo_url", "type", "usage", "meta_title", "meta_description", "og_image", "canonical_url", "alternate_urls", "view_count", "ranking", "content_status", "last_content_sync", "default_content_source"',
  params: [
    '6a1ce5d5c',
    'nextjs',
    1,
    'Next.js',
    'A clear and concise description of the tool.\n\n',
    'https://nextjs.org',
    'https://nextjs.org/favicon.ico',
    'github',
    'free',
    0
  ],
  method: 'all'
}),
    }).then((res) => res.json()).then(console.log).catch(console.log)

