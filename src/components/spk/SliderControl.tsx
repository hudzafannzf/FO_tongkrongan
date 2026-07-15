interface Props {
  label: string;
  value: number;
  description: string;
  onChange: (val: number) => void;
}

export default function CriteriaSlider({ label, value, onChange }: any) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200">
      <div className="flex justify-between mb-2">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <span className="text-sm font-bold text-blue-600">{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </div>
  );
}