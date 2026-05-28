"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { signInWithPopup, signOut, User } from "firebase/auth";
import { auth, db, googleProvider, handleFirestoreError, OperationType } from "../lib/firebase";

interface Inquiry {
  id?: string;
  dbId: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  status: "pending" | "reviewed" | "completed";
  createdAt: { toDate?: () => Date } | null;
}

export function AdminInbox() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const adminEmail = "himpower2025@gmail.com";

  // Check auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch inquiries only when authorized user matches admin email
  useEffect(() => {
    if (!user || user.email !== adminEmail) {
      setTimeout(() => {
        setInquiries([]);
      }, 0);
      return;
    }

    setTimeout(() => {
      setLoadingInquiries(true);
      setErrorText("");
    }, 0);

    const path = "inquiries";
    const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          dbId: doc.id,
          ...doc.data(),
        })) as unknown as Inquiry[];
        setInquiries(items);
        setLoadingInquiries(false);
      },
      (err) => {
        setLoadingInquiries(false);
        try {
          handleFirestoreError(err, OperationType.LIST, path);
        } catch (formattedErr) {
          if (formattedErr instanceof Error) {
            setErrorText("Access Denied or Database Error: " + formattedErr.message);
          }
        }
      }
    );

    return () => unsubscribe();
  }, [user]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Sign-in failed:", err);
        setErrorText("Login process cancelled or failed: " + err.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Sign-out failed:", err);
      }
    }
  };

  const updateStatus = async (inquiryId: string, newStatus: "pending" | "reviewed" | "completed") => {
    const path = `inquiries/${inquiryId}`;
    try {
      await updateDoc(doc(db, "inquiries", inquiryId), {
        status: newStatus,
      });
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.UPDATE, path);
      } catch (formattedErr) {
        if (formattedErr instanceof Error) {
          alert("Failed to update: Permission denied.");
        }
      }
    }
  };

  const deleteInquiry = async (inquiryId: string) => {
    if (!window.confirm("Are you sure you want to delete this inquiry permanently?")) return;
    const path = `inquiries/${inquiryId}`;
    try {
      await deleteDoc(doc(db, "inquiries", inquiryId));
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.DELETE, path);
      } catch (formattedErr) {
        if (formattedErr instanceof Error) {
          alert("Failed to delete: Permission denied.");
        }
      }
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (statusFilter === "all") return true;
    return inq.status === statusFilter;
  });

  const formatDate = (timestamp: { toDate?: () => Date } | null) => {
    if (!timestamp) return "Just now";
    const date = timestamp.toDate ? timestamp.toDate() : new Date();
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-10 text-sm text-slate-500">
        Loading admin console...
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-150 bg-slate-50/50 p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Himpower Inbox Console</h3>
          <p className="text-xs text-muted">
            Manage, classify, and track live inquiries from prospects.
          </p>
        </div>

        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-700 bg-white/70 border border-slate-200 px-3 py-1.5 rounded-full">
                {user.email} {user.email === adminEmail ? "👑" : ""}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-1.5 text-xs font-semibold transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="rounded-full bg-slate-950 hover:bg-slate-800 text-white px-5 py-2 text-xs font-semibold shadow transition duration-200"
            >
              Sign In with Google
            </button>
          )}
        </div>
      </div>

      {!user && (
        <div className="mt-8 text-center border-2 border-dashed border-slate-200 bg-white rounded-xl p-8">
          <p className="text-sm font-medium text-slate-800">Administrator Credentials Required</p>
          <p className="mt-1.5 text-xs text-slate-500 max-w-sm mx-auto leading-5">
            Only authorized administrator email <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600">himpower2025@gmail.com</code> has verified permission to read/write inquiry entries.
          </p>
          <button
            onClick={handleLogin}
            className="mt-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-xs font-medium shadow-sm transition"
          >
            Authenticate Admin Account
          </button>
        </div>
      )}

      {user && user.email !== adminEmail && (
        <div className="mt-8 text-center bg-rose-50 border border-rose-100 rounded-xl p-8">
          <p className="text-sm font-semibold text-rose-800">Unauthorized Email Access</p>
          <p className="mt-1 text-xs text-rose-600 max-w-sm mx-auto leading-5">
            You are logged in with <b>{user.email}</b>, which does not have Admin roles. Please sign out and sign in with the owner account to view proposals.
          </p>
        </div>
      )}

      {user && user.email === adminEmail && (
        <div className="mt-8 space-y-5">
          {/* Controls & Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-550">Filter status:</span>
              <div className="flex gap-1">
                {["all", "pending", "reviewed", "completed"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize border transition ${
                      statusFilter === st
                        ? "bg-slate-900 border-slate-900 text-white"
                        : "bg-white border-slate-200 text-slate-650 hover:bg-slate-50"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs font-medium text-slate-500">
              Total found:{" "}
              <b className="text-slate-800 font-bold">{filteredInquiries.length}</b> inquiries
            </div>
          </div>

          {errorText && (
            <div className="bg-rose-50 border border-rose-100 rounded-lg p-3.5 text-xs text-rose-700">
              {errorText}
            </div>
          )}

          {loadingInquiries ? (
            <div className="text-center py-12 text-slate-450 text-xs">
              Synchronizing with cloud firestore...
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-100 text-slate-400 text-xs">
              No inquiries found matching selected status.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredInquiries.map((inq) => (
                <div
                  key={inq.id || inq.dbId}
                  className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-4 hover:border-indigo-150 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{inq.name}</h4>
                      <a
                        href={`mailto:${inq.email}`}
                        className="text-xs text-indigo-650 hover:underline"
                      >
                        {inq.email}
                      </a>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                        inq.status === "pending"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : inq.status === "reviewed"
                          ? "bg-cyan-50 text-cyan-700 border border-cyan-200"
                          : "bg-emerald-50 text-emerald-750 border border-emerald-250"
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-slate-50/70 rounded-lg p-2.5 text-[10px] font-medium text-slate-600">
                    <div>
                      <span className="block text-slate-400 text-[9px] uppercase font-semibold">Service</span>
                      <span className="text-slate-800 truncate block">{inq.projectType}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[9px] uppercase font-semibold">Budget</span>
                      <span className="text-slate-800 truncate block">{inq.budget}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[9px] uppercase font-semibold">Timeline</span>
                      <span className="text-slate-800 truncate block">{inq.timeline}</span>
                    </div>
                  </div>

                  <div>
                    <span className="block text-slate-400 text-[9px] uppercase font-semibold">Description</span>
                    <p className="mt-1 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap line-clamp-4 bg-slate-50/30 p-2.5 rounded-lg border border-slate-100">
                      {inq.message}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100 text-[10px]">
                    <span className="text-slate-400">{formatDate(inq.createdAt)}</span>

                    <div className="flex gap-1.5">
                      {inq.status === "pending" && (
                        <button
                          onClick={() => updateStatus(inq.id || inq.dbId, "reviewed")}
                          className="rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-2 py-1 font-semibold transition"
                        >
                          Reviewed
                        </button>
                      )}
                      {inq.status !== "completed" && (
                        <button
                          onClick={() => updateStatus(inq.id || inq.dbId, "completed")}
                          className="rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-2 py-1 font-semibold transition"
                        >
                          Done
                        </button>
                      )}
                      <button
                        onClick={() => deleteInquiry(inq.id || inq.dbId)}
                        className="rounded bg-rose-50 hover:bg-rose-100 text-rose-700 px-2 py-1 font-semibold transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
