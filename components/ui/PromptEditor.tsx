'use client';

import { TextareaHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface PromptEditorProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  sessionId?: string;
  minRows?: number;
}

export function PromptEditor({ label, sessionId, minRows = 8, className, ...props }: PromptEditorProps) {
  return (
    <div className="space-y-3">
      {/* Terminal header */}
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-xl uppercase tracking-widest text-[#c8f000] flex items-center gap-3">
          <span className="material-symbols-outlined">terminal</span>
          NEUTRALIZATION CONSOLE
        </h3>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 bg-[#c8f000] rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-[#c8f000]/30 rounded-full" />
          <div className="w-2 h-2 bg-[#c8f000]/10 rounded-full" />
        </div>
      </div>

      {/* Terminal container */}
      <div className="bg-[#0f1f13] border border-[#454933]/20 rounded-sm shadow-2xl">
        <div className="bg-[#132316] p-5 rounded-sm">
          {/* Session bar */}
          <div className="flex items-center justify-between mb-3 border-b border-[#454933]/10 pb-2">
            <span className="font-mono text-[10px] text-[#c8f000]/60">
              SESSION_ID: {sessionId ?? 'ACTIVE_SESSION'}
            </span>
            <span className="font-mono text-[10px] text-[#c8f000]">SYS_READY_V2.4</span>
          </div>

          {/* Textarea */}
          <div className="flex items-start gap-2">
            <span className="font-mono text-sm text-[#c8f000] mt-1 select-none">&gt;</span>
            <textarea
              className={clsx(
                'w-full bg-transparent border-none outline-none resize-none',
                'font-mono text-sm text-[#d4e8d4] placeholder:text-[#4A5E4A]',
                'focus:ring-0',
                className
              )}
              style={{ minHeight: `${minRows * 1.75}rem` }}
              {...props}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
