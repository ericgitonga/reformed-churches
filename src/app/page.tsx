import { getChurches } from "@/lib/churches";
import ChurchList from "@/components/ChurchList";

export default function Home() {
  const churches = getChurches();

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Reformed Churches in Nairobi
      </h1>
      <p className="mt-2 text-gray-600">
        A directory of Reformed churches in Nairobi and surrounding areas. Tap a church for
        location, pastor, and contact details.
      </p>
      <ChurchList churches={churches} />
    </main>
  );
}
