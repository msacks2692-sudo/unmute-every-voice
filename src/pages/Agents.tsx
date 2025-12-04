import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Mic, Settings, LogOut, Brain, MessageSquare, FileText, Image, BookOpen, TrendingUp, Loader2, Plus, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  agentType?: string;
  timestamp: Date;
}

interface AgentType {
  id: string;
  name: string;
  description: string;
  icon: any;
  systemPrompt: string;
  color: string;
}

const Agents = () => {
  const { user, signOut } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string>('general');
  const [conversationId, setConversationId] = useState<string | null>(null);

  const agents: AgentType[] = [
    {
      id: 'general',
      name: 'General Assistant',
      description: 'Your friendly AI companion for general accessibility questions',
      icon: MessageSquare,
      systemPrompt: 'You are a helpful AI assistant for Unmute1, focused on accessibility and inclusive AI. Keep responses clear, concise, and friendly.',
      color: 'bg-blue-500',
    },
    {
      id: 'simplification',
      name: 'Content Simplifier',
      description: 'Simplifies complex content for easier understanding',
      icon: FileText,
      systemPrompt: 'You are an AI that specializes in simplifying complex text. Make content easy to understand while preserving key information. Use simple language, short sentences, and clear structure.',
      color: 'bg-green-500',
    },
    {
      id: 'description',
      name: 'Visual Describer',
      description: 'Creates detailed descriptions for images and visual content',
      icon: Image,
      systemPrompt: 'You are an AI assistant that provides detailed, accessible descriptions of images and visual content. Create vivid, clear descriptions that capture essential details for visually impaired users.',
      color: 'bg-purple-500',
    },
    {
      id: 'learning',
      name: 'Learning Coach',
      description: 'Guides you through learning new accessibility concepts',
      icon: BookOpen,
      systemPrompt: 'You are a patient learning coach specializing in accessibility. Help users understand concepts at their own pace, provide encouragement, and adapt explanations based on their level.',
      color: 'bg-orange-500',
    },
    {
      id: 'progress',
      name: 'Progress Advisor',
      description: 'Analyzes your usage patterns and suggests improvements',
      icon: TrendingUp,
      systemPrompt: 'You are an AI advisor that analyzes user behavior and provides personalized recommendations for accessibility improvements. Focus on actionable insights and encouragement.',
      color: 'bg-pink-500',
    },
  ];

  const currentAgent = agents.find((a) => a.id === selectedAgent) || agents[0];

  useEffect(() => {
    loadConversation();
  }, [selectedAgent]);

  const loadConversation = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('agent_conversations')
        .select('*')
        .eq('user_id', user.id)
        .eq('agent_type', selectedAgent)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setConversationId(data.id);
        const loadedMessages = (data.messages as unknown) as Message[];
        setMessages(loadedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })));
      } else {
        setMessages([]);
        setConversationId(null);
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  };

  const saveConversation = async (updatedMessages: Message[]) => {
    if (!user) return;

    try {
      const conversationData = {
        user_id: user.id,
        agent_type: selectedAgent,
        conversation_title: updatedMessages[0]?.content.substring(0, 50) || 'New Conversation',
        messages: JSON.parse(JSON.stringify(updatedMessages)),
        updated_at: new Date().toISOString(),
      };

      if (conversationId) {
        await supabase
          .from('agent_conversations')
          .update(conversationData)
          .eq('id', conversationId);
      } else {
        const { data, error } = await supabase
          .from('agent_conversations')
          .insert(conversationData)
          .select()
          .single();

        if (error) throw error;
        if (data) setConversationId(data.id);
      }
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          messages: [
            { role: 'system', content: currentAgent.systemPrompt },
            ...updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          ],
        },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        agentType: selectedAgent,
        timestamp: new Date(),
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);
      await saveConversation(finalMessages);

      await supabase.from('user_interactions').insert({
        user_id: user?.id,
        interaction_type: 'agent_chat',
        agent_type: selectedAgent,
        metadata: { message_count: finalMessages.length },
      });
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const startNewConversation = () => {
    setMessages([]);
    setConversationId(null);
    toast.success('Started new conversation');
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
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Brain className="w-8 h-8 text-primary" />
                AI Agents
              </h2>
              <p className="text-muted-foreground">
                Specialized AI assistants to help with your accessibility needs
              </p>
            </div>
            <Button onClick={startNewConversation} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Conversation
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Select Agent</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {agents.map((agent) => (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        selectedAgent === agent.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg ${agent.color} flex items-center justify-center flex-shrink-0`}>
                          <agent.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm">{agent.name}</div>
                          <div className="text-xs text-muted-foreground line-clamp-2">{agent.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card className="h-[calc(100vh-16rem)]">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${currentAgent.color} flex items-center justify-center`}>
                        <currentAgent.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle>{currentAgent.name}</CardTitle>
                        <CardDescription>{currentAgent.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {messages.length} messages
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col h-[calc(100%-5rem)] p-0">
                  <ScrollArea className="flex-1 p-6">
                    {messages.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <currentAgent.icon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Start a conversation with {currentAgent.name}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((msg, idx) => (
                          <div
                            key={idx}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] p-4 rounded-lg ${
                                msg.role === 'user'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-secondary text-secondary-foreground'
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                              <p className="text-xs opacity-70 mt-2">
                                {msg.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                  <div className="border-t p-4">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <Textarea
                        placeholder={`Ask ${currentAgent.name} anything...`}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="min-h-[60px] max-h-[120px]"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                          }
                        }}
                      />
                      <Button type="submit" disabled={loading || !input.trim()} size="lg">
                        {loading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          'Send'
                        )}
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Agents;
