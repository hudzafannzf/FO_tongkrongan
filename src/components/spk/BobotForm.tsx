const SliderInput = ({ label, val, onChange }: any) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm font-medium">
      <span>{label}</span>
      <span>{val}%</span>
    </div>
    <input 
      type="range" min="0" max="100" value={val} 
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    />
  </div>
);