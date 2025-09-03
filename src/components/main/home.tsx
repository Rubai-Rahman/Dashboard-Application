'use client';
import { motion } from 'motion/react';
import { DataTable } from '../users/data-table';
import { columns, User } from '../users/columns';

const Home = ({ data }: { data: User[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6"
    >
      <div className="max-w-7xl mx-auto border-2 border-primary/20 rounded-2xl p-6">
        <DataTable
          columns={columns}
          data={data}
          title="User Directory"
          description="Comprehensive user management with advanced search and filtering capabilities"
        />
      </div>
    </motion.div>
  );
};

export default Home;
