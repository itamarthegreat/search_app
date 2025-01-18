import { google } from 'googleapis'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: 'A:H',
    })

    const rows = response.data.values || []
    
    // מחלץ את כל הערים מהעמודה האחרונה (אינדקס 6)
    const cities = rows
      .map(row => row[6]?.trim()) // שינינו ל-6 במקום 5
      .filter(Boolean) // מסיר ערכים ריקים
      .filter(city => 
        city !== 'עיר' && // מסיר את הכותרת
        !city.includes('נוצר ב') && // מסיר שורות של תאריכי יצירה
        !city.includes(':') // מסיר שורות של שעות
      )
      .filter((city, index, self) => self.indexOf(city) === index) // מסיר כפילויות
      .sort((a, b) => a.localeCompare(b, 'he')) // ממיין לפי א-ב בעברית

    console.log('Available cities:', cities)

    return NextResponse.json({ cities })
  } catch (error) {
    console.error('Error fetching cities:', error)
    return NextResponse.json({ error: 'Failed to fetch cities' }, { status: 500 })
  }
} 