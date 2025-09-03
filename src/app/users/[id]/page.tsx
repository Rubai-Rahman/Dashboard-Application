'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { User } from '@/components/users/columns';

export default function UserDetailsPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        setUser({
          id: data.id.toString(),
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: {
            name: data.company.name,
            catchPhrase: data.company.catchPhrase,
            bs: data.company.bs,
          },
        });
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-6"
        >
          <div className="text-6xl">😕</div>
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
        <p className="text-muted-foreground mb-6">The requested user could not be found.</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 md:p-8"
    >
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" /> Back to Users
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold mb-4">
              {user.name.charAt(0)}
            </div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-blue-100">{user.email}</p>
          </motion.div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
          >
            <h2 className="text-lg font-semibold mb-3">Contact Information</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Phone:</span> {user.phone}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
          >
            <h2 className="text-lg font-semibold mb-3">Company</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {user.company.name}</p>
              <p><span className="font-medium">Catch Phrase:</span> {user.company.catchPhrase}</p>
              <p><span className="font-medium">Business:</span> {user.company.bs}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
