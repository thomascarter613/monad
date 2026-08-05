import { z } from 'zod';

const emptyStringToUndefined = (value: unknown) => (value === '' ? undefined : value);

const publicEnvironmentSchema = z.object({
  siteUrl: z.string().url(),
  repositoryUrl: z.preprocess(emptyStringToUndefined, z.string().url().optional()),
});

export type PublicEnvironment = z.infer<typeof publicEnvironmentSchema>;

type EnvironmentSource = Record<string, string | undefined>;

export function parsePublicEnvironment(source: EnvironmentSource): PublicEnvironment {
  const result = publicEnvironmentSchema.safeParse({
    siteUrl: source.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    repositoryUrl: source.NEXT_PUBLIC_REPOSITORY_URL,
  });

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join('.') || 'environment'}: ${issue.message}`)
      .join('; ');

    throw new Error(`Invalid public environment configuration: ${details}`);
  }

  return result.data;
}

export const publicEnvironment = parsePublicEnvironment({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_REPOSITORY_URL: process.env.NEXT_PUBLIC_REPOSITORY_URL,
});
