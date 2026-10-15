// components/Kontak.tsx
export default function Kontak() {
  return (
    <form className="flex max-w-md flex-col gap-4">
      <div>
        <label
          htmlFor="nama"
          className="block text-sm font-medium text-gray-700"
        >
          Nama
        </label>
        <input
          id="nama"
          name="nama"
          type="text"
          placeholder="Nama Anda"
          className="mt-1 w-full rounded border p-2"
          required
        />
      </div>
      <div>
        <label
          htmlFor="pesan"
          className="block text-sm font-medium text-gray-700"
        >
          Pesan
        </label>
        <textarea
          id="pesan"
          name="pesan"
          rows={4}
          placeholder="Tulis pesan Anda..."
          className="mt-1 w-full rounded border p-2"
          required
        />
      </div>
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Kirim Pesan
      </button>
    </form>
  );
}
