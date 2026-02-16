import React, { useState } from 'react';
import { Link } from '../router';
import { PageShell } from '../components/PageShell';
import { MissionDataRows } from '../components/MissionDataRows';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { MissionStatusChip } from '../components/MissionStatusChip';
import { ProofLine } from '../components/ProofLine';
import { SignalRow, SignalGroup } from '../components/SignalRow';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

type FilterType = 'all' | 'critical' | 'actions' | 'updates';

interface Notification {
  id: string;
  title: string;
  detail: string;
  tone: 'critical' | 'warning' | 'primary' | 'healthy';
  value: string;
  type: FilterType;
  read: boolean;
}

const notifications: Notification[] = [
  { id: 'N-001', title: 'Critical: Suspicious transaction blocked', detail: 'Protect · Just now', tone: 'critical', value: 'Action needed', type: 'critical', read: false },
  { id: 'N-002', title: 'Savings goal reached — Emergency fund', detail: 'Grow · 1h ago', tone: 'healthy', value: 'Completed', type: 'updates', read: false },
  { id: 'N-003', title: 'Action approved — Bill negotiation', detail: 'Execute · 3h ago', tone: 'primary', value: 'Confirmed', type: 'actions', read: true },
  { id: 'N-004', title: 'Weekly audit summary available', detail: 'Govern · 6h ago', tone: 'primary', value: 'View report', type: 'updates', read: true },
  { id: 'N-005', title: 'Forecast updated with new data', detail: 'Grow · 12h ago', tone: 'primary', value: 'Updated', type: 'updates', read: true },
];

const filterTabs: Array<{ key: FilterType; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'critical', label: 'Critical' },
  { key: 'actions', label: 'Actions' },
  { key: 'updates', label: 'Updates' },
];

const kpiSparklines = {
  unread: [{ value: 8 }, { value: 6 }, { value: 5 }, { value: 4 }, { value: 3 }, { value: 2 }],
  today: [{ value: 3 }, { value: 4 }, { value: 5 }, { value: 4 }, { value: 5 }, { value: 5 }],
  critical: [{ value: 2 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 0 }, { value: 1 }],
  delivered: [{ value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }],
};

export const Notifications: React.FC = () => {
  const contract = getRouteScreenContract('notifications');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredNotifications = activeFilter === 'all'
    ? notifications
    : notifications.filter((n) => n.type === activeFilter);

  // Sort: unread first, then by recency (preserved from data order)
  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    if (a.read !== b.read) return a.read ? 1 : -1;
    return 0;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const mainContent = (
    <>
      <section className="engine-section">
        <MissionSectionHeader
          title="Notifications"
          message="Only action-relevant notifications are delivered."
          contextCue="Adjust notification preferences in Settings"
          right={<MissionStatusChip tone="warning" label={`${unreadCount} unread`} />}
        />

        <div className="notification-filter-tabs">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`notification-filter-tab ${activeFilter === tab.key ? 'notification-filter-tab--active' : ''}`}
              onClick={() => setActiveFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <MissionDataRows items={sortedNotifications} />
        <ProofLine
          claim={`${filteredNotifications.length} notifications`}
          evidence="Filtered to action-relevant events only"
          source="Notification engine"
          sourceType="observed"
        />
      </section>

      <article className="engine-card">
        <MissionSectionHeader title="By engine" />
        <SignalGroup>
          <SignalRow icon="●" label="Protect" value="2" color="teal" />
          <SignalRow icon="●" label="Grow" value="2" color="violet" />
          <SignalRow icon="●" label="Execute" value="1" color="amber" />
          <SignalRow icon="●" label="Govern" value="1" color="blue" />
        </SignalGroup>
      </article>
    </>
  );

  const sideContent = (
    <article className="engine-card">
      <MissionSectionHeader
        title="Notification preferences"
        message="Configure how and when you receive alerts."
      />
      <MissionDataRows
        items={[
          { id: 'NP-1', title: 'Critical alerts', value: 'Instant', tone: 'critical' },
          { id: 'NP-2', title: 'Action updates', value: 'Real-time', tone: 'primary' },
          { id: 'NP-3', title: 'Insights', value: 'Daily digest', tone: 'healthy' },
          { id: 'NP-4', title: 'Audit reports', value: 'Weekly', tone: 'primary' },
        ]}
      />
      <div className="engine-actions" style={{ marginTop: 16 }}>
        <Link to="/settings" className="entry-btn entry-btn--ghost">
          Manage preferences →
        </Link>
      </div>
    </article>
  );

  return (
    <PageShell
      slug="protect"
      contract={contract}
      layout="engine"
      heroVariant="editorial"
      hero={{
        kicker: 'Notifications',
        headline: 'Action-relevant alerts only.',
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: 'Filtered feed',
          evidence: 'Only notifications requiring user attention',
          source: 'Notification policy',
        },
        freshness: new Date(Date.now() - 1 * 60 * 1000),
        kpis: [
          { label: 'Unread', value: String(unreadCount), definition: 'Notifications awaiting review', accent: 'amber', sparklineData: kpiSparklines.unread, sparklineColor: 'var(--state-warning)' },
          { label: 'Today', value: '5', definition: 'Total notifications received today', accent: 'blue', sparklineData: kpiSparklines.today, sparklineColor: 'var(--state-primary)' },
          { label: 'Critical', value: '1', definition: 'Notifications requiring immediate action', accent: 'teal', sparklineData: kpiSparklines.critical, sparklineColor: 'var(--state-healthy)' },
          { label: 'Delivery', value: '100%', definition: 'Notification delivery success rate', accent: 'cyan', sparklineData: kpiSparklines.delivered, sparklineColor: '#00F0FF' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default Notifications;
