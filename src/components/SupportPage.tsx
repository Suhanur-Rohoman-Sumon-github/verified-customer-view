import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SupportPage() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      // Call your API to send support message
      // Example:
      // await sendSupportMessage({ subject, description });
      toast.success("Message sent successfully!");
      setSubject("");
      setDescription("");
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-[#006bff]">Support</h2>

      {/* Contact Info */}
      <div className="mb-6 space-y-2">
        <p>
          <span className="font-semibold">Telegram: </span>
          <a
            href="https://t.me/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#006bff] hover:underline"
          >
            @YourTelegram
          </a>
        </p>
        <p>
          <span className="font-semibold">Email: </span>
          <a
            href="mailto:support@example.com"
            className="text-[#006bff] hover:underline"
          >
            support@example.com
          </a>
        </p>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your issue"
            rows={5}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#006bff] hover:bg-[#0056cc] text-white"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
