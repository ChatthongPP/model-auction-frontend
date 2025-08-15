import { useEffect, useState } from "react";
import { getCategories } from "@/services/categoryService";
import { Category as CategoryType } from "@/types/categoryTypes";

export function useCategory() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("getCategories fail", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading };
}
