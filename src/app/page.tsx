import { CatalogBrowser } from "@/components/CatalogBrowser";
import { RESOURCES } from "@/lib/catalog";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-sm font-bold text-white dark:bg-zinc-50 dark:text-zinc-900">
              C
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                COB Hub
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-500">
                Sites, ferramentas e materiais do time
              </p>
            </div>
          </div>
          <span className="hidden text-xs text-zinc-500 sm:inline dark:text-zinc-500">
            Uso interno
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-10 flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Tudo da COB em um lugar
          </h1>
          <p className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
            Catálogo central de sites, ferramentas e materiais usados pelos
            times. Sem mais caça ao link perdido no Drive.
          </p>
        </div>

        <CatalogBrowser resources={RESOURCES} />
      </main>

      <footer className="mx-auto max-w-6xl px-6 py-10 text-xs text-zinc-500 dark:text-zinc-500">
        Para adicionar ou corrigir um recurso, edite{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono dark:bg-zinc-900">
          src/lib/catalog.ts
        </code>{" "}
        e abra um PR.
      </footer>
    </div>
  );
}
