import { spawn } from 'node:child_process';

async function ready(url, timeout = 45_000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url, { redirect: 'manual' });
      if (response.status < 500) return true;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 350));
  }
  return false;
}

export async function publicationServer({ siteRoot, baseUrl, port = 4317 }) {
  if (baseUrl) {
    if (!(await ready(baseUrl))) throw new Error(`Publication server is not reachable: ${baseUrl}`);
    return { baseUrl: baseUrl.replace(/\/$/, ''), close: async () => {} };
  }

  const url = `http://127.0.0.1:${port}`;
  const child = spawn(
    'bun',
    ['--bun', 'next', 'start', '--hostname', '127.0.0.1', '--port', String(port)],
    {
      cwd: siteRoot,
      stdio: ['ignore', 'inherit', 'inherit'],
      env: { ...process.env, NEXT_PUBLIC_SITE_URL: url },
    },
  );
  if (!(await ready(url))) {
    child.kill('SIGTERM');
    throw new Error(
      `Next.js publication server did not become ready at ${url}. Run bun run build first.`,
    );
  }
  return {
    baseUrl: url,
    close: async () => {
      if (child.exitCode !== null) return;
      child.kill('SIGTERM');
      await Promise.race([
        new Promise((resolve) => child.once('exit', resolve)),
        new Promise((resolve) => setTimeout(resolve, 3_000)),
      ]);
      if (child.exitCode === null) child.kill('SIGKILL');
    },
  };
}
