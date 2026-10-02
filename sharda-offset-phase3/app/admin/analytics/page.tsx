"use client";

import { useEffect, useState } from "react";

type AnalyticsEvent = {
  id: string;
  event: string;
  path: string | null;
  metadata: unknown;
  sessionId: string | null;
  createdAt: string;
};

type AnalyticsResponse = {
  success: boolean;
  events: AnalyticsEvent[];
};

export default function AdminAnalyticsPage() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Analytics page mounted");

    async function loadAnalytics() {
      console.log("Starting analytics request...");

      try {
        const response = await fetch("/api/admin/analytics", {
          method: "GET",
          cache: "no-store",
        });

        console.log("Analytics response status:", response.status);

        const text = await response.text();

        console.log("Analytics response:", text);

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        const data: AnalyticsResponse = JSON.parse(text);

        setEvents(data.events ?? []);
      } catch (err) {
        console.error("Analytics request failed:", err);

        setError(
          err instanceof Error ? err.message : "Failed to load analytics",
        );
      } finally {
        console.log("Analytics request finished");
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Analytics</h1>

        <p className="mt-2 text-gray-500">Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Analytics</h1>

        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  const count = (eventName: string) =>
    events.filter((event) => event.event === eventName).length;

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>

        <p className="mt-1 text-sm text-gray-500">
          Website activity and customer interaction overview.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Total Events" value={events.length} />

        <Card title="Page Views" value={count("page_view")} />

        <Card title="Sample Views" value={count("sample_view")} />

        <Card title="Service Views" value={count("service_view")} />

        <Card title="WhatsApp Clicks" value={count("whatsapp_click")} />

        <Card title="Phone Clicks" value={count("phone_click")} />

        <Card title="Enquiries" value={count("enquiry_submitted")} />

        <Card title="Sample Searches" value={count("sample_search")} />
      </div>

      <section className="rounded-xl border bg-white">
        <div className="border-b p-5">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </div>

        {events.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">
            No analytics events recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left">Event</th>

                  <th className="px-5 py-3 text-left">Path</th>

                  <th className="px-5 py-3 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {events.slice(0, 50).map((event) => (
                  <tr key={event.id} className="border-b">
                    <td className="px-5 py-3">{event.event}</td>

                    <td className="px-5 py-3 text-gray-600">
                      {event.path || "-"}
                    </td>

                    <td className="px-5 py-3 text-gray-600">
                      {new Date(event.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>

      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
