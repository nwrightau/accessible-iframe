"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AccessibleIframeProps {
  src: string
  title: string
  description?: string
  className?: string
}

export function AccessibleIframe({ src, title, description, className }: AccessibleIframeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isContainerFocused, setIsContainerFocused] = useState(false)
  const [isInsideIframe, setIsInsideIframe] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "i" && event.metaKey && !event.shiftKey) {
        event.preventDefault()
        event.stopPropagation()

        // If we're in the container, enter the iframe
        if (isContainerFocused && !isInsideIframe) {
          if (iframeRef.current) {
            try {
              iframeRef.current.contentWindow?.focus()

              // Strategy 1: Try to focus first element immediately
              setTimeout(() => {
                try {
                  const iframeDoc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document
                  if (iframeDoc) {
                    const firstFocusable = iframeDoc.querySelector(
                      'input, button, select, textarea, a[href], [tabindex]:not([tabindex="-1"])',
                    ) as HTMLElement
                    if (firstFocusable) {
                      firstFocusable.focus()
                      console.log("[v0] Successfully focused first element:", firstFocusable.tagName)
                    } else {
                      // Strategy 2: Try to focus document body
                      iframeDoc.body?.focus()
                      console.log("[v0] Focused iframe body as fallback")
                    }
                  }
                } catch (e) {
                  console.log("[v0] Cross-origin restriction prevented focusing first element")
                  // Strategy 3: Send postMessage to iframe to focus first element
                  try {
                    iframeRef.current?.contentWindow?.postMessage(
                      {
                        type: "FOCUS_FIRST_ELEMENT",
                      },
                      "*",
                    )
                    console.log("[v0] Sent postMessage to focus first element")
                  } catch (postMessageError) {
                    console.log("[v0] PostMessage also failed, iframe focus only")
                  }
                }
              }, 50)

              // Strategy 4: Additional attempt with longer delay for slow-loading content
              setTimeout(() => {
                try {
                  const iframeDoc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document
                  if (iframeDoc && document.activeElement !== iframeRef.current) {
                    const firstFocusable = iframeDoc.querySelector(
                      'input, button, select, textarea, a[href], [tabindex]:not([tabindex="-1"])',
                    ) as HTMLElement
                    if (firstFocusable && document.activeElement !== firstFocusable) {
                      firstFocusable.focus()
                      console.log("[v0] Second attempt: focused first element")
                    }
                  }
                } catch (e) {
                  // Final fallback: ensure iframe itself has focus
                  if (iframeRef.current && document.activeElement !== iframeRef.current) {
                    iframeRef.current.focus()
                    console.log("[v0] Final fallback: focused iframe element")
                  }
                }
              }, 200)

              setIsInsideIframe(true)
              setIsContainerFocused(false)
              announceToScreenReader("Entered iframe")
            } catch (e) {
              // Fallback to focusing the iframe element itself
              iframeRef.current.focus()
              setIsInsideIframe(true)
              setIsContainerFocused(false)
            }
          }
        }
        // If we're inside the iframe, exit back to container
        else if (isInsideIframe) {
          if (containerRef.current) {
            containerRef.current.focus()
            setIsInsideIframe(false)
            setIsContainerFocused(true)
            announceToScreenReader("Exited iframe")
          }
        }
        return
      }

      // Escape key to exit iframe and return to container
      if (event.key === "Escape") {
        event.preventDefault()
        if (containerRef.current) {
          containerRef.current.focus()
          setIsInsideIframe(false)
          setIsContainerFocused(true)
          announceToScreenReader("Exited iframe")
        }
      }
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.data === "exit-iframe") {
        if (containerRef.current) {
          containerRef.current.focus()
          setIsInsideIframe(false)
          setIsContainerFocused(true)
          announceToScreenReader("Exited iframe")
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown, true)
    window.addEventListener("message", handleMessage)

    const iframeKeyHandler = (event: KeyboardEvent) => {
      if (event.key === "i" && event.metaKey && !event.shiftKey) {
        event.preventDefault()
        event.stopPropagation()
        if (containerRef.current) {
          containerRef.current.focus()
          setIsInsideIframe(false)
          setIsContainerFocused(true)
          announceToScreenReader("Exited iframe")
        }
      }
    }

    // Try to add listener to iframe content window when it loads
    const iframe = iframeRef.current
    if (iframe) {
      const addIframeListener = () => {
        try {
          iframe.contentWindow?.addEventListener("keydown", iframeKeyHandler, true)
        } catch (e) {
          // Cross-origin restriction, rely on document capture listener
          console.log("[v0] Cross-origin restriction, using document listener only")
        }
      }

      iframe.addEventListener("load", addIframeListener)
      addIframeListener() // Try immediately in case already loaded
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true)
      window.removeEventListener("message", handleMessage)

      // Clean up iframe listener
      if (iframe) {
        try {
          iframe.contentWindow?.removeEventListener("keydown", iframeKeyHandler, true)
        } catch (e) {
          // Cross-origin restriction
        }
      }
    }
  }, [isContainerFocused, isInsideIframe])

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement("div")
    announcement.setAttribute("aria-live", "polite")
    announcement.setAttribute("aria-atomic", "true")
    announcement.className = "sr-only"
    announcement.textContent = message
    document.body.appendChild(announcement)
    setTimeout(() => document.body.removeChild(announcement), 1000)
  }

  const handleContainerFocus = () => {
    setIsContainerFocused(true)
    setIsInsideIframe(false)
  }

  const handleContainerBlur = (event: React.FocusEvent) => {
    // Only blur if focus is not moving to the iframe
    if (!event.relatedTarget || !iframeRef.current?.contains(event.relatedTarget as Node)) {
      setIsContainerFocused(false)
    }
  }

  const handleIframeFocus = () => {
    setIsInsideIframe(true)
    setIsContainerFocused(false)
  }

  const handleIframeBlur = () => {
    // Check if focus is moving back to container
    setTimeout(() => {
      if (document.activeElement === containerRef.current) {
        setIsInsideIframe(false)
        setIsContainerFocused(true)
      } else {
        setIsInsideIframe(false)
      }
    }, 0)
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        tabIndex={0}
        onFocus={handleContainerFocus}
        onBlur={handleContainerBlur}
        className={cn(
          "relative rounded-lg transition-all duration-200",
          "focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2",
          isContainerFocused && "ring-4 ring-blue-500 ring-offset-2",
        )}
        role="region"
        aria-label={`${title} iframe container. Press CMD+I to enter or exit iframe.`}
        aria-describedby={description ? "iframe-description" : undefined}
      >
        <iframe
          ref={iframeRef}
          src={src}
          title={title}
          tabIndex={-1}
          onFocus={handleIframeFocus}
          onBlur={handleIframeBlur}
          className={cn("border-2 border-gray-300 rounded-lg w-full", "focus:outline-none", className)}
          sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
        />

        {isContainerFocused && !isInsideIframe && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
            Press CMD+I to enter or exit iframe
          </div>
        )}
      </div>

      {/* Screen reader description */}
      {description && (
        <div id="iframe-description" className="sr-only">
          {description}. Press CMD+I to enter or exit iframe content.
        </div>
      )}
    </div>
  )
}
