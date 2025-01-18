'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import GoogleAuth from './GoogleAuth';

export default function SearchForm() {
  const [city, setCity] = useState('');
  const [day, setDay] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      setError('Please authenticate with Google first');
      return;
    }
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/search-sheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city, day, accessToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setResults(data.data);
    } catch (err) {
      setError('An error occurred while fetching the data.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = (token: string) => {
    setAccessToken(token);
  };

  return (
    <div>
      <GoogleAuth onAuthSuccess={handleAuthSuccess} />
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="day">Day</Label>
          <Input
            id="day"
            type="text"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={isLoading || !accessToken}>
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {results.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Results:</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  {Object.keys(results[0]).map((key) => (
                    <th key={key} className="py-2 px-4 border-b">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value: any, cellIndex) => (
                      <td key={cellIndex} className="py-2 px-4 border-b">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

