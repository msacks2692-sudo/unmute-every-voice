import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic, Settings, LogOut, TrendingUp, Award, Target, Clock, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

interface LearningProgress {
  skill_category: string;
  progress_level: number;
  milestones_achieved: string[];
  total_time_spent: number;
  last_activity: string;
}

interface InteractionStats {
  total_interactions: number;
  agent_chats: number;
  resource_views: number;
  avg_session_duration: number;
}

const Progress = () => {
  const { user, signOut } = useAuth();
  const [learningProgress, setLearningProgress] = useState<LearningProgress[]>([]);
  const [stats, setStats] = useState<InteractionStats>({
    total_interactions: 0,
    agent_chats: 0,
    resource_views: 0,
    avg_session_duration: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
    loadStats();
  }, []);

  const loadProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('learning_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('progress_level', { ascending: false });

      if (error) throw error;
      setLearningProgress(data || []);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    if (!user) return;

    try {
      const { data: interactions, error } = await supabase
        .from('user_interactions')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const totalInteractions = interactions?.length || 0;
      const agentChats = interactions?.filter((i) => i.interaction_type === 'agent_chat').length || 0;
      const resourceViews = interactions?.filter((i) => i.interaction_type === 'resource_view').length || 0;
      const avgDuration =
        interactions?.reduce((acc, i) => acc + (i.duration_seconds || 0), 0) / totalInteractions || 0;

      setStats({
        total_interactions: totalInteractions,
        agent_chats: agentChats,
        resource_views: resourceViews,
        avg_session_duration: Math.round(avgDuration),
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const skillCategories = [
    { id: 'accessibility_basics', name: 'Accessibility Basics', icon: Target },
    { id: 'screen_readers', name: 'Screen Readers', icon: Activity },
    { id: 'speech_synthesis', name: 'Speech Synthesis', icon: Mic },
    { id: 'cognitive_tools', name: 'Cognitive Tools', icon: TrendingUp },
  ];

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
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
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-primary" />
              Your Progress
            </h2>
            <p className="text-muted-foreground">
              Track your learning journey and achievements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stats.total_interactions}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>AI Conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stats.agent_chats}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Resources Viewed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stats.resource_views}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Avg. Session</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {formatTime(stats.avg_session_duration)}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="skills" className="space-y-6">
            <TabsList>
              <TabsTrigger value="skills">
                <Target className="w-4 h-4 mr-2" />
                Skills
              </TabsTrigger>
              <TabsTrigger value="milestones">
                <Award className="w-4 h-4 mr-2" />
                Milestones
              </TabsTrigger>
              <TabsTrigger value="activity">
                <Activity className="w-4 h-4 mr-2" />
                Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="skills" className="space-y-4">
              {loading ? (
                <div className="text-center py-12 text-muted-foreground">Loading progress...</div>
              ) : learningProgress.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12 text-muted-foreground">
                    <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Start using the platform to track your progress</p>
                    <p className="text-sm mt-2">Your learning journey begins here</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {skillCategories.map((category) => {
                    const progress = learningProgress.find((p) => p.skill_category === category.id);
                    const progressValue = progress?.progress_level || 0;

                    return (
                      <Card key={category.id}>
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <category.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg">{category.name}</CardTitle>
                              <CardDescription>
                                {progress ? `${progressValue}% Complete` : 'Not started'}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Progress value={progressValue} className="mb-4" />
                          {progress && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Time Spent</span>
                                <span className="font-medium">
                                  {formatTime(progress.total_time_spent)}
                                </span>
                              </div>
                              {progress.milestones_achieved.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {progress.milestones_achieved.slice(0, 3).map((milestone) => (
                                    <Badge key={milestone} variant="secondary">
                                      {milestone}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="milestones">
              <Card>
                <CardContent className="text-center py-12 text-muted-foreground">
                  <Award className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Milestones and achievements coming soon</p>
                  <p className="text-sm mt-2">Keep using the platform to unlock achievements</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardContent className="text-center py-12 text-muted-foreground">
                  <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Detailed activity timeline coming soon</p>
                  <p className="text-sm mt-2">Your activity history will be displayed here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Progress;
