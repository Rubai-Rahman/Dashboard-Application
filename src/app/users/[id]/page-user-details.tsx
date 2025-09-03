import UserPage from '@/components/users/users';

const UserDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const getData = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data = await res.json();
    return data;
  };

  const userData = await getData(); // Add await here
  console.log('data', userData);

  return <UserPage userData={userData} />;
};

export default UserDetails;
