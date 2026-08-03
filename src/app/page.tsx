import { getChurches } from "@/lib/churches";

export default function Home() {
  const churches = getChurches();

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Reformed Churches in Nairobi</h1>
      <p className="mt-2 text-gray-600">
        A directory of Reformed churches in Nairobi and surrounding areas.
      </p>
      <ul className="mt-8 divide-y divide-gray-200 rounded-lg border border-gray-200">
        {churches.map((church) => (
          <li key={church.id} className="px-4 py-4">
            {church.name}
          </li>
        ))}
      </ul>
    </main>
  );
}
