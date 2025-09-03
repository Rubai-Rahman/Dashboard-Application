import { User } from '@/components/users/columns';
import Home from '@/components/main/home';

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();
  return data;
}

export default async function HomePage() {
  const data = await getData();

  console.log('data', data);

  return <Home data={data} />;
}
