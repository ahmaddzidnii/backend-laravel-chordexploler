"use client";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlayIcon,
  PrinterIcon,
  ScrollIcon,
  TypeIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const SongToolbar = () => {
  const handlePrint = () => {
    const printContent = document.getElementById("printable-content");
    const newWindow = window.open("", "", "width=800,height=600");

    // Add CSS to preserve whitespace
    const printStyles = `
        <style>
            @media print {
                @page {
                    margin: 0;
                    size: auto;
                }
                body {
                    margin: 1cm;
                }
                pre {
                    white-space: pre-wrap;
                    white-space: -moz-pre-wrap;
                    white-space: -pre-wrap;
                    white-space: -o-pre-wrap;
                    word-wrap: break-word;
                    font-family: monospace;
                }
            }
        </style>
    `;

    // Write content with styles
    newWindow?.document.write(`
        <html>
            <head>
                <title>Print</title>
                ${printStyles}
            </head>
            <body>
               <pre>${printContent?.innerHTML}</pre>
            </body>
        </html>
    `);

    newWindow?.document.close();
    newWindow?.print();
  };
  return (
    <div className="border-b px-2 py-4 flex items-center gap-4">
      {/* Transpose Controls */}
      <div className="flex items-center rounded-lg border">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-r-none"
            >
              <ArrowDownIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Transpose down</TooltipContent>
        </Tooltip>
        <div className="border-x px-2">
          <span>0</span>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-l-none"
            >
              <ArrowUpIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Transpose up</TooltipContent>
        </Tooltip>
      </div>

      {/* Auto-scroll Toggle */}
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {}}
              className="w-full px-1.5"
            >
              <div className="flex items-center justify-center gap-1">
                <ScrollIcon className="h-4 w-4" />
                Page Scroll
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Auto Scroll</TooltipContent>
        </Tooltip>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {}}
          >
            <PlayIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Start Jamming</TooltipContent>
      </Tooltip>

      {/* Print */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrint}
          >
            <PrinterIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Print</TooltipContent>
      </Tooltip>
    </div>
  );
};
