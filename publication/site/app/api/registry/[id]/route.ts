import { NextResponse } from 'next/server';
import { getRegistryDocument } from '@/lib/content/registry';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const document = await getRegistryDocument(decodeURIComponent(id));
  if (!document) {
    return NextResponse.json({ error: 'DOCUMENT_NOT_FOUND', id }, { status: 404 });
  }
  return NextResponse.json(document);
}
