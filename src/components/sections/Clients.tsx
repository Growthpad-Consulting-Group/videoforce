import { clients } from "@/data/clients";
import Image from "next/image";

export default function Clients() {
  return (
    <section
      id="sec6"
      className="py-20 md:py-28 bg-brand-dark2"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-yellow">
            Clients
          </p>
          <h2 className="text-3xl font-light text-white md:text-4xl">
            Brands We&apos;ve Worked With
          </h2>
        </div>

        {/* Logo grid */}
        <ul className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {clients.map((client) => (
            <li
              key={client.filename}
              className="flex items-center justify-center opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={`/images/clients/${client.filename}`}
                alt={client.name}
                width={120}
                height={60}
                className="h-10 w-auto object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
