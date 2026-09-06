/* Illustrative monthly data, not live business results. */
(() => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const revenue = [11000, 19000, 16000, 32000, 28500, 48250, 51000, 56500, 59000, 63500, 68000, 74000];
  const orders = [310, 506, 440, 855, 760, 1284, 1360, 1505, 1580, 1690, 1815, 1970];

  function dashboardPeriod(now = new Date()) {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Karachi', year: 'numeric', month: 'numeric' }).formatToParts(now);
    const month = Number(parts.find(p => p.type === 'month').value);
    const year = Number(parts.find(p => p.type === 'year').value);
    // In January, keep the previous completed year visible until January closes.
    const count = month === 1 ? 12 : month - 1;
    return { year: month === 1 ? year - 1 : year, months: months.slice(0, count), revenue: revenue.slice(0, count), orders: orders.slice(0, count) };
  }

  function renderDashboard(now = new Date()) {
    const dashboard = document.querySelector('.hero-dashboard');
    if (!dashboard) return;
    const data = dashboardPeriod(now);
    const count = data.months.length;
    const period = `${count === 1 ? 'Jan' : `Jan \u2013 ${data.months[count - 1]}`} ${data.year}`;
    const sum = values => values.reduce((total, value) => total + value, 0);
    const numbers = new Intl.NumberFormat('en-US');
    dashboard.querySelector('.dash-period span:last-child').textContent = period;
    const metrics = dashboard.querySelectorAll('.dash-metrics > div');
    metrics[0].querySelector('strong').textContent = `$${numbers.format(sum(data.revenue))}`;
    metrics[1].querySelector('strong').textContent = numbers.format(sum(data.orders));
    metrics.forEach(metric => { metric.querySelector('small').textContent = `${count} completed ${count === 1 ? 'month' : 'months'} \u00b7 sample data`; });
    const ceiling = Math.ceil(Math.max(...data.revenue) / 20000) * 20000;
    const x = i => count === 1 ? 235 : 40 + i * 386 / (count - 1);
    const y = value => 155 - value / ceiling * 135;
    const points = data.revenue.map((value, i) => `${x(i).toFixed(2)} ${y(value).toFixed(2)}`);
    const line = `M${points.join(' L')}`;
    const chart = dashboard.querySelector('.dash-chart svg');
    chart.setAttribute('aria-label', `Sample monthly revenue for ${period}. ${data.months.map((month, i) => `${month}: $${numbers.format(data.revenue[i])}`).join('; ')}.`);
    chart.innerHTML = `<defs><linearGradient id="revenueArea" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#1B4FD8" stop-opacity=".2"/><stop offset="1" stop-color="#1B4FD8" stop-opacity="0"/></linearGradient></defs>
      <g class="dash-gridlines">${[0, 1, 2, 3].map(i => `<path d="M36 ${20 + i * 45}H430"/>`).join('')}</g>
      <g class="dash-axis">${[0, 1, 2, 3].map(i => `<text x="0" y="${24 + i * 45}">${Math.round(ceiling * (1 - i / 3) / 1000)}k</text>`).join('')}</g>
      <path d="${line} L${x(count - 1)} 155 L${x(0)} 155Z" fill="url(#revenueArea)"/>
      <path d="${line}" class="dash-line"/>
      ${data.revenue.map((value, i) => `<circle cx="${x(i)}" cy="${y(value)}" r="4" fill="var(--accent)" stroke="var(--card)" stroke-width="2"><title>${data.months[i]}: $${numbers.format(value)}</title></circle>`).join('')}
      <g class="dash-axis">${data.months.map((month, i) => `<text x="${x(i)}" y="181" text-anchor="middle">${month}</text>`).join('')}</g>`;
    dashboard.querySelector('.dash-insight strong').textContent = `Through ${data.months[count - 1]} ${data.year}`;
    dashboard.querySelector('.dash-insight p').textContent = 'Completed months only. The next month appears automatically after it ends.';
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { dashboardPeriod };
  if (typeof document !== 'undefined') {
    renderDashboard();
    // Refresh an open tab at a month boundary, and when returning to the page.
    setInterval(() => renderDashboard(), 60000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) renderDashboard(); });
  }
})();
