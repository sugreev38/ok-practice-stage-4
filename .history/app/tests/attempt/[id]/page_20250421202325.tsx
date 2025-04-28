"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

interface Test {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export default function TestAttemptPage({ params }: { params: { id: string } }) {
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await fetch(`/api/me/test/${params.id}`);
        const data = await res.json();

        if (!data.success) {
          toast.error(data.error || "Failed to load test");
          router.push("/dashboard"); // Or wherever you want to redirect
          return;
        }

        setTest(data.test);
      } catch (error) {
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [params.id, router]);

  if (loading) return <div className="p-6 text-center">Loading test...</div>;

  if (!test) return <div className="p-6 text-center text-red-500">Test not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{test.title}</h1>
      {test.description && <p className="mb-6 text-gray-600">{test.description}</p>}

      <div className="space-y-8">
        {test.questions.map((q, qIndex) => (
          <div key={q.id} className="border rounded-xl p-4 shadow-sm">
            <h2 className="font-semibold text-lg mb-3">
              Q{qIndex + 1}: {q.text}
            </h2>
            <ul className="space-y-2">
              {q.options.map((opt) => (
                <li key={opt.id}>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name={`question-${q.id}`} value={opt.id} />
                    <span>{opt.text}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={() => toast.info("Submit logic not implemented yet.")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
}
