'use client';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building,
  User,
  Award,
  Sparkles,
  User2,
  Zap,
  Star,
  Users,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
const FloatingParticle = ({ delay = 0 }) => (
  <motion.div
    className="absolute w-2 h-2 bg-primary/20 rounded-full"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [-100, -200],
      x: [0, 50, -50, 0],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      repeatDelay: 2,
      ease: 'easeInOut',
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  />
);

export default function UserPage({ userData }: { userData: User }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedName, setTypedName] = useState('');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  // Typing animation for name
  useEffect(() => {
    const name = userData.name;
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < name.length) {
        setTypedName(name.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
    mouseX.set(clientX - window.innerWidth / 2);
    mouseY.set(clientY - window.innerHeight / 2);
  };
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 px-4 py-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      onMouseMove={handleMouseMove}
    >
      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} />
        ))}
      </div>

      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, hsl(var(--primary)/0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, hsl(var(--primary)/0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 40%, hsl(var(--primary)/0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with Enhanced Back Button */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/">
              <Button
                variant="outline"
                className="mb-8 group bg-card/50 backdrop-blur-sm border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300"
              >
                <motion.div
                  animate={{ x: [-2, 0, -2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </motion.div>
                Back to Portal
              </Button>
            </Link>
          </motion.div>

          <div className="text-center">
            <motion.h1
              className="text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent mb-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                duration: 1,
                bounce: 0.4,
                delay: 0.2,
              }}
            >
              <motion.span
                animate={{
                  textShadow: [
                    '0 0 20px hsl(var(--primary)/0.5)',
                    '0 0 30px hsl(var(--primary)/0.8)',
                    '0 0 20px hsl(var(--primary)/0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                User Profile
              </motion.span>
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-4"
            />
            <motion.p
              className="text-muted-foreground text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Immersive user experience with stunning visuals
            </motion.p>
          </div>
        </motion.div>

        {/* Enhanced Main Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ type: 'spring', duration: 1, bounce: 0.2, delay: 0.2 }}
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          whileHover={{
            scale: 1.02,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          <Card className="mb-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-2xl border-primary/20 overflow-hidden relative">
            {/* Card glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <CardContent className="p-10 relative z-10">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
                {/* Enhanced Avatar Section */}
                <motion.div
                  className="relative"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: 'spring',
                    duration: 1.2,
                    bounce: 0.4,
                    delay: 0.5,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.3 },
                  }}
                >
                  {/* Animated rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <div className="w-40 h-40 rounded-full border-2 border-primary/30 border-dashed" />
                  </motion.div>
                  <motion.div
                    className="absolute inset-2 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <div className="w-36 h-36 rounded-full border border-accent/40" />
                  </motion.div>

                  <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-primary to-accent p-1">
                    <User2 />
                  </div>

                  {/* Status indicators */}
                  <motion.div
                    className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <User className="w-6 h-6 text-primary-foreground" />
                  </motion.div>

                  <motion.div
                    className="absolute -top-2 -left-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                    animate={{
                      boxShadow: [
                        '0 0 0 0px rgba(34, 197, 94, 0.7)',
                        '0 0 0 10px rgba(34, 197, 94, 0)',
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </motion.div>
                </motion.div>

                {/* Enhanced User Info */}
                <div className="flex-1 text-center lg:text-left space-y-6">
                  <div>
                    <motion.h2
                      className="text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      {userData.name}
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-primary"
                      >
                        |
                      </motion.span>
                    </motion.h2>

                    <motion.p
                      className="text-2xl text-primary font-medium mb-6"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      @{userData.username}
                    </motion.p>
                  </div>

                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <motion.div
                      className="bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/30"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: 'hsl(var(--primary)/0.1)',
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2, type: 'spring' }}
                    >
                      <span className="text-sm font-semibold text-foreground flex items-center">
                        <Sparkles className="w-4 h-4 mr-2" />
                        ID: #{userData.id}
                      </span>
                    </motion.div>

                    <motion.div
                      className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-green-500/30"
                      whileHover={{ scale: 1.05 }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.4, type: 'spring' }}
                    >
                      <span className="text-sm font-semibold text-foreground flex items-center">
                        <Award className="w-4 h-4 mr-2 text-green-500" />
                        Premium User
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Enhanced Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{
              type: 'spring',
              duration: 1,
              bounce: 0.3,
              delay: 0.4,
            }}
            whileHover={{
              scale: 1.03,
              rotateY: 5,
              transition: { duration: 0.3 },
            }}
            style={{ transformPerspective: 1000 }}
          >
            <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-xl border-primary/20 h-full overflow-hidden relative group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <CardContent className="p-8 relative z-10">
                <motion.h3
                  className="text-2xl font-bold text-foreground mb-6 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Mail className="w-6 h-6 mr-3 text-primary" />
                  </motion.div>
                  Contact Information
                </motion.h3>

                <div className="space-y-5">
                  {[
                    {
                      icon: Mail,
                      label: 'Email',
                      value: userData.email,
                      color: 'text-blue-500',
                    },
                    {
                      icon: Phone,
                      label: 'Phone',
                      value: userData.phone,
                      color: 'text-green-500',
                    },
                    {
                      icon: Globe,
                      label: 'Website',
                      value: userData.website,
                      color: 'text-purple-500',
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center p-4 bg-gradient-to-r from-accent/10 to-accent/5 backdrop-blur-sm rounded-xl border border-accent/20 hover:border-primary/40 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: 'hsl(var(--accent)/0.2)',
                      }}
                    >
                      <motion.div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mr-4`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground font-medium">
                          {item.label}
                        </p>
                        <p className="text-foreground font-semibold">
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Address Card */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{
              type: 'spring',
              duration: 1,
              bounce: 0.3,
              delay: 0.5,
            }}
            whileHover={{
              scale: 1.03,
              rotateY: -5,
              transition: { duration: 0.3 },
            }}
            style={{ transformPerspective: 1000 }}
          >
            <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-xl border-primary/20 h-full overflow-hidden relative group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <CardContent className="p-8 relative z-10">
                <motion.h3
                  className="text-2xl font-bold text-foreground mb-6 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  >
                    <MapPin className="w-6 h-6 mr-3 text-primary" />
                  </motion.div>
                  Location Details
                </motion.h3>

                <motion.div
                  className="p-6 bg-gradient-to-br from-accent/10 to-primary/5 backdrop-blur-sm rounded-xl border border-accent/20"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 10px 30px -10px hsl(var(--primary)/0.3)',
                  }}
                >
                  <div className="space-y-3">
                    <motion.p
                      className="text-foreground font-semibold text-lg"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.1 }}
                    >
                      {userData.address.street}, {userData.address.suite}
                    </motion.p>
                    <motion.p
                      className="text-foreground font-medium"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      {userData.address.city}, {userData.address.zipcode}
                    </motion.p>

                    <motion.div
                      className="mt-4 pt-4 border-t border-border/30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3 }}
                    >
                      <p className="text-sm text-muted-foreground mb-2 flex items-center">
                        <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                        GPS Coordinates
                      </p>
                      <motion.p
                        className="text-sm text-foreground font-mono bg-primary/10 px-3 py-1 rounded"
                        whileHover={{
                          backgroundColor: 'hsl(var(--primary)/0.2)',
                        }}
                      >
                        {userData.address.geo.lat}, {userData.address.geo.lng}
                      </motion.p>
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Enhanced Company Information */}
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', duration: 1, bounce: 0.2, delay: 0.6 }}
          whileHover={{
            scale: 1.02,
            rotateX: 2,
            transition: { duration: 0.3 },
          }}
          style={{ transformPerspective: 1000 }}
        >
          <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-2xl border-primary/20 overflow-hidden relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"
              animate={{
                background: [
                  'linear-gradient(45deg, hsl(var(--primary)/0.05), hsl(var(--accent)/0.05))',
                  'linear-gradient(45deg, hsl(var(--accent)/0.05), hsl(var(--primary)/0.05))',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
            <CardContent className="p-10 relative z-10">
              <motion.h3
                className="text-2xl font-bold text-foreground mb-8 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Building className="w-6 h-6 mr-3 text-primary" />
                </motion.div>
                Company Information
              </motion.h3>

              <motion.div
                className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 backdrop-blur-sm p-8 rounded-2xl border border-primary/20 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                <div className="relative z-10">
                  <motion.h4
                    className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.2, type: 'spring' }}
                  >
                    {userData.company.name}
                  </motion.h4>

                  <motion.div
                    className="flex items-center mb-4"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <p className="text-xl text-primary font-semibold italic">
                      {userData.company.catchPhrase}
                    </p>
                  </motion.div>

                  <motion.div
                    className="flex items-start"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.6 }}
                  >
                    <Users className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-foreground">
                        Business Focus:
                      </span>
                      <p className="text-muted-foreground ml-1 inline">
                        {userData.company.bs}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
