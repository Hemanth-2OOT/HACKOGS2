import { AuditCard } from '../components/audit/AuditCard';
import { run_graph_audit } from '../api/audit';
import { Button } from '../components/ui/Button';

export const GraphAudit = () => {
  const audit = run_graph_audit();

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 800, marginBottom: 'var(--spacing-xs)' }}>Graph Audit</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-lg)' }}>Monitor the health and quality of the career knowledge graph.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
        <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--surface-hover)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Careers</div>
          <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>{audit.totalCareers}</div>
        </div>
        <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--surface-hover)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Skills</div>
          <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>{audit.totalSkills}</div>
        </div>
        <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--surface-hover)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Interests</div>
          <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>{audit.totalInterests}</div>
        </div>
        <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--surface-hover)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Edges</div>
          <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>{audit.totalEdges}</div>
        </div>
      </div>

      <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--spacing-md)' }}>Graph Health</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-lg)' }}>
        <AuditCard
          title="Graph Coverage"
          value="Excellent"
          status="good"
          description="Sufficient skills and interests available for broad exploration."
        />
        
        <AuditCard
          title="Isolated Skills"
          value={audit.isolatedSkills.length}
          status={audit.isolatedSkills.length === 0 ? 'good' : 'error'}
          description={audit.isolatedSkills.length === 0 ? 'All skills are connected.' : `Unconnected: ${audit.isolatedSkills.join(', ')}`}
        />
        
        <AuditCard
          title="Isolated Careers"
          value={audit.isolatedCareers.length}
          status={audit.isolatedCareers.length === 0 ? 'good' : 'error'}
          description={audit.isolatedCareers.length === 0 ? 'All careers have paths.' : `Unconnected: ${audit.isolatedCareers.join(', ')}`}
        />
        
        <AuditCard
          title="Potential Bottlenecks"
          value={audit.bottlenecks.length}
          status={audit.bottlenecks.length > 0 ? 'warning' : 'good'}
          description={audit.bottlenecks.length > 0 ? 'Some nodes are connected to many careers.' : 'Graph is well balanced.'}
        />
      </div>

      {audit.bottlenecks.length > 0 && (
        <div style={{ marginTop: 'var(--spacing-xl)', padding: 'var(--spacing-lg)', border: '1px solid var(--warning)', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--warning-bg)' }}>
          <h3 style={{ color: '#92400e', fontWeight: 700, marginBottom: 'var(--spacing-sm)' }}>Bottleneck Warning</h3>
          <p style={{ color: '#b45309', marginBottom: 'var(--spacing-md)' }}>
            These skills/interests are connected to more than 50% of careers. Generic skills should not dominate recommendations.
          </p>
          <ul style={{ color: '#92400e', paddingLeft: '20px', marginBottom: 'var(--spacing-md)' }}>
            {audit.bottlenecks.map(b => (
              <li key={b.name}>{b.name} (connected to {b.count} careers)</li>
            ))}
          </ul>
          <Button variant="outline" style={{ borderColor: '#b45309', color: '#92400e' }}>Resolve bottlenecks</Button>
        </div>
      )}
    </div>
  );
};
