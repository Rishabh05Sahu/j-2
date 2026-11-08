/**
 * Re-mounts on every navigation, replaying a gentle opacity fade.
 * Pure CSS so content is visible before hydration and fixed-position
 * children are never trapped inside a transformed ancestor.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
