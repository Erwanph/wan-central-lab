import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return handleRequest(req, 'GET');
}

export async function POST(req: NextRequest) {
  return handleRequest(req, 'POST');
}

export async function PATCH(req: NextRequest) {
  return handleRequest(req, 'PATCH');
}

async function handleRequest(req: NextRequest, method: string) {
  try {
    const { searchParams } = new URL(req.url);
    const api = searchParams.get('api');
    const body = method === 'GET' ? null : await req.json();

    let apiUrl = '';

    switch (api) {
      case 'login':
        apiUrl = 'http://217.196.49.173:6560/api/v1/auth/login/';
        break;
      case 'register':
        apiUrl = 'http://217.196.49.173:6560/api/v1/auth/register/';
        break;
      case 'getProfile':
        apiUrl = 'http://217.196.49.173:6560/api/v1/profile/';
        break;
      case 'updateProfile':
        apiUrl = 'http://217.196.49.173:6560/api/v1/profile/';
        break;
      case 'updateScore':
        apiUrl = 'http://217.196.49.173:6560/api/v1/profile/score';
        break;
      default:
        return NextResponse.json({ message: 'API not found' }, { status: 404 });
    }
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      } as Record<string, string>,
    };    
    const authorizationHeader = req.headers.get('Authorization');
    if (authorizationHeader) {
      (fetchOptions.headers as Record<string, string>)['Authorization'] = authorizationHeader;
    }

    if (method !== 'GET' || body) {
      fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(apiUrl, fetchOptions);

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Request failed' },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error connecting to API:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
