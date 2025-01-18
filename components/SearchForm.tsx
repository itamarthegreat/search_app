'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Result {
  name: string;
  rank?: string;
  time: string;
  day: string;
  date: string;
  city: string;
  type: string;
  location: string;
  notes?: string;
}

export default function SearchForm() {
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedRank, setSelectedRank] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [cities, setCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<Result[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const days = [
    { id: 'sunday', label: 'ראשון' },
    { id: 'monday', label: 'שני' },
    { id: 'tuesday', label: 'שלישי' },
    { id: 'wednesday', label: 'רביעי' },
    { id: 'thursday', label: 'חמישי' },
    { id: 'friday', label: 'שישי' },
    { id: 'saturday', label: 'שבת' },
  ];

  const ranks = [
    { id: 'rank1', label: 'דרג ראשון },
    { id: 'rank2', label: 'עררים' },
  ];

  const types = [
    'נכות כללית',
    'נכות מהעבודה איבה ומס הכנסה',
    'ילד נכה',
  ];

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await fetch('/api/search-sheet/cities');
        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setCities(data.cities || []);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setError('שגיאה בטעינת רשימת הערים');
        setCities([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSearching(true);
      const response = await fetch('/api/search-sheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          day: selectedDay,
          city: selectedCity,
          rank: selectedRank,
          type: selectedType,
        }),
      });
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="form-container space-y-8">
      <h1 className="form-title">חיפוש מומחים</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="day" className="text-gray-700 font-medium">יום</Label>
            <div className="select-container">
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger className="select-trigger">
                  <SelectValue placeholder="בחר יום" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day.id} value={day.id}>
                      {day.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-gray-700 font-medium">עיר</Label>
            <div className="select-container">
              <Select value={selectedCity} onValueChange={setSelectedCity} disabled={isLoading || !!error}>
                <SelectTrigger className="select-trigger">
                  <SelectValue placeholder={
                    error ? "שגיאה בטעינת ערים" :
                    isLoading ? "טוען ערים..." :
                    "בחר עיר"
                  } />
                </SelectTrigger>
                <SelectContent className="cities-select-content">
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="rank" className="text-gray-700 font-medium">דרג</Label>
            <div className="select-container">
              <Select value={selectedRank} onValueChange={setSelectedRank}>
                <SelectTrigger className="select-trigger">
                  <SelectValue placeholder="בחר דרג" />
                </SelectTrigger>
                <SelectContent>
                  {ranks.map((rank) => (
                    <SelectItem key={rank.id} value={rank.id}>
                      {rank.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-gray-700 font-medium">סוג פניה</Label>
            <div className="select-container">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="select-trigger">
                  <SelectValue placeholder="בחר סוג פניה" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

        </div>

        <Button type="submit" disabled={isSearching || isLoading || !!error} 
                className="search-button">
          {isSearching ? "מחפש..." : "חפש"}
        </Button>
      </form>

      {results && results.length > 0 ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">תוצאות החיפוש</h2>
          <div className="grid gap-6">
            {results.map((result, index) => (
              <div key={index} className="result-card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="result-title">
                      {result.name}
                      {result.rank && (
                        <span className="result-rank-badge">
                          <span className="rank-label">דרג:</span> {result.rank}
                        </span>
                      )}
                    </h3>
                  </div>
                  <p className="result-time">
                    {result.time}
                  </p>
                </div>

                <div className="result-details">
                  <div className="space-y-2">
                    <p><span className="font-semibold">יום:</span> {result.day}</p>
                    <p><span className="font-semibold">תאריך:</span> {result.date}</p>
                    <p><span className="font-semibold">עיר:</span> {result.city}</p>
                  </div>
                  <div className="space-y-2">
                    <p><span className="font-semibold">סוג:</span> {result.type}</p>
                    <p><span className="font-semibold">מיקום:</span> {result.location}</p>
                    {result.notes && (
                      <p><span className="font-semibold">הערות:</span> {result.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        results && (
          <div className="text-center text-gray-500 py-8 animate-float">
            <p className="text-lg">לא נמצאו תוצאות</p>
            <p className="text-sm mt-2">נסה לשנות את פרמטרי החיפוש</p>
          </div>
        )
      )}
    </div>
  );
}
