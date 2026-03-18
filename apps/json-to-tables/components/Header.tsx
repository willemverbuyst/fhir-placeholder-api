import HeaderNavClient from "@/components/HeaderNavClient";
import {
  extractSupportedResourceTypes,
  fetchCapabilityStatement,
} from "@/lib/metadata";

export type NavLink = { href: string; label: string };

export default async function Header() {
  const capabilityStatement = await fetchCapabilityStatement();
  const resourceTypes = extractSupportedResourceTypes(capabilityStatement);

  const links: NavLink[] = [
    { href: "/", label: "Home" },
    ...resourceTypes.map((resourceType) => ({
      href: `/${resourceType}`,
      label: resourceType,
    })),
  ];

  return (
    <header className="flex w-full justify-center pb-4 sm:items-start">
      <HeaderNavClient links={links} />
    </header>
  );
}
