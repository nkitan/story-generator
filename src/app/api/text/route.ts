import { fetchText } from '@/util/FetchText';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await fetchText("The stories in Dubliners are depictions of life in Dublin around 1910. T. S. Eliot, amongst others, described The Dead as one of the greatest short stories ever written.Irish middle-class life jumps from the page, as Gabriel Conroy gives a speech at a family party and finds his principles and beliefs challenged.There is a lyrical, melancholic tone as his thoughts move from awkward social encounters, to Irish nationalism, to the role of the dead in people’s lives. It offers a beautifully accessible route into the world of an often-inaccessible writer.")
  return NextResponse.json(data, {status: 200, statusText: "SUCCESS"});
}