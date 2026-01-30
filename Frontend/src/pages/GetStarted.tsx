
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

interface FormData {
  role: "individual" | "business" | "recycler" | "";
  intent: "buy" | "sell" | "recycle" | "";
  location: string;
}

const GetStarted = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    role: "",
    intent: "",
    location: "",
  });

  const steps = [
    { number: 1, title: "Role" },
    { number: 2, title: "Intent" },
    { number: 3, title: "Location" },
    { number: 4, title: "Summary" },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.role !== "";
      case 2:
        return formData.intent !== "";
      case 3:
        return formData.location.length > 0;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-between">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className="flex flex-col items-center"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep >= step.number
                          ? "bg-eco-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {currentStep > step.number ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span className="text-sm mt-2">{step.title}</span>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
                <div
                  className="absolute top-1/2 left-0 h-0.5 bg-eco-500 transition-all -z-10"
                  style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            <div className="py-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-center mb-6">Select Your Role</h2>
                  <RadioGroup
                    value={formData.role}
                    onValueChange={(value: FormData["role"]) =>
                      setFormData({ ...formData, role: value })
                    }
                    className="grid grid-cols-1 gap-4"
                  >
                    {[
                      { value: "individual", label: "Individual", description: "Personal recycling and waste management" },
                      { value: "business", label: "Business", description: "Corporate waste solutions" },
                      { value: "recycler", label: "Recycler", description: "Professional recycling services" },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className={`relative flex items-center p-4 rounded-lg border ${
                          formData.role === option.value
                            ? "border-eco-500 bg-eco-50"
                            : "border-gray-200"
                        }`}
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={option.value}
                          className="flex flex-col flex-grow cursor-pointer"
                        >
                          <span className="font-semibold">{option.label}</span>
                          <span className="text-sm text-gray-500">
                            {option.description}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-center mb-6">Select Your Intent</h2>
                  <RadioGroup
                    value={formData.intent}
                    onValueChange={(value: FormData["intent"]) =>
                      setFormData({ ...formData, intent: value })
                    }
                    className="grid grid-cols-1 gap-4"
                  >
                    {[
                      { value: "buy", label: "Buy Materials", description: "Purchase recycled materials" },
                      { value: "sell", label: "Sell Materials", description: "Sell your waste materials" },
                      { value: "recycle", label: "Recycle", description: "Find recycling solutions" },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className={`relative flex items-center p-4 rounded-lg border ${
                          formData.intent === option.value
                            ? "border-eco-500 bg-eco-50"
                            : "border-gray-200"
                        }`}
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={option.value}
                          className="flex flex-col flex-grow cursor-pointer"
                        >
                          <span className="font-semibold">{option.label}</span>
                          <span className="text-sm text-gray-500">
                            {option.description}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-center mb-6">Enter Your Location</h2>
                  <div className="space-y-4">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Enter your location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-center mb-6">Summary</h2>
                  <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-semibold">Role:</span>{" "}
                      <span className="capitalize">{formData.role}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Intent:</span>{" "}
                      <span className="capitalize">{formData.intent}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Location:</span>{" "}
                      {formData.location}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                Back
              </Button>
              <Button
                onClick={currentStep === 4 ? () => navigate("/dashboard") : handleNext}
                disabled={!isStepValid()}
                className="bg-eco-500 hover:bg-eco-600"
              >
                {currentStep === 4 ? "Continue to Dashboard" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GetStarted;
