import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  AlertCircle,
  CreditCard,
  // Paypal,
  Landmark,
  BadgeCheck,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "yearly"
  );
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");

  const plans = [
    {
      id: "free",
      name: "Free",
      price: billingCycle === "monthly" ? "₹0" : "₹0",
      period: "",
      description: "Basic resume creation for students",
      features: [
        "1 IIT/IIM formatted resume",
        "Basic templates",
        "Download as PDF",
        "Email support",
      ],
      limitations: [
        "Limited template options",
        "No premium features",
        "Basic formatting only",
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: billingCycle === "monthly" ? "₹199" : "₹1,999",
      period: billingCycle === "monthly" ? "per month" : "per year",
      description: "Perfect for active job seekers",
      features: [
        "Unlimited resumes",
        "All premium templates",
        "ATS optimization features",
        "Export in multiple formats",
        "Industry-specific guidance",
        "1 month priority support",
        "Cover letter templates",
      ],
      limitations: [],
      buttonText: "Choose Premium",
      buttonVariant: "default" as const,
      popular: true,
    },
    {
      id: "pro",
      name: "Placement Pro",
      price: billingCycle === "monthly" ? "₹499" : "₹4,999",
      period: billingCycle === "monthly" ? "per month" : "per year",
      description: "Complete placement preparation",
      features: [
        "Everything in Premium",
        "Resume review by alumni",
        "LinkedIn profile optimization",
        "Mock interview preparation",
        "Lifetime access to templates",
        "6 months priority support",
        "Job application tracking",
      ],
      limitations: [],
      buttonText: "Choose Placement Pro",
      buttonVariant: "outline" as const,
      popular: false,
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Unique background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 opacity-95 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiAwaC02di02aDZ2NnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30 z-0"></div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Choose the plan that's right for your career stage. All plans come
            with our institution-specific templates.
          </p>

          {/* Billing cycle toggle */}
          <div className="mt-8 inline-flex bg-white/10 p-1 rounded-lg backdrop-blur-sm">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                billingCycle === "monthly"
                  ? "bg-blue-600 text-white"
                  : "text-blue-100 hover:bg-white/10"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                billingCycle === "yearly"
                  ? "bg-blue-600 text-white"
                  : "text-blue-100 hover:bg-white/10"
              }`}
            >
              Yearly{" "}
              <span className="text-xs font-normal opacity-80">Save 15%</span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden transition-all duration-300 hover:translate-y-[-8px] ${
                plan.popular
                  ? "border-blue-500 bg-white/10 backdrop-blur-xl shadow-xl shadow-blue-500/10"
                  : "border-white/10 bg-white/5 backdrop-blur-md"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center">
                    <BadgeCheck className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <CardHeader
                className={`pb-4 ${plan.popular ? "bg-blue-600/20" : ""}`}
              >
                <CardTitle className="text-2xl font-bold text-white">
                  {plan.name}
                </CardTitle>
                <div className="mt-2">
                  <span className="text-3xl md:text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-blue-100 ml-2">{plan.period}</span>
                  )}
                </div>
                <CardDescription className="text-blue-200 mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-blue-100 mb-3">
                      Features include:
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-white">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-blue-100 mb-3">
                        Limitations:
                      </h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, idx) => (
                          <li key={idx} className="flex items-start">
                            <AlertCircle className="w-5 h-5 text-amber-400 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-white/80">
                              {limitation}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col">
                <Button
                  variant={plan.buttonVariant}
                  className={`w-full ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "border-white/20 text-white hover:bg-white/10"
                  }`}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  {plan.buttonText}
                </Button>

                {/* Only show payment options for paid plans */}
                {plan.id !== "free" && selectedPlan === plan.id && (
                  <div className="mt-4 w-full bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <h4 className="text-sm font-medium text-white mb-3">
                      Payment Method
                    </h4>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <button
                        className={`flex flex-col items-center justify-center p-3 rounded-lg ${
                          paymentMethod === "card"
                            ? "bg-blue-600"
                            : "bg-white/10"
                        }`}
                        onClick={() => setPaymentMethod("card")}
                      >
                        <CreditCard
                          className={`w-5 h-5 ${
                            paymentMethod === "card"
                              ? "text-white"
                              : "text-blue-100"
                          }`}
                        />
                        <span
                          className={`text-xs mt-1 ${
                            paymentMethod === "card"
                              ? "text-white"
                              : "text-blue-100"
                          }`}
                        >
                          Card
                        </span>
                      </button>
                      <button
                        className={`flex flex-col items-center justify-center p-3 rounded-lg ${
                          paymentMethod === "paypal"
                            ? "bg-blue-600"
                            : "bg-white/10"
                        }`}
                        onClick={() => setPaymentMethod("paypal")}
                      >
                        {/* <Paypal
                          className={`w-5 h-5 ${
                            paymentMethod === "paypal"
                              ? "text-white"
                              : "text-blue-100"
                          }`}
                        /> */}
                        <span
                          className={`text-xs mt-1 ${
                            paymentMethod === "paypal"
                              ? "text-white"
                              : "text-blue-100"
                          }`}
                        >
                          PayPal
                        </span>
                      </button>
                      <button
                        className={`flex flex-col items-center justify-center p-3 rounded-lg ${
                          paymentMethod === "bank"
                            ? "bg-blue-600"
                            : "bg-white/10"
                        }`}
                        onClick={() => setPaymentMethod("bank")}
                      >
                        <Landmark
                          className={`w-5 h-5 ${
                            paymentMethod === "bank"
                              ? "text-white"
                              : "text-blue-100"
                          }`}
                        />
                        <span
                          className={`text-xs mt-1 ${
                            paymentMethod === "bank"
                              ? "text-white"
                              : "text-blue-100"
                          }`}
                        >
                          Bank
                        </span>
                      </button>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      Proceed to Payment
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Institutional callout */}
        <div className="max-w-3xl mx-auto text-center bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">
            Need a custom solution for your placement cell?
          </h3>
          <p className="text-blue-100 mb-6">
            We offer special institutional packages for colleges and placement
            offices. Get custom templates, bulk student accounts, and detailed
            analytics.
          </p>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Contact for Institutional Pricing
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
