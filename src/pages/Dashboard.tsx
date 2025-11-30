import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, MessageSquare, BookOpen, TrendingUp, Mic, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user, signOut } = useAuth();

  const quickActions = [
    { icon: MessageSquare, label: 'AI Agents', href: '/agents', description: 'Chat with specialized AI assistants' },
    { icon: BookOpen, label: 'Resources', href: '/resources', description: 'Explore accessibility resources' },
    { icon: Mic, label: 'Speech Synthesis', href: '/speech', description: 'Customize your voice profiles' },
    { icon: TrendingUp, label: 'Progress', href: '/progress', description: 'Track your learning journey' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tighter">
              UNMUTE
              <span className="text-primary inline-flex items-baseline">
                1
                <Mic className="w-4 h-4 ml-1" />
              </span>
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={signOut}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Welcome back, {user?.user_metadata?.full_name || 'there'}!
            </h2>
            <p className="text-muted-foreground">
              Your personalized accessibility platform is ready
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={action.href}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <action.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{action.label}</CardTitle>
                      <CardDescription>{action.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="interactions">
                  <TabsList className="w-full">
                    <TabsTrigger value="interactions" className="flex-1">Interactions</TabsTrigger>
                    <TabsTrigger value="resources" className="flex-1">Resources</TabsTrigger>
                    <TabsTrigger value="conversations" className="flex-1">Conversations</TabsTrigger>
                  </TabsList>
                  <TabsContent value="interactions" className="pt-6">
                    <p className="text-muted-foreground text-center py-8">
                      Start using the platform to see your activity here
                    </p>
                  </TabsContent>
                  <TabsContent value="resources" className="pt-6">
                    <p className="text-muted-foreground text-center py-8">
                      Bookmark resources to see them here
                    </p>
                  </TabsContent>
                  <TabsContent value="conversations" className="pt-6">
                    <p className="text-muted-foreground text-center py-8">
                      Your AI conversations will appear here
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-muted-foreground">0%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '0%' }} />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Start your learning journey to track progress
                  </p>
                  <Link to="/progress">
                    <Button className="w-full" variant="outline">
                      View Detailed Progress
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
