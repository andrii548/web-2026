import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export async function getTrees(params = {}) {
  const queryParams = {};
  if (params.search && params.search.trim()) queryParams.search = params.search.trim();
  if (params.material && params.material !== 'all') queryParams.material = params.material;
  if (params.height && params.height !== 'all') queryParams.height = params.height;
  if (params.sort) queryParams.sort = params.sort;

  const response = await apiClient.get('/trees', { params: queryParams });
  return response.data;
}

export async function getTreeById(id) {
  const response = await apiClient.get(`/trees/${id}`);
  return response.data;
}

export async function getMaterials() {
  const response = await apiClient.get('/materials');
  return response.data;
}

export async function getTotalPrice(search = '') {
  const response = await apiClient.get('/trees/total', {
    params: search ? { search } : {},
  });
  return response.data;
}

export async function createTree(treeData) {
  const response = await apiClient.post('/trees', treeData);
  return response.data;
}

export async function updateTree(id, treeData) {
  const response = await apiClient.put(`/trees/${id}`, treeData);
  return response.data;
}

export async function deleteTree(id) {
  const response = await apiClient.delete(`/trees/${id}`);
  return response.data;
}

const treesApi = {
  getTrees,
  getTreeById,
  getMaterials,
  getTotalPrice,
  createTree,
  updateTree,
  deleteTree,
};

export default treesApi;
