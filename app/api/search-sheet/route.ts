import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: 'Cities!A:A',
    });

    const rows = response.data.values || [];
    const cities = rows.map(row => row[0]);

    return NextResponse.json({ cities });

  } catch (error) {
    console.error('Error in cities API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch cities', 
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { day, city, rank, type } = await req.json();

    // Define the type for results
    const results: { name: string; rank?: string; time: string; day: string; date: string; city: string; type: string; location: string; notes?: string }[] = []; // Replace with actual search results

    // Example usage of the variables to avoid ESLint errors
    console.log(`Search parameters: day=${day}, city=${city}, rank=${rank}, type=${type}`);
    
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error in search API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process search', 
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
