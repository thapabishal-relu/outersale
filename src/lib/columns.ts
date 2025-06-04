import { Person, Organization, TaskMapping } from "@/types";

export const peopleColumns = [
  {
    key: "name",
    title: "Name",
    width: "200px",
    render: (person: Person) =>
      `${person.first_name ?? "N/A"} ${person.last_name ?? "N/A"}`,
  },
  {
    key: "title",
    title: "Job Title",
    width: "200px",
    render: (person: Person) => person.title ?? "N/A",
  },
  {
    key: "company",
    title: "Company",
    width: "200px",
    render: (person: Person) => person.company ?? "N/A",
  },
  {
    key: "email",
    title: "Email",
    width: "200px",
    render: (person: Person) => person.email ?? "N/A",
  },
  {
    key: "linkedin_url",
    title: "LinkedIn",
    width: "200px",
    render: (person: Person) =>
      person.linkedin_url
        ? `<a href="${person.linkedin_url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">View Profile</a>`
        : "N/A",
  },
  {
    key: "domain_name",
    title: "Domain",
    width: "150px",
    render: (person: Person) => person.domain_name ?? "N/A",
  },
  {
    key: "created_at",
    title: "Created",
    width: "120px",
    render: (person: Person) =>
      person.created_at?.$date
        ? new Date(person.created_at.$date).toLocaleDateString()
        : "N/A",
  },
];

export const organizationsColumns = [
  {
    key: "name",
    title: "Company Name",
    width: "250px",
    render: (org: Organization) => org.name ?? "N/A",
  },
  {
    key: "industry",
    title: "Industry",
    width: "200px",
    render: (org: Organization) =>
      org.industry && org.industry.length > 0
        ? org.industry.slice(0, 2).join(", ")
        : "N/A",
  },
  {
    key: "number_of_employees",
    title: "Employees",
    width: "120px",
    render: (org: Organization) => org.number_of_employees ?? "N/A",
  },
  {
    key: "website_url",
    title: "Website",
    width: "200px",
    render: (org: Organization) =>
      org.website_url
        ? `<a href="${org.website_url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">${org.website_url.replace(/^https?:\/\//, "").replace(/^www\./, "")}</a>`
        : "N/A",
  },
  {
    key: "phone",
    title: "Phone",
    width: "150px",
    render: (org: Organization) => org.phone ?? "N/A",
  },
  {
    key: "address",
    title: "Location",
    width: "200px",
    render: (org: Organization) => {
      if (typeof org.address !== "string" || !org.address) return "N/A";
      const parts = org.address.split(",");
      if (parts.length >= 2) {
        return parts.slice(-2).join(",").trim();
      }
      return org.address;
    },
  },
  {
    key: "linkedin_url",
    title: "LinkedIn",
    width: "120px",
    render: (org: Organization) =>
      org.linkedin_url
        ? `<a href="${org.linkedin_url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">View</a>`
        : "N/A",
  },
  {
    key: "created_at",
    title: "Added",
    width: "120px",
    render: (org: Organization) =>
      org.created_at?.$date
        ? new Date(org.created_at.$date).toLocaleDateString()
        : "N/A",
  },
];

export const taskMappingColumns = [
  {
    key: "outersale_url",
    title: "Outersale URL",
    width: "300px",
    render: (task: TaskMapping) =>
      task.outersale_url
        ? `<a href="${task.outersale_url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">View</a>`
        : "N/A",
  },
  {
    key: "status",
    title: "Status",
    width: "150px",
    render: (task: TaskMapping) => task.status ?? "N/A",
  },
  {
    key: "created_at",
    title: "Created",
    width: "120px",
    render: (task: TaskMapping) =>
      task.created_at?.$date
        ? new Date(task.created_at.$date).toLocaleDateString()
        : "N/A",
  },
  {
    key: "updated_at",
    title: "Updated",
    width: "120px",
    render: (task: TaskMapping) =>
      task.updated_at?.$date
        ? new Date(task.updated_at.$date).toLocaleDateString()
        : "N/A",
  },
];
