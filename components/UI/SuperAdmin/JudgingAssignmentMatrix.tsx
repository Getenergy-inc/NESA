"use client";

import React, { useEffect, useMemo, useState } from "react";
import SuperAdminLayout from "@/components/UI/SuperAdmin/SuperAdminLayout";
import { Trash2, Plus, Download, RefreshCcw } from "lucide-react";

/**
 * Judge Assignment Matrix
 *
 * - TypeScript + client-side persistence (localStorage)
 * - Replace localStorage calls with API calls when ready
 */

/* ---------- Types ---------- */
type Judge = {
  id: string;
  name: string;
  email?: string;
  active?: boolean;
};

type Category = {
  id: string;
  name: string;
  subcategoryCount?: number;
  assignedJudgeIds: string[]; // list of judge ids
};

/* ---------- Mock Data (replace with API) ---------- */
const DEFAULT_JUDGES: Judge[] = [
  { id: "j-1", name: "Dr. Amina Bello", email: "amina@example.com" },
  { id: "j-2", name: "Prof. Kwame Mensah", email: "kwame@example.com" },
  { id: "j-3", name: "Ms. Chioma Okafor", email: "chioma@example.com" },
  { id: "j-4", name: "Mr. Tariq Hassan", email: "tariq@example.com" },
  { id: "j-5", name: "Ms. Lindiwe N.", email: "lindiwe@example.com" },
];

const DEFAULT_CATEGORIES: Category[] = [
  { id: "c-1", name: "Music — Afrobeats", subcategoryCount: 6, assignedJudgeIds: [] },
  { id: "c-2", name: "Film — Documentary", subcategoryCount: 4, assignedJudgeIds: [] },
  { id: "c-3", name: "Tech — Health Innovation", subcategoryCount: 5, assignedJudgeIds: [] },
  { id: "c-4", name: "Leadership — Public Service", subcategoryCount: 3, assignedJudgeIds: [] },
  { id: "c-5", name: "ESG — Environmental", subcategoryCount: 2, assignedJudgeIds: [] },
  { id: "c-6", name: "Business — SME", subcategoryCount: 4, assignedJudgeIds: [] },
];

/* ---------- Local storage keys ---------- */
const LS_JUDGES = "sa_judges_v1";
const LS_CATEGORIES = "sa_categories_v1";

