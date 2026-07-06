import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface StoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  storyUrl: string;
  title?: string;
}

export const StoryModal = ({ open, onOpenChange, storyUrl, title }: StoryModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-3xl w-full h-[80vh] p-0 overflow-hidden">
      {title && <div className="p-4 font-bold text-lg border-b">{title}</div>}
      <iframe
        src={storyUrl}
        title={title || "Story"}
        className="w-full h-full border-0"
        style={{ minHeight: "60vh" }}
      />
    </DialogContent>
  </Dialog>
);
