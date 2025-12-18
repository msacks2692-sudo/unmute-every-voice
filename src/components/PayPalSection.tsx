import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Heart, Zap, Bitcoin, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PayPalSection = () => {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const walletAddresses = {
    btc: "YOUR-BTC-WALLET-ADDRESS",
    eth: "YOUR-ETH-WALLET-ADDRESS",
  };

  const copyToClipboard = (address: string, type: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(type);
    toast.success(`${type.toUpperCase()} address copied to clipboard!`);
    setTimeout(() => setCopiedAddress(null), 2000);
  };
  const plans = [
    {
      name: "Support Once",
      icon: Heart,
      price: "$25",
      description: "One-time contribution to help us build accessible AI",
      features: ["Support our mission", "Community recognition", "Updates on progress"],
    },
    {
      name: "Monthly Supporter",
      icon: Zap,
      price: "$10/mo",
      description: "Regular support for ongoing development",
      features: ["All one-time benefits", "Monthly impact reports", "Early access to features", "Community badge"],
      popular: true,
    },
    {
      name: "Crypto",
      icon: Bitcoin,
      price: "Any Amount",
      description: "Donate with cryptocurrency via Coinbase",
      features: ["Bitcoin, Ethereum & more", "Low transaction fees", "Global accessibility", "Instant transfer"],
      isCrypto: true,
    },
    {
      name: "Enterprise",
      icon: DollarSign,
      price: "Custom",
      description: "Partner with us for custom accessibility solutions",
      features: ["Custom integrations", "Dedicated support", "Priority features", "Co-development"],
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-accent/10 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Support <span className="text-primary">Accessible AI</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us build AI technology that serves everyone, not just the majority
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={`p-6 h-full flex flex-col relative ${
                    plan.popular ? "border-primary shadow-elevated" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${plan.isCrypto ? "bg-orange-500/10" : "bg-primary/10"}`}>
                      <Icon className={`w-5 h-5 ${plan.isCrypto ? "text-orange-500" : "text-primary"}`} />
                    </div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                  </div>
                  <div className="text-3xl font-bold mb-2">{plan.price}</div>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full mt-2 ${plan.isCrypto ? "bg-orange-500" : "bg-primary"}`} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.isCrypto && (
                    <div className="space-y-2 mb-4">
                      <p className="text-xs text-muted-foreground font-medium">Or send directly:</p>
                      <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                        <span className="text-xs font-mono truncate flex-1">BTC: {walletAddresses.btc.slice(0, 12)}...</span>
                        <button
                          onClick={() => copyToClipboard(walletAddresses.btc, "btc")}
                          className="p-1 hover:bg-muted rounded transition-colors"
                          aria-label="Copy BTC address"
                        >
                          {copiedAddress === "btc" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
                        </button>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                        <span className="text-xs font-mono truncate flex-1">ETH: {walletAddresses.eth.slice(0, 12)}...</span>
                        <button
                          onClick={() => copyToClipboard(walletAddresses.eth, "eth")}
                          className="p-1 hover:bg-muted rounded transition-colors"
                          aria-label="Copy ETH address"
                        >
                          {copiedAddress === "eth" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
                        </button>
                      </div>
                    </div>
                  )}
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    className={`w-full ${plan.isCrypto ? "hover:bg-orange-500/10 hover:text-orange-500 hover:border-orange-500/30" : ""}`}
                    onClick={() => {
                      if (plan.isCrypto) {
                        window.open("https://commerce.coinbase.com/checkout/YOUR-CHECKOUT-ID", "_blank");
                      } else if (plan.name === "Enterprise") {
                        window.location.href = "mailto:contact@unmute1.com?subject=Enterprise%20Partnership";
                      } else {
                        window.open("https://www.paypal.com/donate", "_blank");
                      }
                    }}
                  >
                    {plan.isCrypto ? "Donate via Coinbase" : plan.name === "Enterprise" ? "Contact Us" : "Choose Plan"}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground">
            100% of contributions go directly to developing accessible AI technology
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PayPalSection;