/* ---------- Component ---------- */
export default function JudgeAssignmentMatrix() {
  const [judges, setJudges] = useState<Judge[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchJudge, setSearchJudge] = useState("");
  const [assigningJudgeId, setAssigningJudgeId] = useState<string | null>(null);

  /* ---------- Load initial data (from localStorage or defaults) ---------- */
  useEffect(() => {
    const js = localStorage.getItem(LS_JUDGES);
    const cs = localStorage.getItem(LS_CATEGORIES);

    setJudges(js ? (JSON.parse(js) as Judge[]) : DEFAULT_JUDGES);
    setCategories(cs ? (JSON.parse(cs) as Category[]) : DEFAULT_CATEGORIES);
  }, []);

  /* ---------- Persist categories (assignments) ---------- */
  useEffect(() => {
    localStorage.setItem(LS_CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(LS_JUDGES, JSON.stringify(judges));
  }, [judges]);

  /* ---------- Helpers ---------- */
  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === selectedCategoryId) ?? categories[0] ?? null,
    [categories, selectedCategoryId]
  );

  const unassignedCategories = useMemo(
    () => categories.filter((c) => c.assignedJudgeIds.length === 0),
    [categories]
  );

  const filteredCategories = useMemo(() => {
    const q = searchCategory.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.name.toLowerCase().includes(q));
  }, [categories, searchCategory]);

  const filteredJudges = useMemo(() => {
    const q = searchJudge.trim().toLowerCase();
    if (!q) return judges;
    return judges.filter(
      (j) => j.name.toLowerCase().includes(q) || (j.email || "").toLowerCase().includes(q)
    );
  }, [judges, searchJudge]);

  /* ---------- Assignment actions ---------- */
  const assignJudge = (categoryId: string, judgeId: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? { ...c, assignedJudgeIds: Array.from(new Set([...c.assignedJudgeIds, judgeId])) }
          : c
      )
    );
  };

  const removeJudgeFromCategory = (categoryId: string, judgeId: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? { ...c, assignedJudgeIds: c.assignedJudgeIds.filter((id) => id !== judgeId) } : c))
    );
  };

  const autoAssignUnassigned = () => {
    if (judges.length === 0) return;
    const nextCats = [...categories];
    let jIndex = 0;
    for (let i = 0; i < nextCats.length; i++) {
      const cat = nextCats[i];
      if (cat.assignedJudgeIds.length === 0) {
        // assign 1 judge round-robin
        const judgeToAssign = judges[jIndex % judges.length];
        cat.assignedJudgeIds = [judgeToAssign.id];
        jIndex++;
      }
    }
    setCategories(nextCats);
  };

  const clearAllAssignments = () => {
    if (!confirm("Clear all judge assignments?")) return;
    setCategories((prev) => prev.map((c) => ({ ...c, assignedJudgeIds: [] })));
  };

  const exportAssignmentsCSV = () => {
    const rows = [
      ["Category ID", "Category Name", "Assigned Judges (IDs)", "Assigned Judges (Names)"],
    ];
    categories.forEach((c) => {
      const names = c.assignedJudgeIds.map((id) => judges.find((j) => j.id === id)?.name ?? id).join(" | ");
      rows.push([c.id, c.name, c.assignedJudgeIds.join(";"), names]);
    });
    const csv = rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `judge_assignments_${Date.now()}.csv`;
    link.click();
  };

  const refreshDefaults = () => {
    if (!confirm("Reset judges & categories to defaults? Existing assignments will be lost.")) return;
    localStorage.removeItem(LS_JUDGES);
    localStorage.removeItem(LS_CATEGORIES);
    setJudges(DEFAULT_JUDGES);
    setCategories(DEFAULT_CATEGORIES);
    setSelectedCategoryId(null);
  };

  /* ---------- Render ---------- */
  return (
    <SuperAdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">🧭 Judge Assignment Matrix</h1>
            <p className="text-sm text-gray-600 mt-1">
              Assign judges to categories, track assignment counts and detect unassigned categories.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={autoAssignUnassigned}
              className="inline-flex items-center gap-2 px-3 py-2 rounded bg-amber-500 text-white hover:opacity-95"
              title="Auto assign unassigned categories (round-robin)"
            >
              <Plus className="w-4 h-4" /> Auto-Assign
            </button>

            <button
              onClick={exportAssignmentsCSV}
              className="inline-flex items-center gap-2 px-3 py-2 rounded bg-green-600 text-white hover:opacity-95"
              title="Export assignments to CSV"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>

            <button
              onClick={clearAllAssignments}
              className="inline-flex items-center gap-2 px-3 py-2 rounded bg-red-500 text-white hover:opacity-95"
              title="Clear all assignments"
            >
              <Trash2 className="w-4 h-4" /> Clear All
            </button>

            <button
              onClick={refreshDefaults}
              className="inline-flex items-center gap-2 px-3 py-2 rounded bg-slate-200 text-slate-800 hover:bg-slate-300"
              title="Reset data to defaults"
            >
              <RefreshCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>

        {/* Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Categories list */}
          <div className="col-span-1 bg-white rounded-xl p-4 border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Categories ({categories.length})</h3>
              <div className={`text-sm ${unassignedCategories.length ? "text-red-600" : "text-green-600"}`}>
                {unassignedCategories.length ? `${unassignedCategories.length} unassigned` : "All assigned"}
              </div>
            </div>

            <div className="mb-3">
              <input
                placeholder="Search categories..."
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-2 max-h-[52vh] overflow-y-auto pr-2">
              {filteredCategories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`cursor-pointer p-3 rounded-md border ${
                    selectedCategoryId === cat.id ? "bg-indigo-50 border-indigo-200" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{cat.name}</div>
                      <div className="text-xs text-gray-500">{cat.subcategoryCount ?? 0} subcategories</div>
                    </div>
                    <div className="text-sm text-gray-700">
                      {cat.assignedJudgeIds.length > 0 ? `${cat.assignedJudgeIds.length} judge(s)` : <span className="text-red-500">Unassigned</span>}
                    </div>
                  </div>
                </div>
              ))}

              {filteredCategories.length === 0 && (
                <div className="text-sm text-gray-500 p-3">No categories match your search.</div>
              )}
            </div>
          </div>

          {/* Center: Selected category details */}
          <div className="col-span-1 lg:col-span-1 bg-white rounded-xl p-4 border">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold">{selectedCategory?.name ?? "Select a category"}</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedCategory ? `${selectedCategory.subcategoryCount ?? 0} subcategories` : "Click a category to view assignments."}</p>
              </div>
            </div>

            {selectedCategory ? (
              <>
                <div className="mb-4">
                  <div className="text-sm font-medium mb-2">Assigned Judges</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory.assignedJudgeIds.length === 0 && (
                      <div className="text-sm text-gray-500">No judges assigned.</div>
                    )}

                    {selectedCategory.assignedJudgeIds.map((jid) => {
                      const j = judges.find((x) => x.id === jid);
                      return (
                        <div key={jid} className="flex items-center gap-2 bg-gray-50 border rounded-full px-3 py-1 text-sm">
                          <div className="font-medium">{j?.name ?? jid}</div>
                          <button
                            onClick={() => removeJudgeFromCategory(selectedCategory.id, jid)}
                            className="text-red-500 ml-2"
                            title="Remove judge"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Assign judge</label>
                  <div className="flex gap-2">
                    <select
                      value={assigningJudgeId ?? ""}
                      onChange={(e) => setAssigningJudgeId(e.target.value ?? null)}
                      className="flex-1 border rounded-md px-3 py-2 text-sm"
                    >
                      <option value="">Select judge</option>
                      {judges.map((j) => (
                        <option key={j.id} value={j.id}>
                          {j.name} {j.email ? `— ${j.email}` : ""}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => {
                        if (!assigningJudgeId) return alert("Choose a judge to assign.");
                        assignJudge(selectedCategory.id, assigningJudgeId);
                        setAssigningJudgeId(null);
                      }}
                      className="px-3 py-2 rounded bg-indigo-600 text-white"
                    >
                      <Plus className="w-4 h-4 inline-block mr-1" /> Assign
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-sm text-gray-500 mt-4">Select a category from the left to view and manage judge assignments.</div>
            )}
          </div>

          {/* Right: Judges pool + quick actions */}
          <div className="col-span-1 bg-white rounded-xl p-4 border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Judges Pool ({judges.length})</h3>
              <div className="text-xs text-gray-500">{/* could show active/inactive */}</div>
            </div>

            <div className="mb-3">
              <input
                placeholder="Search judges..."
                value={searchJudge}
                onChange={(e) => setSearchJudge(e.target.value)}
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-2 max-h-[52vh] overflow-y-auto pr-2">
              {filteredJudges.map((j) => (
                <div key={j.id} className="p-3 rounded-md border hover:bg-gray-50 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{j.name}</div>
                    <div className="text-xs text-gray-500">{j.email}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (!selectedCategory) {
                          alert("Please select a category on the left first.");
                          return;
                        }
                        assignJudge(selectedCategory.id, j.id);
                      }}
                      className="px-3 py-1 rounded bg-emerald-600 text-white text-sm"
                      title={`Assign ${j.name} to ${selectedCategory?.name ?? "category"}`}
                    >
                      Assign
                    </button>
                    <button
                      onClick={() => {
                        // quick remove from all categories
                        if (!confirm(`Remove ${j.name} from all categories?`)) return;
                        setCategories((prev) => prev.map((c) => ({ ...c, assignedJudgeIds: c.assignedJudgeIds.filter((id) => id !== j.id)})));
                      }}
                      className="px-2 py-1 rounded bg-red-100 text-red-600 text-sm"
                      title={`Remove ${j.name} from all categories`}
                    >
                      Remove all
                    </button>
                  </div>
                </div>
              ))}

              {filteredJudges.length === 0 && <div className="text-sm text-gray-500 p-3">No judges match your search.</div>}
            </div>
          </div>
        </div>

        {/* Footer: quick stats */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="text-sm text-gray-700">
            Total Categories: <span className="font-semibold">{categories.length}</span> •
            Total Judges: <span className="font-semibold">{judges.length}</span> •
            Assigned: <span className="font-semibold">{categories.filter(c => c.assignedJudgeIds.length > 0).length}</span> •
            Unassigned: <span className="font-semibold text-red-600">{unassignedCategories.length}</span>
          </div>

          <div className="text-sm text-gray-500">
            Tip: Use <span className="font-medium">Auto-Assign</span> to quickly populate unassigned categories, then fine-tune per category.
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
