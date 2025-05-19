import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawCity = searchParams.get('city');
  if (!rawCity) {
    return NextResponse.json({ error: 'city パラメータが必要です' }, { status: 400 });
  }
 
  // 日本限定のクエリ文字列を作成
  const city = rawCity.trim();
  const q = city.includes('Japan') || city.includes('日本')
    ? city
    : `${city}, Japan`;
 
  const params = new URLSearchParams({
    q,
    format: 'json',
    limit: '1',
    countrycodes: 'jp',                // 小文字の jp
    viewbox: '122.0,45.0,154.0,24.0',   // 日本列島のおおよその範囲
    bounded: '1',
  });
 
  const url = `https://nominatim.openstreetmap.org/search?${params.toString()}`;
  console.log('[DEBUG] Nominatim URL:', url);
 
  const res = await fetch(url, {
    headers: { 'User-Agent': 'my-next-app/1.0 (+https://example.com)' },
  });
  if (!res.ok) {
    return NextResponse.json(
      { error: `Nominatim エラー: ${res.status}` },
      { status: res.status }
    );
  }
 
  const data = (await res.json()) as Array<{ lat: string; lon: string }>;
  if (data.length === 0) {
    return NextResponse.json({ error: '該当都市が見つかりません' }, { status: 404 });
  }
 1
  const { lat, lon } = data[0];
  return NextResponse.json({ lat, lon });
}