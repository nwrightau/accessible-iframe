"use client"

import { AccessibleIframe } from "@/components/accessible-iframe"

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4">
      <div className="max-w-full mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Accessible Iframe Demo</h1>
          <p className="text-muted-foreground">
            Tab to focus iframe containers, then press{" "}
            <kbd className="px-2 py-1 bg-muted rounded text-sm font-mono">CMD + I</kbd> to enter or exit iframe content
          </p>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <AccessibleIframe
              src="/form1"
              title="Contact Form"
              description="Contact form with input fields, select dropdown, and textarea"
              className="w-full h-96"
            />
          </div>

          <div className="w-1/2">
            <AccessibleIframe
              src="/form2"
              title="User Registration"
              description="User registration form with radio buttons, checkboxes, and switches"
              className="w-full h-96"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Features</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Two same-origin iframes with interactive shadcn forms</li>
            <li>Tab navigation between iframe containers</li>
            <li>CMD + I to toggle enter/exit iframe content when container is focused</li>
            <li>Auto-focus first element when entering iframe</li>
            <li>Visible blue focus borders on iframe containers</li>
            <li>Screen reader friendly with descriptive labels</li>
            <li>Contact form and registration form with multiple focusable elements</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
