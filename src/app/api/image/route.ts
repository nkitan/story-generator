import { fetchImage } from '@/util/FetchImage';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await fetchImage("A rabbit")
  return NextResponse.json(data);
}
