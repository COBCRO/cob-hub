"use client";

import { useMemo, useState } from "react";
import {
  KIND_DESCRIPTION,
  KIND_LABEL,
  type Resource,
  type ResourceKind,
} from "@/lib/catalog";
import { ResourceCard } from "./ResourceCard";

type Filter = ResourceKind | "all";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Tudo" },
  { key: "site", label: KIND_LABEL.site },
  { key: "tool", label: KIND_LABEL.tool },
  { key: "material", label: KIND_LABEL.material },
];

export function CatalogBrowser({ resources }: { resources: Resource[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      if (filter !== "all" && r.kind !== filter) return false;
      if (!q) return true;
      const haystack = [
        r.title,
        r.description,
        r.owner ?? "",
        r.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [resources, query, filter]);

  const grouped = useMemo(() => {
    const map = new Map<ResourceKind, Resource[]>();
    for (const r of filtered) {
      const bucket = map.get(r.kind) ?? [];
      bucket.push(r);
      map.set(r.kind, bucket);
    }
    return map;
  }, [filtered]);

  const order: ResourceKind[] = ["site", "tool", "material"];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-md">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nome, tag ou dono…"
            className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-600 dark:focus:border-zinc-600 dark:focus:ring-zinc-800"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 rounded-lg border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-950">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={
                  "rounded-md px-3 py-1.5 text-sm font-medium transition " +
                  (active
                    ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900")
                }
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 p-12 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
          Nenhum resultado para esses filtros.
        </div>
      ) : (
        order
          .filter((k) => grouped.has(k))
          .map((kind) => (
            <section key={kind} className="flex flex-col gap-4">
              <header className="flex items-baseline justify-between gap-4 border-b border-zinc-200 pb-2 dark:border-zinc-800">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {KIND_LABEL[kind]}
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500">
                    {KIND_DESCRIPTION[kind]}
                  </p>
                </div>
                <span className="text-sm tabular-nums text-zinc-500 dark:text-zinc-500">
                  {grouped.get(kind)!.length}
                </span>
              </header>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {grouped.get(kind)!.map((r) => (
                  <ResourceCard key={r.id} resource={r} />
                ))}
              </div>
            </section>
          ))
      )}
    </div>
  );
}
