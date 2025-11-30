import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic, Settings, LogOut, BookOpen, Search, Bookmark, Star, ExternalLink, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty_level: string;
  tags: string[];
  url?: string;
  view_count: number;
  created_at: string;
}

const Resources = () => {
  const { user, signOut } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    'all',
    'Screen Readers',
    'Visual Aids',
    'Cognitive Tools',
    'Motor Assistance',
    'Speech Technology',
    'Learning Resources',
  ];

  useEffect(() => {
    loadResources();
    loadBookmarks();
  }, []);

  const loadResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error loading resources:', error);
      toast.error('Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  const loadBookmarks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('resource_bookmarks')
        .select('resource_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setBookmarkedIds(new Set(data?.map((b) => b.resource_id) || []));
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  const toggleBookmark = async (resourceId: string) => {
    if (!user) {
      toast.error('Please sign in to bookmark resources');
      return;
    }

    try {
      if (bookmarkedIds.has(resourceId)) {
        await supabase
          .from('resource_bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('resource_id', resourceId);

        setBookmarkedIds((prev) => {
          const next = new Set(prev);
          next.delete(resourceId);
          return next;
        });
        toast.success('Bookmark removed');
      } else {
        await supabase.from('resource_bookmarks').insert({
          user_id: user.id,
          resource_id: resourceId,
        });

        setBookmarkedIds((prev) => new Set(prev).add(resourceId));
        toast.success('Resource bookmarked');
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast.error('Failed to update bookmark');
    }
  };

  const trackView = async (resourceId: string) => {
    if (!user) return;

    try {
      await supabase.from('user_interactions').insert({
        user_id: user.id,
        interaction_type: 'resource_view',
        resource_id: resourceId,
      });

      await supabase.rpc('increment', {
        row_id: resourceId,
        table_name: 'resources',
        column_name: 'view_count',
      });
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      searchQuery === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const bookmarkedResources = resources.filter((r) => bookmarkedIds.has(r.id));

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
              <BookOpen className="w-8 h-8 text-primary" />
              Accessibility Resources
            </h2>
            <p className="text-muted-foreground">
              Discover tools, guides, and resources to enhance accessibility
            </p>
          </div>

          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="bookmarked">
                <Bookmark className="w-4 h-4 mr-2" />
                Bookmarked ({bookmarkedResources.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {loading ? (
                <div className="text-center py-12 text-muted-foreground">Loading resources...</div>
              ) : filteredResources.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No resources found matching your criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((resource, index) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <Badge variant="secondary">{resource.category}</Badge>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => toggleBookmark(resource.id)}
                            >
                              <Bookmark
                                className={`w-4 h-4 ${
                                  bookmarkedIds.has(resource.id) ? 'fill-primary text-primary' : ''
                                }`}
                              />
                            </Button>
                          </div>
                          <CardTitle className="text-xl">{resource.title}</CardTitle>
                          <CardDescription>{resource.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-between">
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {resource.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              {resource.view_count} views
                            </span>
                            {resource.url && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  trackView(resource.id);
                                  window.open(resource.url, '_blank');
                                }}
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Open
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="bookmarked" className="space-y-4">
              {bookmarkedResources.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Bookmark className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No bookmarked resources yet</p>
                  <p className="text-sm mt-2">Bookmark resources to access them quickly</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookmarkedResources.map((resource) => (
                    <Card key={resource.id} className="h-full flex flex-col">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <Badge variant="secondary">{resource.category}</Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleBookmark(resource.id)}
                          >
                            <Bookmark className="w-4 h-4 fill-primary text-primary" />
                          </Button>
                        </div>
                        <CardTitle className="text-xl">{resource.title}</CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col justify-between">
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {resource.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {resource.url && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              trackView(resource.id);
                              window.open(resource.url, '_blank');
                            }}
                            className="w-full"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Open Resource
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Resources;
