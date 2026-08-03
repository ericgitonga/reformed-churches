"use client";

import { useState } from "react";
import type { Church } from "@/lib/churches";
import ChurchModal from "./ChurchModal";

export default function ChurchList({ churches }: { churches: Church[] }) {
  const [selected, setSelected] = useState<Church | null>(null);

  return (
    <>
      <ul className="mt-8 divide-y divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-800 dark:border-gray-800">
        {churches.map((church) => (
          <li key={church.id}>
            <button
              type="button"
              onClick={() => setSelected(church)}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none dark:hover:bg-gray-900 dark:focus:bg-gray-900"
            >
              <span className="font-medium text-gray-900 dark:text-gray-100">{church.name}</span>
              <span className="text-gray-400" aria-hidden="true">
                &rarr;
              </span>
            </button>
          </li>
        ))}
      </ul>
      {selected && <ChurchModal church={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
