import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { day, city } = await req.json();
    console.log('Received request with:', { day, city });

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
      range: 'A:H',
    });

    const rows = response.data.values || [];
    console.log('Raw data from sheet:', rows[0]);
    
    // פילטור התוצאות לפי יום ועיר
    const filteredRows = rows.filter(row => {
      if (row.length < 3) return false;

      // מחלץ את היום מהתאריך (עמודה 2)
      const dateStr = row[2]?.trim() || '';
      if (!dateStr) return false;

      // מחלץ את היום מהשורה הראשונה (עמודה 1)
      const dayStr = row[1]?.trim() || '';
      if (!dayStr) return false;

      // המרת היום מעברית לאנגלית
      const dayMapping: { [key: string]: string } = {
        'רביעי': 'wednesday',
        'שלישי': 'tuesday',
        'שני': 'monday',
        'ראשון': 'sunday',
        'חמישי': 'thursday',
        'שישי': 'friday',
        'שבת': 'saturday'
      };

      // מנקה את המילה "יום" אם קיימת
      const cleanDayStr = dayStr.replace('יום', '').trim();
      const normalizedRowDay = dayMapping[cleanDayStr] || cleanDayStr;

      console.log('Processing row:', {
        date: dateStr,
        dayStr: cleanDayStr,
        normalizedDay: normalizedRowDay,
        requestedDay: day,
        city: row[6],
        requestedCity: city,
      });
      
      const matchDay = !day || normalizedRowDay === day.toLowerCase();
      const matchCity = !city || (row[6] && row[6].trim().toLowerCase() === city.toLowerCase());
      
      return matchDay && matchCity;
    });

    // המרת התוצאות לפורמט מובנה יותר
    const formattedResults = filteredRows.map(row => ({
      time: row[0] || '',
      day: row[1]?.replace('יום', '').trim() || '',
      date: row[2] || '',
      name: row[3] || '',
      type: row[4] || '',
      rank: row[5] || '',
      city: row[6] || '',
      location: row[7] || '',
      notes: row[8] || ''
    }));

    console.log('Final formatted results:', formattedResults);

    return NextResponse.json({ 
      results: formattedResults,
      debug: { 
        day, 
        city, 
        totalRows: rows.length, 
        filteredCount: filteredRows.length,
      }
    });

  } catch (error) {
    console.error('Error in search-sheet API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to search sheet', 
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

