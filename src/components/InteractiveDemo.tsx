import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Image, FileText, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const InteractiveDemo = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (type: string) => {
    if (!input.trim()) {
      toast.error("Please enter some text");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      let functionName = "";
      let body = {};

      switch (type) {
        case "chat":
          functionName = "ai-chat";
          body = { messages: [...chatHistory, { role: "user", content: input }] };
          setChatHistory([...chatHistory, { role: "user", content: input }]);
          break;
        case "image":
          functionName = "ai-image-description";
          body = { text: input };
          break;
        case "summarize":
          functionName = "ai-summarize";
          body = { text: input };
          break;
      }

      const { data, error } = await supabase.functions.invoke(functionName, { body });

      if (error) throw error;

      if (type === "chat") {
        setChatHistory([...chatHistory, { role: "user", content: input }, { role: "assistant", content: data.response }]);
        setResult(data.response);
      } else {
        setResult(data.result);
      }

      setInput("");
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-background via-accent/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Try Our <span className="text-primary">AI Tools</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience accessibility-first AI in action. Test our tools with all accessibility features enabled.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="max-w-4xl mx-auto p-6 shadow-elevated">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full mb-6">
                <TabsTrigger value="chat" className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="image" className="gap-2">
                  <Image className="w-4 h-4" />
                  Image Description
                </TabsTrigger>
                <TabsTrigger value="summarize" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Summarize
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="space-y-4">
                <div className="min-h-[200px] max-h-[400px] overflow-y-auto space-y-4 p-4 bg-secondary/20 rounded-lg">
                  {chatHistory.length === 0 ? (
                    <p className="text-muted-foreground text-center">Start a conversation...</p>
                  ) : (
                    chatHistory.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <Textarea
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={() => handleSubmit("chat")} disabled={loading} className="w-full">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Message"}
                </Button>
              </TabsContent>

              <TabsContent value="image" className="space-y-4">
                <Textarea
                  placeholder="Describe an image you'd like analyzed..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[150px]"
                />
                {result && (
                  <Card className="p-4 bg-secondary/20">
                    <p className="text-sm font-semibold mb-2">AI Analysis:</p>
                    <p>{result}</p>
                  </Card>
                )}
                <Button onClick={() => handleSubmit("image")} disabled={loading} className="w-full">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Analyze"}
                </Button>
              </TabsContent>

              <TabsContent value="summarize" className="space-y-4">
                <Textarea
                  placeholder="Paste text to summarize..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[150px]"
                />
                {result && (
                  <Card className="p-4 bg-secondary/20">
                    <p className="text-sm font-semibold mb-2">Summary:</p>
                    <p>{result}</p>
                  </Card>
                )}
                <Button onClick={() => handleSubmit("summarize")} disabled={loading} className="w-full">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Summarize"}
                </Button>
              </TabsContent>
            </Tabs>
          </Card>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-muted-foreground">
              All tools work seamlessly with screen readers, keyboard navigation, and other accessibility features
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
