

export default function termsLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen flex items-center justify-center max-w-screen bg-gray-50">
        <main className="flex items-center max-w-full justify-center min-h-screen bg-gray-100">
            {children}
            </main>
      </div>
    );
  }
  