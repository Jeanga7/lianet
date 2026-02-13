"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { DeliveryStatus, PageTrackerItem } from "@/app/[locale]/_pageTracker";
import { localizePathname } from "@/lib/locale";

interface PageTrackerBoardProps {
  locale: Locale;
  rows: ReadonlyArray<PageTrackerItem>;
}

const statusLabel = (status: DeliveryStatus, locale: Locale) => {
  if (locale === "en") {
    if (status === "done") return "Done";
    if (status === "in_progress") return "In progress";
    return "Todo";
  }
  if (status === "done") return "Terminé";
  if (status === "in_progress") return "En cours";
  return "À faire";
};

const statusClasses: Record<DeliveryStatus, string> = {
  done: "bg-[#40B4A6]/16 text-[#1B365D]",
  in_progress: "bg-[#8FD6CC]/22 text-[#1B365D]",
  todo: "bg-[#1B365D]/10 text-[#1B365D]/75",
};

type BrowserOverride = Partial<Pick<PageTrackerItem, "title" | "area" | "status" | "notes">>;
type BrowserOverrideMap = Record<string, BrowserOverride>;

const getStorageKey = (locale: Locale) => `lianet:page-tracker:overrides:${locale}`;
const readBrowserOverrides = (locale: Locale): BrowserOverrideMap => {
  if (typeof window === "undefined") return {};
  try {
    const saved = window.localStorage.getItem(getStorageKey(locale));
    if (!saved) return {};
    return JSON.parse(saved) as BrowserOverrideMap;
  } catch {
    return {};
  }
};

