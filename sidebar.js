(function() {
  // 1. Get rootPath from script tag src attribute to handle subdirectories
  const scriptTag = document.querySelector('script[src$="sidebar.js"]');
  const src = scriptTag ? scriptTag.getAttribute('src') : 'sidebar.js';
  const rootPath = src.substring(0, src.length - 'sidebar.js'.length);

  // Auto-inject Supabase adapter if not present
  if (!window.VishwaSupabase) {
    const sbScript = document.createElement('script');
    sbScript.src = rootPath + 'assets/supabase-client.js';
    document.head.appendChild(sbScript);
  }

  // Initialization
  if (window.VishwaSupabase && typeof window.VishwaSupabase.loadAll === 'function') {
    window.VishwaSupabase.loadAll();
  }

  // 2. HTML template for sidebar
  const sidebarHtml = `
<aside class="vf-sidebar" id="vfSidebar">
  <div class="vf-sb-header">
    <a class="vf-sb-brand" href="#"><span class="brand-full">Vishwa Fashions</span><span class="brand-mini">VF</span></a>
    <span class="vf-sb-subtitle">Management Suite</span>
    <div class="vf-sb-user-badge" id="vfSbUserBadge">
      <div class="vf-sb-user-avatar" id="vfSbUserAvatar">U</div>
      <div class="vf-sb-user-info">
        <span class="vf-sb-user-name" id="vfSbUserName">Operator</span>
        <span class="vf-sb-user-role">Logged In</span>
      </div>
    </div>
    <div class="vf-sb-fy-wrapper" style="margin-top: 0.75rem; width: 100%;">
      <select id="vfSidebarFYSelect" style="width: 100%; padding: 0.5rem; border-radius: 8px; border: 1px solid var(--border); background: var(--surface); color: var(--fg); font-family: var(--font-body), sans-serif; font-size: 0.8rem; font-weight: 600; cursor: pointer; outline: none; transition: all 0.2s;">
        <!-- Dynamically populated -->
      </select>
    </div>
  </div>
  <nav class="vf-sb-nav">
    <div class="vf-sb-mode-selector">
      <button class="vf-sb-mode-btn" id="vfModeYarnBtn" onclick="_vfSetSidebarMode('yarn')">Yarn</button>
      <button class="vf-sb-mode-btn" id="vfModeWeavingBtn" onclick="_vfSetSidebarMode('weaving')">Weaving</button>
    </div>
    <span class="vf-sb-label" data-mode="common">Applications & Modules</span>
    <button class="vf-sb-folder" data-mode="weaving" aria-expanded="false" onclick="_vfToggleFolder(this)">
      <span class="vf-sb-icon vf-sb-icon-purple"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></span>
      RM Order Book
      <svg class="vf-sb-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
    <div class="vf-sb-accordion-wrapper" data-mode="weaving">
      <div class="vf-sb-accordion-inner" id="vf-mod-folder-0">
        <a class="vf-sb-link child" href="modules/weaving/order-book.html?view=orders">
          <span class="vf-sb-icon vf-sb-icon-purple vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></span>
          RM Orders
        </a>
        <a class="vf-sb-link child" href="modules/weaving/order-book.html?view=analytics">
          <span class="vf-sb-icon vf-sb-icon-purple vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></span>
          RM order analytics
        </a>
        <a class="vf-sb-link child" href="modules/weaving/order-book.html?view=heat-map">
          <span class="vf-sb-icon vf-sb-icon-purple vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></span>
          RM delivery heat map
        </a>
      </div>
    </div>
    <button class="vf-sb-folder" data-mode="weaving" aria-expanded="false" onclick="_vfToggleFolder(this)">
      <span class="vf-sb-icon vf-sb-icon-pink"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg></span>
      RM Weft Stock Book
      <svg class="vf-sb-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
    <div class="vf-sb-accordion-wrapper" data-mode="weaving">
      <div class="vf-sb-accordion-inner" id="vf-mod-folder-1">
        <a class="vf-sb-link child" href="modules/weaving/rm-weft-stock-book.html?tab=item-detail">
          <span class="vf-sb-icon vf-sb-icon-pink vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg></span>
          Stock Register
        </a>
        <a class="vf-sb-link child" href="modules/weaving/rm-weft-stock-book.html?tab=item-ledger-v2">
          <span class="vf-sb-icon vf-sb-icon-pink vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg></span>
          Item-wise Ledger v2
        </a>
        <a class="vf-sb-link child" href="modules/weaving/rm-weft-stock-book.html?tab=challan-history">
          <span class="vf-sb-icon vf-sb-icon-pink vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg></span>
          Challan Register
        </a>
        <a class="vf-sb-link child" href="modules/weaving/rm-weft-stock-book.html?tab=low-stock">
          <span class="vf-sb-icon vf-sb-icon-pink vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg></span>
          Low Stock Alerts
        </a>
        <a class="vf-sb-link child" href="modules/weaving/rm-weft-stock-book.html?tab=log">
          <span class="vf-sb-icon vf-sb-icon-pink vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg></span>
          Transaction Log
        </a>
      </div>
    </div>
    <button class="vf-sb-folder" data-mode="weaving" aria-expanded="false" onclick="_vfToggleFolder(this)">
      <span class="vf-sb-icon vf-sb-icon-pink"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></span>
      RM Warp Stock Book
      <svg class="vf-sb-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
    <div class="vf-sb-accordion-wrapper" data-mode="weaving">
      <div class="vf-sb-accordion-inner" id="vf-mod-folder-2">
        <a class="vf-sb-link child" href="modules/weaving/rm-warp-stock-book.html?tab=ledger">
          <span class="vf-sb-icon vf-sb-icon-pink vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></span>
          Warp yarn stock
        </a>
        <a class="vf-sb-link child" href="modules/weaving/rm-warp-stock-book.html?tab=dashboard">
          <span class="vf-sb-icon vf-sb-icon-pink vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></span>
          Beams overview
        </a>
        <a class="vf-sb-link child" href="modules/weaving/rm-warp-stock-book.html?tab=tracker">
          <span class="vf-sb-icon vf-sb-icon-pink vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></span>
          Beam tracker
        </a>
      </div>
    </div>
    <button class="vf-sb-folder" data-mode="common" aria-expanded="false" onclick="_vfToggleFolder(this)">
      <span class="vf-sb-icon vf-sb-icon-green"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></span>
      Costing Sheet
      <svg class="vf-sb-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
    <div class="vf-sb-accordion-wrapper" data-mode="common">
      <div class="vf-sb-accordion-inner" id="vf-mod-folder-3">
        <a class="vf-sb-link child" data-mode="weaving" href="modules/weaving/weaving-costing.html?tab=fabric">
          <span class="vf-sb-icon vf-sb-icon-green vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></span>
          Fabric Costing Calculator
        </a>
        <a class="vf-sb-link child" data-mode="weaving" href="modules/weaving/weaving-costing.html?tab=compare-weaving">
          <span class="vf-sb-icon vf-sb-icon-green vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg></span>
          Compare Costing (Weaving)
        </a>
        <a class="vf-sb-link child" data-mode="yarn" href="modules/yarn/yarn-costing.html?tab=tfo">
          <span class="vf-sb-icon vf-sb-icon-green vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></span>
          TFO Costing Calculator
        </a>
        <a class="vf-sb-link child" data-mode="yarn" href="modules/yarn/yarn-costing.html?tab=doubler">
          <span class="vf-sb-icon vf-sb-icon-green vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></span>
          Doubler Costing Calculator
        </a>
        <a class="vf-sb-link child" data-mode="yarn" href="modules/yarn/yarn-costing.html?tab=covering">
          <span class="vf-sb-icon vf-sb-icon-green vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></span>
          Covering Costing Calculator
        </a>
        <a class="vf-sb-link child" data-mode="yarn" href="modules/yarn/yarn-costing.html?tab=compare-yarn">
          <span class="vf-sb-icon vf-sb-icon-green vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg></span>
          Compare Costing (Yarn)
        </a>
      </div>
    </div>
    <!-- Yarn Production, Sales & Stock Dashboard Links -->
    <a class="vf-sb-link" data-mode="yarn" href="modules/yarn/yarn-production.html?tab=production">
      <span class="vf-sb-icon vf-sb-icon-blue"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>
      Yarn Production
    </a>
    <a class="vf-sb-link" data-mode="yarn" href="modules/yarn/yarn-sales.html?tab=sales">
      <span class="vf-sb-icon vf-sb-icon-blue"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg></span>
      Yarn Sales
    </a>
    <a class="vf-sb-link" data-mode="yarn" href="modules/yarn/yarn-stock-dashboard.html?tab=stock-dashboard">
      <span class="vf-sb-icon vf-sb-icon-purple"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></span>
      Stock Dashboard
    </a>

    <button class="vf-sb-folder" data-mode="weaving" aria-expanded="false" onclick="_vfToggleFolder(this)">
      <span class="vf-sb-icon vf-sb-icon-blue"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>
      Weaving Production
      <svg class="vf-sb-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
    <div class="vf-sb-accordion-wrapper" data-mode="weaving">
      <div class="vf-sb-accordion-inner" id="vf-mod-folder-4">
        <a class="vf-sb-link child" href="modules/weaving/weaving-production.html?tab=analytics">
          <span class="vf-sb-icon vf-sb-icon-blue vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>
          Production Analytics
        </a>
        <a class="vf-sb-link child" href="modules/weaving/weaving-production.html?tab=production">
          <span class="vf-sb-icon vf-sb-icon-blue vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>
          Daily Production
        </a>
        <a class="vf-sb-link child" href="modules/weaving/weaving-production.html?tab=production-stock">
          <span class="vf-sb-icon vf-sb-icon-blue vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>
          Fabric Stock
        </a>
      </div>
    </div>
    <button class="vf-sb-folder" data-mode="weaving" aria-expanded="false" onclick="_vfToggleFolder(this)">
      <span class="vf-sb-icon vf-sb-icon-blue"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></span>
      Dispatch Pipeline
      <svg class="vf-sb-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
    <div class="vf-sb-accordion-wrapper" data-mode="weaving">
      <div class="vf-sb-accordion-inner" id="vf-mod-folder-dispatch">
        <a class="vf-sb-link child" href="modules/weaving/dispatch.html">
          <span class="vf-sb-icon vf-sb-icon-blue vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></span>
          Dispatch Pipeline
        </a>
        <a class="vf-sb-link child" href="modules/weaving/dispatch.html?tab=Outsourced">
          <span class="vf-sb-icon vf-sb-icon-blue vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 8 8 12 12 16"/><line x1="16" y1="12" x2="8" y2="12"/></svg></span>
          Outsource
        </a>
        <a class="vf-sb-link child" href="modules/weaving/dispatch.html?tab=DispatchHistory">
          <span class="vf-sb-icon vf-sb-icon-blue vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg></span>
          Dispatch History
        </a>
      </div>
    </div>
    <button class="vf-sb-folder" data-mode="common" aria-expanded="false" onclick="_vfToggleFolder(this)">
      <span class="vf-sb-icon vf-sb-icon-green"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 010 7.75"/></svg></span>
      Salary Sheet
      <svg class="vf-sb-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
    <div class="vf-sb-accordion-wrapper" data-mode="common">
      <div class="vf-sb-accordion-inner" id="vf-mod-folder-5">
        <a class="vf-sb-link child" href="modules/salary-sheet.html?tab=dashboard-tab">
          <span class="vf-sb-icon vf-sb-icon-green vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 010 7.75"/></svg></span>
          Dashboard Overview
        </a>
        <a class="vf-sb-link child" href="modules/salary-sheet.html?tab=karigar-salary">
          <span class="vf-sb-icon vf-sb-icon-green vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 010 7.75"/></svg></span>
          Karigar Salary
        </a>
        <a class="vf-sb-link child" href="modules/salary-sheet.html?tab=beam-loading-tab">
          <span class="vf-sb-icon vf-sb-icon-green vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg></span>
          Beam Loading
        </a>
        <a class="vf-sb-link child" href="modules/salary-sheet.html?tab=tab-loans">
          <span class="vf-sb-icon vf-sb-icon-green vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
          Loans for Staff
        </a>
      </div>
    </div>

    <a class="vf-sb-link" data-mode="weaving" href="modules/weaving/design-library.html">
      <span class="vf-sb-icon vf-sb-icon-orange"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></span>
      Design Library
    </a>
    <button class="vf-sb-folder" id="btn-manage-folder-toggle" data-mode="common" aria-expanded="false" onclick="_vfToggleFolder(this)">
      <span class="vf-sb-icon vf-sb-icon-purple"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></span>
      Manage
      <svg class="vf-sb-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
    <div class="vf-sb-accordion-wrapper" data-mode="common">
      <div class="vf-sb-accordion-inner" id="vf-manage-folder">
        <button class="vf-sb-folder child" id="btn-machines-folder-toggle" aria-expanded="true" onclick="_vfToggleFolder(this)">
          <span class="vf-sb-icon vf-sb-icon-purple vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></span>
          Manage Machines
          <svg class="vf-sb-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="vf-sb-accordion-wrapper open">
          <div class="vf-sb-accordion-inner">
            <a class="vf-sb-link grandchild" href="modules/manage.html?tab=machines">
              <span class="vf-sb-icon vf-sb-icon-purple vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></span>
              Machines List
            </a>
            <a class="vf-sb-link grandchild" href="modules/manage.html?tab=looms">
              <span class="vf-sb-icon vf-sb-icon-purple vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></span>
              Manage Looms
            </a>
            <a class="vf-sb-link grandchild" href="modules/manage.html?tab=jacquards">
              <span class="vf-sb-icon vf-sb-icon-purple vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l-7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg></span>
              Manage Jacquards
            </a>
            <a class="vf-sb-link grandchild" href="modules/manage.html?tab=jalas">
              <span class="vf-sb-icon vf-sb-icon-purple vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
              Jala Details
            </a>
            <a class="vf-sb-link grandchild" href="modules/manage.html?tab=fanis">
              <span class="vf-sb-icon vf-sb-icon-purple vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg></span>
              Fani Details
            </a>
            <a class="vf-sb-link grandchild" href="modules/machine-parts.html">
              <span class="vf-sb-icon vf-sb-icon-purple vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></span>
              Machine Parts Stock
            </a>
          </div>
        </div>
        <a class="vf-sb-link child" href="modules/manage.html?tab=staff">
          <span class="vf-sb-icon vf-sb-icon-purple vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 010 7.75"/></svg></span>
          Manage Staff
        </a>
        <a class="vf-sb-link child" href="modules/manage.html?tab=raw-material-qualities">
          <span class="vf-sb-icon vf-sb-icon-purple vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l-7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg></span>
          Manage RM Qualities
        </a>
        <a class="vf-sb-link child" href="modules/manage.html?tab=raw-material-suppliers">
          <span class="vf-sb-icon vf-sb-icon-purple vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 010 7.75"/></svg></span>
          Manage RM Suppliers
        </a>
      </div>
    </div>
    <a class="vf-sb-link" data-mode="common" href="modules/settings.html">
      <span class="vf-sb-icon vf-sb-icon-blue"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg></span>
      Settings
    </a>
    <span class="vf-sb-label" data-mode="common" style="margin-top:0.5rem">Calculators & Tools</span>
    <a class="vf-sb-link" data-mode="weaving" href="modules/weaving/tools/ep-parser.html">
      <span class="vf-sb-icon vf-sb-icon-blue"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></span>
      EP Parser
    </a>
    <a class="vf-sb-link" data-mode="weaving" href="modules/weaving/tools/jacquard-castout-calculator.html">
      <span class="vf-sb-icon vf-sb-icon-green"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg></span>
      Jala and loom cast out calculator
    </a>
    <button class="vf-sb-folder" data-mode="common" aria-expanded="false" onclick="_vfToggleFolder(this)">
      <span class="vf-sb-icon vf-sb-icon-red"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg></span>
      Gear Charts
      <svg class="vf-sb-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
    <div class="vf-sb-accordion-wrapper" data-mode="common">
      <div class="vf-sb-accordion-inner" id="vf-gear-folder">
        <a class="vf-sb-link child" data-mode="yarn" href="modules/yarn/gear%20charts/NATIONAL%20TEXTILE%20JARI%20COVERING%20GEAR%20CALCULATOR.html">
          <span class="vf-sb-icon vf-sb-icon-red vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg></span>
          National Textile Jari
        </a>
        <a class="vf-sb-link child" data-mode="weaving" href="modules/weaving/gear%20charts/SHINKWANG%20GEAR%20COVERING%20GEAR%20CALCULATOR.html">
          <span class="vf-sb-icon vf-sb-icon-red vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg></span>
          Shinkwang Gear
        </a>
        <a class="vf-sb-link child" data-mode="yarn" href="modules/yarn/gear%20charts/DOUBLER%20GEAR%20CALCULATIONS.html">
          <span class="vf-sb-icon vf-sb-icon-red vf-sb-icon-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg></span>
          Doubler Gear Calculations
        </a>
      </div>
    </div>
  </nav>
  <div class="vf-sb-footer">
    <button class="vf-sb-collapse-btn" onclick="_vfToggleSidebarCollapse()" id="vfSidebarCollapseBtn">
      <svg class="vf-sb-collapse-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="11 17 6 12 11 7"></polyline>
        <polyline points="18 17 13 12 18 7"></polyline>
      </svg>
      <span class="vf-sb-collapse-text">Collapse Sidebar</span>
    </button>
  </div>
</aside>
<button class="vf-sb-toggle" id="vfSbToggle" aria-label="Toggle navigation"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
<div class="vf-sb-overlay" id="vfSbOverlay"></div>
  `;

  // 3. Inject the sidebar HTML
  function injectSidebar() {
    // If the sidebar is already present, remove it to avoid duplicates
    const existingSidebar = document.getElementById('vfSidebar');
    if (existingSidebar) existingSidebar.remove();
    const existingToggle = document.getElementById('vfSbToggle');
    if (existingToggle) existingToggle.remove();
    const existingOverlay = document.getElementById('vfSbOverlay');
    if (existingOverlay) existingOverlay.remove();

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sidebarHtml;

    // Resolve all relative paths before inserting
    tempDiv.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('https') && !href.startsWith('#') && !href.startsWith('javascript:')) {
        a.setAttribute('href', rootPath + href);
      }
    });

    // Move elements to document.body
    while (tempDiv.firstChild) {
      document.body.insertBefore(tempDiv.firstChild, document.body.firstChild);
    }

    // Initialize sidebar logic, event listeners, active states
    initSidebarLogic();
  }

  // 6. Global helper functions accessed by inline onclicks
  window._vfToggleFolder = function(btn) {
    if (document.documentElement.classList.contains('vf-sidebar-collapsed') && window.innerWidth > 768) {
      window._vfToggleSidebarCollapse();
      return;
    }
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    const wrapper = btn.nextElementSibling;
    if (wrapper) {
      wrapper.classList.toggle('open', !expanded);
      // Persist using the inner div's ID as key
      const inner = wrapper.querySelector('.vf-sb-accordion-inner[id]');
      if (inner && inner.id) {
        const openFolders = JSON.parse(localStorage.getItem('vf_sidebar_open_folders') || '{}');
        openFolders[inner.id] = !expanded;
        localStorage.setItem('vf_sidebar_open_folders', JSON.stringify(openFolders));
      }
    }
  };

  window._vfSetSidebarMode = function(mode) {
    localStorage.setItem('vishwa_fashions_sidebar_mode', mode);
    const yarnBtn = document.getElementById('vfModeYarnBtn');
    const weavingBtn = document.getElementById('vfModeWeavingBtn');
    if (yarnBtn && weavingBtn) {
      if (mode === 'yarn') {
        yarnBtn.classList.add('active');
        weavingBtn.classList.remove('active');
      } else {
        weavingBtn.classList.add('active');
        yarnBtn.classList.remove('active');
      }
    }
    const items = document.querySelectorAll('#vfSidebar [data-mode]');
    items.forEach(function(item) {
      const itemMode = item.getAttribute('data-mode');
      if (itemMode === 'common') {
        item.style.display = '';
      } else if (itemMode === mode) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  };

  window._vfToggleSidebarCollapse = function() {
    const html = document.documentElement;
    const isCollapsed = html.classList.toggle('vf-sidebar-collapsed');
    localStorage.setItem('vf_sidebar_collapsed', isCollapsed ? 'true' : 'false');
    _vfUpdateSidebarCollapseBtn(isCollapsed);
  };

  function _vfUpdateSidebarCollapseBtn(isCollapsed) {
    const btn = document.getElementById('vfSidebarCollapseBtn');
    if (!btn) return;
    btn.setAttribute('title', isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar');
    const icon = btn.querySelector('.vf-sb-collapse-icon');
    if (icon) {
      if (isCollapsed) {
        icon.innerHTML = '<polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline>';
      } else {
        icon.innerHTML = '<polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline>';
      }
    }
  }

  function getFinancialYearForDate(dateStr) {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
    const year = date.getFullYear();
    const month = date.getMonth();
    if (month >= 3) {
      return `${year}-${(year + 1).toString().slice(-2)}`;
    } else {
      return `${year - 1}-${year.toString().slice(-2)}`;
    }
  }

  function updateSidebarIdentity() {
    const savedUser = localStorage.getItem('vf_user_name');
    const userNameEl = document.getElementById('vfSbUserName');
    const userAvatarEl = document.getElementById('vfSbUserAvatar');
    if (userNameEl) {
      userNameEl.textContent = savedUser || 'Operator';
      if (userAvatarEl) {
        userAvatarEl.textContent = (savedUser || 'O').charAt(0).toUpperCase();
      }
    }

    let savedCompany = localStorage.getItem('vf_company_name');
    if (!savedCompany) {
      try {
        const settingsRaw = localStorage.getItem('vishwa_fashions_settings');
        if (settingsRaw) {
          const settings = JSON.parse(settingsRaw);
          if (settings && settings.sellerName && settings.sellerName.trim()) {
            savedCompany = settings.sellerName.trim();
          }
        }
      } catch (e) {}
    }
    const brandFullEl = document.querySelector('.vf-sb-brand .brand-full');
    const brandMiniEl = document.querySelector('.vf-sb-brand .brand-mini');
    if (savedCompany) {
      if (brandFullEl) brandFullEl.textContent = savedCompany;
      if (brandMiniEl) {
        const initials = savedCompany.split(' ').filter(Boolean).map(w => w.charAt(0)).join('').toUpperCase().slice(0, 3);
        brandMiniEl.textContent = initials || 'VF';
      }
    } else {
      if (brandFullEl) brandFullEl.textContent = 'Vishwa Fashions';
      if (brandMiniEl) brandMiniEl.textContent = 'VF';
    }
  }

  // Listen to storage changes and page focus to keep identity updated live
  window.addEventListener('storage', updateSidebarIdentity);
  window.addEventListener('focus', updateSidebarIdentity);

  function initSidebarLogic() {
    // Populate User Name and Company Name from localStorage
    updateSidebarIdentity();

    // Populate Financial Year Selector
    const select = document.getElementById('vfSidebarFYSelect');
    if (select) {
      const years = new Set();
      const currentFY = getFinancialYearForDate(new Date().toISOString().slice(0, 10));
      if (currentFY) years.add(currentFY);
      
      try {
        const orders = JSON.parse(localStorage.getItem('yarn-orders') || '[]');
        orders.forEach(o => {
          if (o.orderDate) {
            const fy = getFinancialYearForDate(o.orderDate);
            if (fy) years.add(fy);
          }
          (o.batches || []).forEach(b => {
            if (b.receiveDate) {
              const fy = getFinancialYearForDate(b.receiveDate);
              if (fy) years.add(fy);
            }
          });
        });
      } catch(e) { console.warn('Error parsing yarn-orders for FY:', e); }
      
      try {
        const issues = JSON.parse(localStorage.getItem('yarn-issues') || '[]');
        issues.forEach(i => {
          if (i.date) {
            const fy = getFinancialYearForDate(i.date);
            if (fy) years.add(fy);
          }
        });
      } catch(e) { console.warn('Error parsing yarn-issues for FY:', e); }
      
      try {
        const warpIssues = JSON.parse(localStorage.getItem('warp-issues') || '[]');
        warpIssues.forEach(i => {
          if (i.date) {
            const fy = getFinancialYearForDate(i.date);
            if (fy) years.add(fy);
          }
        });
      } catch(e) { console.warn('Error parsing warp-issues for FY:', e); }

      const sortedYears = Array.from(years).sort().reverse();
      select.innerHTML = '<option value="All">All Years</option>' + 
        sortedYears.map(fy => `<option value="${fy}">FY ${fy}</option>`).join('');
      
      const defaultFY = currentFY || 'All';
      select.value = defaultFY;
      localStorage.setItem('vishwa_fashions_selected_fy', defaultFY);
      
      // Dispatch immediately on load so pages pick up the default FY
      window.dispatchEvent(new CustomEvent('fyChanged', { detail: { fy: defaultFY } }));

      select.addEventListener('change', function() {
        localStorage.setItem('vishwa_fashions_selected_fy', select.value);
        window.dispatchEvent(new CustomEvent('fyChanged', { detail: { fy: select.value } }));
      });
    }

    // Mobile Sidebar controls
    const sidebar = document.getElementById('vfSidebar');
    const toggleBtn = document.getElementById('vfSbToggle');
    const overlay = document.getElementById('vfSbOverlay');
    if (toggleBtn && sidebar && overlay) {
      toggleBtn.addEventListener('click', function () {
        const isOpen = sidebar.classList.contains('open');
        sidebar.classList.toggle('open', !isOpen);
        overlay.style.display = isOpen ? 'none' : 'block';
        requestAnimationFrame(function () {
          overlay.classList.toggle('visible', !isOpen);
        });
      });
      
      overlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
        setTimeout(function () { overlay.style.display = 'none'; }, 250);
      });
    }

    // Set titles on links/folders for collapsed state tooltip
    document.querySelectorAll('.vf-sb-link, .vf-sb-folder').forEach(function(el) {
      let text = el.innerText || el.textContent;
      text = text.replace(/[\n\r]/g, '').trim();
      if (text && !el.getAttribute('title')) {
        el.setAttribute('title', text);
      }
    });

    // Initialize collapse toggle button state
    const isCollapsed = document.documentElement.classList.contains('vf-sidebar-collapsed');
    _vfUpdateSidebarCollapseBtn(isCollapsed);

    // Initialize Sidebar Mode
    let savedMode = localStorage.getItem('vishwa_fashions_sidebar_mode');
    if (!savedMode) {
      savedMode = 'weaving';
    }
    window._vfSetSidebarMode(savedMode);

    // Restore previously open folders
    const openFolders = JSON.parse(localStorage.getItem('vf_sidebar_open_folders') || '{}');
    Object.entries(openFolders).forEach(([id, isOpen]) => {
      const inner = document.getElementById(id);
      if (!inner) return;
      const wrapper = inner.parentElement; // the vf-sb-accordion-wrapper
      if (!wrapper) return;
      wrapper.classList.toggle('open', isOpen);
      const folderBtn = wrapper.previousElementSibling;
      if (folderBtn && folderBtn.classList.contains('vf-sb-folder')) {
        folderBtn.setAttribute('aria-expanded', String(isOpen));
      }
    });

    // Highlight active navigation link and open its folders
    highlightActiveLink();

    // Hook up transitions for page switches
    initLinkTransitionListeners();
  }

  function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentSearch = window.location.search;
    let bestMatch = null;
    let bestMatchScore = -1;

    document.querySelectorAll('.vf-sb-link').forEach(link => {
      const hrefAttr = link.getAttribute('href');
      if (!hrefAttr) return;
      
      const [hrefPath, hrefQuery] = hrefAttr.split('?');
      const linkPathName = hrefPath.split('/').pop();
      
      if (linkPathName === currentPath) {
        let score = 1;
        if (hrefQuery && currentSearch) {
          const currentParams = new URLSearchParams(currentSearch);
          const linkParams = new URLSearchParams(hrefQuery);
          const exactMatch = [...linkParams.entries()].every(([k, v]) => currentParams.get(k) === v);
          if (exactMatch) score = 3;
        } else if (!hrefQuery && !currentSearch) {
          score = 2;
        }
        if (score > bestMatchScore) {
          bestMatchScore = score;
          bestMatch = link;
        }
      }
    });

    if (bestMatch) {
      bestMatch.classList.add('active');
      let parent = bestMatch.parentElement;
      while (parent && parent.id !== 'vfSidebar') {
        if (parent.classList.contains('vf-sb-accordion-wrapper')) {
          parent.classList.add('open');
          const folderBtn = parent.previousElementSibling;
          if (folderBtn && folderBtn.classList.contains('vf-sb-folder')) {
            folderBtn.setAttribute('aria-expanded', 'true');
          }
        }
        parent = parent.parentElement;
      }
    }
  }

  // Intercept links to trigger loading transition before page unload
  function initLinkTransitionListeners() {
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a');
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href) return;
      
      if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:') || link.getAttribute('target') === '_blank') {
        return;
      }
      
      if (e.ctrlKey || e.shiftKey || e.metaKey || e.altKey) {
        return;
      }
      
      try {
        const linkUrl = new URL(link.href, window.location.href);
        if (linkUrl.origin !== window.location.origin) {
          return;
        }
        
        if (linkUrl.pathname === window.location.pathname && linkUrl.search === window.location.search && linkUrl.hash === window.location.hash) {
          return;
        }
        
        e.preventDefault();
        window.location.href = link.href;
      } catch (err) {}
    });
  }

  // Listen to bfcache restore
  window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
      document.body.classList.add('vf-loaded');
      document.documentElement.classList.add('vf-loaded');
    }
  });

  // Inject Bootstrap Icons & Premium Toast CSS
  (function injectToastResources() {
    if (!document.querySelector('link[href*="bootstrap-icons"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
      document.head.appendChild(link);
    }

    const toastStyle = document.createElement('style');
    toastStyle.innerHTML = `
      .toast-container {
        position: fixed;
        top: 25px;
        right: 25px;
        display: flex;
        flex-direction: column;
        gap: 18px;
        z-index: 999999;
      }
      .toast {
        position: relative;
        width: 420px;
        overflow: hidden;
        display: flex;
        align-items: center;
        gap: 18px;
        padding: 18px 22px;
        color: #fff !important;
        border-radius: 18px;
        backdrop-filter: blur(18px);
        animation: toastPopup .45s ease;
      }
      .toast::before {
        content: "";
        position: absolute;
        inset: -50%;
        background: radial-gradient(circle, rgba(255,255,255,.08), transparent 65%);
        animation: toastRotateGlow 8s linear infinite;
        pointer-events: none;
      }
      .toast.success {
        background: linear-gradient(135deg, #166534 0%, #15803d 50%, #16a34a 100%) !important;
        box-shadow: 0 15px 45px rgba(34,197,94,.35), inset 0 1px 0 rgba(255,255,255,.12) !important;
      }
      .toast.error {
        background: linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #dc2626 100%) !important;
        box-shadow: 0 15px 45px rgba(239,68,68,.35), inset 0 1px 0 rgba(255,255,255,.12) !important;
      }
      .toast.info {
        background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #3b82f6 100%) !important;
        box-shadow: 0 15px 45px rgba(59,130,246,.35), inset 0 1px 0 rgba(255,255,255,.12) !important;
      }
      .toast .icon {
        position: relative;
        z-index: 2;
        width: 58px;
        height: 58px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: rgba(255,255,255,.14) !important;
        border: 1px solid rgba(255,255,255,.18) !important;
        flex-shrink: 0;
      }
      .toast .icon i {
        font-size: 30px;
        color: #fff !important;
      }
      .toast .content {
        position: relative;
        z-index: 2;
        flex: 1;
      }
      .toast .content h4 {
        font-size: 18px !important;
        font-weight: 700 !important;
        margin: 0 0 6px 0 !important;
        color: #fff !important;
        line-height: 1.2 !important;
      }
      .toast .content p {
        opacity: .9 !important;
        font-size: 13px !important;
        color: #fff !important;
        margin: 0 !important;
        line-height: 1.4 !important;
      }
      .toast .close {
        position: relative;
        z-index: 2;
        width: 42px;
        height: 42px;
        display: grid;
        place-items: center;
        border-radius: 50%;
        cursor: pointer;
        transition: .3s;
        flex-shrink: 0;
      }
      .toast .close:hover {
        background: rgba(255,255,255,.12) !important;
        transform: rotate(90deg);
      }
      .toast .close i {
        font-size: 22px;
        color: #fff !important;
      }
      .toast .progress {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 5px;
        background: rgba(255,255,255,.18) !important;
      }
      .toast .progress::after {
        content: "";
        position: absolute;
        inset: 0;
        transform-origin: left;
        transform: scaleX(0);
        animation: toastFill 5s linear forwards;
      }
      .toast.success .progress::after {
        background: #d9ffe5 !important;
      }
      .toast.error .progress::after {
        background: #fecaca !important;
      }
      .toast.info .progress::after {
        background: #dbeafe !important;
      }
      @keyframes toastFill {
        to { transform: scaleX(1); }
      }
      @keyframes toastPopup {
        from {
          opacity: 0;
          transform: translateX(50px) scale(.9);
        }
        to {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      }
      @keyframes toastRotateGlow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .toast .confirm-btn {
        background: rgba(255, 255, 255, 0.2) !important;
        border: 1px solid rgba(255, 255, 255, 0.4) !important;
        padding: 6px 16px !important;
        border-radius: 8px !important;
        color: #fff !important;
        font-weight: 600 !important;
        cursor: pointer !important;
        font-size: 13px !important;
        transition: .2s !important;
      }
      .toast .confirm-btn:hover {
        background: rgba(255, 255, 255, 0.35) !important;
      }
      .toast .cancel-btn {
        background: transparent !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        padding: 6px 16px !important;
        border-radius: 8px !important;
        color: rgba(255, 255, 255, 0.8) !important;
        font-weight: 600 !important;
        cursor: pointer !important;
        font-size: 13px !important;
        transition: .2s !important;
      }
      .toast .cancel-btn:hover {
        background: rgba(255, 255, 255, 0.1) !important;
        color: #fff !important;
      }
    `;
    document.head.appendChild(toastStyle);
  })();
  window.showToast = function(message, type = 'info', title = '') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    let defaultTitle = 'Notification';
    let iconClass = 'bi bi-info-circle-fill';
    if (type === 'success') {
      defaultTitle = 'Congratulations';
      iconClass = 'bi bi-check-circle-fill';
    } else if (type === 'error') {
      defaultTitle = 'Action Failed';
      iconClass = 'bi bi-x-circle-fill';
    }

    const displayTitle = title || defaultTitle;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="icon">
        <i class="${iconClass}"></i>
      </div>
      <div class="content">
        <h4>${displayTitle}</h4>
        <p>${message}</p>
      </div>
      <div class="close">
        <i class="bi bi-x-lg"></i>
      </div>
      <div class="progress"></div>
    `;

    toast.querySelector('.close').addEventListener('click', () => {
      toast.remove();
    });

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.animation = 'toastPopup 0.45s ease reverse forwards';
        setTimeout(() => {
          toast.remove();
        }, 450);
      }
    }, 5000);
  };

  window.showConfirmToast = function(message, onConfirm, onCancel, title = 'Confirm Action') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast info';
    toast.innerHTML = `
      <div class="icon">
        <i class="bi bi-question-circle-fill"></i>
      </div>
      <div class="content">
        <h4>${title}</h4>
        <p>${message}</p>
        <div style="display: flex; gap: 8px; margin-top: 12px;">
          <button class="confirm-btn">Confirm</button>
          <button class="cancel-btn">Cancel</button>
        </div>
      </div>
      <div class="close">
        <i class="bi bi-x-lg"></i>
      </div>
    `;

    const closeToast = () => {
      toast.style.animation = 'toastPopup 0.45s ease reverse forwards';
      setTimeout(() => {
        toast.remove();
      }, 450);
    };

    toast.querySelector('.confirm-btn').addEventListener('click', () => {
      closeToast();
      if (typeof onConfirm === 'function') onConfirm();
    });

    toast.querySelector('.cancel-btn').addEventListener('click', () => {
      closeToast();
     if (typeof onCancel === 'function') onCancel();
    });

    toast.querySelector('.close').addEventListener('click', () => {
      closeToast();
      if (typeof onCancel === 'function') onCancel();
    });

    container.appendChild(toast);
  };


  // Automatic data seeding for 1 month of comprehensive data (June 2026)
  (function() {
    if (!"true") {
      console.log("Seeding June 2026 data...");
      const data = {"vishwa_fashions_theme": "true", "vishwa_fashions_cleared_v1": "true", "vishwa_fashions_selected_fy": "FY 2026-27", "yarn-suppliers": "[{\"id\": \"s1\", \"name\": \"Reliance Industries Ltd\", \"contact\": \"Rajesh Sharma\", \"phone\": \"+91 98765 43210\", \"email\": \"yarn.sales@reliance.com\", \"address\": \"Reliance Corporate Park, Ghansoli, Navi Mumbai, Maharashtra 400701\", \"notes\": \"Major supplier for Polyester yarn\", \"createdAt\": \"2026-05-01T10:00:00.000Z\"}, {\"id\": \"s2\", \"name\": \"Vardhman Textiles Ltd\", \"contact\": \"Amit Patel\", \"phone\": \"+91 98234 56789\", \"email\": \"support@vardhman.com\", \"address\": \"Chandigarh Road, Ludhiana, Punjab 141010\", \"notes\": \"Primary supplier for cotton and cotton-blend yarns\", \"createdAt\": \"2026-05-02T11:00:00.000Z\"}, {\"id\": \"s3\", \"name\": \"Welspun India Ltd\", \"contact\": \"Sanjay Gupta\", \"phone\": \"+91 97654 32109\", \"email\": \"yarn@welspun.com\", \"address\": \"Welspun House, Kamala City, Lower Parel, Mumbai 400013\", \"notes\": \"Premium specialty yarns supplier\", \"createdAt\": \"2026-05-03T12:00:00.000Z\"}]", "yarn-qualities": "[{\"id\": \"q1\", \"quality\": \"75D Semi Dull Polyester\", \"code\": \"POLY-75D-SD\", \"color\": \"Off-White\", \"supplier\": \"Reliance Industries Ltd\", \"createdAt\": \"2026-05-01T10:10:00.000Z\"}, {\"id\": \"q2\", \"quality\": \"150D Bright Polyester\", \"code\": \"POLY-150D-BR\", \"color\": \"Navy Blue\", \"supplier\": \"Reliance Industries Ltd\", \"createdAt\": \"2026-05-01T10:15:00.000Z\"}, {\"id\": \"q3\", \"quality\": \"40s Combed Cotton\", \"code\": \"COT-40S-CMB\", \"color\": \"Bright White\", \"supplier\": \"Vardhman Textiles Ltd\", \"createdAt\": \"2026-05-02T11:15:00.000Z\"}, {\"id\": \"q4\", \"quality\": \"30s Carded Cotton\", \"code\": \"COT-30S-CRD\", \"color\": \"Melange Grey\", \"supplier\": \"Vardhman Textiles Ltd\", \"createdAt\": \"2026-05-02T11:20:00.000Z\"}, {\"id\": \"q5\", \"quality\": \"80s Giza Cotton\", \"code\": \"COT-80S-GZ\", \"color\": \"Ivory\", \"supplier\": \"Welspun India Ltd\", \"createdAt\": \"2026-05-03T12:15:00.000Z\"}, {\"id\": \"q6\", \"quality\": \"Silk Satin 100D\", \"code\": \"SS-01\", \"color\": \"Royal Blue\", \"supplier\": \"Reliance Industries Ltd\", \"createdAt\": \"2026-06-01T10:00:00.000Z\"}, {\"id\": \"q7\", \"quality\": \"Organza 50D\", \"code\": \"OG-02\", \"color\": \"Blush Pink\", \"supplier\": \"Reliance Industries Ltd\", \"createdAt\": \"2026-06-02T10:00:00.000Z\"}, {\"id\": \"q8\", \"quality\": \"Brocade Jacquard\", \"code\": \"BJ-03\", \"color\": \"Gold White\", \"supplier\": \"Welspun India Ltd\", \"createdAt\": \"2026-06-03T10:00:00.000Z\"}, {\"id\": \"q9\", \"quality\": \"Taffeta 75D\", \"code\": \"TF-04\", \"color\": \"Emerald Green\", \"supplier\": \"Reliance Industries Ltd\", \"createdAt\": \"2026-06-04T10:00:00.000Z\"}, {\"id\": \"q10\", \"quality\": \"Cotton Satin 60S\", \"code\": \"CS-05\", \"color\": \"Maroon\", \"supplier\": \"Vardhman Textiles Ltd\", \"createdAt\": \"2026-06-05T10:00:00.000Z\"}]", "yarn-orders": "[{\"id\": \"o1\", \"orderDate\": \"2026-05-05\", \"quality\": \"Silk Satin 100D\", \"code\": \"SS-01\", \"color\": \"Royal Blue\", \"supplier\": \"Reliance Industries Ltd\", \"type\": \"Warp\", \"orderedWeight\": 1500, \"price\": 145, \"status\": \"Completed\", \"qualityId\": \"q6\", \"createdAt\": \"2026-05-05T09:00:00.000Z\", \"batches\": [{\"id\": \"b1\", \"challanNumber\": \"CH-2026-0501\", \"receiveDate\": \"2026-05-10\", \"lotNumber\": \"L-POLY-99\", \"boxes\": [{\"boxNumber\": \"B1\", \"cones\": 24, \"weight\": 500, \"returnedWeight\": 0, \"returnedDate\": \"\"}, {\"boxNumber\": \"B2\", \"cones\": 24, \"weight\": 500, \"returnedWeight\": 0, \"returnedDate\": \"\"}, {\"boxNumber\": \"B3\", \"cones\": 24, \"weight\": 500, \"returnedWeight\": 0, \"returnedDate\": \"\"}], \"totalWeight\": 1500}]}, {\"id\": \"o2\", \"orderDate\": \"2026-06-01\", \"quality\": \"40s Combed Cotton\", \"code\": \"COT-40S-CMB\", \"color\": \"Bright White\", \"supplier\": \"Vardhman Textiles Ltd\", \"type\": \"Weft\", \"orderedWeight\": 2000, \"price\": 280, \"status\": \"Active\", \"qualityId\": \"q3\", \"createdAt\": \"2026-06-01T10:00:00.000Z\", \"batches\": [{\"id\": \"b2\", \"challanNumber\": \"CH-COT-4022\", \"receiveDate\": \"2026-06-15\", \"lotNumber\": \"L-COT-204\", \"boxes\": [{\"boxNumber\": \"B1\", \"cones\": 30, \"weight\": 600, \"returnedWeight\": 0, \"returnedDate\": \"\"}, {\"boxNumber\": \"B2\", \"cones\": 30, \"weight\": 600, \"returnedWeight\": 0, \"returnedDate\": \"\"}], \"totalWeight\": 1200}]}, {\"id\": \"o3\", \"orderDate\": \"2026-06-02\", \"quality\": \"80s Giza Cotton\", \"code\": \"COT-80S-GZ\", \"color\": \"Ivory\", \"supplier\": \"Welspun India Ltd\", \"type\": \"Warp\", \"orderedWeight\": 1500, \"price\": 420, \"status\": \"Active\", \"qualityId\": \"q5\", \"createdAt\": \"2026-06-02T14:30:00.000Z\", \"batches\": [{\"id\": \"b3\", \"challanNumber\": \"WEL-789\", \"receiveDate\": \"2026-06-12\", \"lotNumber\": \"L-GIZA-08\", \"boxes\": [{\"boxNumber\": \"B1\", \"cones\": 20, \"weight\": 400, \"returnedWeight\": 0, \"returnedDate\": \"\"}, {\"boxNumber\": \"B2\", \"cones\": 20, \"weight\": 350, \"returnedWeight\": 50, \"returnedDate\": \"2026-06-22\"}], \"totalWeight\": 700}, {\"id\": \"b4\", \"challanNumber\": \"WEL-799\", \"receiveDate\": \"2026-06-22\", \"lotNumber\": \"L-GIZA-09\", \"boxes\": [{\"boxNumber\": \"B1\", \"cones\": 20, \"weight\": 400, \"returnedWeight\": 0, \"returnedDate\": \"\"}, {\"boxNumber\": \"B2\", \"cones\": 20, \"weight\": 350, \"returnedWeight\": 0, \"returnedDate\": \"\"}], \"totalWeight\": 750}]}, {\"id\": \"o4\", \"orderDate\": \"2026-06-03\", \"quality\": \"150D Bright Polyester\", \"code\": \"POLY-150D-BR\", \"color\": \"Navy Blue\", \"supplier\": \"Reliance Industries Ltd\", \"type\": \"Weft\", \"orderedWeight\": 1500, \"price\": 160, \"status\": \"Active\", \"qualityId\": \"q2\", \"createdAt\": \"2026-06-03T10:00:00.000Z\", \"batches\": [{\"id\": \"b5\", \"challanNumber\": \"CH-REL-5021\", \"receiveDate\": \"2026-06-18\", \"lotNumber\": \"L-POLY-105\", \"boxes\": [{\"boxNumber\": \"B1\", \"cones\": 25, \"weight\": 500, \"returnedWeight\": 0, \"returnedDate\": \"\"}, {\"boxNumber\": \"B2\", \"cones\": 25, \"weight\": 500, \"returnedWeight\": 0, \"returnedDate\": \"\"}], \"totalWeight\": 1000}]}, {\"id\": \"o5\", \"orderDate\": \"2026-06-05\", \"quality\": \"30s Carded Cotton\", \"code\": \"COT-30S-CRD\", \"color\": \"Melange Grey\", \"supplier\": \"Vardhman Textiles Ltd\", \"type\": \"Weft\", \"orderedWeight\": 1000, \"price\": 210, \"status\": \"Completed\", \"qualityId\": \"q4\", \"createdAt\": \"2026-06-05T09:00:00.000Z\", \"batches\": [{\"id\": \"b6\", \"challanNumber\": \"CH-COT-3001\", \"receiveDate\": \"2026-06-14\", \"lotNumber\": \"L-COT-199\", \"boxes\": [{\"boxNumber\": \"B1\", \"cones\": 24, \"weight\": 500, \"returnedWeight\": 0, \"returnedDate\": \"\"}, {\"boxNumber\": \"B2\", \"cones\": 24, \"weight\": 500, \"returnedWeight\": 0, \"returnedDate\": \"\"}], \"totalWeight\": 1000}]}, {\"id\": \"o6\", \"orderDate\": \"2026-06-10\", \"quality\": \"Silk Satin 100D\", \"code\": \"SS-01\", \"color\": \"Royal Blue\", \"supplier\": \"Reliance Industries Ltd\", \"type\": \"Warp\", \"orderedWeight\": 1200, \"price\": 145, \"status\": \"Completed\", \"qualityId\": \"q6\", \"createdAt\": \"2026-06-10T10:00:00.000Z\", \"batches\": [{\"id\": \"b7\", \"challanNumber\": \"CH-2026-0610\", \"receiveDate\": \"2026-06-25\", \"lotNumber\": \"L-POLY-108\", \"boxes\": [{\"boxNumber\": \"B1\", \"cones\": 24, \"weight\": 600, \"returnedWeight\": 0, \"returnedDate\": \"\"}, {\"boxNumber\": \"B2\", \"cones\": 24, \"weight\": 600, \"returnedWeight\": 0, \"returnedDate\": \"\"}], \"totalWeight\": 1200}]}]", "yarn-issues": "[{\"id\": \"wi1\", \"date\": \"2026-06-16\", \"quality\": \"40s Combed Cotton\", \"supplier\": \"Vardhman Textiles Ltd\", \"code\": \"COT-40S-CMB\", \"color\": \"Bright White\", \"box\": \"B1\", \"challan\": \"CH-COT-4022\", \"cones\": 10, \"net\": 200, \"details\": \"Machine 2 weft issue\"}, {\"id\": \"wi2\", \"date\": \"2026-06-20\", \"quality\": \"40s Combed Cotton\", \"supplier\": \"Vardhman Textiles Ltd\", \"code\": \"COT-40S-CMB\", \"color\": \"Bright White\", \"box\": \"B1\", \"challan\": \"CH-COT-4022\", \"cones\": 10, \"net\": 200, \"details\": \"Machine 2 weft issue\"}, {\"id\": \"wi3\", \"date\": \"2026-06-24\", \"quality\": \"40s Combed Cotton\", \"supplier\": \"Vardhman Textiles Ltd\", \"code\": \"COT-40S-CMB\", \"color\": \"Bright White\", \"box\": \"B2\", \"challan\": \"CH-COT-4022\", \"cones\": 15, \"net\": 300, \"details\": \"Machine 2 weft issue\"}, {\"id\": \"wi4\", \"date\": \"2026-06-19\", \"quality\": \"150D Bright Polyester\", \"supplier\": \"Reliance Industries Ltd\", \"code\": \"POLY-150D-BR\", \"color\": \"Navy Blue\", \"box\": \"B1\", \"challan\": \"CH-REL-5021\", \"cones\": 12, \"net\": 240, \"details\": \"Machine 3 weft issue\"}, {\"id\": \"wi5\", \"date\": \"2026-06-25\", \"quality\": \"150D Bright Polyester\", \"supplier\": \"Reliance Industries Ltd\", \"code\": \"POLY-150D-BR\", \"color\": \"Navy Blue\", \"box\": \"B2\", \"challan\": \"CH-REL-5021\", \"cones\": 12, \"net\": 240, \"details\": \"Machine 3 weft issue\"}, {\"id\": \"wi6\", \"date\": \"2026-06-15\", \"quality\": \"30s Carded Cotton\", \"supplier\": \"Vardhman Textiles Ltd\", \"code\": \"COT-30S-CRD\", \"color\": \"Melange Grey\", \"box\": \"B1\", \"challan\": \"CH-COT-3001\", \"cones\": 12, \"net\": 250, \"details\": \"Machine 4 weft issue\"}, {\"id\": \"wi7\", \"date\": \"2026-06-22\", \"quality\": \"30s Carded Cotton\", \"supplier\": \"Vardhman Textiles Ltd\", \"code\": \"COT-30S-CRD\", \"color\": \"Melange Grey\", \"box\": \"B2\", \"challan\": \"CH-COT-3001\", \"cones\": 12, \"net\": 250, \"details\": \"Machine 4 weft issue\"}]", "warp-issues": "[{\"id\": \"w1\", \"date\": \"2026-05-15\", \"quality\": \"Silk Satin 100D\", \"code\": \"SS-01\", \"color\": \"Royal Blue\", \"issuedWeight\": 120, \"details\": \"Warping Section for Beam 101\", \"beamId\": \"b101\"}, {\"id\": \"w2\", \"date\": \"2026-06-05\", \"quality\": \"80s Giza Cotton\", \"code\": \"COT-80S-GZ\", \"color\": \"Ivory\", \"issuedWeight\": 95, \"details\": \"Sizing Machine 1 for Beam 102\", \"beamId\": \"b102\"}, {\"id\": \"w3\", \"date\": \"2026-06-10\", \"quality\": \"Silk Satin 100D\", \"code\": \"SS-01\", \"color\": \"Royal Blue\", \"issuedWeight\": 120, \"details\": \"Warping Section for Beam 103\", \"beamId\": \"b103\"}, {\"id\": \"w4\", \"date\": \"2026-06-15\", \"quality\": \"Brocade Jacquard\", \"code\": \"BJ-03\", \"color\": \"Gold White\", \"issuedWeight\": 150, \"details\": \"Sizing Machine 2 for Beam 104\", \"beamId\": \"b104\"}, {\"id\": \"w5\", \"date\": \"2026-06-20\", \"quality\": \"Organza 50D\", \"code\": \"OG-02\", \"color\": \"Blush Pink\", \"issuedWeight\": 110, \"details\": \"Warping Section for Beam 105\", \"beamId\": \"b105\"}, {\"id\": \"w6\", \"date\": \"2026-06-25\", \"quality\": \"Taffeta 75D\", \"code\": \"TF-04\", \"color\": \"Emerald Green\", \"issuedWeight\": 130, \"details\": \"Sizing Machine 1 for Beam 106\", \"beamId\": \"b106\"}]", "warp-beams": "[{\"id\": \"b101\", \"beamNumber\": \"101\", \"quality\": \"Silk Satin 100D\", \"code\": \"SS-01\", \"color\": \"Royal Blue\", \"meters\": 1500, \"ends\": 9600, \"status\": \"Completed\", \"machineNumber\": \"1\", \"createdAt\": \"2026-05-15\", \"warpingPerson\": \"Mahesh\", \"history\": [{\"date\": \"2026-05-15\", \"event\": \"Warped by Mahesh\", \"type\": \"warp\"}, {\"date\": \"2026-05-20\", \"event\": \"Jala Piecing by Suresh on Machine 1\", \"type\": \"machine\"}, {\"date\": \"2026-06-12\", \"event\": \"Completed\", \"type\": \"status\"}]}, {\"id\": \"b102\", \"beamNumber\": \"102\", \"quality\": \"80s Giza Cotton\", \"code\": \"COT-80S-GZ\", \"color\": \"Ivory\", \"meters\": 1200, \"ends\": 7200, \"status\": \"Completed\", \"machineNumber\": \"2\", \"createdAt\": \"2026-06-05\", \"warpingPerson\": \"Suresh\", \"history\": [{\"date\": \"2026-06-05\", \"event\": \"Warped by Suresh\", \"type\": \"warp\"}, {\"date\": \"2026-06-10\", \"event\": \"Drawing In by Rahul Sharma on Machine 2\", \"type\": \"machine\"}, {\"date\": \"2026-06-28\", \"event\": \"Completed\", \"type\": \"status\"}]}, {\"id\": \"b103\", \"beamNumber\": \"103\", \"quality\": \"Silk Satin 100D\", \"code\": \"SS-01\", \"color\": \"Royal Blue\", \"meters\": 1500, \"ends\": 9600, \"status\": \"On Loom\", \"machineNumber\": \"1\", \"createdAt\": \"2026-06-10\", \"warpingPerson\": \"Suresh\", \"history\": [{\"date\": \"2026-06-10\", \"event\": \"Warped by Suresh\", \"type\": \"warp\"}, {\"date\": \"2026-06-13\", \"event\": \"Jala Piecing by Suresh on Machine 1\", \"type\": \"machine\"}]}, {\"id\": \"b104\", \"beamNumber\": \"104\", \"quality\": \"Brocade Jacquard\", \"code\": \"BJ-03\", \"color\": \"Gold White\", \"meters\": 1000, \"ends\": 6400, \"status\": \"On Loom\", \"machineNumber\": \"3\", \"createdAt\": \"2026-06-15\", \"warpingPerson\": \"Mahesh\", \"history\": [{\"date\": \"2026-06-15\", \"event\": \"Warped by Mahesh\", \"type\": \"warp\"}, {\"date\": \"2026-06-18\", \"event\": \"Drawing In by Suresh on Machine 3\", \"type\": \"machine\"}]}, {\"id\": \"b105\", \"beamNumber\": \"105\", \"quality\": \"Organza 50D\", \"code\": \"OG-02\", \"color\": \"Blush Pink\", \"meters\": 1800, \"ends\": 8400, \"status\": \"On Loom\", \"machineNumber\": \"4\", \"createdAt\": \"2026-06-20\", \"warpingPerson\": \"Suresh\", \"history\": [{\"date\": \"2026-06-20\", \"event\": \"Warped by Suresh\", \"type\": \"warp\"}, {\"date\": \"2026-06-24\", \"event\": \"Jala Piecing by Amit Kumar on Machine 4\", \"type\": \"machine\"}]}, {\"id\": \"b106\", \"beamNumber\": \"106\", \"quality\": \"Taffeta 75D\", \"code\": \"TF-04\", \"color\": \"Emerald Green\", \"meters\": 1500, \"ends\": 9600, \"status\": \"Ready\", \"machineNumber\": \"\", \"createdAt\": \"2026-06-25\", \"warpingPerson\": \"Mahesh\", \"history\": [{\"date\": \"2026-06-25\", \"event\": \"Warped by Mahesh\", \"type\": \"warp\"}]}]", "warp-beam-loadings": "[{\"id\": \"bl-j1\", \"date\": \"2026-06-12\", \"piecein\": \"Suresh\", \"drawingIn\": \"\", \"fani\": \"\", \"dropPinJog\": \"\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"itemColor\": \"Silk Satin 100D - Royal Blue\", \"meters\": 1500, \"ends\": 9600, \"rate\": 150, \"paymentAmount\": 1440.0}, {\"id\": \"bl-j2\", \"date\": \"2026-06-12\", \"piecein\": \"\", \"drawingIn\": \"Suresh\", \"fani\": \"\", \"dropPinJog\": \"\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"itemColor\": \"Silk Satin 100D - Royal Blue\", \"meters\": 1500, \"ends\": 9600, \"rate\": 170, \"paymentAmount\": 1632.0}, {\"id\": \"bl-j3\", \"date\": \"2026-06-13\", \"piecein\": \"\", \"drawingIn\": \"\", \"fani\": \"Suresh\", \"dropPinJog\": \"\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"itemColor\": \"Silk Satin 100D - Royal Blue\", \"meters\": 1500, \"ends\": 9600, \"rate\": \"\", \"paymentAmount\": 500.0}, {\"id\": \"bl-j4\", \"date\": \"2026-06-13\", \"piecein\": \"\", \"drawingIn\": \"\", \"fani\": \"\", \"dropPinJog\": \"Rahul Sharma\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"itemColor\": \"Silk Satin 100D - Royal Blue\", \"meters\": 1500, \"ends\": 9600, \"rate\": 50, \"paymentAmount\": 480.0}, {\"id\": \"bl-j5\", \"date\": \"2026-06-09\", \"piecein\": \"Suresh\", \"drawingIn\": \"\", \"fani\": \"\", \"dropPinJog\": \"\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"itemColor\": \"80s Giza Cotton - Ivory\", \"meters\": 1200, \"ends\": 7200, \"rate\": 150, \"paymentAmount\": 1080.0}, {\"id\": \"bl-j6\", \"date\": \"2026-06-09\", \"piecein\": \"\", \"drawingIn\": \"Rahul Sharma\", \"fani\": \"\", \"dropPinJog\": \"\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"itemColor\": \"80s Giza Cotton - Ivory\", \"meters\": 1200, \"ends\": 7200, \"rate\": 170, \"paymentAmount\": 1224.0}, {\"id\": \"bl-j7\", \"date\": \"2026-06-10\", \"piecein\": \"\", \"drawingIn\": \"\", \"fani\": \"Rahul Sharma\", \"dropPinJog\": \"\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"itemColor\": \"80s Giza Cotton - Ivory\", \"meters\": 1200, \"ends\": 7200, \"rate\": \"\", \"paymentAmount\": 500.0}, {\"id\": \"bl-j8\", \"date\": \"2026-06-17\", \"piecein\": \"Mahesh\", \"drawingIn\": \"\", \"fani\": \"\", \"dropPinJog\": \"\", \"machineNumber\": \"3\", \"beamNumber\": \"104\", \"itemColor\": \"Brocade Jacquard - Gold White\", \"meters\": 1000, \"ends\": 6400, \"rate\": 150, \"paymentAmount\": 960.0}, {\"id\": \"bl-j9\", \"date\": \"2026-06-17\", \"piecein\": \"\", \"drawingIn\": \"Suresh\", \"fani\": \"\", \"dropPinJog\": \"\", \"machineNumber\": \"3\", \"beamNumber\": \"104\", \"itemColor\": \"Brocade Jacquard - Gold White\", \"meters\": 1000, \"ends\": 6400, \"rate\": 170, \"paymentAmount\": 1088.0}, {\"id\": \"bl-j10\", \"date\": \"2026-06-18\", \"piecein\": \"\", \"drawingIn\": \"\", \"fani\": \"Suresh\", \"dropPinJog\": \"\", \"machineNumber\": \"3\", \"beamNumber\": \"104\", \"itemColor\": \"Brocade Jacquard - Gold White\", \"meters\": 1000, \"ends\": 6400, \"rate\": \"\", \"paymentAmount\": 500.0}, {\"id\": \"bl-j11\", \"date\": \"2026-06-23\", \"piecein\": \"Suresh\", \"drawingIn\": \"\", \"fani\": \"\", \"dropPinJog\": \"\", \"machineNumber\": \"4\", \"beamNumber\": \"105\", \"itemColor\": \"Organza 50D - Blush Pink\", \"meters\": 1800, \"ends\": 8400, \"rate\": 150, \"paymentAmount\": 1260.0}, {\"id\": \"bl-j12\", \"date\": \"2026-06-23\", \"piecein\": \"\", \"drawingIn\": \"Amit Kumar\", \"fani\": \"\", \"dropPinJog\": \"\", \"machineNumber\": \"4\", \"beamNumber\": \"105\", \"itemColor\": \"Organza 50D - Blush Pink\", \"meters\": 1800, \"ends\": 8400, \"rate\": 170, \"paymentAmount\": 1428.0}, {\"id\": \"bl-j13\", \"date\": \"2026-06-24\", \"piecein\": \"\", \"drawingIn\": \"\", \"fani\": \"Amit Kumar\", \"dropPinJog\": \"\", \"machineNumber\": \"4\", \"beamNumber\": \"105\", \"itemColor\": \"Organza 50D - Blush Pink\", \"meters\": 1800, \"ends\": 8400, \"rate\": \"\", \"paymentAmount\": 500.0}]", "machines": "[{\"id\": \"1\", \"name\": \"1\", \"rapier\": \"Smit\", \"jacquard\": \"Staubli\", \"hooks\": 1440, \"jala\": \"Cotton\", \"fani\": \"84 x 52\"}, {\"id\": \"2\", \"name\": \"2\", \"rapier\": \"Picanol\", \"jacquard\": \"Bonas\", \"hooks\": 2688, \"jala\": \"Nylon\", \"fani\": \"72 x 52\"}, {\"id\": \"3\", \"name\": \"3\", \"rapier\": \"Itema\", \"jacquard\": \"Staubli\", \"hooks\": 1440, \"jala\": \"Polyester\", \"fani\": \"64 x 52\"}, {\"id\": \"4\", \"name\": \"4\", \"rapier\": \"Smit\", \"jacquard\": \"Grosse\", \"hooks\": 1344, \"jala\": \"Cotton\", \"fani\": \"84 x 52\"}]", "productionLogs": "[{\"id\": 10001, \"productionDate\": \"2026-06-01\", \"machineNumber\": \"1\", \"beamNumber\": \"101\", \"pissingDate\": \"2026-05-20\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 84.3, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 80.2, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 164.5, \"takaSerial\": \"T-1001\", \"foldingDate\": \"2026-06-03\", \"takaWeight\": 69.06}, {\"id\": 10002, \"productionDate\": \"2026-06-02\", \"machineNumber\": \"1\", \"beamNumber\": \"101\", \"pissingDate\": \"2026-05-20\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 82.1, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 82.9, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 165.0, \"takaSerial\": \"T-1001\", \"foldingDate\": \"2026-06-03\", \"takaWeight\": 69.06}, {\"id\": 10003, \"productionDate\": \"2026-06-03\", \"machineNumber\": \"1\", \"beamNumber\": \"101\", \"pissingDate\": \"2026-05-20\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 77.5, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 86.3, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 163.8, \"takaSerial\": \"T-1001\", \"foldingDate\": \"2026-06-03\", \"takaWeight\": 69.06}, {\"id\": 10004, \"productionDate\": \"2026-06-04\", \"machineNumber\": \"1\", \"beamNumber\": \"101\", \"pissingDate\": \"2026-05-20\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 81.9, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 81.4, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 163.3, \"takaSerial\": \"T-1002\", \"foldingDate\": \"2026-06-06\", \"takaWeight\": 71.41}, {\"id\": 10005, \"productionDate\": \"2026-06-05\", \"machineNumber\": \"1\", \"beamNumber\": \"101\", \"pissingDate\": \"2026-05-20\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 89.0, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 88.2, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 177.2, \"takaSerial\": \"T-1002\", \"foldingDate\": \"2026-06-06\", \"takaWeight\": 71.41}, {\"id\": 10006, \"productionDate\": \"2026-06-06\", \"machineNumber\": \"1\", \"beamNumber\": \"101\", \"pissingDate\": \"2026-05-20\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 83.4, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 86.2, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 169.6, \"takaSerial\": \"T-1002\", \"foldingDate\": \"2026-06-06\", \"takaWeight\": 71.41}, {\"id\": 10007, \"productionDate\": \"2026-06-07\", \"machineNumber\": \"1\", \"beamNumber\": \"101\", \"pissingDate\": \"2026-05-20\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 89.0, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 93.2, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 182.2, \"takaSerial\": \"T-1003\", \"foldingDate\": \"2026-06-09\", \"takaWeight\": 70.34}, {\"id\": 10008, \"productionDate\": \"2026-06-08\", \"machineNumber\": \"1\", \"beamNumber\": \"101\", \"pissingDate\": \"2026-05-20\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 78.9, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 79.5, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 158.4, \"takaSerial\": \"T-1003\", \"foldingDate\": \"2026-06-09\", \"takaWeight\": 70.34}, {\"id\": 10009, \"productionDate\": \"2026-06-09\", \"machineNumber\": \"1\", \"beamNumber\": \"101\", \"pissingDate\": \"2026-05-20\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 79.7, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 82.1, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 161.8, \"takaSerial\": \"T-1003\", \"foldingDate\": \"2026-06-09\", \"takaWeight\": 70.34}, {\"id\": 10010, \"productionDate\": \"2026-06-10\", \"machineNumber\": \"1\", \"beamNumber\": \"101\", \"pissingDate\": \"2026-05-20\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 76.1, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 83.5, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 159.6, \"takaSerial\": \"T-1004\", \"foldingDate\": \"2026-06-12\", \"takaWeight\": 68.21}, {\"id\": 10011, \"productionDate\": \"2026-06-10\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"pissingDate\": \"2026-06-10\", \"pissingPerson\": \"Rahul Sharma\", \"dayWorker\": \"Vikas Verma\", \"dayShiftHours\": 12, \"dayMeters\": 79.8, \"nightWorker\": \"Sunil Singh\", \"nightShiftHours\": 12, \"nightMeters\": 82.0, \"picks\": 72, \"product\": \"Cotton Satin 60S\", \"totalMeters\": 161.8, \"takaSerial\": \"T-1011\", \"foldingDate\": \"2026-06-12\", \"takaWeight\": 71.76}, {\"id\": 10012, \"productionDate\": \"2026-06-11\", \"machineNumber\": \"1\", \"beamNumber\": \"101\", \"pissingDate\": \"2026-05-20\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 80.1, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 79.8, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 159.9, \"takaSerial\": \"T-1004\", \"foldingDate\": \"2026-06-12\", \"takaWeight\": 68.21}, {\"id\": 10013, \"productionDate\": \"2026-06-11\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"pissingDate\": \"2026-06-10\", \"pissingPerson\": \"Rahul Sharma\", \"dayWorker\": \"Vikas Verma\", \"dayShiftHours\": 12, \"dayMeters\": 79.6, \"nightWorker\": \"Sunil Singh\", \"nightShiftHours\": 12, \"nightMeters\": 92.6, \"picks\": 72, \"product\": \"Cotton Satin 60S\", \"totalMeters\": 172.2, \"takaSerial\": \"T-1011\", \"foldingDate\": \"2026-06-12\", \"takaWeight\": 71.76}, {\"id\": 10014, \"productionDate\": \"2026-06-12\", \"machineNumber\": \"1\", \"beamNumber\": \"101\", \"pissingDate\": \"2026-05-20\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 80.9, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 86.8, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 167.7, \"takaSerial\": \"T-1004\", \"foldingDate\": \"2026-06-12\", \"takaWeight\": 68.21}, {\"id\": 10015, \"productionDate\": \"2026-06-12\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"pissingDate\": \"2026-06-10\", \"pissingPerson\": \"Rahul Sharma\", \"dayWorker\": \"Vikas Verma\", \"dayShiftHours\": 12, \"dayMeters\": 91.4, \"nightWorker\": \"Sunil Singh\", \"nightShiftHours\": 12, \"nightMeters\": 87.2, \"picks\": 72, \"product\": \"Cotton Satin 60S\", \"totalMeters\": 178.6, \"takaSerial\": \"T-1011\", \"foldingDate\": \"2026-06-12\", \"takaWeight\": 71.76}, {\"id\": 10016, \"productionDate\": \"2026-06-13\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"pissingDate\": \"2026-06-13\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 88.2, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 78.3, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 166.5, \"takaSerial\": \"T-1005\", \"foldingDate\": \"2026-06-15\", \"takaWeight\": 70.28}, {\"id\": 10017, \"productionDate\": \"2026-06-13\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"pissingDate\": \"2026-06-10\", \"pissingPerson\": \"Rahul Sharma\", \"dayWorker\": \"Vikas Verma\", \"dayShiftHours\": 12, \"dayMeters\": 87.3, \"nightWorker\": \"Sunil Singh\", \"nightShiftHours\": 12, \"nightMeters\": 80.3, \"picks\": 72, \"product\": \"Cotton Satin 60S\", \"totalMeters\": 167.6, \"takaSerial\": \"T-1012\", \"foldingDate\": \"2026-06-15\", \"takaWeight\": 71.34}, {\"id\": 10018, \"productionDate\": \"2026-06-14\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"pissingDate\": \"2026-06-13\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 75.7, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 93.0, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 168.7, \"takaSerial\": \"T-1005\", \"foldingDate\": \"2026-06-15\", \"takaWeight\": 70.28}, {\"id\": 10019, \"productionDate\": \"2026-06-14\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"pissingDate\": \"2026-06-10\", \"pissingPerson\": \"Rahul Sharma\", \"dayWorker\": \"Vikas Verma\", \"dayShiftHours\": 12, \"dayMeters\": 85.2, \"nightWorker\": \"Sunil Singh\", \"nightShiftHours\": 12, \"nightMeters\": 83.9, \"picks\": 72, \"product\": \"Cotton Satin 60S\", \"totalMeters\": 169.1, \"takaSerial\": \"T-1012\", \"foldingDate\": \"2026-06-15\", \"takaWeight\": 71.34}, {\"id\": 10020, \"productionDate\": \"2026-06-15\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"pissingDate\": \"2026-06-13\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 83.4, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 83.4, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 166.8, \"takaSerial\": \"T-1005\", \"foldingDate\": \"2026-06-15\", \"takaWeight\": 70.28}, {\"id\": 10021, \"productionDate\": \"2026-06-15\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"pissingDate\": \"2026-06-10\", \"pissingPerson\": \"Rahul Sharma\", \"dayWorker\": \"Vikas Verma\", \"dayShiftHours\": 12, \"dayMeters\": 82.9, \"nightWorker\": \"Sunil Singh\", \"nightShiftHours\": 12, \"nightMeters\": 90.0, \"picks\": 72, \"product\": \"Cotton Satin 60S\", \"totalMeters\": 172.9, \"takaSerial\": \"T-1012\", \"foldingDate\": \"2026-06-15\", \"takaWeight\": 71.34}, {\"id\": 10022, \"productionDate\": \"2026-06-16\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"pissingDate\": \"2026-06-13\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 75.5, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 94.5, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 170.0, \"takaSerial\": \"T-1006\", \"foldingDate\": \"2026-06-18\", \"takaWeight\": 71.68}, {\"id\": 10023, \"productionDate\": \"2026-06-16\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"pissingDate\": \"2026-06-10\", \"pissingPerson\": \"Rahul Sharma\", \"dayWorker\": \"Vikas Verma\", \"dayShiftHours\": 12, \"dayMeters\": 90.7, \"nightWorker\": \"Sunil Singh\", \"nightShiftHours\": 12, \"nightMeters\": 87.4, \"picks\": 72, \"product\": \"Cotton Satin 60S\", \"totalMeters\": 178.1, \"takaSerial\": \"T-1013\", \"foldingDate\": \"2026-06-18\", \"takaWeight\": 74.66}, {\"id\": 10024, \"productionDate\": \"2026-06-17\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"pissingDate\": \"2026-06-13\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 82.6, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 88.7, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 171.3, \"takaSerial\": \"T-1006\", \"foldingDate\": \"2026-06-18\", \"takaWeight\": 71.68}, {\"id\": 10025, \"productionDate\": \"2026-06-17\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"pissingDate\": \"2026-06-10\", \"pissingPerson\": \"Rahul Sharma\", \"dayWorker\": \"Vikas Verma\", \"dayShiftHours\": 12, \"dayMeters\": 89.6, \"nightWorker\": \"Sunil Singh\", \"nightShiftHours\": 12, \"nightMeters\": 87.8, \"picks\": 72, \"product\": \"Cotton Satin 60S\", \"totalMeters\": 177.4, \"takaSerial\": \"T-1013\", \"foldingDate\": \"2026-06-18\", \"takaWeight\": 74.66}, {\"id\": 10026, \"productionDate\": \"2026-06-18\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"pissingDate\": \"2026-06-13\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 78.4, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 92.3, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 170.7, \"takaSerial\": \"T-1006\", \"foldingDate\": \"2026-06-18\", \"takaWeight\": 71.68}, {\"id\": 10027, \"productionDate\": \"2026-06-18\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"pissingDate\": \"2026-06-10\", \"pissingPerson\": \"Rahul Sharma\", \"dayWorker\": \"Vikas Verma\", \"dayShiftHours\": 12, \"dayMeters\": 89.9, \"nightWorker\": \"Sunil Singh\", \"nightShiftHours\": 12, \"nightMeters\": 87.9, \"picks\": 72, \"product\": \"Cotton Satin 60S\", \"totalMeters\": 177.8, \"takaSerial\": \"T-1013\", \"foldingDate\": \"2026-06-18\", \"takaWeight\": 74.66}, {\"id\": 10028, \"productionDate\": \"2026-06-18\", \"machineNumber\": \"3\", \"beamNumber\": \"104\", \"pissingDate\": \"2026-06-18\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Deepak Yadav\", \"dayShiftHours\": 12, \"dayMeters\": 75.6, \"nightWorker\": \"Rohan Gupta\", \"nightShiftHours\": 12, \"nightMeters\": 90.1, \"picks\": 72, \"product\": \"Brocade Jacquard\", \"totalMeters\": 165.7, \"takaSerial\": \"T-1018\", \"foldingDate\": \"2026-06-20\", \"takaWeight\": 68.31}, {\"id\": 10029, \"productionDate\": \"2026-06-19\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"pissingDate\": \"2026-06-13\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 78.6, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 79.5, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 158.1, \"takaSerial\": \"T-1007\", \"foldingDate\": \"2026-06-21\", \"takaWeight\": 69.5}, {\"id\": 10030, \"productionDate\": \"2026-06-19\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"pissingDate\": \"2026-06-10\", \"pissingPerson\": \"Rahul Sharma\", \"dayWorker\": \"Vikas Verma\", \"dayShiftHours\": 12, \"dayMeters\": 90.7, \"nightWorker\": \"Sunil Singh\", \"nightShiftHours\": 12, \"nightMeters\": 92.1, \"picks\": 72, \"product\": \"Cotton Satin 60S\", \"totalMeters\": 182.8, \"takaSerial\": \"T-1014\", \"foldingDate\": \"2026-06-21\", \"takaWeight\": 73.84}, {\"id\": 10031, \"productionDate\": \"2026-06-19\", \"machineNumber\": \"3\", \"beamNumber\": \"104\", \"pissingDate\": \"2026-06-18\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Deepak Yadav\", \"dayShiftHours\": 12, \"dayMeters\": 79.3, \"nightWorker\": \"Rohan Gupta\", \"nightShiftHours\": 12, \"nightMeters\": 78.1, \"picks\": 72, \"product\": \"Brocade Jacquard\", \"totalMeters\": 157.4, \"takaSerial\": \"T-1018\", \"foldingDate\": \"2026-06-20\", \"takaWeight\": 68.31}, {\"id\": 10032, \"productionDate\": \"2026-06-20\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"pissingDate\": \"2026-06-13\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 80.3, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 85.0, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 165.3, \"takaSerial\": \"T-1007\", \"foldingDate\": \"2026-06-21\", \"takaWeight\": 69.5}, {\"id\": 10033, \"productionDate\": \"2026-06-20\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"pissingDate\": \"2026-06-10\", \"pissingPerson\": \"Rahul Sharma\", \"dayWorker\": \"Vikas Verma\", \"dayShiftHours\": 12, \"dayMeters\": 89.0, \"nightWorker\": \"Sunil Singh\", \"nightShiftHours\": 12, \"nightMeters\": 79.7, \"picks\": 72, \"product\": \"Cotton Satin 60S\", \"totalMeters\": 168.7, \"takaSerial\": \"T-1014\", \"foldingDate\": \"2026-06-21\", \"takaWeight\": 73.84}, {\"id\": 10034, \"productionDate\": \"2026-06-20\", \"machineNumber\": \"3\", \"beamNumber\": \"104\", \"pissingDate\": \"2026-06-18\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Deepak Yadav\", \"dayShiftHours\": 12, \"dayMeters\": 78.4, \"nightWorker\": \"Rohan Gupta\", \"nightShiftHours\": 12, \"nightMeters\": 86.4, \"picks\": 72, \"product\": \"Brocade Jacquard\", \"totalMeters\": 164.8, \"takaSerial\": \"T-1018\", \"foldingDate\": \"2026-06-20\", \"takaWeight\": 68.31}, {\"id\": 10035, \"productionDate\": \"2026-06-21\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"pissingDate\": \"2026-06-13\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 88.7, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 84.3, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 173.0, \"takaSerial\": \"T-1007\", \"foldingDate\": \"2026-06-21\", \"takaWeight\": 69.5}, {\"id\": 10036, \"productionDate\": \"2026-06-21\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"pissingDate\": \"2026-06-10\", \"pissingPerson\": \"Rahul Sharma\", \"dayWorker\": \"Vikas Verma\", \"dayShiftHours\": 12, \"dayMeters\": 85.6, \"nightWorker\": \"Sunil Singh\", \"nightShiftHours\": 12, \"nightMeters\": 90.3, \"picks\": 72, \"product\": \"Cotton Satin 60S\", \"totalMeters\": 175.9, \"takaSerial\": \"T-1014\", \"foldingDate\": \"2026-06-21\", \"takaWeight\": 73.84}, {\"id\": 10037, \"productionDate\": \"2026-06-21\", \"machineNumber\": \"3\", \"beamNumber\": \"104\", \"pissingDate\": \"2026-06-18\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Deepak Yadav\", \"dayShiftHours\": 12, \"dayMeters\": 76.6, \"nightWorker\": \"Rohan Gupta\", \"nightShiftHours\": 12, \"nightMeters\": 94.1, \"picks\": 72, \"product\": \"Brocade Jacquard\", \"totalMeters\": 170.7, \"takaSerial\": \"T-1019\", \"foldingDate\": \"2026-06-23\", \"takaWeight\": 70.71}, {\"id\": 10038, \"productionDate\": \"2026-06-22\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"pissingDate\": \"2026-06-13\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 75.7, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 94.4, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 170.1, \"takaSerial\": \"T-1008\", \"foldingDate\": \"2026-06-24\", \"takaWeight\": 69.3}, {\"id\": 10039, \"productionDate\": \"2026-06-22\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"pissingDate\": \"2026-06-10\", \"pissingPerson\": \"Rahul Sharma\", \"dayWorker\": \"Vikas Verma\", \"dayShiftHours\": 12, \"dayMeters\": 81.5, \"nightWorker\": \"Sunil Singh\", \"nightShiftHours\": 12, \"nightMeters\": 91.2, \"picks\": 72, \"product\": \"Cotton Satin 60S\", \"totalMeters\": 172.7, \"takaSerial\": \"T-1015\", \"foldingDate\": \"2026-06-24\", \"takaWeight\": 69.78}, {\"id\": 10040, \"productionDate\": \"2026-06-22\", \"machineNumber\": \"3\", \"beamNumber\": \"104\", \"pissingDate\": \"2026-06-18\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Deepak Yadav\", \"dayShiftHours\": 12, \"dayMeters\": 79.3, \"nightWorker\": \"Rohan Gupta\", \"nightShiftHours\": 12, \"nightMeters\": 84.9, \"picks\": 72, \"product\": \"Brocade Jacquard\", \"totalMeters\": 164.2, \"takaSerial\": \"T-1019\", \"foldingDate\": \"2026-06-23\", \"takaWeight\": 70.71}, {\"id\": 10041, \"productionDate\": \"2026-06-23\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"pissingDate\": \"2026-06-13\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 81.6, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 78.1, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 159.7, \"takaSerial\": \"T-1008\", \"foldingDate\": \"2026-06-24\", \"takaWeight\": 69.3}, {\"id\": 10042, \"productionDate\": \"2026-06-23\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"pissingDate\": \"2026-06-10\", \"pissingPerson\": \"Rahul Sharma\", \"dayWorker\": \"Vikas Verma\", \"dayShiftHours\": 12, \"dayMeters\": 79.0, \"nightWorker\": \"Sunil Singh\", \"nightShiftHours\": 12, \"nightMeters\": 87.1, \"picks\": 72, \"product\": \"Cotton Satin 60S\", \"totalMeters\": 166.1, \"takaSerial\": \"T-1015\", \"foldingDate\": \"2026-06-24\", \"takaWeight\": 69.78}, {\"id\": 10043, \"productionDate\": \"2026-06-23\", \"machineNumber\": \"3\", \"beamNumber\": \"104\", \"pissingDate\": \"2026-06-18\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Deepak Yadav\", \"dayShiftHours\": 12, \"dayMeters\": 84.7, \"nightWorker\": \"Rohan Gupta\", \"nightShiftHours\": 12, \"nightMeters\": 85.5, \"picks\": 72, \"product\": \"Brocade Jacquard\", \"totalMeters\": 170.2, \"takaSerial\": \"T-1019\", \"foldingDate\": \"2026-06-23\", \"takaWeight\": 70.71}, {\"id\": 10044, \"productionDate\": \"2026-06-24\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"pissingDate\": \"2026-06-13\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 81.9, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 83.3, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 165.2, \"takaSerial\": \"T-1008\", \"foldingDate\": \"2026-06-24\", \"takaWeight\": 69.3}, {\"id\": 10045, \"productionDate\": \"2026-06-24\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"pissingDate\": \"2026-06-10\", \"pissingPerson\": \"Rahul Sharma\", \"dayWorker\": \"Vikas Verma\", \"dayShiftHours\": 12, \"dayMeters\": 75.7, \"nightWorker\": \"Sunil Singh\", \"nightShiftHours\": 12, \"nightMeters\": 83.9, \"picks\": 72, \"product\": \"Cotton Satin 60S\", \"totalMeters\": 159.6, \"takaSerial\": \"T-1015\", \"foldingDate\": \"2026-06-24\", \"takaWeight\": 69.78}, {\"id\": 10046, \"productionDate\": \"2026-06-24\", \"machineNumber\": \"3\", \"beamNumber\": \"104\", \"pissingDate\": \"2026-06-18\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Deepak Yadav\", \"dayShiftHours\": 12, \"dayMeters\": 85.9, \"nightWorker\": \"Rohan Gupta\", \"nightShiftHours\": 12, \"nightMeters\": 88.7, \"picks\": 72, \"product\": \"Brocade Jacquard\", \"totalMeters\": 174.6, \"takaSerial\": \"T-1020\", \"foldingDate\": \"2026-06-26\", \"takaWeight\": 72.81}, {\"id\": 10047, \"productionDate\": \"2026-06-24\", \"machineNumber\": \"4\", \"beamNumber\": \"105\", \"pissingDate\": \"2026-06-24\", \"pissingPerson\": \"Amit Kumar\", \"dayWorker\": \"Rajesh Patel\", \"dayShiftHours\": 12, \"dayMeters\": 78.6, \"nightWorker\": \"Suresh Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 88.5, \"picks\": 60, \"product\": \"Organza 50D\", \"totalMeters\": 167.1, \"takaSerial\": \"T-1023\", \"foldingDate\": \"2026-06-26\", \"takaWeight\": 71.96}, {\"id\": 10048, \"productionDate\": \"2026-06-25\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"pissingDate\": \"2026-06-13\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 87.7, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 94.4, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 182.1, \"takaSerial\": \"T-1009\", \"foldingDate\": \"2026-06-27\", \"takaWeight\": 72.52}, {\"id\": 10049, \"productionDate\": \"2026-06-25\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"pissingDate\": \"2026-06-10\", \"pissingPerson\": \"Rahul Sharma\", \"dayWorker\": \"Vikas Verma\", \"dayShiftHours\": 12, \"dayMeters\": 88.9, \"nightWorker\": \"Sunil Singh\", \"nightShiftHours\": 12, \"nightMeters\": 92.3, \"picks\": 72, \"product\": \"Cotton Satin 60S\", \"totalMeters\": 181.2, \"takaSerial\": \"T-1016\", \"foldingDate\": \"2026-06-27\", \"takaWeight\": 72.95}, {\"id\": 10050, \"productionDate\": \"2026-06-25\", \"machineNumber\": \"3\", \"beamNumber\": \"104\", \"pissingDate\": \"2026-06-18\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Deepak Yadav\", \"dayShiftHours\": 12, \"dayMeters\": 91.0, \"nightWorker\": \"Rohan Gupta\", \"nightShiftHours\": 12, \"nightMeters\": 92.0, \"picks\": 72, \"product\": \"Brocade Jacquard\", \"totalMeters\": 183.0, \"takaSerial\": \"T-1020\", \"foldingDate\": \"2026-06-26\", \"takaWeight\": 72.81}, {\"id\": 10051, \"productionDate\": \"2026-06-25\", \"machineNumber\": \"4\", \"beamNumber\": \"105\", \"pissingDate\": \"2026-06-24\", \"pissingPerson\": \"Amit Kumar\", \"dayWorker\": \"Rajesh Patel\", \"dayShiftHours\": 12, \"dayMeters\": 90.7, \"nightWorker\": \"Suresh Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 81.4, \"picks\": 60, \"product\": \"Organza 50D\", \"totalMeters\": 172.1, \"takaSerial\": \"T-1023\", \"foldingDate\": \"2026-06-26\", \"takaWeight\": 71.96}, {\"id\": 10052, \"productionDate\": \"2026-06-26\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"pissingDate\": \"2026-06-13\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 80.7, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 78.9, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 159.6, \"takaSerial\": \"T-1009\", \"foldingDate\": \"2026-06-27\", \"takaWeight\": 72.52}, {\"id\": 10053, \"productionDate\": \"2026-06-26\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"pissingDate\": \"2026-06-10\", \"pissingPerson\": \"Rahul Sharma\", \"dayWorker\": \"Vikas Verma\", \"dayShiftHours\": 12, \"dayMeters\": 82.9, \"nightWorker\": \"Sunil Singh\", \"nightShiftHours\": 12, \"nightMeters\": 87.7, \"picks\": 72, \"product\": \"Cotton Satin 60S\", \"totalMeters\": 170.6, \"takaSerial\": \"T-1016\", \"foldingDate\": \"2026-06-27\", \"takaWeight\": 72.95}, {\"id\": 10054, \"productionDate\": \"2026-06-26\", \"machineNumber\": \"3\", \"beamNumber\": \"104\", \"pissingDate\": \"2026-06-18\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Deepak Yadav\", \"dayShiftHours\": 12, \"dayMeters\": 77.4, \"nightWorker\": \"Rohan Gupta\", \"nightShiftHours\": 12, \"nightMeters\": 85.1, \"picks\": 72, \"product\": \"Brocade Jacquard\", \"totalMeters\": 162.5, \"takaSerial\": \"T-1020\", \"foldingDate\": \"2026-06-26\", \"takaWeight\": 72.81}, {\"id\": 10055, \"productionDate\": \"2026-06-26\", \"machineNumber\": \"4\", \"beamNumber\": \"105\", \"pissingDate\": \"2026-06-24\", \"pissingPerson\": \"Amit Kumar\", \"dayWorker\": \"Rajesh Patel\", \"dayShiftHours\": 12, \"dayMeters\": 88.5, \"nightWorker\": \"Suresh Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 86.3, \"picks\": 60, \"product\": \"Organza 50D\", \"totalMeters\": 174.8, \"takaSerial\": \"T-1023\", \"foldingDate\": \"2026-06-26\", \"takaWeight\": 71.96}, {\"id\": 10056, \"productionDate\": \"2026-06-27\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"pissingDate\": \"2026-06-13\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 90.3, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 86.0, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 176.3, \"takaSerial\": \"T-1009\", \"foldingDate\": \"2026-06-27\", \"takaWeight\": 72.52}, {\"id\": 10057, \"productionDate\": \"2026-06-27\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"pissingDate\": \"2026-06-10\", \"pissingPerson\": \"Rahul Sharma\", \"dayWorker\": \"Vikas Verma\", \"dayShiftHours\": 12, \"dayMeters\": 76.7, \"nightWorker\": \"Sunil Singh\", \"nightShiftHours\": 12, \"nightMeters\": 92.6, \"picks\": 72, \"product\": \"Cotton Satin 60S\", \"totalMeters\": 169.3, \"takaSerial\": \"T-1016\", \"foldingDate\": \"2026-06-27\", \"takaWeight\": 72.95}, {\"id\": 10058, \"productionDate\": \"2026-06-27\", \"machineNumber\": \"3\", \"beamNumber\": \"104\", \"pissingDate\": \"2026-06-18\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Deepak Yadav\", \"dayShiftHours\": 12, \"dayMeters\": 75.4, \"nightWorker\": \"Rohan Gupta\", \"nightShiftHours\": 12, \"nightMeters\": 79.3, \"picks\": 72, \"product\": \"Brocade Jacquard\", \"totalMeters\": 154.7, \"takaSerial\": \"T-1021\", \"foldingDate\": \"2026-06-29\", \"takaWeight\": 70.2}, {\"id\": 10059, \"productionDate\": \"2026-06-27\", \"machineNumber\": \"4\", \"beamNumber\": \"105\", \"pissingDate\": \"2026-06-24\", \"pissingPerson\": \"Amit Kumar\", \"dayWorker\": \"Rajesh Patel\", \"dayShiftHours\": 12, \"dayMeters\": 84.1, \"nightWorker\": \"Suresh Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 79.9, \"picks\": 60, \"product\": \"Organza 50D\", \"totalMeters\": 164.0, \"takaSerial\": \"T-1024\", \"foldingDate\": \"2026-06-29\", \"takaWeight\": 71.58}, {\"id\": 10060, \"productionDate\": \"2026-06-28\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"pissingDate\": \"2026-06-13\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 83.2, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 88.5, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 171.7, \"takaSerial\": \"T-1010\", \"foldingDate\": \"2026-06-30\", \"takaWeight\": 69.41}, {\"id\": 10061, \"productionDate\": \"2026-06-28\", \"machineNumber\": \"2\", \"beamNumber\": \"102\", \"pissingDate\": \"2026-06-10\", \"pissingPerson\": \"Rahul Sharma\", \"dayWorker\": \"Vikas Verma\", \"dayShiftHours\": 12, \"dayMeters\": 79.6, \"nightWorker\": \"Sunil Singh\", \"nightShiftHours\": 12, \"nightMeters\": 78.8, \"picks\": 72, \"product\": \"Cotton Satin 60S\", \"totalMeters\": 158.4, \"takaSerial\": \"T-1017\", \"foldingDate\": \"2026-06-28\", \"takaWeight\": 22.18}, {\"id\": 10062, \"productionDate\": \"2026-06-28\", \"machineNumber\": \"3\", \"beamNumber\": \"104\", \"pissingDate\": \"2026-06-18\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Deepak Yadav\", \"dayShiftHours\": 12, \"dayMeters\": 85.5, \"nightWorker\": \"Rohan Gupta\", \"nightShiftHours\": 12, \"nightMeters\": 93.7, \"picks\": 72, \"product\": \"Brocade Jacquard\", \"totalMeters\": 179.2, \"takaSerial\": \"T-1021\", \"foldingDate\": \"2026-06-29\", \"takaWeight\": 70.2}, {\"id\": 10063, \"productionDate\": \"2026-06-28\", \"machineNumber\": \"4\", \"beamNumber\": \"105\", \"pissingDate\": \"2026-06-24\", \"pissingPerson\": \"Amit Kumar\", \"dayWorker\": \"Rajesh Patel\", \"dayShiftHours\": 12, \"dayMeters\": 91.0, \"nightWorker\": \"Suresh Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 83.8, \"picks\": 60, \"product\": \"Organza 50D\", \"totalMeters\": 174.8, \"takaSerial\": \"T-1024\", \"foldingDate\": \"2026-06-29\", \"takaWeight\": 71.58}, {\"id\": 10064, \"productionDate\": \"2026-06-29\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"pissingDate\": \"2026-06-13\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 78.8, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 78.2, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 157.0, \"takaSerial\": \"T-1010\", \"foldingDate\": \"2026-06-30\", \"takaWeight\": 69.41}, {\"id\": 10065, \"productionDate\": \"2026-06-29\", \"machineNumber\": \"3\", \"beamNumber\": \"104\", \"pissingDate\": \"2026-06-18\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Deepak Yadav\", \"dayShiftHours\": 12, \"dayMeters\": 87.5, \"nightWorker\": \"Rohan Gupta\", \"nightShiftHours\": 12, \"nightMeters\": 80.0, \"picks\": 72, \"product\": \"Brocade Jacquard\", \"totalMeters\": 167.5, \"takaSerial\": \"T-1021\", \"foldingDate\": \"2026-06-29\", \"takaWeight\": 70.2}, {\"id\": 10066, \"productionDate\": \"2026-06-29\", \"machineNumber\": \"4\", \"beamNumber\": \"105\", \"pissingDate\": \"2026-06-24\", \"pissingPerson\": \"Amit Kumar\", \"dayWorker\": \"Rajesh Patel\", \"dayShiftHours\": 12, \"dayMeters\": 86.8, \"nightWorker\": \"Suresh Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 85.7, \"picks\": 60, \"product\": \"Organza 50D\", \"totalMeters\": 172.5, \"takaSerial\": \"T-1024\", \"foldingDate\": \"2026-06-29\", \"takaWeight\": 71.58}, {\"id\": 10067, \"productionDate\": \"2026-06-30\", \"machineNumber\": \"1\", \"beamNumber\": \"103\", \"pissingDate\": \"2026-06-13\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Rahul Sharma\", \"dayShiftHours\": 12, \"dayMeters\": 81.1, \"nightWorker\": \"Amit Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 86.0, \"picks\": 68, \"product\": \"Damask Royal Satin\", \"totalMeters\": 167.1, \"takaSerial\": \"T-1010\", \"foldingDate\": \"2026-06-30\", \"takaWeight\": 69.41}, {\"id\": 10068, \"productionDate\": \"2026-06-30\", \"machineNumber\": \"3\", \"beamNumber\": \"104\", \"pissingDate\": \"2026-06-18\", \"pissingPerson\": \"Suresh\", \"dayWorker\": \"Deepak Yadav\", \"dayShiftHours\": 12, \"dayMeters\": 77.8, \"nightWorker\": \"Rohan Gupta\", \"nightShiftHours\": 12, \"nightMeters\": 87.7, \"picks\": 72, \"product\": \"Brocade Jacquard\", \"totalMeters\": 165.5, \"takaSerial\": \"T-1022\", \"foldingDate\": \"2026-06-30\", \"takaWeight\": 23.17}, {\"id\": 10069, \"productionDate\": \"2026-06-30\", \"machineNumber\": \"4\", \"beamNumber\": \"105\", \"pissingDate\": \"2026-06-24\", \"pissingPerson\": \"Amit Kumar\", \"dayWorker\": \"Rajesh Patel\", \"dayShiftHours\": 12, \"dayMeters\": 77.2, \"nightWorker\": \"Suresh Kumar\", \"nightShiftHours\": 12, \"nightMeters\": 89.0, \"picks\": 60, \"product\": \"Organza 50D\", \"totalMeters\": 166.2, \"takaSerial\": \"T-1025\", \"foldingDate\": \"2026-06-30\", \"takaWeight\": 23.27}]", "manage-looms": "[{\"id\": \"L1\", \"name\": \"Smit Rapier 190\"}, {\"id\": \"L2\", \"name\": \"Picanol Optimax\"}, {\"id\": \"L3\", \"name\": \"Itema R9500\"}]", "manage-jacquards": "[{\"id\": \"J1\", \"name\": \"Staubli SX\"}, {\"id\": \"J2\", \"name\": \"Bonas Ji\"}, {\"id\": \"J3\", \"name\": \"Grosse electronic\"}]", "manage-jalas": "[{\"id\": \"JA1\", \"name\": \"Cotton\", \"ends\": 1440, \"fabricWidth\": 48, \"reedDensity\": 192, \"epiOption\": \"96*2\", \"stockportReed\": 192, \"breakdown\": {\"selvedge\": 40, \"leftBorder\": 200, \"bodyEnds\": 240, \"bodyRepeats\": 4, \"rightBorder\": 200, \"rightSelvedge\": 40, \"remainingEmpty\": 0}}, {\"id\": \"JA2\", \"name\": \"Nylon\", \"ends\": 1368, \"fabricWidth\": 52, \"reedDensity\": 192, \"epiOption\": \"48*4\", \"stockportReed\": 96, \"breakdown\": {\"selvedge\": 64, \"leftBorder\": 400, \"bodyEnds\": 440, \"bodyRepeats\": 4, \"rightBorder\": 400, \"rightSelvedge\": 64, \"remainingEmpty\": 0}}, {\"id\": \"JA3\", \"name\": \"Polyester\", \"ends\": 720, \"fabricWidth\": 48, \"reedDensity\": 192, \"epiOption\": \"96*2\", \"stockportReed\": 192, \"breakdown\": {\"selvedge\": 40, \"leftBorder\": 200, \"bodyEnds\": 240, \"bodyRepeats\": 4, \"rightBorder\": 200, \"rightSelvedge\": 40, \"remainingEmpty\": 0}}]", "manage-fanis": "[{\"id\": \"F1\", \"name\": \"84 x 52\"}, {\"id\": \"F2\", \"name\": \"72 x 52\"}, {\"id\": \"F3\", \"name\": \"64 x 52\"}]", "loom-designs": "[{\"id\": \"seed-damask-royal-satin\", \"code\": \"Damask Royal Satin\", \"item\": \"Saree\", \"loomType\": \"Jacquard\", \"hooksCount\": 1440, \"picksCount\": 68, \"ends\": 1440, \"reed\": \"72 DPI\", \"jacquardType\": \"Staubli\", \"harnessEnds\": 1440, \"totalWarpEnds\": 9600, \"totalWeftPicks\": 6800, \"warpRepeats\": 4, \"weftRepeats\": 4, \"epFile\": \"damask_royal.EP\", \"userEdited\": false}, {\"id\": \"seed-silk-brocade\", \"code\": \"Brocade Jacquard\", \"item\": \"Dress Material\", \"loomType\": \"Jacquard\", \"hooksCount\": 2688, \"picksCount\": 72, \"ends\": 2688, \"reed\": \"84 DPI\", \"jacquardType\": \"Bonas\", \"harnessEnds\": 2688, \"totalWarpEnds\": 10752, \"totalWeftPicks\": 7200, \"warpRepeats\": 2, \"weftRepeats\": 2, \"epFile\": \"brocade_gold.EP\", \"userEdited\": false}, {\"id\": \"seed-floral-organza\", \"code\": \"Organza 50D\", \"item\": \"Dupatta\", \"loomType\": \"Jacquard\", \"hooksCount\": 1344, \"picksCount\": 60, \"ends\": 1344, \"reed\": \"64 DPI\", \"jacquardType\": \"Grosse\", \"harnessEnds\": 1344, \"totalWarpEnds\": 8064, \"totalWeftPicks\": 6000, \"warpRepeats\": 6, \"weftRepeats\": 6, \"epFile\": \"floral_organza.EP\", \"userEdited\": false}]", "costing-products-v4": "[{\"id\": 1, \"productName\": \"Damask Royal Satin Saree\", \"fabricWidth\": 48, \"warpEnds\": 9600, \"warpCount\": 100, \"warpRate\": 145, \"warpSizing\": 8, \"warpWastage\": 5, \"weftPicks\": 68, \"weftCount\": 150, \"weftRate\": 160, \"weftWastage\": 7, \"weavingRate\": 12, \"millingRate\": 2, \"overheadRate\": 5, \"totalWarpWeight\": 0.108, \"totalWeftWeight\": 0.082, \"totalWarpCost\": 15.66, \"totalWeftCost\": 13.12, \"totalCost\": 37.78}]", "aethertasks_db_state_v7": "{\"soundEnabled\": true, \"darkMode\": true, \"collapsedPersonal\": false, \"collapsedWork\": false, \"categories\": [{\"id\": \"personal\", \"name\": \"Personal Tasks Focus\", \"icon\": \"ri-focus-3-line\", \"colorClass\": \"text-accent2\"}, {\"id\": \"work\", \"name\": \"Work Deliverables\", \"icon\": \"ri-briefcase-line\", \"colorClass\": \"text-accent\"}, {\"id\": \"design-assets\", \"name\": \"Design Assets\", \"icon\": \"ri-palette-line\", \"colorClass\": \"text-rose-500\", \"employeeId\": \"sarah\"}, {\"id\": \"coding-pipeline\", \"name\": \"Coding Pipeline\", \"icon\": \"ri-code-s-slash-line\", \"colorClass\": \"text-cyan-500\", \"employeeId\": \"alex\"}], \"employees\": [{\"id\": \"ceo\", \"name\": \"CEO / Founder\", \"role\": \"Executive Manager\", \"salaryStyle\": \"Per Month Fixed\", \"salaryAmount\": 50000, \"joinDate\": \"2026-01-01\", \"status\": \"Active\", \"avatarColor\": \"from-accent to-accent2\"}, {\"id\": \"sarah\", \"name\": \"Sarah Jenkins\", \"role\": \"Textile Designer\", \"salaryStyle\": \"Per Month Fixed\", \"salaryAmount\": 18000, \"joinDate\": \"2026-06-01\", \"status\": \"Active\", \"avatarColor\": \"from-pink-500 to-rose-500\"}, {\"id\": \"alex\", \"name\": \"Alex Carter\", \"role\": \"Supervisor\", \"salaryStyle\": \"Per Month Fixed\", \"salaryAmount\": 15000, \"joinDate\": \"2026-06-01\", \"status\": \"Active\", \"avatarColor\": \"from-cyan-500 to-blue-500\"}, {\"id\": \"raj\", \"name\": \"Raj Patel\", \"role\": \"QC\", \"salaryStyle\": \"Per Month Fixed\", \"salaryAmount\": 12000, \"joinDate\": \"2026-06-01\", \"status\": \"Active\", \"avatarColor\": \"from-amber-500 to-orange-500\"}, {\"id\": \"rahul\", \"name\": \"Rahul Sharma\", \"role\": \"Karigar (Weaving)\", \"salaryStyle\": \"Per Month Fixed\", \"salaryAmount\": 12000, \"joinDate\": \"2026-06-01\", \"status\": \"Active\", \"avatarColor\": \"from-accent to-accent2\"}, {\"id\": \"amit\", \"name\": \"Amit Kumar\", \"role\": \"Karigar (Weaving)\", \"salaryStyle\": \"Per Month Fixed\", \"salaryAmount\": 12000, \"joinDate\": \"2026-06-01\", \"status\": \"Active\", \"avatarColor\": \"from-accent2 to-accent3\"}, {\"id\": \"vikas\", \"name\": \"Vikas Verma\", \"role\": \"Karigar (Weaving)\", \"salaryStyle\": \"Per Month Fixed\", \"salaryAmount\": 12000, \"joinDate\": \"2026-06-01\", \"status\": \"Active\", \"avatarColor\": \"from-accent3 to-accent\"}, {\"id\": \"sunil\", \"name\": \"Sunil Singh\", \"role\": \"Karigar (Weaving)\", \"salaryStyle\": \"Per Month Fixed\", \"salaryAmount\": 12000, \"joinDate\": \"2026-06-01\", \"status\": \"Active\", \"avatarColor\": \"from-emerald-500 to-teal-500\"}, {\"id\": \"deepak\", \"name\": \"Deepak Yadav\", \"role\": \"Karigar (Weaving)\", \"salaryStyle\": \"Per Month Fixed\", \"salaryAmount\": 12000, \"joinDate\": \"2026-06-01\", \"status\": \"Active\", \"avatarColor\": \"from-pink-500 to-rose-500\"}, {\"id\": \"rohan\", \"name\": \"Rohan Gupta\", \"role\": \"Karigar (Weaving)\", \"salaryStyle\": \"Per Month Fixed\", \"salaryAmount\": 12000, \"joinDate\": \"2026-06-01\", \"status\": \"Active\", \"avatarColor\": \"from-cyan-500 to-blue-500\"}, {\"id\": \"rajesh\", \"name\": \"Rajesh Patel\", \"role\": \"Karigar (Weaving)\", \"salaryStyle\": \"Per Month Fixed\", \"salaryAmount\": 12000, \"joinDate\": \"2026-06-01\", \"status\": \"Active\", \"avatarColor\": \"from-amber-500 to-orange-500\"}, {\"id\": \"suresh_k\", \"name\": \"Suresh Kumar\", \"role\": \"Karigar (Weaving)\", \"salaryStyle\": \"Per Month Fixed\", \"salaryAmount\": 12000, \"joinDate\": \"2026-06-01\", \"status\": \"Active\", \"avatarColor\": \"from-pink-500 to-rose-500\"}, {\"id\": \"suresh\", \"name\": \"Suresh\", \"role\": \"Beam Loading\", \"salaryStyle\": \"Per Month Fixed\", \"salaryAmount\": 10000, \"joinDate\": \"2026-06-01\", \"status\": \"Active\", \"avatarColor\": \"from-accent to-accent2\"}, {\"id\": \"mahesh\", \"name\": \"Mahesh\", \"role\": \"Beam Loading\", \"salaryStyle\": \"Per Month Fixed\", \"salaryAmount\": 10000, \"joinDate\": \"2026-06-01\", \"status\": \"Active\", \"avatarColor\": \"from-accent2 to-accent3\"}], \"tasks\": [{\"id\": \"task-t1\", \"text\": \"Inspect newly arrived warp beams for Silk Satin\", \"assignedBy\": \"ceo\", \"assignedTo\": \"alex\", \"date\": \"2026-06-11\", \"createdAt\": \"2026-06-11T09:00:00.000Z\", \"deadline\": \"2026-06-15\", \"completed\": true, \"completedAt\": \"2026-06-14T15:30:00.000Z\", \"priority\": \"High\", \"type\": \"work\", \"subtasks\": [{\"id\": \"sub-s1\", \"text\": \"Check beam ends count matches 9600\", \"completed\": true}, {\"id\": \"sub-s2\", \"text\": \"Verify quality is 100D Silk Satin\", \"completed\": true}]}, {\"id\": \"task-t2\", \"text\": \"Prepare digital saree border layout designs\", \"assignedBy\": \"ceo\", \"assignedTo\": \"sarah\", \"date\": \"2026-06-02\", \"createdAt\": \"2026-06-02T10:00:00.000Z\", \"deadline\": \"2026-06-10\", \"completed\": true, \"completedAt\": \"2026-06-09T18:00:00.000Z\", \"priority\": \"Medium\", \"type\": \"work\", \"subtasks\": [{\"id\": \"sub-s3\", \"text\": \"Floral borders repeat pattern\", \"completed\": true}, {\"id\": \"sub-s4\", \"text\": \"Export as EP format\", \"completed\": true}]}, {\"id\": \"task-t3\", \"text\": \"Quality check finished rolls (Taka T-1001 to T-1005)\", \"assignedBy\": \"ceo\", \"assignedTo\": \"raj\", \"date\": \"2026-06-15\", \"createdAt\": \"2026-06-15T09:00:00.000Z\", \"deadline\": \"2026-06-20\", \"completed\": true, \"completedAt\": \"2026-06-19T17:00:00.000Z\", \"priority\": \"High\", \"type\": \"work\", \"subtasks\": [{\"id\": \"sub-s5\", \"text\": \"Measure roll weight\", \"completed\": true}, {\"id\": \"sub-s6\", \"text\": \"Inspect for weft slub defects\", \"completed\": true}]}], \"logs\": [{\"id\": \"log-1\", \"timestamp\": \"2026-06-02T10:05:00.000Z\", \"text\": \"CEO delegated task to Sarah Jenkins: 'Prepare digital saree border layout designs'\"}, {\"id\": \"log-2\", \"timestamp\": \"2026-06-09T18:01:00.000Z\", \"text\": \"Sarah Jenkins completed task: 'Prepare digital saree border layout designs'\"}, {\"id\": \"log-3\", \"timestamp\": \"2026-06-11T09:02:00.000Z\", \"text\": \"CEO delegated task to Alex Carter: 'Inspect newly arrived warp beams for Silk Satin'\"}, {\"id\": \"log-4\", \"timestamp\": \"2026-06-14T15:31:00.000Z\", \"text\": \"Alex Carter completed task: 'Inspect newly arrived warp beams for Silk Satin'\"}, {\"id\": \"log-5\", \"timestamp\": \"2026-06-15T09:05:00.000Z\", \"text\": \"CEO delegated task to Raj Patel: 'Quality check finished rolls (Taka T-1001 to T-1005)'\"}, {\"id\": \"log-6\", \"timestamp\": \"2026-06-19T17:02:00.000Z\", \"text\": \"Raj Patel completed task: 'Quality check finished rolls (Taka T-1001 to T-1005)'\"}], \"loans\": [{\"id\": \"loan_1\", \"employeeName\": \"Rahul Sharma\", \"amount\": 6000, \"termMonths\": 6, \"monthlyInstallment\": 1000, \"startMonth\": \"2026-06\", \"issueDate\": \"2026-06-01\", \"status\": \"Active\"}, {\"id\": \"loan_2\", \"employeeName\": \"Amit Kumar\", \"amount\": 12000, \"termMonths\": 12, \"monthlyInstallment\": 1000, \"startMonth\": \"2026-06\", \"issueDate\": \"2026-06-01\", \"status\": \"Active\"}], \"salaryPayments\": {\"2026-06\": {\"Sarah Jenkins\": {\"advance\": 0, \"loan\": 0, \"status\": \"paid\"}, \"Alex Carter\": {\"advance\": 0, \"loan\": 0, \"status\": \"paid\"}, \"Raj Patel\": {\"advance\": 0, \"loan\": 0, \"status\": \"paid\"}, \"Rahul Sharma\": {\"advance\": 0, \"loan\": 1000, \"status\": \"paid\"}, \"Amit Kumar\": {\"advance\": 0, \"loan\": 1000, \"status\": \"paid\"}, \"Vikas Verma\": {\"advance\": 500, \"loan\": 0, \"status\": \"paid\"}, \"Sunil Singh\": {\"advance\": 0, \"loan\": 0, \"status\": \"paid\"}, \"Deepak Yadav\": {\"advance\": 0, \"loan\": 0, \"status\": \"paid\"}, \"Rohan Gupta\": {\"advance\": 0, \"loan\": 0, \"status\": \"paid\"}, \"Rajesh Patel\": {\"advance\": 0, \"loan\": 0, \"status\": \"paid\"}, \"Suresh Kumar\": {\"advance\": 0, \"loan\": 0, \"status\": \"paid\"}, \"Suresh\": {\"advance\": 0, \"loan\": 0, \"status\": \"paid\"}, \"Mahesh\": {\"advance\": 0, \"loan\": 0, \"status\": \"paid\"}}}}"};
      for (const [key, val] of Object.entries(data)) {
        localStorage.setItem(key, val);
      }
      localStorage.setItem('vishwa_fashions_seeded_june_2026', 'true');
      localStorage.removeItem('vishwa_fashions_factory_reset_active'); // Make sure reset flag is inactive so data is visible
      console.log("June 2026 data seeded successfully!");
      // Reload page to reflect changes if it's the first visit
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  })();

  // Inject style to allow selection inside tables
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    td, th, td *, th * {
      user-select: text !important;
      -webkit-user-select: text !important;
    }
  `;
  document.head.appendChild(styleEl);

  // Allow copying table cell text under the mouse cursor when pressing Ctrl+C
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
      const selection = window.getSelection().toString();
      if (!selection) {
        // No active text selection. Check if focusing on input/textarea
        if (document.activeElement && (
          document.activeElement.tagName === 'INPUT' || 
          document.activeElement.tagName === 'TEXTAREA' ||
          document.activeElement.isContentEditable
        )) {
          return;
        }
        // Find hovered table cell
        const hoveredCell = document.querySelector('td:hover, th:hover');
        if (hoveredCell) {
          // Avoid copying text if hovering directly over a button, select, or input inside the cell
          const hoveredEl = document.querySelectorAll(':hover');
          const lastHovered = hoveredEl[hoveredEl.length - 1];
          if (lastHovered && (
            lastHovered.tagName === 'BUTTON' || 
            lastHovered.tagName === 'INPUT' || 
            lastHovered.tagName === 'SELECT' || 
            lastHovered.closest('button') || 
            lastHovered.closest('a')
          )) {
            return;
          }
          // Copy cell text to clipboard
          const text = hoveredCell.innerText || hoveredCell.textContent;
          const cleanedText = text.trim();
          if (cleanedText) {
            navigator.clipboard.writeText(cleanedText).then(() => {
              if (typeof window.showToast === 'function') {
                window.showToast('Copied: "' + cleanedText + '"', 'success');
              } else if (typeof showToast === 'function') {
                showToast('Copied: "' + cleanedText + '"', 'success');
              }
            }).catch(err => {
              console.error('Failed to copy: ', err);
            });
          }
        }
      }
    }
  });

  // Dynamic formatter for Rs and kg to 1 decimal place
  (function() {
    function formatToOneDecimal(numStr) {
      const cleanNumStr = numStr.replace(/,/g, '');
      const num = parseFloat(cleanNumStr);
      if (isNaN(num)) return numStr;
      return num.toLocaleString('en-IN', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      });
    }

    function formatText(text) {
      let changed = false;
      
      // Pattern 1: currency symbol / text followed by a number (including commas)
      const newText1 = text.replace(/(₹|Rs\.?|rs\.?)\s*((?:\d{1,3}(?:,\d{2,3})+|\d+)(?:\.\d+)?)/gi, (match, prefix, num) => {
        changed = true;
        let cleanPrefix = prefix;
        if (/Rs\.?/i.test(prefix)) cleanPrefix = 'Rs.';
        return cleanPrefix + ' ' + formatToOneDecimal(num);
      });
      
      // Pattern 2: number followed by weight unit (including commas)
      const newText2 = newText1.replace(/((?:\d{1,3}(?:,\d{2,3})+|\d+)(?:\.\d+)?)\s*(kg|Kg|KG|kgs|Kgs)\b/gi, (match, num, suffix) => {
        changed = true;
        return formatToOneDecimal(num) + ' ' + suffix;
      });
      
      return { text: newText2, changed: newText1 !== text || newText2 !== newText1 };
    }

    function processNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const parent = node.parentNode;
        if (parent) {
          const tag = parent.tagName;
          if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'INPUT' || tag === 'TEXTAREA') {
            return;
          }
        }
        const res = formatText(node.nodeValue);
        if (res.changed) {
          node.nodeValue = res.text;
        }
      } else {
        for (let i = 0; i < node.childNodes.length; i++) {
          processNode(node.childNodes[i]);
        }
      }
    }

    const observer = new MutationObserver((mutations) => {
      observer.disconnect();
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            processNode(node);
          });
        } else if (mutation.type === 'characterData') {
          processNode(mutation.target);
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
    });

    function init() {
      processNode(document.body);
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();

  // Inject sidebar as soon as DOM parsed
  if (document.body) {
    injectSidebar();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      injectSidebar();
    });
  }
})();

