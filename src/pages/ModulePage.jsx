import { useEffect, useMemo, useState } from "react";
import { Download, Filter, Plus } from "lucide-react";
import PageShell from "./PageShell";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Table from "../components/ui/Table";
import StatCard from "../components/common/StatCard";
import EmptyState from "../components/common/EmptyState";

export default function ModulePage({ title, description, service, loader = "getAll", columns, stats = [], actionLabel = "Create", filterKey, children, canCreate = true, rowActions, extraFilters, filterFn, searchPlaceholder }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function loadData() {
      try {
        setError("");
        const data = await service[loader]();
        setRows(data);
      } catch {
        setError("Unable to load data.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [loader, service]);

  async function handleCreate() {
    if (service.create) {
      try {
        setError("");
        const item = await service.create({ name: "Draft record", status: "Pending" });
        setRows((current) => [item, ...current]);
      } catch (apiError) {
        setError(apiError.message || "Unable to create record.");
      }
    }
  }

  const filterOptions = useMemo(() => ["All", ...new Set(rows.map((row) => row[filterKey]).filter(Boolean))], [rows, filterKey]);
  const visibleRows = useMemo(() => rows.filter((row) => {
    const matchesSearch = Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || row[filterKey] === filter;
    const matchesCustom = filterFn ? filterFn(row, { search, filter }) : true;
    return matchesSearch && matchesFilter && matchesCustom;
  }), [rows, search, filter, filterKey, filterFn]);

  return (
    <PageShell>
      <PageHeader title={title} description={description} actions={<><Button variant="secondary" icon={Download}>Export</Button>{canCreate ? <Button icon={Plus} onClick={handleCreate}>{actionLabel}</Button> : null}</>} />
      {stats.length ? <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <StatCard key={stat.label} {...stat} />)}</div> : null}
      {children}
      <Card hover={false}>
        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_220px_auto]">
          <Input placeholder={searchPlaceholder || `Search ${title.toLowerCase()}...`} value={search} onChange={(event) => setSearch(event.target.value)} />
          <Select value={filter} onChange={(event) => setFilter(event.target.value)} options={filterOptions} />
          <Button variant="secondary" icon={Filter}>Filters</Button>
        </div>
        {extraFilters ? <div className="mb-4">{extraFilters({ search, setSearch, filter, setFilter, rows, visibleRows })}</div> : null}
        {loading ? <p className="py-10 text-center text-sm text-text-secondary">Loading {title.toLowerCase()}...</p> : null}
        {error ? <EmptyState title="Something went wrong" message={error} /> : null}
        {!loading && !error && visibleRows.length ? <Table columns={columns} rows={visibleRows} actions={rowActions ? (row) => rowActions(row, setRows, setError) : null} /> : null}
        {!loading && !error && !visibleRows.length ? <EmptyState /> : null}
      </Card>
    </PageShell>
  );
}
