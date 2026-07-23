import { NextRequest, NextResponse } from 'next/server';

// Auth handler — delegates to Better Auth when DATABASE_URL is configured
// Returns a placeholder when DB is not yet connected
export async function GET(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // If DATABASE_URL is set, use full Better Auth
  if (process.env.DATABASE_URL) {
    try {
      const { createAuth } = await import('@/lib/auth');
      const auth = createAuth();
      return auth.handler(request);
    } catch (error) {
      return NextResponse.json({ error: 'Auth initialization failed' }, { status: 500 });
    }
  }

  // Without DB, return basic auth info
  if (pathname.endsWith('/session') || pathname.includes('get-session')) {
    return NextResponse.json({ session: null, user: null });
  }

  return NextResponse.json({ 
    message: 'Authentication requires database connection. Set DATABASE_URL environment variable.',
    endpoints: ['/sign-in', '/sign-up', '/session'],
  });
}

export async function POST(request: NextRequest) {
  if (process.env.DATABASE_URL) {
    try {
      const { createAuth } = await import('@/lib/auth');
      const auth = createAuth();
      return auth.handler(request);
    } catch (error) {
      return NextResponse.json({ error: 'Auth initialization failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ 
    error: 'Authentication requires database connection. Set DATABASE_URL environment variable.',
  }, { status: 503 });
}
