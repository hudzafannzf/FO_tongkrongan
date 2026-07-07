import { useEffect, useState } from "react";
import tenantService from "../services/tenantService";
import type { Tenant } from "../types/tenant";

export default function useTenant() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTenant();
  }, []);

  const fetchTenant = async () => {
    try {
      const response = await tenantService.getAll();
      setTenants(response.data);
    } finally {
      setLoading(false);
    }
  };

  return {
    tenants,
    loading,
    refresh: fetchTenant,
  };
}