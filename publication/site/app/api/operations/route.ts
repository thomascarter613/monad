import {
  ciPolicy,
  deploymentProfiles,
  operationsContractVersion,
  releasePolicy,
} from '@/operations.config.mjs';
import { securityContractVersion } from '@/security.config.mjs';

export const dynamic = 'force-static';

export function GET() {
  return Response.json(
    {
      schemaVersion: 1,
      operationsContractVersion,
      securityContractVersion,
      ciPolicy,
      deploymentProfiles,
      releasePolicy,
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
        'X-Robots-Tag': 'noindex, follow',
      },
    },
  );
}
