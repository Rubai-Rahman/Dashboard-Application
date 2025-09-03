import UserDetails from './page-user-details';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function UserDetailsPage({ params }: Props) {
  const { id } = await params;
  return <UserDetails params={{ id }} />;
}
