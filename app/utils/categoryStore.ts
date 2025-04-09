import storage from './storage';

const CATEGORY_KEY = 'categories';

export const getCategories = async (): Promise<string[]> => {
  const categoriesString = await storage.getItem(CATEGORY_KEY);
  return categoriesString ? JSON.parse(categoriesString) : [];
};

export const addCategory = async (category: string) => {
  const categories = await getCategories();
  if (!categories.includes(category)) {
    categories.push(category);
    await storage.setItem(CATEGORY_KEY, JSON.stringify(categories));
  }
};

export const deleteCategory = async (category: string) => {
  const categories = await getCategories();
  const filtered = categories.filter(c => c !== category);
  await storage.setItem(CATEGORY_KEY, JSON.stringify(filtered));
};
