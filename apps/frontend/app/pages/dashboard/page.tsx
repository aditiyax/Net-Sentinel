"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import {
  Activity,
  ArrowUp,
  ArrowDown,
  Filter,
  Search,
  Plus,
  Globe,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { API_URL } from "@/config";

type UptimeStatus = "good" | "bad" | "unknown";

interface Tick {
  status: "Good" | "Bad";
  createdAt: string;
}

interface WebsiteRaw {
  id: string;
  url: string;
  name: string;
  ticks: Tick[];
}

interface ProcessedWebsite {
  id: string;
  url: string;
  name: string;
  status: UptimeStatus;
  uptimePercentage: number;
  lastChecked: string;
  uptimeTicks: UptimeStatus[];
}

function StatusCircle({ status }: { status: UptimeStatus }) {
  return (
    <div
      className={`w-3 h-3 rounded-full ${
        status === "good"
          ? "bg-green-500"
          : status === "bad"
          ? "bg-red-500"
          : "bg-gray-500 dark:bg-gray-400"
      }`}
    />
  );
}

function UptimeTicks({ ticks }: { ticks: UptimeStatus[] }) {
  return (
    <div className="flex gap-1 mt-2">
      {ticks.map((tick, index) => (
        <div
          key={index}
          className={`w-8 h-2 rounded ${
            tick === "good"
              ? "bg-green-500"
              : tick === "bad"
              ? "bg-red-500"
              : "bg-gray-500 dark:bg-gray-400"
          }`}
        />
      ))}
    </div>
  );
}

function WebsiteCard({ website }: { website: ProcessedWebsite }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
      <div
        className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4">
          <StatusCircle status={website.status} />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {website.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {website.url}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {website.uptimePercentage.toFixed(1)}% uptime
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400 dark:text-gray-300" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-300" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700">
          <div className="mt-3">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Last 30 minutes status:
            </p>
            <UptimeTicks ticks={website.uptimeTicks} />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Last checked: {website.lastChecked}
          </p>
        </div>
      )}
    </div>
  );
}

function CreateWebsiteModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newWebsite: { url: string }) => void;
}) {
  const [url, setUrl] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Add New Website
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            URL
          </label>
          <input
            type="url"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => {
              if (!url.trim()) return;
              onSubmit({ url: url.trim() });
              setUrl("");
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Add Website
          </button>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  textColor: string;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  textColor,
  bgColor,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-full ${bgColor}`}>{icon}</div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [websitesRaw, setWebsitesRaw] = useState<WebsiteRaw[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | "good" | "bad">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { getToken, isSignedIn } = useAuth();
  const router = useRouter();

  // ✅ Redirect if not signed in
  useEffect(() => {
    if (isSignedIn === false) {
      router.push("/pages/authPage");
    }
  }, [isSignedIn, router]);

  useEffect(() => {
    async function fetchWebsites() {
      try {
        const token = await getToken();
        const response = await axios.get(`${API_URL}/websites`, {
          headers: { Authorization: token },
        });
        setWebsitesRaw(response.data.websites);
      } catch (err) {
        console.error("Failed to fetch websites", err);
      }
    }
    if (isSignedIn) {
      fetchWebsites();
    }
  }, [getToken, isSignedIn]);

  const processedWebsites: ProcessedWebsite[] = useMemo(() => {
    return websitesRaw.map((website) => {
      const sortedTicks = [...website.ticks].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      const recentTicks = sortedTicks.filter(
        (tick) => new Date(tick.createdAt) > thirtyMinutesAgo
      );

      const windows: UptimeStatus[] = [];

      for (let i = 0; i < 10; i++) {
        const windowStart = new Date(Date.now() - (i + 1) * 3 * 60 * 1000);
        const windowEnd = new Date(Date.now() - i * 3 * 60 * 1000);

        const windowTicks = recentTicks.filter((tick) => {
          const tickTime = new Date(tick.createdAt);
          return tickTime >= windowStart && tickTime < windowEnd;
        });

        const upTicks = windowTicks.filter((tick) => tick.status === "Good").length;
        windows[9 - i] =
          windowTicks.length === 0
            ? "unknown"
            : upTicks / windowTicks.length >= 0.5
            ? "good"
            : "bad";
      }

      const totalTicks = sortedTicks.length;
      const upTicksTotal = sortedTicks.filter((tick) => tick.status === "Good").length;
      const uptimePercentage = totalTicks === 0 ? 100 : (upTicksTotal / totalTicks) * 100;

      const currentStatus = windows[windows.length - 1];
      const lastChecked = sortedTicks[0]
        ? new Date(sortedTicks[0].createdAt).toLocaleTimeString()
        : "Never";

      return {
        id: website.id,
        name: website.name,
        url: website.url,
        status: currentStatus,
        uptimePercentage,
        lastChecked,
        uptimeTicks: windows,
      };
    });
  }, [websitesRaw]);

  const filteredWebsites = useMemo(() => {
    return processedWebsites.filter((w) => {
      if (statusFilter !== "all" && w.status !== statusFilter) return false;
      if (
        searchQuery &&
        !w.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !w.url.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    });
  }, [processedWebsites, statusFilter, searchQuery]);

  const total = processedWebsites.length;
  const upCount = processedWebsites.filter((w) => w.status === "good").length;
  const downCount = processedWebsites.filter((w) => w.status === "bad").length;

  async function handleAddWebsite({ url }: { url: string }) {
    try {
      const token = await getToken();
      await axios.post(
        `${API_URL}/website`,
        { url },
        { headers: { Authorization: token } }
      );
      setIsCreateModalOpen(false);
      const response = await axios.get(`${API_URL}/websites`, {
        headers: { Authorization: token },
      });
      setWebsitesRaw(response.data.websites);
    } catch (err) {
      console.error("Failed to add website", err);
      alert("Failed to add website. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Monitoring Dashboard
        </h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          aria-label="Add Website"
          className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Plus size={20} />
        </button>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Websites"
          value={total}
          icon={<Globe size={24} className="text-blue-600" />}
          textColor="text-gray-900 dark:text-gray-100"
          bgColor="bg-blue-100"
        />
        <StatCard
          title="Up"
          value={upCount}
          icon={<ArrowUp size={24} className="text-green-600" />}
          textColor="text-green-700"
          bgColor="bg-green-100"
        />
        <StatCard
          title="Down"
          value={downCount}
          icon={<ArrowDown size={24} className="text-red-600" />}
          textColor="text-red-700"
          bgColor="bg-red-100"
        />
      </section>

      <section className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex space-x-2">
          {(["all", "good", "bad"] as const).map((filter) => (
            <button
              key={filter}
              className={`px-3 py-1 rounded ${
                statusFilter === filter
                  ? filter === "good"
                    ? "bg-green-600 text-white"
                    : filter === "bad"
                    ? "bg-red-600 text-white"
                    : "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setStatusFilter(filter)}
            >
              {filter === "all" ? "All" : filter === "good" ? "Up" : "Down"}
            </button>
          ))}
        </div>
        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden bg-white dark:bg-gray-800">
          <input
            type="text"
            placeholder="Search websites"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 focus:outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <Search className="mr-2 text-gray-400 dark:text-gray-500" size={18} />
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWebsites.length > 0 ? (
          filteredWebsites.map((website) => (
            <WebsiteCard key={website.id} website={website} />
          ))
        ) : (
          <p className="text-gray-700 dark:text-gray-300 col-span-full text-center">
            No websites found.
          </p>
        )}
      </section>

      <CreateWebsiteModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleAddWebsite}
      />
    </main>
  );
};

export default Dashboard;
