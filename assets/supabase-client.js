(function() {
  const SUPABASE_URL = "https://fwlzysudduroyndkiewa.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3bHp5c3VkZHVyb3luZGtpZXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4ODMwMDEsImV4cCI6MjEwMDQ1OTAwMX0.Cv0Ns_gslFFSe90_lu1YBqo9aEcHaUbmnsI43TDZ_oo";

  // In-memory cache for instant synchronous reading across device sessions
  const cache = {};
  window.__vf_supabase_cache = cache;

  // Supabase REST API Client
  const supabaseApi = {
    async get(key) {
      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/vf_kv_store?key=eq.${encodeURIComponent(key)}&select=value`, {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data && data.length > 0 ? data[0].value : null;
      } catch (e) {
        console.error('Supabase fetch error:', e);
        return null;
      }
    },
    async set(key, value) {
      try {
        // Master Key-Value table sync
        fetch(`${SUPABASE_URL}/rest/v1/vf_kv_store`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify({
            key: key,
            value: value,
            updated_at: new Date().toISOString()
          })
        }).catch(() => {});

        // Dual-write to dedicated Costing Sheet tables if matching costing key
        let table = null;
        if (key === 'costing-products-v4') table = 'vf_costing_products';
        else if (key === 'costing-tfo-products-v1') table = 'vf_costing_tfo_products';
        else if (key === 'costing-doubler-products-v1') table = 'vf_costing_doubler_products';
        else if (key === 'costing-covering-products-v1') table = 'vf_costing_covering_products';

        if (table && Array.isArray(value)) {
          value.forEach(item => {
            if (item && item.id) {
              fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
                method: 'POST',
                headers: {
                  'apikey': SUPABASE_ANON_KEY,
                  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                  'Content-Type': 'application/json',
                  'Prefer': 'resolution=merge-duplicates'
                },
                body: JSON.stringify({
                  id: String(item.id),
                  data: item,
                  updated_at: new Date().toISOString()
                })
              }).catch(() => {});
            }
          });
        }
        return true;
      } catch (e) {
        console.error('Supabase set error:', e);
        return false;
      }
    },
    async delete(key) {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/vf_kv_store?key=eq.${encodeURIComponent(key)}`, {
          method: 'DELETE',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
      } catch(e) {}
    },
    async clearAll() {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/vf_kv_store?key=neq.null`, {
          method: 'DELETE',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
        const tables = ['vf_costing_products', 'vf_costing_tfo_products', 'vf_costing_doubler_products', 'vf_costing_covering_products'];
        for (const t of tables) {
          fetch(`${SUPABASE_URL}/rest/v1/${t}?id=neq.null`, {
            method: 'DELETE',
            headers: {
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
          }).catch(() => {});
        }
      } catch(e) {}
    },
    async loadAll() {
      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/vf_kv_store?select=key,value`, {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
        if (res.ok) {
          const rows = await res.json();
          rows.forEach(row => {
            try {
              const strValue = typeof row.value === 'string' ? row.value : JSON.stringify(row.value);
              cache[row.key] = strValue;
              // Mirror into browser native storage so non-intercepted reads also match
              try { window.localStorage.setItem(row.key, strValue); } catch(e) {}
            } catch (e) {
              cache[row.key] = String(row.value);
            }
          });
        }
      } catch (e) {
        console.error('Supabase loadAll failed:', e);
      }
    }
  };

  // Sync cache with native storage on load
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      cache[k] = window.localStorage.getItem(k);
    }
  } catch(e) {}

  // Fetch full cloud dataset from Supabase immediately
  supabaseApi.loadAll().then(() => {
    console.log("Vishwa Fashions — Cloud Supabase sync active across all devices.");
  });

  // Polling every 3 seconds to keep all open devices strictly in sync
  setInterval(() => {
    supabaseApi.loadAll();
  }, 3000);

  // Override localStorage calls strictly
  const nativeLocalStorage = window.localStorage;

  const supabaseLocalStorage = {
    getItem: function(key) {
      if (cache.hasOwnProperty(key)) {
        return cache[key];
      }
      return nativeLocalStorage.getItem(key);
    },
    setItem: function(key, value) {
      const valStr = String(value);
      cache[key] = valStr;
      try { nativeLocalStorage.setItem(key, valStr); } catch(e) {}

      let parsedVal = valStr;
      try {
        if ((valStr.startsWith('{') && valStr.endsWith('}')) || (valStr.startsWith('[') && valStr.endsWith(']'))) {
          parsedVal = JSON.parse(valStr);
        }
      } catch(e) {}

      supabaseApi.set(key, parsedVal);
    },
    removeItem: function(key) {
      delete cache[key];
      try { nativeLocalStorage.removeItem(key); } catch(e) {}
      supabaseApi.delete(key);
    },
    clear: function() {
      Object.keys(cache).forEach(k => delete cache[k]);
      try { nativeLocalStorage.clear(); } catch(e) {}
      supabaseApi.clearAll();
    },
    key: function(index) {
      return Object.keys(cache)[index] || nativeLocalStorage.key(index);
    },
    get length() {
      return Object.keys(cache).length;
    }
  };

  window.VishwaSupabase = supabaseApi;

  try {
    Object.defineProperty(window, 'localStorage', {
      value: supabaseLocalStorage,
      writable: true,
      configurable: true
    });
  } catch(e) {
    window.localStorage = supabaseLocalStorage;
  }
})();
