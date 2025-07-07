import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RefreshCw } from "lucide-react";

interface CaptchaProps {
  onValidate: (isValid: boolean) => void;
  isValid?: boolean;
}

export function Captcha({ onValidate, isValid }: CaptchaProps) {
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput("");
    onValidate(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    const isCorrect = userInput.toUpperCase() === captchaText;
    onValidate(isCorrect);
  }, [userInput, captchaText, onValidate]);

  return (
    <div className="space-y-2">
      <Label htmlFor="captcha">Captcha Verification</Label>
      <div className="flex items-center gap-2">
        <div className="bg-muted p-3 rounded-md border-2 border-dashed border-border min-w-[120px] text-center">
          <span className="font-mono text-lg font-bold tracking-wider select-none">
            {captchaText}
          </span>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={generateCaptcha}
          className="p-2"
        >
          <RefreshCw size={16} />
        </Button>
      </div>
      <Input
        id="captcha"
        type="text"
        placeholder="Enter captcha"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className={isValid === false && userInput ? "border-destructive" : ""}
      />
      {isValid === false && userInput && (
        <p className="text-sm text-destructive">Captcha does not match. Please try again.</p>
      )}
    </div>
  );
}