

export default function termsLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <main className="w-full max-w-5xl bg-white p-4 rounded shadow-md">
            {children}
            </main>
      </div>
    );
  }
  