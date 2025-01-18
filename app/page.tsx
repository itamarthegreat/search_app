import SearchForm from '@/app/components/SearchForm';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">חיפוש בגיליון</h1>
      <SearchForm />
    </main>
  );
}

