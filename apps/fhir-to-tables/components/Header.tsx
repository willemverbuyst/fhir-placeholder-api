import HeaderNavClient from "@/components/HeaderNavClient";
import LogoutButton from "@/components/LogoutButton";
import {
  extractSupportedResourceTypes,
  fetchCapabilityStatementSafe,
} from "@/lib/metadata";

export type NavLink = { href: string; label: string };

export default async function Header() {
  const capabilityStatement = await fetchCapabilityStatementSafe();
  const resourceTypes = capabilityStatement
    ? extractSupportedResourceTypes(capabilityStatement)
    : [];

  const links: NavLink[] = [
    ...resourceTypes.map((resourceType) => ({
      href: `/tables?resource-type=${resourceType}`,
      label: resourceType,
    })),
  ];

  return (
    <header className="flex w-full flex-col items-center pb-4">
      <div className="mb-2 flex w-full justify-end">
        <LogoutButton />
      </div>
      <nav className="w-full max-w-[1200px] flex flex-col gap-2">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          <HeaderNavClient
            links={links.slice(0, Math.ceil(links.length / 2))}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          <HeaderNavClient links={links.slice(Math.ceil(links.length / 2))} />
        </div>
      </nav>
    </header>
  );
}
