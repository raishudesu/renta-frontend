"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";

const BookingQr = ({ bookingId }: { bookingId: string }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);

    const svg = document.querySelector(".qr-code-svg");
    if (!svg) {
      setIsDownloading(false);
      return;
    }

    // Convert SVG to string
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);

    // Create canvas and image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Set canvas size to 1024x1024 for high quality
      const canvasSize = 1024;
      const padding = 80; // pixels of padding on each side
      const qrSize = canvasSize - padding * 2;

      canvas.width = canvasSize;
      canvas.height = canvasSize;

      // Fill white background
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw QR code image with padding
        ctx.drawImage(img, padding, padding, qrSize, qrSize);

        // Convert to PNG and download
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const imageUrl = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = imageUrl;
              link.download = `${bookingId
                .toLowerCase()
                .replace(/\s+/g, "-")}-qr-code.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(imageUrl);
            }
            setIsDownloading(false);
          },
          "image/png",
          1.0
        );
      }
    };

    img.src = url;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 max-w-sm">
      <div className="bg-white p-4 w-full">
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={bookingId || ""}
          viewBox={`0 0 256 256`}
          className="qr-code-svg"
        />
      </div>
      <Button
        onClick={handleDownload}
        className="flex gap-2 w-full"
        disabled={isDownloading}
      >
        {isDownloading ? (
          "Downloading..."
        ) : (
          <>
            Download QR Code <Download size={18} />
          </>
        )}
      </Button>
    </div>
  );
};

export default BookingQr;
