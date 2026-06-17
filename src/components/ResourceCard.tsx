import type { Resource } from "@/lib/catalog";

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {resource.title}
        </h3>
        {resource.internal && (
          <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
            Interno
          </span>
        )}
      </div>
      <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {resource.description}
      </p>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
        {resource.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
          >
            {tag}
          </span>
        ))}
        {resource.owner && (
          <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-500">
            {resource.owner}
          </span>
        )}
      </div>
    </a>
  );
}