// Global Beam Card Modal Implementation
(function() {
    const styleId = 'global-beamcard-modal-styles';
    if (!document.getElementById(styleId)) {
        const styleEl = document.createElement('style');
        styleEl.id = styleId;
        styleEl.innerHTML = `
            .gbc-modal-overlay {
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 20000;
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
            }
            .gbc-modal {
                background: var(--surface);
                border: 1px solid var(--border);
                border-radius: 24px;
                box-shadow: var(--shadow-xl);
                width: 95%;
                max-width: 1400px;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                padding: 2.5rem;
                color: var(--fg);
            }
            .gbc-modal * {
                box-sizing: border-box;
            }
            .gbc-modal .close-btn {
                position: absolute;
                top: 1rem;
                right: 1.25rem;
                background: transparent;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--muted);
                line-height: 1;
            }
            .gbc-modal .close-btn:hover {
                color: var(--fg);
            }
            .gbc-modal .timeline {
                position: relative;
                padding: 1.5rem 0;
                margin: 1.5rem 0;
            }
            .gbc-modal .timeline::before {
                content: '';
                position: absolute;
                top: 20px;
                bottom: 20px;
                left: 25px;
                width: 4px;
                background: var(--border);
                border-radius: 2px;
            }
            .gbc-modal .timeline-item {
                position: relative;
                margin: 2rem 0;
                clear: both;
            }
            .gbc-modal .timeline-item::after {
                content: '';
                display: table;
                clear: both;
            }
            .gbc-modal .timeline-item:first-child {
                margin-top: 0;
            }
            .gbc-modal .timeline-item:last-child {
                margin-bottom: 0;
            }
            .gbc-modal .timeline-dot {
                position: absolute;
                top: 10px;
                left: 12px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 4px solid var(--surface) !important;
                box-shadow: 0 0 0 1px var(--border), 0 4px 10px rgba(0, 0, 0, 0.1);
                z-index: 2;
            }
            .gbc-modal .timeline-content {
                position: relative;
                margin-left: 60px;
                background: var(--surface) !important;
                border: 1px solid var(--border) !important;
                border-radius: 12px !important;
                padding: 1.25rem !important;
                box-shadow: var(--shadow-sm);
            }
            .gbc-modal .timeline-content::before {
                content: '';
                position: absolute;
                top: 18px;
                left: -6px;
                width: 10px;
                height: 10px;
                background: var(--surface);
                border-left: 1px solid var(--border);
                border-bottom: 1px solid var(--border);
                transform: rotate(45deg);
                z-index: 1;
            }
            .gbc-modal .timeline-date {
                display: inline-block;
                color: var(--muted);
                font-size: 0.75rem;
                font-weight: 600;
                margin-bottom: 0.25rem;
                font-family: monospace;
            }
            .gbc-modal .badge {
                display: inline-block;
                padding: 0.25rem 0.5rem;
                font-size: 0.7rem;
                font-weight: 700;
                border-radius: 6px;
                text-transform: uppercase;
            }
            .gbc-modal .badge-active {
                background: rgba(139, 92, 246, 0.1);
                color: var(--accent);
                border: 1px solid rgba(139, 92, 246, 0.2);
            }
            .gbc-modal .badge-available {
                background: rgba(16, 185, 129, 0.1);
                color: var(--success);
                border: 1px solid rgba(16, 185, 129, 0.2);
            }
            .gbc-modal .badge-on-loom {
                background: rgba(139, 92, 246, 0.1);
                color: var(--accent);
                border: 1px solid rgba(139, 92, 246, 0.2);
            }
            .gbc-modal .badge-completed {
                background: rgba(139, 143, 163, 0.1);
                color: var(--muted);
                border: 1px solid rgba(139, 143, 163, 0.2);
            }
            @media only screen and (min-width: 768px) {
                .gbc-modal .timeline::before {
                    left: 50%;
                    margin-left: -2px;
                }
                .gbc-modal .timeline-dot {
                    left: 50%;
                    margin-left: -15px;
                    top: 15px;
                }
                .gbc-modal .timeline-content {
                    width: 44%;
                    margin: 0;
                    float: left;
                }
                .gbc-modal .timeline-content::before {
                    left: auto;
                    right: -6px;
                    border-left: none;
                    border-bottom: none;
                    border-right: 1px solid var(--border);
                    border-top: 1px solid var(--border);
                }
                .gbc-modal .timeline-date {
                    position: absolute;
                    width: 100%;
                    left: 120%;
                    top: 20px;
                    font-size: 0.85rem;
                }
                .gbc-modal .timeline-item:nth-child(even) .timeline-content {
                    float: right;
                }
                .gbc-modal .timeline-item:nth-child(even) .timeline-content::before {
                    right: auto;
                    left: -6px;
                    border-right: none;
                    border-top: none;
                    border-left: 1px solid var(--border);
                    border-bottom: 1px solid var(--border);
                }
                .gbc-modal .timeline-item:nth-child(even) .timeline-date {
                    left: auto;
                    right: 120%;
                    text-align: right;
                }
            }
        `;
        document.head.appendChild(styleEl);
    }

    const sampleBeamsFallback = [
        { id: "b101", beamNumber: "101", quality: "Silk Satin 100D", code: "SS-01", color: "Royal Blue", ends: 9600, meters: 1500, status: "On Loom", machineNumber: "1", createdAt: "2026-06-20", warpingPerson: "Mahesh Patel", history: [{ date: "2026-06-20", event: "Warped by Mahesh Patel", type: "warp" }, { date: "2026-06-25", event: "Jala Piecing by Suresh on Machine 1", type: "machine" }] },
        { id: "b102", beamNumber: "102", quality: "Organza 50D", code: "OG-02", color: "Blush Pink", ends: 8400, meters: 1800, status: "On Loom", machineNumber: "2", createdAt: "2026-06-21", warpingPerson: "Mahesh Patel", history: [{ date: "2026-06-21", event: "Warped by Mahesh Patel", type: "warp" }, { date: "2026-06-26", event: "Jala Piecing by Suresh on Machine 2", type: "machine" }] },
        { id: "b103", beamNumber: "103", quality: "Brocade Jacquard", code: "BJ-03", color: "Gold White", ends: 10200, meters: 1200, status: "On Loom", machineNumber: "3", createdAt: "2026-06-22", warpingPerson: "Ramesh Kumar", history: [{ date: "2026-06-22", event: "Warped by Ramesh Kumar", type: "warp" }, { date: "2026-06-27", event: "Jala Piecing by Mahesh on Machine 3", type: "machine" }] },
        { id: "b104", beamNumber: "104", quality: "Taffeta 75D", code: "TF-04", color: "Emerald Green", ends: 9000, meters: 2000, status: "On Loom", machineNumber: "4", createdAt: "2026-06-23", warpingPerson: "Ramesh Kumar", history: [{ date: "2026-06-23", event: "Warped by Ramesh Kumar", type: "warp" }, { date: "2026-06-28", event: "Jala Piecing by Mahesh on Machine 4", type: "machine" }] },
        { id: "b105", beamNumber: "105", quality: "Cotton Satin 60S", code: "CS-05", color: "Maroon", ends: 7200, meters: 1500, status: "Available", machineNumber: null, createdAt: "2026-06-29", warpingPerson: "Ramesh Kumar", history: [{ date: "2026-06-29", event: "Warped by Ramesh Kumar", type: "warp" }] }
    ];

    const sampleBeamLoadingsFallback = [
        { id: "bl-1", date: "2026-06-25", piecein: "Suresh", drawingIn: "", fani: "", dropPinJog: "", machineNumber: "1", beamNumber: "101", itemColor: "Silk Satin 100D - Royal Blue", meters: 1500, ends: 9600, rate: 150, paymentAmount: 1440.0 },
        { id: "bl-2", date: "2026-06-24", piecein: "", drawingIn: "Amit Kumar", fani: "", dropPinJog: "", machineNumber: "1", beamNumber: "101", itemColor: "Silk Satin 100D - Royal Blue", meters: 1500, ends: 9600, rate: 170, paymentAmount: 1632.0 },
        { id: "bl-3", date: "2026-06-24", piecein: "", drawingIn: "", fani: "Amit Kumar", dropPinJog: "", machineNumber: "1", beamNumber: "101", itemColor: "Silk Satin 100D - Royal Blue", meters: 1500, ends: 9600, rate: "", paymentAmount: 500.0 },
        { id: "bl-4", date: "2026-06-25", piecein: "", drawingIn: "", fani: "", dropPinJog: "Rahul Sharma", machineNumber: "1", beamNumber: "101", itemColor: "Silk Satin 100D - Royal Blue", meters: 1500, ends: 9600, rate: 50, paymentAmount: 480.0 }
    ];

    function getBeamDetailsStr(beam, eventDate, productionLogs) {
        if (!beam) return '';
        const q = beam.quality || '';
        const code = beam.code || '';
        const color = beam.color || '';
        const ends = beam.ends ? `${beam.ends}E` : '';
        let usedMeters = 0;
        if (productionLogs && productionLogs.length > 0) {
            usedMeters = productionLogs
                .filter(l => String(l.beamNumber) === String(beam.beamNumber))
                .reduce((sum, l) => sum + (parseFloat(l.totalMeters) || 0), 0);
        }
        const remainingMeters = (beam.meters || 0) - usedMeters;
        const metersStr = `${Math.round(remainingMeters)}/${beam.meters || 0}m`;
        const parts = [q, (code && color) ? `${code} / ${color}` : (code || color), ends, metersStr].filter(Boolean);
        return `(${parts.join(' | ')})`;
    }

    window.showGlobalBeamCard = function(beamNumber) {
        if (!beamNumber) return;
        
        let beamsList = [];
        try {
            beamsList = JSON.parse(localStorage.getItem('warp-beams') || '[]');
        } catch(e) {}
        if (!beamsList || !beamsList.length) {
            beamsList = sampleBeamsFallback;
        }

        const beam = beamsList.find(b => String(b.beamNumber) === String(beamNumber));
        if (!beam) {
            alert(`Beam #${beamNumber} not found in inventory.`);
            return;
        }

        let productionLogs = [];
        try {
            productionLogs = JSON.parse(localStorage.getItem('productionLogs') || '[]');
        } catch(e) {}

        let beamLoadings = [];
        try {
            beamLoadings = JSON.parse(localStorage.getItem('warp-beam-loadings') || '[]');
        } catch(e) {}
        if (!beamLoadings || !beamLoadings.length) {
            beamLoadings = sampleBeamLoadingsFallback;
        }

        let machines = [];
        try {
            machines = JSON.parse(localStorage.getItem('machines') || '[]');
        } catch(e) {}

        const beamLogs = productionLogs.filter(l => String(l.beamNumber) === String(beam.beamNumber));

        const getBeamTimeline = (beam) => {
            if (!beam) return [];
            const hasAnyProduction = beamLogs.length > 0;

            const loadingEvents = (beamLoadings || [])
                .filter(bl => String(bl.beamNumber) === String(beam.beamNumber))
                .map(bl => {
                    let roleLabel = '';
                    let workerName = '';
                    if (bl.piecein) { roleLabel = 'Piece In'; workerName = bl.piecein; }
                    else if (bl.drawingIn) { roleLabel = 'Drawing In'; workerName = bl.drawingIn; }
                    else if (bl.fani) { roleLabel = 'Fani (Reed)'; workerName = bl.fani; }
                    else if (bl.dropPinJog) { roleLabel = 'Drop pin/Jog'; workerName = bl.dropPinJog; }

                    const detailsStr = getBeamDetailsStr(beam, bl.date, productionLogs);
                    return {
                        date: bl.date,
                        event: `${roleLabel} by ${workerName} - Beam #${beam.beamNumber} ${detailsStr}`,
                        type: 'beam-loading',
                        category: 'derived'
                    };
                });

            let baseTimeline = [
                ...((beam.history || [])
                    .map((h, idx) => ({ ...h, historyIndex: idx, category: 'history', type: h.type || 'system' }))
                    .filter(h => {
                        const e = (h.event || '').toLowerCase();
                        if (e.includes('sync from production') || e.includes('removed') || e.includes('returned to available')) return false;
                        return true;
                    })
                    .filter(h => {
                        const e = (h.event || '').toLowerCase();
                        if (e.includes('pissing') || e.includes('piecing')) return true;
                        if (e.includes('unloaded')) return hasAnyProduction;
                        if (!hasAnyProduction && e.includes('machine')) return false;
                        return true;
                    })
                    .map(h => {
                        let event = h.event;
                        if (event === 'Beam Created' || event === 'Beam manufactured') {
                            event = `Beam manufactured by ${beam.warpingPerson || 'Unknown'}`;
                        }
                        return { ...h, event };
                    })),
                ...loadingEvents
            ];

            baseTimeline.sort((a, b) => a.date.localeCompare(b.date));

            const getMachineFromEvent = (eventStr) => {
                if (!eventStr) return null;
                const lower = eventStr.toLowerCase();
                const sortedMachines = [...machines].sort((a, b) => b.name.length - a.name.length);
                for (const m of sortedMachines) {
                    const mNameEscaped = m.name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                    const regex1 = new RegExp(`(?:machine|no\\.?|on|from|completed on|unloaded from)\\s*(?:machine\\s+)?\\b${mNameEscaped}\\b`, 'i');
                    const regex2 = new RegExp(`\\b${mNameEscaped}\\b`, 'i');
                    if (regex1.test(lower) || regex2.test(lower)) {
                        return m;
                    }
                }
                return null;
            };

            const cycles = [];
            baseTimeline.forEach((item) => {
                const eventText = (item.event || '').toLowerCase();
                if (eventText.includes('pissing on') || eventText.includes('jala piecing') || eventText.includes('loaded on')) {
                    const mach = getMachineFromEvent(item.event);
                    if (mach) {
                        cycles.push({
                            machine: mach,
                            startEvent: item,
                            startDate: item.date,
                            endDate: null,
                            logs: []
                        });
                    }
                }
            });

            cycles.forEach((cycle) => {
                let foundEnd = false;
                const startIndex = baseTimeline.indexOf(cycle.startEvent);
                for (let j = startIndex + 1; j < baseTimeline.length; j++) {
                    const nextItem = baseTimeline[j];
                    const nextEventText = (nextItem.event || '').toLowerCase();
                    const isUnload = nextEventText.includes('unloaded') || nextEventText.includes('completed') || nextEventText.includes('removed');
                    const itemMach = getMachineFromEvent(nextItem.event);
                    
                    if (isUnload && itemMach && (itemMach.id === cycle.machine.id || itemMach.name === cycle.machine.name)) {
                        cycle.endDate = nextItem.date;
                        foundEnd = true;
                        break;
                    }
                    
                    if (nextEventText.includes('pissing on') || nextEventText.includes('jala piecing') || nextEventText.includes('loaded on')) {
                        cycle.endDate = nextItem.date;
                        foundEnd = true;
                        break;
                    }
                }
                if (!foundEnd) {
                    cycle.endDate = '9999-12-31';
                }
            });

            beamLogs.forEach(log => {
                let bestCycle = null;
                cycles.forEach(cycle => {
                    if (log.machineNumber == cycle.machine.id || log.machineNumber == cycle.machine.name) {
                        if (log.productionDate >= cycle.startDate && log.productionDate <= cycle.endDate) {
                            if (!bestCycle || cycle.startDate > bestCycle.startDate) {
                                bestCycle = cycle;
                            }
                        }
                    }
                });
                
                if (bestCycle) {
                    bestCycle.logs.push({
                        productionDate: log.productionDate,
                        foldingDate: log.foldingDate,
                        takaSerial: log.takaSerial || 'Pending',
                        meters: parseFloat(log.totalMeters) || 0,
                        weight: parseFloat(log.takaWeight) || 0
                    });
                } else if (cycles.length > 0) {
                    const sameMachineCycles = cycles.filter(c => log.machineNumber == c.machine.id || log.machineNumber == c.machine.name);
                    if (sameMachineCycles.length > 0) {
                        sameMachineCycles[sameMachineCycles.length - 1].logs.push({
                            productionDate: log.productionDate,
                            foldingDate: log.foldingDate,
                            takaSerial: log.takaSerial || 'Pending',
                            meters: parseFloat(log.totalMeters) || 0,
                            weight: parseFloat(log.takaWeight) || 0
                        });
                    }
                }
            });

            const finalTimeline = [];
            const firstCycleIdx = cycles.length > 0 ? baseTimeline.indexOf(cycles[0].startEvent) : baseTimeline.length;
            for (let i = 0; i < firstCycleIdx; i++) {
                finalTimeline.push(baseTimeline[i]);
            }

            cycles.forEach(cycle => {
                finalTimeline.push(cycle.startEvent);

                if (cycle.logs.length > 0) {
                    cycle.logs.sort((a, b) => a.productionDate.localeCompare(b.productionDate));
                    const mDisp = cycle.machine.name.toString().toLowerCase().includes('machine') ? cycle.machine.name : `Machine No. ${cycle.machine.name}`;
                    const subTotalMeters = cycle.logs.reduce((acc, l) => acc + l.meters, 0);
                    const uniqueTakas = {};
                    cycle.logs.forEach(l => {
                        if (l.takaSerial && l.takaSerial !== 'Pending') {
                            uniqueTakas[l.takaSerial] = l.weight;
                        }
                    });
                    const subTotalWeight = Object.values(uniqueTakas).reduce((acc, w) => acc + w, 0);
                    const prodDate = cycle.logs[0].productionDate;

                    finalTimeline.push({
                        date: prodDate,
                        event: `Production Details for ${mDisp}`,
                        type: 'production',
                        category: 'derived',
                        details: {
                            machineNumber: cycle.machine.name,
                            logs: cycle.logs,
                            subTotalMeters,
                            subTotalWeight
                        }
                    });
                }

                const startPos = baseTimeline.indexOf(cycle.startEvent);
                const nextCyclePos = cycles.indexOf(cycle) + 1 < cycles.length ? baseTimeline.indexOf(cycles[cycles.indexOf(cycle) + 1].startEvent) : baseTimeline.length;
                for (let i = startPos + 1; i < nextCyclePos; i++) {
                    if (!finalTimeline.includes(baseTimeline[i])) {
                        finalTimeline.push(baseTimeline[i]);
                    }
                }
            });

            baseTimeline.forEach(item => {
                if (!finalTimeline.includes(item)) {
                    finalTimeline.push(item);
                }
            });

            return finalTimeline;
        };

        const beamUsed = beamLogs.reduce((acc, log) => acc + (parseFloat(log.totalMeters) || 0), 0);
        const beamRemaining = (parseFloat(beam.meters) || 0) - beamUsed;
        const beamShortagePercent = beam.meters > 0 ? (beamRemaining / beam.meters) * 100 : 0;
        const isCompleted = beam.status === 'Completed';

        const formatDate = (dateStr) => {
            if (!dateStr || dateStr === '9999-12-31') return '';
            try {
                const parts = dateStr.split('-');
                if (parts.length === 3) {
                    const d = new Date(parts[0], parts[1]-1, parts[2]);
                    if (!isNaN(d.getTime())) {
                        return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                    }
                }
            } catch(e) {}
            return dateStr;
        };

        let overlay = document.getElementById('global-beamcard-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'global-beamcard-overlay';
            overlay.className = 'gbc-modal-overlay';
            overlay.onclick = () => { overlay.style.display = 'none'; };
            document.body.appendChild(overlay);
        }

        overlay.innerHTML = `
            <div class="gbc-modal" onclick="event.stopPropagation()">
                <button type="button" class="close-btn" onclick="document.getElementById('global-beamcard-overlay').style.display='none'">&times;</button>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <div>
                        <h2 style="margin: 0; font-family: var(--font-display); font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; font-size: 1.3rem;">BEAM CARD #${beam.beamNumber}</h2>
                        <p style="color: var(--muted); font-size: 0.85rem; margin: 0.25rem 0 0 0;">${beam.quality || ''} | ${beam.code || ''} / ${beam.color || ''}</p>
                    </div>
                </div>
                
                <!-- Stat Grid -->
                <div style="display: grid; grid-template-columns: repeat(${isCompleted ? 6 : 5}, 1fr); gap: 0.75rem; margin-bottom: 2rem;">
                    <div class="card" style="background: var(--bg); margin: 0; padding: 1rem; border: 1px solid var(--border); border-radius: 12px;">
                        <div style="font-size: 0.7rem; color: var(--muted); font-weight: 600;">ENDS</div>
                        <div style="font-size: 1.25rem; font-weight: 700; font-family: monospace;">${beam.ends}</div>
                    </div>
                    <div class="card" style="background: var(--bg); margin: 0; padding: 1rem; border: 1px solid var(--border); border-radius: 12px;">
                        <div style="font-size: 0.7rem; color: var(--muted); font-weight: 600;">INITIAL METERS</div>
                        <div style="font-size: 1.25rem; font-weight: 700; font-family: monospace;">${beam.meters} m</div>
                    </div>
                    <div class="card" style="background: rgba(139, 92, 246, 0.05); border: 1px solid rgba(139, 92, 246, 0.15); margin: 0; padding: 1rem; border-radius: 12px;">
                        <div style="font-size: 0.7rem; color: var(--muted); font-weight: 600;">USED</div>
                        <div style="font-size: 1.25rem; font-weight: 700; color: var(--accent); font-family: monospace;">${beamUsed.toFixed(1)} m</div>
                    </div>
                    <div class="card" style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.15); margin: 0; padding: 1rem; border-radius: 12px;">
                        <div style="font-size: 0.7rem; color: var(--muted); font-weight: 600;">REMAINING</div>
                        <div style="font-size: 1.25rem; font-weight: 700; color: var(--success); font-family: monospace;">${beamRemaining.toFixed(1)} m</div>
                    </div>
                    ${isCompleted ? `
                    <div class="card" style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.15); margin: 0; padding: 1rem; border-radius: 12px;">
                        <div style="font-size: 0.7rem; color: var(--muted); font-weight: 600;">SHORTAGE %</div>
                        <div style="font-size: 1.25rem; font-weight: 700; color: var(--error); font-family: monospace;">${beamShortagePercent.toFixed(1)}%</div>
                    </div>
                    ` : ''}
                    <div class="card" style="background: var(--bg); margin: 0; padding: 1rem; position: relative; border: 1px solid var(--border); border-radius: 12px;">
                        <div style="font-size: 0.7rem; color: var(--muted); margin-bottom: 0.25rem; font-weight: 600;">STATUS</div>
                        <div class="badge badge-${beam.status.toLowerCase().replace(' ', '-')}" style="font-size: 0.6rem;">${beam.status}</div>
                    </div>
                </div>

                <h3 class="display-font" style="font-size: 1.05rem; font-weight: 700; margin-bottom: 1rem; color: var(--fg);">Beam Timeline</h3>
                
                <!-- Timeline container -->
                <div class="timeline" style="margin-bottom: 1rem;">
                    ${(() => {
                        const timeline = getBeamTimeline(beam);
                        if (timeline.length === 0) {
                            return '<div style="color: var(--muted); font-style: italic; font-size: 0.85rem; padding: 1rem 0;">No timeline events recorded.</div>';
                        }
                        return timeline.map(h => {
                            const dotColor = h.type === 'machine' ? 'var(--accent3)' : (h.type === 'production' ? 'var(--success)' : (h.type === 'beam-loading' ? 'var(--accent2)' : 'var(--accent)'));
                            
                            let detailsHtml = '';
                            if (h.type === 'production' && h.details && h.details.logs) {
                                const grouped = [];
                                const takaGroups = {};
                                h.details.logs.forEach(log => {
                                    const serial = log.takaSerial;
                                    if (!serial || serial === 'Pending') {
                                        grouped.push({
                                            productionDates: [log.productionDate],
                                            foldingDates: log.foldingDate ? [log.foldingDate] : [],
                                            takaSerial: serial || 'Pending',
                                            meters: log.meters,
                                            weight: log.weight
                                        });
                                    } else {
                                        if (!takaGroups[serial]) {
                                            takaGroups[serial] = {
                                                productionDates: [],
                                                foldingDates: [],
                                                takaSerial: serial,
                                                meters: 0,
                                                weight: 0
                                            };
                                            grouped.push(takaGroups[serial]);
                                        }
                                        if (!takaGroups[serial].productionDates.includes(log.productionDate)) {
                                            takaGroups[serial].productionDates.push(log.productionDate);
                                        }
                                        if (log.foldingDate && !takaGroups[serial].foldingDates.includes(log.foldingDate)) {
                                            takaGroups[serial].foldingDates.push(log.foldingDate);
                                        }
                                        takaGroups[serial].meters += log.meters;
                                        takaGroups[serial].weight = Math.max(takaGroups[serial].weight, log.weight);
                                    }
                                });

                                const trs = grouped.map(g => `
                                    <tr>
                                        <td style="padding: 0.3rem 0.6rem; font-size: 0.8rem; text-align: center; border-bottom: none; color: var(--fg); vertical-align: top; width: 20%;">
                                            ${g.productionDates.map(d => `<div>${formatDate(d)}</div>`).join('')}
                                        </td>
                                        <td style="padding: 0.3rem 0.6rem; font-size: 0.8rem; text-align: center; border-bottom: none; color: var(--fg); vertical-align: top; width: 20%;">
                                            ${g.foldingDates.length > 0 ? g.foldingDates.map(d => `<div>${formatDate(d)}</div>`).join('') : '—'}
                                        </td>
                                        <td style="padding: 0.3rem 0.6rem; font-size: 0.8rem; text-align: center; border-bottom: none; font-weight: 500; color: var(--fg); vertical-align: top; width: 20%;">${g.takaSerial}</td>
                                        <td style="padding: 0.3rem 0.6rem; font-size: 0.8rem; text-align: center; font-weight: 600; border-bottom: none; color: var(--fg); vertical-align: top; width: 20%;">${g.meters.toFixed(1)} m</td>
                                        <td style="padding: 0.3rem 0.6rem; font-size: 0.8rem; text-align: center; font-weight: 600; border-bottom: none; color: var(--fg); vertical-align: top; width: 20%;">${g.weight > 0 ? `${g.weight.toFixed(2)} kg` : '—'}</td>
                                    </tr>
                                `).join('');

                                detailsHtml = `
                                    <div style="padding: 0.75rem; margin-top: 0.5rem; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; width: 100%; overflow-x: auto;">
                                        <table style="width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 0.8rem; text-align: center;">
                                            <thead>
                                                <tr>
                                                    <th style="font-size: 0.7rem; padding: 0.3rem 0.6rem; text-align: center; background: transparent; border-bottom: 1px solid var(--border); color: var(--muted); width: 20%;">Prod. Date</th>
                                                    <th style="font-size: 0.7rem; padding: 0.3rem 0.6rem; text-align: center; background: transparent; border-bottom: 1px solid var(--border); color: var(--muted); width: 20%;">Folding Date</th>
                                                    <th style="font-size: 0.7rem; padding: 0.3rem 0.6rem; text-align: center; background: transparent; border-bottom: 1px solid var(--border); color: var(--muted); width: 20%;">Taka Serial</th>
                                                    <th style="font-size: 0.7rem; padding: 0.3rem 0.6rem; text-align: center; background: transparent; border-bottom: 1px solid var(--border); color: var(--muted); width: 20%;">Meters</th>
                                                    <th style="font-size: 0.7rem; padding: 0.3rem 0.6rem; text-align: center; background: transparent; border-bottom: 1px solid var(--border); color: var(--muted); width: 20%;">Weight</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                ${trs}
                                                <tr style="border-top: 2px solid var(--border); font-weight: 700;">
                                                    <td colspan="3" style="padding: 0.4rem 0.6rem; font-size: 0.8rem; text-align: center; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em;">Sub Total</td>
                                                    <td style="padding: 0.4rem 0.6rem; font-size: 0.8rem; text-align: center; color: var(--accent);">${h.details.subTotalMeters.toFixed(1)} m</td>
                                                    <td style="padding: 0.4rem 0.6rem; font-size: 0.8rem; text-align: center; color: var(--accent);">${h.details.subTotalWeight > 0 ? `${h.details.subTotalWeight.toFixed(2)} kg` : '—'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                `;
                            }

                            return `
                                <div class="timeline-item">
                                    <div class="timeline-dot" style="background: ${dotColor};"></div>
                                    <div class="timeline-content">
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${h.type === 'production' ? '0.5rem' : '0'};">
                                            <div>
                                                <div class="timeline-date">${(h.type === 'production' || h.hideDate) ? '' : formatDate(h.date)}</div>
                                                <div style="font-weight: 600; color: var(--fg);">${h.event}</div>
                                            </div>
                                        </div>
                                        ${detailsHtml}
                                    </div>
                                </div>
                            `;
                        }).join('');
                    })()}
                </div>
            </div>
        `;
        overlay.style.display = 'flex';
    };

    // Auto click listener delegation
    const gmcStyleId = 'global-machinecard-modal-styles';
    if (!document.getElementById(gmcStyleId)) {
        const styleEl = document.createElement('style');
        styleEl.id = gmcStyleId;
        styleEl.innerHTML = `
            .gmc-modal-overlay {
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 20000;
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
            }
            .gmc-modal {
                background: var(--surface);
                border: 1px solid var(--border);
                border-radius: 24px;
                box-shadow: var(--shadow-xl);
                width: 95%;
                max-width: 1400px;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                padding: 2.5rem;
                color: var(--fg);
            }
            .gmc-modal * {
                box-sizing: border-box;
            }
            .gmc-modal .close-btn {
                position: absolute;
                top: 1rem;
                right: 1.25rem;
                background: transparent;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--muted);
                line-height: 1;
            }
            .gmc-modal .close-btn:hover {
                color: var(--fg);
            }
            .gmc-modal .timeline {
                position: relative;
                padding: 1.5rem 0;
                margin: 1.5rem 0;
            }
            .gmc-modal .timeline::before {
                content: '';
                position: absolute;
                top: 20px;
                bottom: 20px;
                left: 25px;
                width: 4px;
                background: var(--border);
                border-radius: 2px;
            }
            .gmc-modal .timeline-item {
                position: relative;
                margin: 2rem 0;
                clear: both;
            }
            .gmc-modal .timeline-item::after {
                content: '';
                display: table;
                clear: both;
            }
            .gmc-modal .timeline-item:first-child {
                margin-top: 0;
            }
            .gmc-modal .timeline-item:last-child {
                margin-bottom: 0;
            }
            .gmc-modal .timeline-dot {
                position: absolute;
                top: 10px;
                left: 12px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 4px solid var(--surface) !important;
                box-shadow: 0 0 0 1px var(--border), 0 4px 10px rgba(0, 0, 0, 0.1);
                z-index: 2;
            }
            .gmc-modal .timeline-content {
                position: relative;
                margin-left: 60px;
                background: var(--surface) !important;
                border: 1px solid var(--border) !important;
                border-radius: 12px !important;
                padding: 1.25rem !important;
                box-shadow: var(--shadow-sm);
            }
            .gmc-modal .timeline-content::before {
                content: '';
                position: absolute;
                top: 18px;
                left: -6px;
                width: 10px;
                height: 10px;
                background: var(--surface);
                border-left: 1px solid var(--border);
                border-bottom: 1px solid var(--border);
                transform: rotate(45deg);
                z-index: 1;
            }
            .gmc-modal .timeline-date {
                display: inline-block;
                color: var(--muted);
                font-size: 0.75rem;
                font-weight: 600;
                margin-bottom: 0.25rem;
                font-family: monospace;
            }

        `;
        document.head.appendChild(styleEl);
    }

    function getMachineTimelineData(machine, allBeams, beamLoadings, productionLogs) {
        const machineEvents = [];
        const mNameEscaped = machine.name.toString().replace(/[-\/\^$*+?.()|[\]{}]/g, '\\$&');
        const regex1 = new RegExp('(?:machine|no\\.?|on|from|completed on|unloaded from)\\s*(?:machine\\s+)?\\b' + mNameEscaped + '\\b', 'i');
        const regex2 = new RegExp('\\b' + mNameEscaped + '\\b', 'i');
        
        const matchesMachine = (eventStr) => {
            if (!eventStr) return false;
            const lower = eventStr.toLowerCase();
            return regex1.test(lower) || regex2.test(lower);
        };

        (machine.history || []).forEach(h => {
            machineEvents.push({
                date: h.date,
                event: h.event,
                type: h.type || 'machine',
                beam: null,
                beamNumber: null,
                category: 'machine-config'
            });
        });

        allBeams.forEach(beam => {
            (beam.history || []).forEach(h => {
                if (matchesMachine(h.event)) {
                    machineEvents.push({
                        date: h.date,
                        event: h.event,
                        type: h.type || 'system',
                        beam: beam,
                        beamNumber: beam.beamNumber,
                        category: 'history'
                    });
                }
            });
        });

        beamLoadings.forEach(bl => {
            if (String(bl.machineNumber).trim() === String(machine.id).trim() || String(bl.machineNumber).trim() === String(machine.name).trim()) {
                let roleLabel = '';
                let workerName = '';
                if (bl.piecein) { roleLabel = 'Piece In'; workerName = bl.piecein; }
                else if (bl.drawingIn) { roleLabel = 'Drawing In'; workerName = bl.drawingIn; }
                else if (bl.fani) { roleLabel = 'Fani (Reed)'; workerName = bl.fani; }
                else if (bl.dropPinJog) { roleLabel = 'Drop pin/Jog'; workerName = bl.dropPinJog; }
                
                const beam = allBeams.find(b => b.beamNumber === bl.beamNumber);
                machineEvents.push({
                    date: bl.date,
                    event: roleLabel + " by " + workerName,
                    type: 'beam-loading',
                    beam: beam,
                    beamNumber: bl.beamNumber,
                    category: 'derived',
                    loadingMeters: bl.meters
                });
            }
        });

        machineEvents.sort((a, b) => a.date.localeCompare(b.date));

        const configEvents = machineEvents.filter(e => e.category === 'machine-config');
        const beamEvents = machineEvents.filter(e => e.category !== 'machine-config');

        const cycles = [];
        let currentCycle = null;

        beamEvents.forEach(item => {
            const eventText = (item.event || '').toLowerCase();
            const isLoad = eventText.includes('pissing') || eventText.includes('piecing') || eventText.includes('loaded') || item.type === 'beam-loading';
            const isUnload = eventText.includes('unloaded') || eventText.includes('completed') || eventText.includes('removed');
            
            if (isLoad) {
                if (!currentCycle || currentCycle.beamNumber !== item.beamNumber) {
                    if (currentCycle) {
                        currentCycle.endDate = item.date;
                    }
                    currentCycle = {
                        beam: item.beam,
                        beamNumber: item.beamNumber,
                        startDate: item.date,
                        endDate: null,
                        logs: [],
                        events: [item]
                    };
                    cycles.push(currentCycle);
                } else {
                    currentCycle.events.push(item);
                }
            } else if (isUnload) {
                if (currentCycle && currentCycle.beamNumber === item.beamNumber) {
                    currentCycle.endDate = item.date;
                    currentCycle.events.push(item);
                    currentCycle = null;
                } else {
                    const openCycle = cycles.find(c => c.beamNumber === item.beamNumber && !c.endDate);
                    if (openCycle) {
                        openCycle.endDate = item.date;
                        openCycle.events.push(item);
                    } else {
                        cycles.push({
                            beam: item.beam,
                            beamNumber: item.beamNumber,
                            startDate: item.date,
                            endDate: item.date,
                            logs: [],
                            events: [item]
                        });
                    }
                }
            } else {
                if (currentCycle) {
                    currentCycle.events.push(item);
                } else {
                    const lastCycle = [...cycles].reverse().find(c => c.beamNumber === item.beamNumber);
                    if (lastCycle) {
                        lastCycle.events.push(item);
                    } else {
                        cycles.push({
                            beam: item.beam,
                            beamNumber: item.beamNumber,
                            startDate: item.date,
                            endDate: item.date,
                            logs: [],
                            events: [item]
                        });
                    }
                }
            }
        });

        cycles.forEach(c => {
            if (!c.endDate) {
                c.endDate = '9999-12-31';
            }
        });

        const machineLogs = productionLogs.filter(log => 
            String(log.machineNumber).trim() === String(machine.id).trim() || 
            String(log.machineNumber).trim() === String(machine.name).trim()
        );

        machineLogs.forEach(log => {
            let bestCycle = null;
            cycles.forEach(cycle => {
                if (cycle.beamNumber === log.beamNumber) {
                    if (log.productionDate >= cycle.startDate && log.productionDate <= cycle.endDate) {
                        if (!bestCycle || cycle.startDate > bestCycle.startDate) {
                            bestCycle = cycle;
                        }
                    }
                }
            });
            
            if (bestCycle) {
                bestCycle.logs.push({
                    productionDate: log.productionDate,
                    foldingDate: log.foldingDate,
                    takaSerial: log.takaSerial || 'Pending',
                    meters: parseFloat(log.totalMeters) || 0,
                    weight: parseFloat(log.takaWeight) || 0
                });
            } else {
                const sameBeamCycles = cycles.filter(c => c.beamNumber === log.beamNumber);
                if (sameBeamCycles.length > 0) {
                    sameBeamCycles[sameBeamCycles.length - 1].logs.push({
                        productionDate: log.productionDate,
                        foldingDate: log.foldingDate,
                        takaSerial: log.takaSerial || 'Pending',
                        meters: parseFloat(log.totalMeters) || 0,
                        weight: parseFloat(log.takaWeight) || 0
                    });
                } else {
                    const beam = allBeams.find(b => b.beamNumber === log.beamNumber);
                    const newCycle = {
                        beam: beam,
                        beamNumber: log.beamNumber,
                        startDate: log.productionDate,
                        endDate: '9999-12-31',
                        logs: [{
                            productionDate: log.productionDate,
                            foldingDate: log.foldingDate,
                            takaSerial: log.takaSerial || 'Pending',
                            meters: parseFloat(log.totalMeters) || 0,
                            weight: parseFloat(log.takaWeight) || 0
                        }],
                        events: [{
                            date: log.productionDate,
                            event: 'Production started',
                            type: 'production',
                            beamNumber: log.beamNumber,
                            beam: beam,
                            category: 'derived'
                        }]
                    };
                    cycles.push(newCycle);
                }
            }
        });

        const finalTimeline = [];
        cycles.sort((a, b) => a.startDate.localeCompare(b.startDate));

        cycles.filter(c => c.logs.length > 0).forEach(cycle => {
            cycle.events.sort((a, b) => a.date.localeCompare(b.date));
            cycle.logs.sort((a, b) => a.productionDate.localeCompare(b.productionDate));
            
            let prodEvent = null;
            if (cycle.logs.length > 0) {
                const subTotalMeters = cycle.logs.reduce((acc, l) => acc + l.meters, 0);
                const uniqueTakas = {};
                cycle.logs.forEach(l => {
                    if (l.takaSerial && l.takaSerial !== 'Pending') {
                        uniqueTakas[l.takaSerial] = l.weight;
                    }
                });
                const subTotalWeight = Object.values(uniqueTakas).reduce((acc, w) => acc + w, 0);
                const firstProdDate = cycle.logs[0].productionDate;
                
                prodEvent = {
                    date: firstProdDate,
                    event: 'Production Details for Beam #' + cycle.beamNumber,
                    type: 'production',
                    category: 'derived',
                    details: {
                        beamNumber: cycle.beamNumber,
                        logs: cycle.logs,
                        subTotalMeters,
                        subTotalWeight
                    }
                };
            }

            const cycleItems = [...cycle.events];
            if (prodEvent) {
                cycleItems.push(prodEvent);
            }

            cycleItems.sort((a, b) => {
                if (a.date === b.date) {
                    if (a.type === 'production') return 1;
                    if (b.type === 'production') return -1;
                }
                return a.date.localeCompare(b.date);
            });

            cycleItems.forEach(item => {
                let displayEvent = item.event;
                const bInfo = item.beam ? (" " + getBeamDetailsStr(item.beam, item.date, productionLogs)) : '';
                if (item.type !== 'production' && item.category !== 'machine-config' && item.beamNumber) {
                    displayEvent = item.event + " - Beam #" + item.beamNumber + bInfo;
                }
                finalTimeline.push({
                    ...item,
                    event: displayEvent
                });
            });
        });

        configEvents.forEach(item => finalTimeline.push(item));
        finalTimeline.sort((a, b) => a.date.localeCompare(b.date));

        return finalTimeline;
    }

    window.showGlobalMachineCard = function(machineId) {
        if (!machineId) return;

        let machinesList = [];
        try {
            machinesList = JSON.parse(localStorage.getItem('machines') || '[]');
        } catch(e) {}
        if (!machinesList.length) {
            machinesList = [];
        }

        const machine = machinesList.find(m => String(m.id).trim() === String(machineId).trim() || String(m.name).trim() === String(machineId).trim());
        if (!machine) {
            alert(`Machine #${machineId} not found.`);
            return;
        }

        let allBeams = [];
        try {
            allBeams = JSON.parse(localStorage.getItem('warp-beams') || '[]');
        } catch(e) {}

        let productionLogs = [];
        try {
            productionLogs = JSON.parse(localStorage.getItem('productionLogs') || '[]');
        } catch(e) {}

        let beamLoadings = [];
        try {
            beamLoadings = JSON.parse(localStorage.getItem('warp-beam-loadings') || '[]');
        } catch(e) {}

        const activeBeam = allBeams.find(b => {
            const mLower = String(machine.name).toLowerCase();
            const bmLower = String(b.machineNumber || '').toLowerCase();
            return b.status !== 'Completed' && (bmLower === mLower || bmLower === String(machine.id).toLowerCase());
        });

        const machineLogs = productionLogs.filter(l => 
            String(l.machineNumber).trim() === String(machine.id).trim() || 
            String(l.machineNumber).trim() === String(machine.name).trim()
        );
        const totalMeters = machineLogs.reduce((acc, log) => acc + (parseFloat(log.totalMeters) || 0), 0);

        const beamNumbersSet = new Set();
        machineLogs.forEach(l => { if (l.beamNumber) beamNumbersSet.add(l.beamNumber); });
        beamLoadings.forEach(bl => {
            if (String(bl.machineNumber).trim() === String(machine.id).trim() || String(bl.machineNumber).trim() === String(machine.name).trim()) {
                if (bl.beamNumber) beamNumbersSet.add(bl.beamNumber);
            }
        });
        allBeams.forEach(b => {
            const matchesMachine = (eventStr) => {
                if (!eventStr) return false;
                const lower = eventStr.toLowerCase();
                const mNameEscaped = machine.name.toString().replace(/[-\/\^$*+?.()|[\]{}]/g, '\\$&');
                const regex1 = new RegExp('(?:machine|no\\.?|on|from|completed on|unloaded from)\\s*(?:machine\\s+)?\\b' + mNameEscaped + '\\b', 'i');
                const regex2 = new RegExp('\\b' + mNameEscaped + '\\b', 'i');
                return regex1.test(lower) || regex2.test(lower);
            };
            if (b.beamNumber && (b.history || []).some(h => matchesMachine(h.event))) {
                beamNumbersSet.add(b.beamNumber);
            }
        });
        const totalBeamsRun = beamNumbersSet.size;

        const timeline = getMachineTimelineData(machine, allBeams, beamLoadings, productionLogs);

        let jalasList = [];
        try {
            jalasList = JSON.parse(localStorage.getItem('jalas') || '[]');
        } catch(e) {}
        const matchingJala = jalasList.find(j => j.name === machine.jala);
        const jalaStr = matchingJala ? (machine.jala + " (" + matchingJala.ends + " hooks)") : (machine.jala || '-');

        let activeBeamVal = 'None';
        let activeBadge = '<span style="color: var(--muted);">—</span>';
        let activeBg = 'var(--bg)';
        let activeBorder = 'var(--border)';
        if (activeBeam) {
            activeBeamVal = `<span style="cursor: pointer; color: var(--accent); font-weight: 700; text-decoration: underline;" onclick="window.showGlobalBeamCard('${activeBeam.beamNumber}')">Beam #${activeBeam.beamNumber}</span>`;
            activeBadge = '<span class="badge badge-on-loom" style="font-size: 0.6rem; padding: 1px 6px; background: rgba(139, 92, 246, 0.1); color: var(--accent); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 6px; font-weight:700;">ON LOOM</span>';
            activeBg = 'rgba(139, 92, 246, 0.05)';
            activeBorder = 'var(--accent)';
        }

        const formatDate = (dateStr) => {
            if (!dateStr || dateStr === '9999-12-31') return '';
            try {
                const parts = dateStr.split('-');
                if (parts.length === 3) {
                    const d = new Date(parts[0], parts[1]-1, parts[2]);
                    if (!isNaN(d.getTime())) {
                        return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                    }
                }
            } catch(e) {}
            return dateStr;
        };

        let overlay = document.getElementById('global-machinecard-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'global-machinecard-overlay';
            overlay.className = 'gmc-modal-overlay';
            overlay.onclick = () => { overlay.style.display = 'none'; };
            document.body.appendChild(overlay);
        }

        overlay.innerHTML = `
            <div class="gmc-modal" onclick="event.stopPropagation()">
                <button type="button" class="close-btn" onclick="document.getElementById('global-machinecard-overlay').style.display='none'">&times;</button>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <div>
                        <h2 style="margin: 0; font-family: var(--font-display); font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; font-size: 1.3rem;">MACHINE CARD #${machine.name}</h2>
                        <p style="color: var(--muted); font-size: 0.85rem; margin: 0.25rem 0 0 0;">${machine.rapier || '-'} Loom Make | Jacquard: ${machine.jacquard || '-'} (${machine.hooks || '-'} hooks)</p>
                    </div>
                </div>
                
                <!-- Stats Grid -->
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; margin-bottom: 2rem;">
                    <div class="card" style="background: var(--bg); margin: 0; padding: 1rem; border: 1px solid var(--border); border-radius: 12px;">
                        <div style="font-size: 0.7rem; color: var(--muted); font-weight: 600; text-transform: uppercase;">JALA & FANI</div>
                        <div style="font-size: 1.1rem; font-weight: 700; margin-top: 0.25rem;">Jala: ${jalaStr}</div>
                        <div style="font-size: 0.85rem; color: var(--muted); margin-top: 0.25rem;">Fani (Reed): ${matchingJala ? `${matchingJala.stockportReed || 0} x ${matchingJala.fabricWidth || 0}` : '-'}</div>
                    </div>
                    <div class="card" style="background: var(--bg); margin: 0; padding: 1rem; border: 1px solid var(--border); border-radius: 12px;">
                        <div style="font-size: 0.7rem; color: var(--muted); font-weight: 600; text-transform: uppercase;">TOTAL PRODUCTION</div>
                        <div style="font-size: 1.25rem; font-weight: 700; color: var(--accent); margin-top: 0.25rem;">${totalMeters.toFixed(1)} m</div>
                        <div style="font-size: 0.85rem; color: var(--muted); margin-top: 0.25rem;">Across ${machineLogs.length} logs</div>
                    </div>
                    <div class="card" style="background: var(--bg); margin: 0; padding: 1rem; border: 1px solid var(--border); border-radius: 12px;">
                        <div style="font-size: 0.7rem; color: var(--muted); font-weight: 600; text-transform: uppercase;">BEAMS RUN</div>
                        <div style="font-size: 1.25rem; font-weight: 700; margin-top: 0.25rem;">${totalBeamsRun}</div>
                        <div style="font-size: 0.85rem; color: var(--muted); margin-top: 0.25rem;">Unique beams loaded</div>
                    </div>
                    <div class="card" style="background: ${activeBg}; border: 1px solid ${activeBorder}; margin: 0; padding: 1rem; border-radius: 12px;">
                        <div style="font-size: 0.7rem; color: var(--muted); font-weight: 600; text-transform: uppercase;">CURRENT ACTIVE BEAM</div>
                        <div style="font-size: 1.25rem; font-weight: 700; color: ${activeBeam ? 'var(--accent)' : 'var(--muted)'}; margin-top: 0.25rem;">${activeBeamVal}</div>
                        <div style="font-size: 0.8rem; margin-top: 0.25rem;">${activeBadge}</div>
                    </div>
                </div>

                <h3 class="display-font" style="font-size: 1.05rem; font-weight: 700; margin-bottom: 1rem; color: var(--fg);">Machine History & Beam Timeline</h3>
                
                <!-- Timeline container -->
                <div class="timeline" style="margin-bottom: 1rem;">
                    ${(() => {
                        if (timeline.length === 0) {
                            return '<div style="color: var(--muted); font-style: italic; font-size: 0.85rem; padding: 1rem 0;">No history found for this machine.</div>';
                        }
                        return timeline.map(h => {
                            const dotBg = h.type === 'machine' ? 'var(--accent3)' : (h.type === 'production' ? 'var(--success)' : (h.type === 'beam-loading' ? 'var(--accent2)' : 'var(--accent)'));
                            const isProd = h.type === 'production';
                            
                            let contentHtml = '';
                            if (isProd && h.details && h.details.logs) {
                                const grouped = [];
                                const takaGroups = {};
                                h.details.logs.forEach(log => {
                                    const serial = log.takaSerial;
                                    if (!serial || serial === 'Pending') {
                                        grouped.push({
                                            productionDates: [log.productionDate],
                                            foldingDates: log.foldingDate ? [log.foldingDate] : [],
                                            takaSerial: serial || 'Pending',
                                            meters: log.meters,
                                            weight: log.weight
                                        });
                                    } else {
                                        if (!takaGroups[serial]) {
                                            takaGroups[serial] = {
                                                productionDates: [],
                                                foldingDates: [],
                                                takaSerial: serial,
                                                meters: 0,
                                                weight: 0
                                            };
                                            grouped.push(takaGroups[serial]);
                                        }
                                        if (!takaGroups[serial].productionDates.includes(log.productionDate)) {
                                            takaGroups[serial].productionDates.push(log.productionDate);
                                        }
                                        if (log.foldingDate && !takaGroups[serial].foldingDates.includes(log.foldingDate)) {
                                            takaGroups[serial].foldingDates.push(log.foldingDate);
                                        }
                                        takaGroups[serial].meters += log.meters;
                                        takaGroups[serial].weight = Math.max(takaGroups[serial].weight, log.weight);
                                    }
                                });

                                const rowsHtml = grouped.map((g, idx) => {
                                    const pDates = g.productionDates.map(d => `<div style="white-space: nowrap;">${formatDate(d)}</div>`).join('');
                                    const fDates = g.foldingDates.length > 0 ? g.foldingDates.map(d => `<div style="white-space: nowrap;">${formatDate(d)}</div>`).join('') : '—';
                                    return `<tr>
                                        <td style="padding: 0.3rem 0.6rem; font-size: 0.8rem; text-align: center; border-bottom: none; color: var(--fg); vertical-align: top; width: 20%;">${pDates}</td>
                                        <td style="padding: 0.3rem 0.6rem; font-size: 0.8rem; text-align: center; border-bottom: none; color: var(--fg); vertical-align: top; width: 20%;">${fDates}</td>
                                        <td style="padding: 0.3rem 0.6rem; font-size: 0.8rem; text-align: center; border-bottom: none; font-weight: 500; color: var(--fg); vertical-align: top; width: 20%;">${g.takaSerial}</td>
                                        <td style="padding: 0.3rem 0.6rem; font-size: 0.8rem; text-align: center; font-weight: 600; border-bottom: none; color: var(--accent); vertical-align: top; width: 20%;">${g.meters.toFixed(1)} m</td>
                                        <td style="padding: 0.3rem 0.6rem; font-size: 0.8rem; text-align: center; font-weight: 600; border-bottom: none; color: var(--fg); vertical-align: top; width: 20%;">${g.weight > 0 ? g.weight.toFixed(2) + ' kg' : '—'}</td>
                                    </tr>`;
                                }).join('');

                                contentHtml = `
                                    <div style="padding: 0.75rem; margin-top: 0.5rem; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; width: 100%; overflow-x: auto;">
                                        <table style="width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 0.8rem; text-align: center;">
                                            <thead>
                                                <tr>
                                                    <th style="font-size: 0.7rem; padding: 0.3rem 0.6rem; text-align: center; background: transparent; border-bottom: 1px solid var(--border); color: var(--muted); width: 20%;">Prod. Date</th>
                                                    <th style="font-size: 0.7rem; padding: 0.3rem 0.6rem; text-align: center; background: transparent; border-bottom: 1px solid var(--border); color: var(--muted); width: 20%;">Folding Date</th>
                                                    <th style="font-size: 0.7rem; padding: 0.3rem 0.6rem; text-align: center; background: transparent; border-bottom: 1px solid var(--border); color: var(--muted); width: 20%;">Taka Serial</th>
                                                    <th style="font-size: 0.7rem; padding: 0.3rem 0.6rem; text-align: center; background: transparent; border-bottom: 1px solid var(--border); color: var(--muted); width: 20%;">Meters</th>
                                                    <th style="font-size: 0.7rem; padding: 0.3rem 0.6rem; text-align: center; background: transparent; border-bottom: 1px solid var(--border); color: var(--muted); width: 20%;">Weight</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                ${rowsHtml}
                                                <tr style="border-top: 2px solid var(--border); font-weight: 700;">
                                                    <td colspan="3" style="padding: 0.4rem 0.6rem; font-size: 0.8rem; text-align: center; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em;">Sub Total</td>
                                                    <td style="padding: 0.4rem 0.6rem; font-size: 0.8rem; text-align: center; color: var(--accent);">${h.details.subTotalMeters.toFixed(1)} m</td>
                                                    <td style="padding: 0.4rem 0.6rem; font-size: 0.8rem; text-align: center; color: var(--accent);">${h.details.subTotalWeight > 0 ? h.details.subTotalWeight.toFixed(2) + ' kg' : '—'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                `;
                            }

                            return `
                                <div class="timeline-item">
                                    <div class="timeline-dot" style="background: ${dotBg};"></div>
                                    <div class="timeline-content">
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${isProd ? '0.5rem' : '0'};">
                                            <div>
                                                <div class="timeline-date">${(isProd || h.hideDate) ? '' : formatDate(h.date)}</div>
                                                <div style="font-weight: 600; color: var(--fg);">${h.event}</div>
                                            </div>
                                        </div>
                                        ${contentHtml}
                                    </div>
                                </div>
                            `;
                        }).join('');
                    })()}
                </div>
            </div>
        `;
        overlay.style.display = 'flex';
    };

    // Override local functions if loaded
    window.openMachineDetailsModal = window.showGlobalMachineCard;

    document.addEventListener('click', function(e) {
        // Exclude inputs, dropdowns, selects, textareas to prevent cards from opening on selection
        if (e.target.closest('select') || 
            e.target.closest('input') || 
            e.target.closest('textarea') ||
            e.target.closest('.dropdown-list') || 
            e.target.closest('.dropdown-menu') || 
            e.target.closest('.dropdown-item') ||
            e.target.closest('.select-input-wrapper') ||
            e.target.closest('[class*="dropdown"]') || 
            e.target.closest('[class*="select"]')) {
            return;
        }

        // Exclude beam tracker tab
        const isBeamTrackerTab = window.location.pathname.includes('warp') && 
            (document.querySelector('.nav-tab.active')?.textContent.includes('Beam tracker') || 
             document.querySelector('.nav-tab.active')?.textContent.includes('tracker'));

        if (isBeamTrackerTab) return;

        // Find the actual clickable trigger target
        const trigger = e.target.closest('.clickable-trigger') || e.target.closest('#rb-beam-no');
        if (!trigger) return;

        // Match span id='rb-beam-no'
        if (trigger.id === 'rb-beam-no' && trigger.innerText.trim()) {
            let allBeams = [];
            try {
                allBeams = JSON.parse(localStorage.getItem('warp-beams') || '[]');
            } catch(e) {}
            const exists = allBeams.some(b => String(b.beamNumber).trim().toLowerCase() === String(trigger.innerText.trim()).toLowerCase());
            if (exists) {
                e.preventDefault();
                e.stopPropagation();
                window.showGlobalBeamCard(trigger.innerText.trim());
                return;
            }
        }

        // Match exact "Beam #101" patterns in text (e.g. from labels, timelines)
        let text = trigger.innerText || '';
        let match = text.match(/Beam\s*#\s*([A-Za-z0-9\-]+)/i);
        if (match && match[1]) {
            if (beamExists(match[1])) {
                e.preventDefault();
                e.stopPropagation();
                window.showGlobalBeamCard(match[1]);
                return;
            }
        }

        // Match exact "Machine #X" or "Machine X" patterns in text (e.g. "Machine 1", "Machine #1")
        let mMatch = text.match(/(?:Machine|Loom)\s*#?\s*([A-Za-z0-9\-]+)/i);
        if (mMatch && mMatch[1] && !trigger.closest('select') && !trigger.closest('input')) {
            if (machineExists(mMatch[1])) {
                e.preventDefault();
                e.stopPropagation();
                window.showGlobalMachineCard(mMatch[1]);
                return;
            }
        }

        // Match table columns under Machine/Loom header
        let cell = trigger.closest('td');
        if (cell && !trigger.closest('button') && !trigger.closest('input') && !trigger.closest('a') && !trigger.closest('select')) {
            let index = cell.cellIndex;
            let table = cell.closest('table');
            if (table) {
                let ths = table.querySelectorAll('thead tr th');
                if (ths.length > index) {
                    let thText = ths[index].innerText.toLowerCase();
                    if (thText.includes('machine') || thText.includes('loom')) {
                        let val = cell.innerText.trim();
                        let exactMatch = val.match(/(?:Machine|Loom)?\s*#?\s*([A-Za-z0-9\-]+)/i);
                        if (exactMatch && exactMatch[1] && exactMatch[1] !== '-') {
                            if (machineExists(exactMatch[1])) {
                                e.preventDefault();
                                e.stopPropagation();
                                window.showGlobalMachineCard(exactMatch[1]);
                                return;
                            }
                        }
                    }
                }
            }
        }
    });

    // --- Auto-underline and highlight clickable triggers ---
    let cachedMachines = null;
    let cachedBeams = null;

    function getMachinesList() {
        if (cachedMachines) return cachedMachines;
        try {
            cachedMachines = JSON.parse(localStorage.getItem('machines') || '[]');
        } catch(e) {}
        if (!cachedMachines || !cachedMachines.length) {
            cachedMachines = [];
        }
        return cachedMachines;
    }

    function getBeamsList() {
        if (cachedBeams) return cachedBeams;
        try {
            cachedBeams = JSON.parse(localStorage.getItem('warp-beams') || '[]');
        } catch(e) {}
        return cachedBeams || [];
    }

    function machineExists(name) {
        const list = getMachinesList();
        return list.some(m => String(m.id).trim().toLowerCase() === String(name).trim().toLowerCase() || String(m.name).trim().toLowerCase() === String(name).trim().toLowerCase());
    }

    function beamExists(num) {
        const list = getBeamsList();
        return list.some(b => String(b.beamNumber).trim().toLowerCase() === String(num).trim().toLowerCase());
    }

    function enhanceClickables() {
        // 1. Scan tables for Machine/Loom headers and add clickable-trigger
        document.querySelectorAll('table').forEach(table => {
            const ths = table.querySelectorAll('thead tr th');
            ths.forEach((th, index) => {
                const thText = th.innerText.toLowerCase();
                if (thText.includes('machine') || thText.includes('loom')) {
                    table.querySelectorAll(`tbody tr td:nth-child(${index + 1})`).forEach(cell => {
                        if (cell.classList.contains('clickable-trigger')) return;
                        if (cell.querySelector('button') || cell.querySelector('input') || cell.querySelector('select') || cell.querySelector('a')) return;
                        
                        let val = cell.innerText.trim();
                        let exactMatch = val.match(/(?:Machine|Loom)?\s*#?\s*([A-Za-z0-9\-]+)/i);
                        if (exactMatch && exactMatch[1] && exactMatch[1] !== '-') {
                            if (machineExists(exactMatch[1])) {
                                cell.classList.add('clickable-trigger');
                                cell.title = "Click to view Machine details";
                            }
                        }
                    });
                }
            });
        });

        // 2. Scan elements containing text patterns like Beam #101 or Machine #2
        const elements = document.querySelectorAll('p, span, div, td, li, label, strong, em, td a');
        elements.forEach(el => {
            if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE' || el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') return;
            if (el.closest('.clickable-trigger')) return;
            if (el.querySelector('.clickable-trigger')) return;
            if (el.closest('.dropdown-list') || el.closest('.dropdown-item') || el.closest('.select-input-wrapper')) return;
            
            let hasChanged = false;
            el.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
                    let val = node.nodeValue;
                    let replaced = val;
                    
                    replaced = replaced.replace(/Beam\s*#\s*([A-Za-z0-9\-]+)/gi, (fullMatch, beamNo) => {
                        if (beamExists(beamNo)) {
                            hasChanged = true;
                            return `<span class="clickable-trigger" title="Click to view Beam details">${fullMatch}</span>`;
                        }
                        return fullMatch;
                    });

                    replaced = replaced.replace(/(Machine|Loom)\s*#\s*([A-Za-z0-9\-]+)/gi, (fullMatch, prefix, machNo) => {
                        if (machineExists(machNo)) {
                            hasChanged = true;
                            return `<span class="clickable-trigger" title="Click to view Machine details">${fullMatch}</span>`;
                        }
                        return fullMatch;
                    });

                    if (hasChanged) {
                        const tempSpan = document.createElement('span');
                        tempSpan.innerHTML = replaced;
                        node.replaceWith(tempSpan);
                    }
                }
            });
        });

        // 3. Highlight id="rb-beam-no"
        document.querySelectorAll('#rb-beam-no').forEach(el => {
            if (el.classList.contains('clickable-trigger')) return;
            const beamNo = el.innerText.trim();
            if (beamNo && beamExists(beamNo)) {
                el.classList.add('clickable-trigger');
                el.title = "Click to view Beam details";
            }
        });
    }

    window.escapeHtml = function(text) {
        if (text === null || text === undefined) return '';
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            enhanceClickables();
            setInterval(enhanceClickables, 800);
        });
    } else {
        enhanceClickables();
        setInterval(enhanceClickables, 800);
    }
})();



