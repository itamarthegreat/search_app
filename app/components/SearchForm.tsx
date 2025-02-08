'use client';

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
    { id: 'none', label: 'בחר דרג' },
    { id: 'ראשון', label: 'דרג ראשון' },
    { id: 'עררים', label: 'עררים' },
  ];

  const types = [
    { id: 'none', label: 'בחר תחום' },
    { id: 'נכות כללית', label: 'נכות כללית' },
    { id: 'נכות מהעבודה איבה ומס הכנסה', label: 'נכות מהעבודה איבה ומס הכנסה' },
    { id: 'ילד נכה', label: 'ילד נכה' },
  ];
