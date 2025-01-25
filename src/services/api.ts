import axios from 'axios';
import { Category } from '../types';

//const API_URL = 'http://localhost:8080/api';
const API_URL = '/api';

export const categoryApi = {
  getAllCategories: () => 
    axios.get<Category[]>(`${API_URL}/category/all`),

  createCategory: (name: string, parent?: string) =>
    axios.post(`${API_URL}/category`, { name, parent }),

  addChildCategory: (parentId: string, name: string) =>
    axios.post(`${API_URL}/category/${parentId}/child`, { name }),

  updateCategory: (id: string, data: { name?: string; parent?: string | null }) =>
    axios.put(`${API_URL}/category/${id}`, data),

  deleteCategory: (id: string) =>
    axios.delete(`${API_URL}/category/${id}`),

  getCategoryWithParentAndChildren: (id: string) =>
    axios.get(`${API_URL}/category/${id}/parent-children`),

  unlinkFromParent: (id: string) =>
    axios.put(`${API_URL}/category/${id}`, { parent: null }),

  searchCategories: (filters: {
    isRoot?: boolean;
    creationDateAfter?: string;
    creationDateBefore?: string;
  }) => {
    const query = new URLSearchParams();
    if (filters.isRoot !== undefined) {
      query.set('isRoot', filters.isRoot ? 'true' : 'false');
    }
    if (filters.creationDateAfter) {
      query.set('creationDateAfter', filters.creationDateAfter);
    }
    if (filters.creationDateBefore) {
      query.set('creationDateBefore', filters.creationDateBefore);
    }

    return axios.get<Category[]>(
      `${API_URL}/category/search?` + query.toString()
    );
  },

  // ================================
  // E_CAT_70: Get categories sorted
  //   - sortBy = name | creationDate | childrenCount
  //   - order  = asc (default) | desc
  // ================================
  getCategoriesSorted: (sortBy: string, order: 'asc' | 'desc' = 'asc') => {
    return axios.get<Category[]>(
      `${API_URL}/category/sorted?sortBy=${sortBy}&order=${order}`
    );
  },
};