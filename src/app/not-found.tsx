import { EmptyState } from "@/components/molecules/EmptyState";

export default function NotFound() {
  return (
    <div className="container-lux py-24">
      <EmptyState
        title="This page has slipped away."
        description="The piece or page you were looking for can't be found. Perhaps something else will catch your eye."
        primary={{ label: "Discover jewelry", href: "/discover" }}
        secondary={{ label: "Return home", href: "/" }}
      />
    </div>
  );
}
