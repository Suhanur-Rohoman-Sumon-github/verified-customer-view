import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RefreshCw } from "lucide-react";

interface CaptchaProps {
  onValidate: (isValid: boolean) => void;
  isValid?: boolean;
}

export function Captcha({ onValidate, isValid }: CaptchaProps) {
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateCaptchaText = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput("");
    onValidate(false);
  };

  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Fill background with random light color
    ctx.fillStyle = `hsl(${Math.random() * 360}, 30%, 90%)`;
    ctx.fillRect(0, 0, width, height);

    // Draw captcha text with rotation & varying fonts
    for (let i = 0; i < captchaText.length; i++) {
      const char = captchaText.charAt(i);
      const fontSize = 24 + Math.random() * 10;
      const rotation = (Math.random() - 0.5) * 0.5; // rotate chars randomly

      ctx.save();
      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = `hsl(${Math.random() * 360}, 50%, 20%)`;
      ctx.translate(20 + i * 25, height / 2 + (Math.random() - 0.5) * 10);
      ctx.rotate(rotation);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }

    // Draw random lines for noise
    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = `hsl(${Math.random() * 360}, 50%, 30%)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }

    // Draw random dots
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `hsl(${Math.random() * 360}, 50%, 30%)`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * width,
        Math.random() * height,
        1 + Math.random() * 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  };

  useEffect(() => {
    generateCaptchaText();
  }, []);

  useEffect(() => {
    drawCaptcha();
  }, [captchaText]);

  useEffect(() => {
    const isCorrect = userInput.toUpperCase() === captchaText;
    onValidate(isCorrect);
  }, [userInput, captchaText, onValidate]);

  return (
    <div className="space-y-2">
      <Label htmlFor="captcha">Captcha Verification</Label>
      <div className="flex items-center gap-2">
        <canvas
          ref={canvasRef}
          width={180}
          height={50}
          className="border-2 rounded-md"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={generateCaptchaText}
          className="p-2"
        >
          <RefreshCw size={16} />
        </Button>
      </div>
      <input
        id="captcha"
        type="text"
        placeholder="Enter captcha"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className={`border rounded-md p-2 w-full ${
          isValid === false && userInput ? "border-destructive" : ""
        }`}
      />
      {isValid === false && userInput && (
        <p className="text-sm text-destructive">
          Captcha does not match. Please try again.
        </p>
      )}
    </div>
  );
}
