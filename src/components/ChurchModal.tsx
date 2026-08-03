"use client";

import { useEffect } from "react";
import { type Church, mapsUrl } from "@/lib/churches";

export default function ChurchModal({
  church,
  onClose,
}: {
  church: Church;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  function onBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="church-modal-title"
    >
      <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-2xl leading-none text-gray-400 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 id="church-modal-title" className="mb-4 pr-8 text-xl font-semibold">
          {church.name}
        </h2>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="font-medium text-gray-500">Location</dt>
            <dd>
              {church.address && <span>{church.address} — </span>}
              <a
                href={mapsUrl(church)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View on Google Maps
              </a>
            </dd>
          </div>
          {church.pastor && (
            <div>
              <dt className="font-medium text-gray-500">Senior Pastor</dt>
              <dd>{church.pastor}</dd>
            </div>
          )}
          {(church.phone || church.email) && (
            <div>
              <dt className="font-medium text-gray-500">Contact</dt>
              <dd className="space-x-2">
                {church.phone && (
                  <a href={`tel:${church.phone}`} className="text-blue-600 hover:underline">
                    {church.phone}
                  </a>
                )}
                {church.email && (
                  <a href={`mailto:${church.email}`} className="text-blue-600 hover:underline">
                    {church.email}
                  </a>
                )}
              </dd>
            </div>
          )}
          {church.website && (
            <div>
              <dt className="font-medium text-gray-500">Website</dt>
              <dd>
                <a
                  href={church.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit website
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
