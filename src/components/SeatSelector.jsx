export default function SeatSelector({ selected, setSelected }) {
  const seats = Array.from({ length: 20 }, (_, i) => i + 1);
  function toggleSeat(num) {
    setSelected(selected.includes(num)
      ? selected.filter((s) => s !== num)
      : [...selected, num]);
  }

  return (
    <div className="grid grid-cols-5 gap-2">
      {seats.map((n) => (
        <button
          key={n}
          onClick={() => toggleSeat(n)}
          className={`p-2 rounded text-center border
            ${selected.includes(n)
              ? "bg-green-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"}`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}
