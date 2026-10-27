import Badge from "./Badge";

export default function Table({ columns = [], rows = [], actions }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border-light">
      <table className="min-w-full divide-y divide-border-light bg-white text-sm">
        <thead className="bg-background-soft">
          <tr>{columns.map((column) => <th key={column.key} className="whitespace-nowrap px-4 py-3 text-left font-semibold text-text-secondary">{column.label}</th>)}{actions ? <th className="px-4 py-3 text-right font-semibold text-text-secondary">Actions</th> : null}</tr>
        </thead>
        <tbody className="divide-y divide-border-light">
          {rows.map((row) => (
            <tr key={row.id} className="transition hover:bg-background-hover">
              {columns.map((column) => (
                <td key={column.key} className="whitespace-nowrap px-4 py-3 text-text-secondary">
                  {column.badge ? <Badge>{row[column.key]}</Badge> : column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
              {actions ? <td className="whitespace-nowrap px-4 py-3 text-right">{actions(row)}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