export default function PageTrackerBoard({ locale, rows }: PageTrackerBoardProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [browserOverrides, setBrowserOverrides] = useState<BrowserOverrideMap>(() =>
    readBrowserOverrides(locale)
  );

  const effectiveRows = useMemo(
    () =>
      rows.map((row) => {
        const override = browserOverrides[row.path];
        if (!override) return row;
        return {
          ...row,
          title: override.title ?? row.title,
          area: override.area ?? row.area,
          status: override.status ?? row.status,
          notes: override.notes ?? row.notes,
        };
      }),
    [rows, browserOverrides]
  );

  const doneCount = effectiveRows.filter((row) => row.status === "done").length;
  const progressCount = effectiveRows.filter((row) => row.status === "in_progress").length;
  const todoCount = effectiveRows.filter((row) => row.status === "todo").length;
  const completion = effectiveRows.length > 0 ? Math.round(((doneCount + progressCount * 0.5) / effectiveRows.length) * 100) : 0;

  const updateRow = <K extends keyof PageTrackerItem>(
    path: string,
    key: K,
    value: PageTrackerItem[K]
  ) => {
    setBrowserOverrides((previous) => ({
      ...previous,
      [path]: {
        ...(previous[path] ?? {}),
        [key]: value,
      },
    }));
  };

  const handleSaveBrowserEdits = () => {
    window.localStorage.setItem(getStorageKey(locale), JSON.stringify(browserOverrides));
  };

  const handleResetBrowserEdits = () => {
    window.localStorage.removeItem(getStorageKey(locale));
    setBrowserOverrides({});
  };

  return (
    <main
      id="main-scroll"
      className="h-screen overflow-y-auto overscroll-contain lg:overflow-y-scroll scrollbar-hide"
    >
      <section className="relative w-full px-4 pb-20 pt-24 sm:px-8 lg:ml-20 lg:w-[calc(100%-5rem)] lg:px-14 lg:pt-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#1B365D]/55">
            {locale === "en" ? "DELIVERY TRACKER" : "SUIVI DE LIVRAISON"}
          </p>
          <h1 className="mt-5 text-[clamp(2rem,6vw,4rem)] font-bold tracking-[-0.02em] text-[#1B365D]">
            {locale === "en" ? "Page Development Board" : "Tableau de Développement des Pages"}
          </h1>
          <p className="mt-4 max-w-4xl text-[17px] leading-relaxed text-[#1B365D]/80">
            {locale === "en"
              ? "Reference board to track which pages are scaffolded and what remains to build."
              : "Tableau de référence pour suivre les pages scaffoldées et ce qu’il reste à développer."}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEditMode((prev) => !prev)}
              className="rounded-full border border-[#1B365D]/20 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#1B365D] hover:border-[#40B4A6]/50"
            >
              {isEditMode ? (locale === "en" ? "Exit edit mode" : "Quitter le mode édition") : locale === "en" ? "Edit mode" : "Mode édition"}
            </button>
            {isEditMode ? (
              <>
                <button
                  type="button"
                  onClick={handleSaveBrowserEdits}
                  className="rounded-full border border-[#40B4A6]/40 bg-[#40B4A6]/14 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#1B365D] hover:bg-[#40B4A6]/22"
                >
                  {locale === "en" ? "Save browser edits" : "Sauver les modifications navigateur"}
                </button>
                <button
                  type="button"
                  onClick={handleResetBrowserEdits}
                  className="rounded-full border border-[#1B365D]/20 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#1B365D]/80 hover:text-[#1B365D]"
                >
                  {locale === "en" ? "Reset browser edits" : "Réinitialiser les modifications navigateur"}
                </button>
              </>
            ) : null}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <article className="rounded-2xl border border-[#1B365D]/12 bg-white/85 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.1em] text-[#1B365D]/60">
                {locale === "en" ? "Done" : "Terminé"}
              </p>
              <p className="mt-1 text-2xl font-semibold text-[#1B365D]">{doneCount}</p>
            </article>
            <article className="rounded-2xl border border-[#1B365D]/12 bg-white/85 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.1em] text-[#1B365D]/60">
                {locale === "en" ? "In progress" : "En cours"}
              </p>
              <p className="mt-1 text-2xl font-semibold text-[#1B365D]">{progressCount}</p>
            </article>
            <article className="rounded-2xl border border-[#1B365D]/12 bg-white/85 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.1em] text-[#1B365D]/60">
                {locale === "en" ? "Todo" : "À faire"}
              </p>
              <p className="mt-1 text-2xl font-semibold text-[#1B365D]">{todoCount}</p>
            </article>
          </div>

          <div className="mt-4 rounded-2xl border border-[#1B365D]/12 bg-white/85 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-sm text-[#1B365D]/80">
              <span>{locale === "en" ? "Overall completion" : "Avancement global"}</span>
              <span className="font-semibold text-[#1B365D]">{completion}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#1B365D]/10">
              <div
                className="h-full rounded-full bg-[#40B4A6] transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#1B365D]/12 bg-white/90 backdrop-blur-sm">
            <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#1B365D]/12 bg-[#1B365D]/[0.03]">
                <tr>
                  <th className="px-5 py-3 font-semibold text-[#1B365D]">{locale === "en" ? "Page" : "Page"}</th>
                  <th className="px-5 py-3 font-semibold text-[#1B365D]">{locale === "en" ? "Area" : "Pôle"}</th>
                  <th className="px-5 py-3 font-semibold text-[#1B365D]">{locale === "en" ? "Status" : "Statut"}</th>
                  <th className="px-5 py-3 font-semibold text-[#1B365D]">{locale === "en" ? "Notes" : "Notes"}</th>
                </tr>
              </thead>
              <tbody>
                {effectiveRows.map((row) => (
                  <tr key={row.path} className="border-b border-[#1B365D]/8 last:border-b-0">
                    <td className="px-5 py-4 align-top">
                      {isEditMode ? (
                        <input
                          value={row.title}
                          onChange={(event) => updateRow(row.path, "title", event.target.value)}
                          className="w-full rounded-md border border-[#1B365D]/20 bg-white px-2 py-1 text-sm font-semibold text-[#1B365D]"
                        />
                      ) : (
                        <div className="font-semibold text-[#1B365D]">{row.title}</div>
                      )}
                      <Link
                        href={localizePathname(row.path, locale)}
                        className="mt-1 inline-block text-xs text-[#1B365D]/70 underline-offset-2 hover:text-[#40B4A6] hover:underline"
                      >
                        {localizePathname(row.path, locale)}
                      </Link>
                    </td>
                    <td className="px-5 py-4 align-top text-[#1B365D]/85">
                      {isEditMode ? (
                        <input
                          value={row.area}
                          onChange={(event) => updateRow(row.path, "area", event.target.value)}
                          className="w-full rounded-md border border-[#1B365D]/20 bg-white px-2 py-1 text-sm text-[#1B365D]"
                        />
                      ) : (
                        row.area
                      )}
                    </td>
                    <td className="px-5 py-4 align-top">
                      {isEditMode ? (
                        <select
                          value={row.status}
                          onChange={(event) => updateRow(row.path, "status", event.target.value as DeliveryStatus)}
                          className="rounded-md border border-[#1B365D]/20 bg-white px-2 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-[#1B365D]"
                        >
                          <option value="todo">todo</option>
                          <option value="in_progress">in_progress</option>
                          <option value="done">done</option>
                        </select>
                      ) : (
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.06em] ${statusClasses[row.status]}`}>
                          {statusLabel(row.status, locale)}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 align-top text-[#1B365D]/75">
                      {isEditMode ? (
                        <textarea
                          value={row.notes}
                          onChange={(event) => updateRow(row.path, "notes", event.target.value)}
                          rows={3}
                          className="w-full rounded-md border border-[#1B365D]/20 bg-white px-2 py-1 text-sm text-[#1B365D]/80"
                        />
                      ) : (
                        row.notes
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#1B365D]/12 bg-white/85 p-4 text-sm text-[#1B365D]/78">
            <p className="font-semibold text-[#1B365D]">
              {locale === "en" ? "How to customize this board" : "Comment personnaliser ce board"}
            </p>
            <p className="mt-2">
              {locale === "en"
                ? "Auto-generation comes from app routes. For team-wide source-of-truth, edit statuses/notes/titles/grouping/order/hidden pages in:"
                : "La generation automatique vient des routes de l'app. Pour une source commune d'equipe, modifie statuts/notes/titres/regroupements/ordre/pages masquees dans :"}
            </p>
            <p className="mt-1 font-mono text-xs text-[#1B365D]/70">src/app/[locale]/_pageTracker.overrides.ts</p>
            <p className="mt-2 text-xs text-[#1B365D]/65">
              {locale === "en"
                ? "Browser edit mode saves only on this browser (localStorage)."
                : "Le mode edition navigateur sauvegarde uniquement sur ce navigateur (localStorage)."}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
