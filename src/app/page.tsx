import { columns, User } from '@/components/users/columns';
import { DataTable } from '@/components/users/data-table';

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();
  return data;
}

export default async function HomePage() {
  const data = await getData();
  console.log('data', data);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
