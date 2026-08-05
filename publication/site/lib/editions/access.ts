export type EditionExportPolicy = {
  enabled: boolean;
  secret?: string;
};

export function editionExportPolicy(source: NodeJS.ProcessEnv = process.env): EditionExportPolicy {
  const enabled = source.MONAD_EDITION_EXPORT_ENABLED !== 'false';
  const secret = source.MONAD_EDITION_EXPORT_SECRET?.trim() || undefined;
  return { enabled, secret };
}

export function authorizeEditionExport(request: Request, policy = editionExportPolicy()) {
  if (!policy.enabled) return new Response('Edition export is disabled.', { status: 404 });
  if (!policy.secret) return undefined;
  const authorization = request.headers.get('authorization');
  if (authorization === `Bearer ${policy.secret}`) return undefined;
  return new Response('Unauthorized.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Bearer realm="Monad publication exports"' },
  });
}
