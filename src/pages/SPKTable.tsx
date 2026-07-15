// Komponen Tabel Reusable
export const SPKTable = ({ headers, data }: any) => (
  <table className="w-full text-sm">
    <thead className="bg-gray-100">
      <tr>{headers.map((h: string) => <th className="p-3">{h}</th>)}</tr>
    </thead>
    <tbody>
      {data.map((row: any) => (
        <tr className="border-b">{Object.values(row).map((val: any) => <td className="p-3 text-center">{val}</td>)}</tr>
      ))}
    </tbody>
  </table>
);