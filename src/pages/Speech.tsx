import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Mic, Settings, LogOut, Volume2, Play, Save, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SpeechProfile {
  id: string;
  profile_name: string;
  voice_name: string;
  voice_lang: string;
  speech_rate: number;
  pitch: number;
  volume: number;
  is_default: boolean;
}

const Speech = () => {
  const { user, signOut } = useAuth();
  const [profiles, setProfiles] = useState<SpeechProfile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [profileName, setProfileName] = useState('');
  const [voiceName, setVoiceName] = useState('');
  const [speechRate, setSpeechRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isDefault, setIsDefault] = useState(false);
  const [testText, setTestText] = useState('This is a test of the speech synthesis system. How does it sound?');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadVoices();
    loadProfiles();
  }, []);

  const loadVoices = () => {
    const voices = speechSynthesis.getVoices();
    setAvailableVoices(voices);
    if (voices.length > 0 && !voiceName) {
      setVoiceName(voices[0].name);
    }
  };

  useEffect(() => {
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  const loadProfiles = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('speech_profiles')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);

      const defaultProfile = data?.find((p) => p.is_default);
      if (defaultProfile) {
        loadProfile(defaultProfile);
      }
    } catch (error) {
      console.error('Error loading profiles:', error);
      toast.error('Failed to load speech profiles');
    }
  };

  const loadProfile = (profile: SpeechProfile) => {
    setSelectedProfile(profile.id);
    setProfileName(profile.profile_name);
    setVoiceName(profile.voice_name);
    setSpeechRate(profile.speech_rate);
    setPitch(profile.pitch);
    setVolume(profile.volume);
    setIsDefault(profile.is_default);
    setEditing(true);
  };

  const saveProfile = async () => {
    if (!user || !profileName.trim()) {
      toast.error('Please enter a profile name');
      return;
    }

    try {
      const profileData = {
        user_id: user.id,
        profile_name: profileName,
        voice_name: voiceName,
        voice_lang: availableVoices.find((v) => v.name === voiceName)?.lang || 'en-US',
        speech_rate: speechRate,
        pitch: pitch,
        volume: volume,
        is_default: isDefault,
      };

      if (editing && selectedProfile) {
        await supabase
          .from('speech_profiles')
          .update(profileData)
          .eq('id', selectedProfile);
        toast.success('Profile updated successfully');
      } else {
        const { data, error } = await supabase
          .from('speech_profiles')
          .insert(profileData)
          .select()
          .single();

        if (error) throw error;
        toast.success('Profile created successfully');
      }

      loadProfiles();
      resetForm();
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile');
    }
  };

  const deleteProfile = async (profileId: string) => {
    try {
      await supabase.from('speech_profiles').delete().eq('id', profileId);
      toast.success('Profile deleted');
      loadProfiles();
      if (selectedProfile === profileId) {
        resetForm();
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      toast.error('Failed to delete profile');
    }
  };

  const resetForm = () => {
    setSelectedProfile(null);
    setProfileName('');
    setSpeechRate(1);
    setPitch(1);
    setVolume(1);
    setIsDefault(false);
    setEditing(false);
  };

  const testSpeech = () => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(testText);
    utterance.rate = speechRate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    const voice = availableVoices.find((v) => v.name === voiceName);
    if (voice) {
      utterance.voice = voice;
    }

    speechSynthesis.speak(utterance);
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
              <Volume2 className="w-8 h-8 text-primary" />
              Speech Synthesis
            </h2>
            <p className="text-muted-foreground">
              Create and manage custom voice profiles for text-to-speech
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    Saved Profiles
                    <Button size="sm" variant="outline" onClick={resetForm}>
                      <Plus className="w-4 h-4 mr-2" />
                      New
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {profiles.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No profiles saved yet
                    </p>
                  ) : (
                    profiles.map((profile) => (
                      <div
                        key={profile.id}
                        className={`p-3 rounded-lg border transition-all ${
                          selectedProfile === profile.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => loadProfile(profile)}
                            className="flex-1 text-left"
                          >
                            <div className="font-semibold text-sm">{profile.profile_name}</div>
                            <div className="text-xs text-muted-foreground">
                              {profile.voice_name.split(' ')[0]}
                              {profile.is_default && ' • Default'}
                            </div>
                          </button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => deleteProfile(profile.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editing ? 'Edit Profile' : 'Create New Profile'}
                  </CardTitle>
                  <CardDescription>
                    Configure your custom speech synthesis settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="profileName">Profile Name</Label>
                    <Input
                      id="profileName"
                      placeholder="My Voice Profile"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="voice">Voice</Label>
                    <Select value={voiceName} onValueChange={setVoiceName}>
                      <SelectTrigger id="voice">
                        <SelectValue placeholder="Select a voice" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableVoices.map((voice) => (
                          <SelectItem key={voice.name} value={voice.name}>
                            {voice.name} ({voice.lang})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="speechRate">Speech Rate</Label>
                      <span className="text-sm text-muted-foreground">{speechRate.toFixed(1)}x</span>
                    </div>
                    <Slider
                      id="speechRate"
                      value={[speechRate]}
                      onValueChange={(value) => setSpeechRate(value[0])}
                      min={0.5}
                      max={2}
                      step={0.1}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="pitch">Pitch</Label>
                      <span className="text-sm text-muted-foreground">{pitch.toFixed(1)}</span>
                    </div>
                    <Slider
                      id="pitch"
                      value={[pitch]}
                      onValueChange={(value) => setPitch(value[0])}
                      min={0.5}
                      max={2}
                      step={0.1}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="volume">Volume</Label>
                      <span className="text-sm text-muted-foreground">{Math.round(volume * 100)}%</span>
                    </div>
                    <Slider
                      id="volume"
                      value={[volume]}
                      onValueChange={(value) => setVolume(value[0])}
                      min={0}
                      max={1}
                      step={0.1}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <Label htmlFor="isDefault" className="cursor-pointer">
                      Set as default profile
                    </Label>
                    <Switch
                      id="isDefault"
                      checked={isDefault}
                      onCheckedChange={setIsDefault}
                    />
                  </div>

                  <Button onClick={saveProfile} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    {editing ? 'Update Profile' : 'Save Profile'}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Test Speech</CardTitle>
                  <CardDescription>
                    Test your current settings with custom text
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Enter text to test..."
                    value={testText}
                    onChange={(e) => setTestText(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button onClick={testSpeech} className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Test Speech
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Speech;
